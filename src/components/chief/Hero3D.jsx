import React, { useRef, useEffect } from "react";
import {
	Scene, PerspectiveCamera, WebGLRenderer,
	DirectionalLight, PointLight, AmbientLight, HemisphereLight,
	IcosahedronGeometry, TorusGeometry, SphereGeometry, BufferGeometry, Float32BufferAttribute,
	MeshStandardMaterial, MeshBasicMaterial, MeshPhongMaterial, Points, PointsMaterial, Mesh, Group,
	ACESFilmicToneMapping, SRGBColorSpace, DoubleSide, AdditiveBlending, Clock
} from "three";
import "./Hero3D.css";

export default function Hero3D() {
	const containerRef = useRef(null);
	const rafRef = useRef(null);
	const mouseRef = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const width = container.clientWidth;
		const height = container.clientHeight;

		const scene = new Scene();
		const camera = new PerspectiveCamera(35, width / height, 0.1, 1000);
		camera.position.set(0, 0, 6);

		const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.toneMapping = ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.2;
		renderer.outputColorSpace = SRGBColorSpace;
		container.appendChild(renderer.domElement);

		// Cinematic lighting
		const hemiLight = new HemisphereLight(0x5eead4, 0x0a0e17, 0.6);
		scene.add(hemiLight);

		const keyLight = new DirectionalLight(0x5eead4, 1.5);
		keyLight.position.set(3, 4, 5);
		scene.add(keyLight);

		const rimLight = new DirectionalLight(0x22d3ee, 0.8);
		rimLight.position.set(-3, 2, -2);
		scene.add(rimLight);

		const fillLight = new PointLight(0x14b8a6, 0.6, 15);
		fillLight.position.set(-2, -3, 4);
		scene.add(fillLight);

		scene.add(new AmbientLight(0x0a0e17, 0.3));

		// Main group for mouse interaction
		const mainGroup = new Group();
		scene.add(mainGroup);

		// Core icosahedron (solid)
		const icoGeo = new IcosahedronGeometry(1.1, 1);
		const icoMat = new MeshStandardMaterial({
			color: 0x0a0e17,
			metalness: 0.7,
			roughness: 0.15,
			emissive: 0x14b8a6,
			emissiveIntensity: 0.3,
		});
		const icoMesh = new Mesh(icoGeo, icoMat);
		mainGroup.add(icoMesh);

		// Wireframe overlay (slightly larger)
		const wireGeo = new IcosahedronGeometry(1.15, 1);
		const wireMat = new MeshBasicMaterial({
			color: 0x5eead4,
			wireframe: true,
			transparent: true,
			opacity: 0.25,
		});
		const wireMesh = new Mesh(wireGeo, wireMat);
		mainGroup.add(wireMesh);

		// Inner glow sphere
		const glowGeo = new SphereGeometry(0.85, 32, 32);
		const glowMat = new MeshPhongMaterial({
			color: 0x5eead4,
			transparent: true,
			opacity: 0.08,
			emissive: 0x5eead4,
			emissiveIntensity: 0.5,
		});
		const glowMesh = new Mesh(glowGeo, glowMat);
		mainGroup.add(glowMesh);

		// Orbital rings
		const ringCount = 3;
		const rings = [];
		for (let i = 0; i < ringCount; i++) {
			const radius = 1.6 + i * 0.5;
			const rGeo = new TorusGeometry(radius, 0.008 + i * 0.004, 16, 64);
			const rMat = new MeshBasicMaterial({
				color: i === 0 ? 0x5eead4 : 0x22d3ee,
				transparent: true,
				opacity: 0.2 - i * 0.05,
				side: DoubleSide,
			});
			const ring = new Mesh(rGeo, rMat);
			ring.rotation.x = Math.PI / 2 + (i * 0.3);
			ring.rotation.z = i * 0.5;
			mainGroup.add(ring);
			rings.push(ring);
		}

		// Floating particle field (Points instead of individual meshes for performance)
		const isMobile = window.innerWidth < 1024;
		const pCount = isMobile ? 80 : 200;
		const positions = new Float32Array(pCount * 3);
		const sizes = new Float32Array(pCount);
		for (let i = 0; i < pCount; i++) {
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			const r = 1.5 + Math.random() * 3;
			positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
			positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
			positions[i * 3 + 2] = r * Math.cos(phi);
			sizes[i] = 1 + Math.random() * 2;
		}
		const pGeo = new BufferGeometry();
		pGeo.setAttribute("position", new Float32BufferAttribute(positions, 3));
		pGeo.setAttribute("size", new Float32BufferAttribute(sizes, 1));
		const pMat = new PointsMaterial({
			color: 0x5eead4,
			size: 0.03,
			transparent: true,
			opacity: 0.6,
			blending: AdditiveBlending,
			depthWrite: false,
		});
		const points = new Points(pGeo, pMat);
		mainGroup.add(points);

		// Orbiting accent spheres
		const orbitSpheres = [];
		const orbitCount = isMobile ? 3 : 6;
		for (let i = 0; i < orbitCount; i++) {
			const sGeo = new SphereGeometry(0.04 + Math.random() * 0.03, 12, 12);
			const sMat = new MeshBasicMaterial({
				color: i % 2 === 0 ? 0x5eead4 : 0x22d3ee,
				transparent: true,
				opacity: 0.7,
			});
			const sphere = new Mesh(sGeo, sMat);
			sphere.userData = {
				angle: (i / orbitCount) * Math.PI * 2,
				radius: 1.8 + Math.random() * 0.8,
				speed: 0.3 + Math.random() * 0.3,
				yOffset: (Math.random() - 0.5) * 0.6,
			};
			mainGroup.add(sphere);
			orbitSpheres.push(sphere);
		}

		let time = 0;
		const clock = new Clock();
		const targetRotation = { x: 0, y: 0 };

		const animate = () => {
			rafRef.current = requestAnimationFrame(animate);
			const dt = clock.getDelta();
			time += dt;

			// Mouse-interactive rotation (smooth lerp)
			targetRotation.x = mouseRef.current.y * 0.3;
			targetRotation.y = mouseRef.current.x * 0.3;
			mainGroup.rotation.x += (targetRotation.x - mainGroup.rotation.x) * 0.03;
			mainGroup.rotation.y += (targetRotation.y - mainGroup.rotation.y) * 0.03;

			// Core rotation
			icoMesh.rotation.x = time * 0.08;
			icoMesh.rotation.y = time * 0.12;
			wireMesh.rotation.x = icoMesh.rotation.x;
			wireMesh.rotation.y = icoMesh.rotation.y;

			// Inner glow pulse
			glowMesh.scale.setScalar(1 + Math.sin(time * 1.5) * 0.05);
			glowMat.opacity = 0.06 + Math.sin(time * 2) * 0.03;

			// Ring rotations
			rings.forEach((ring, i) => {
				ring.rotation.z = time * (0.05 + i * 0.02) * (i % 2 === 0 ? 1 : -1);
			});

			// Particle field slow rotation
			points.rotation.y = time * 0.02;
			points.rotation.x = Math.sin(time * 0.1) * 0.1;

			// Orbiting spheres
			orbitSpheres.forEach((s) => {
				const { angle, radius, speed, yOffset } = s.userData;
				s.position.x = Math.cos(angle + time * speed) * radius;
				s.position.z = Math.sin(angle + time * speed) * radius;
				s.position.y = yOffset + Math.sin(time * speed * 2 + angle) * 0.2;
			});

			renderer.render(scene, camera);
		};
		animate();

		// Mouse tracking for interaction
		const onMouseMove = (e) => {
			const rect = container.getBoundingClientRect();
			mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
			mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
		};
		container.addEventListener("mousemove", onMouseMove, { passive: true });

		// Responsive
		const observer = new ResizeObserver(() => {
			if (!container.parentElement) return;
			const w = container.clientWidth;
			const h = container.clientHeight;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
		});
		observer.observe(container);

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			container.removeEventListener("mousemove", onMouseMove);
			observer.disconnect();
			renderer.dispose();
			renderer.forceContextLoss();
			scene.traverse((child) => {
				if (child.isMesh || child.isPoints) {
					child.geometry.dispose();
					if (child.material.dispose) child.material.dispose();
				}
			});
			if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
		};
	}, []);

	return (
		<div className="chief-hero3d" ref={containerRef} aria-hidden="true">
			<div className="chief-hero3d-rim" aria-hidden="true" />
		</div>
	);
}
