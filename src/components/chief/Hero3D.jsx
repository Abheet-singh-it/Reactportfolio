import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import "./Hero3D.css";

export default function Hero3D({ onReady }) {
	const containerRef = useRef(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const width = container.clientWidth;
		const height = container.clientHeight;
		const aspect = width / height;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(28, aspect, 0.1, 1000);
		camera.position.set(0, 0, 8);
		camera.lookAt(0, 0, 0);

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1;
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		container.appendChild(renderer.domElement);

		// Teal accent light
		const keyLight = new THREE.DirectionalLight(0x5eead4, 1.2);
		keyLight.position.set(2, 3, 5);
		scene.add(keyLight);

		const fillLight = new THREE.PointLight(0x22d3ee, 0.8, 20);
		fillLight.position.set(-3, -1, 4);
		scene.add(fillLight);

		const ambient = new THREE.AmbientLight(0x0a0e17, 0.4);
		scene.add(ambient);

		// Central geometry - torus knot with stronger emissive
		const geometry = new THREE.TorusKnotGeometry(0.9, 0.35, 128, 32);
		const material = new THREE.MeshStandardMaterial({
			color: 0x0a0e17,
			metalness: 0.5,
			roughness: 0.25,
			emissive: 0x0d4d45,
			emissiveIntensity: 0.4,
			envMapIntensity: 0,
		});
		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		// Rim / wireframe accent (brighter)
		const wireGeo = new THREE.TorusKnotGeometry(0.92, 0.36, 64, 16);
		const wireMat = new THREE.MeshBasicMaterial({
			color: 0x5eead4,
			wireframe: true,
			transparent: true,
			opacity: 0.5,
		});
		const wire = new THREE.Mesh(wireGeo, wireMat);
		scene.add(wire);

		// Outer ring
		const ringGeo = new THREE.TorusGeometry(1.8, 0.03, 16, 48);
		const ringMat = new THREE.MeshBasicMaterial({
			color: 0x22d3ee,
			transparent: true,
			opacity: 0.3,
			side: THREE.DoubleSide,
		});
		const ring = new THREE.Mesh(ringGeo, ringMat);
		ring.rotation.x = Math.PI / 2;
		scene.add(ring);

		// Inner ring (closer)
		const ring2Geo = new THREE.TorusGeometry(1.25, 0.02, 12, 36);
		const ring2Mat = new THREE.MeshBasicMaterial({
			color: 0x5eead4,
			transparent: true,
			opacity: 0.2,
			side: THREE.DoubleSide,
		});
		const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
		ring2.rotation.x = Math.PI / 2;
		ring2.rotation.z = 0.3;
		scene.add(ring2);

		// Floating particles (small spheres)
		const particleCount = 32;
		const particles = [];
		const pGeo = new THREE.SphereGeometry(0.03, 8, 8);
		const pMat = new THREE.MeshBasicMaterial({
			color: 0x5eead4,
			transparent: true,
			opacity: 0.6,
		});
		for (let i = 0; i < particleCount; i++) {
			const p = new THREE.Mesh(pGeo, pMat.clone());
			p.position.set(
				(Math.random() - 0.5) * 5,
				(Math.random() - 0.5) * 5,
				(Math.random() - 0.5) * 4
			);
			p.userData.speed = 0.3 + Math.random() * 0.4;
			p.userData.phase = Math.random() * Math.PI * 2;
			scene.add(p);
			particles.push(p);
		}

		let frame = 0;
		const clock = new THREE.Clock();

		const animate = () => {
			requestAnimationFrame(animate);
			const dt = clock.getDelta();
			frame += dt;
			mesh.rotation.x = frame * 0.15;
			mesh.rotation.y = frame * 0.2;
			wire.rotation.x = mesh.rotation.x;
			wire.rotation.y = mesh.rotation.y;
			ring.rotation.z = frame * 0.08;
			ring2.rotation.z = frame * -0.06;
			particles.forEach((p, i) => {
				p.position.y += Math.sin(frame * p.userData.speed + p.userData.phase) * 0.008;
				p.position.x += Math.cos(frame * 0.7 + i * 0.5) * 0.005;
				p.material.opacity = 0.4 + 0.3 * Math.sin(frame * 0.5 + i);
			});
			renderer.render(scene, camera);
		};
		animate();

		const onResize = () => {
			if (!container.parentElement) return;
			const w = container.clientWidth;
			const h = container.clientHeight;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
		};
		window.addEventListener("resize", onResize);

		setMounted(true);
		if (onReady) onReady();

		return () => {
			window.removeEventListener("resize", onResize);
			renderer.dispose();
			geometry.dispose();
			wireGeo.dispose();
			ringGeo.dispose();
			ring2Geo.dispose();
			pGeo.dispose();
			material.dispose();
			wireMat.dispose();
			ringMat.dispose();
			ring2Mat.dispose();
			particles.forEach((p) => { p.geometry.dispose(); p.material.dispose(); });
			if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
		};
	}, [onReady]);

	return (
		<div className="chief-hero3d" ref={containerRef}>
			<div className="chief-hero3d-rim" aria-hidden="true" />
		</div>
	);
}
