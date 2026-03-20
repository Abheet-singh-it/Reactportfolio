import React, { useRef, useEffect, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import INFO from "../../data/user";
import "./ArchitectVault3D.css";

const certs = INFO.homepage?.certificates || [];
const projects = INFO.projects || [];

const CERT_ICONS = ["workspace_premium", "verified", "school"];
const PROJ_ICONS = ["code", "smart_toy", "sports_esports", "hub"];

const mainItems = certs.length >= 2
	? certs.slice(0, 3).map((c, i) => ({ title: c.title, icon: CERT_ICONS[i] || "workspace_premium", primary: i === 0 }))
	: [
			{ title: "AIGC Company Training", icon: "workspace_premium", primary: true },
			{ title: "Industrial Training", icon: "verified", primary: false },
			{ title: "Achievement", icon: "school", primary: false },
	  ];

const projectItems = projects.length >= 3
	? projects.slice(0, 4).map((p, i) => ({ title: p.title, icon: PROJ_ICONS[i] || "code", link: p.link || "#" }))
	: [
			{ title: "Code Brain MCP", icon: "code", link: "https://www.npmjs.com/package/code-brain-mcp" },
			{ title: "AI NPC Game", icon: "smart_toy", link: "#" },
			{ title: "AI PvP Bot", icon: "sports_esports", link: "#" },
			{ title: "Ranked PvP", icon: "hub", link: "#" },
	  ];

function canRunWebGL() {
	try {
		const canvas = document.createElement("canvas");
		return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
	} catch {
		return false;
	}
}

// Lazy 3D canvas component
function Vault3DCanvas({ sectionRef }) {
	const canvasWrapRef = useRef(null);
	const rafRef = useRef(null);

	useEffect(() => {
		const section = sectionRef.current;
		const canvasWrap = canvasWrapRef.current;
		if (!section || !canvasWrap) return;

		// Dynamic import Three.js
		let renderer, scene, camera;

		import("three").then((THREE) => {
			const width = canvasWrap.clientWidth;
			const height = canvasWrap.clientHeight;

			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
			camera.position.set(0, 0, 12);

			renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
			renderer.setSize(width, height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.toneMapping = THREE.ACESFilmicToneMapping;
			renderer.outputColorSpace = THREE.SRGBColorSpace;
			canvasWrap.appendChild(renderer.domElement);

			// Lights
			const dirLight = new THREE.DirectionalLight(0x5eead4, 1);
			dirLight.position.set(3, 4, 6);
			scene.add(dirLight);
			scene.add(new THREE.PointLight(0x22d3ee, 0.8, 30).translateTo?.(-4, 2, 5) || (() => {
				const pl = new THREE.PointLight(0x22d3ee, 0.8, 30);
				pl.position.set(-4, 2, 5);
				scene.add(pl);
				return pl;
			})());
			scene.add(new THREE.AmbientLight(0x0a0e17, 0.5));

			// Core dodecahedron
			const coreGeo = new THREE.DodecahedronGeometry(0.8, 0);
			const coreMat = new THREE.MeshStandardMaterial({
				color: 0x0a0e17, metalness: 0.5, roughness: 0.4,
				emissive: 0x5eead4, emissiveIntensity: 0.15,
			});
			const core = new THREE.Mesh(coreGeo, coreMat);
			scene.add(core);

			// Orbiting cubes
			const cubeCount = mainItems.length + projectItems.length;
			const cubes = [];
			const radius = 3.2;
			for (let i = 0; i < cubeCount; i++) {
				const geo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
				const mat = new THREE.MeshStandardMaterial({
					color: i < mainItems.length ? 0x14b8a6 : 0x22d3ee,
					metalness: 0.3, roughness: 0.6, transparent: true, opacity: 0.9,
				});
				const mesh = new THREE.Mesh(geo, mat);
				const angle = (i / cubeCount) * Math.PI * 2;
				mesh.position.set(Math.cos(angle) * radius, (i % 2) * 0.6 - 0.3, Math.sin(angle) * radius);
				mesh.userData = { angle, baseY: mesh.position.y };
				scene.add(mesh);
				cubes.push(mesh);
			}

			// Ring
			const ringGeo = new THREE.TorusGeometry(4, 0.04, 16, 64);
			const ringMat = new THREE.MeshBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.2, side: THREE.DoubleSide });
			const ring = new THREE.Mesh(ringGeo, ringMat);
			ring.rotation.x = Math.PI / 2;
			scene.add(ring);

			let time = 0;
			const clock = new THREE.Clock();

			function animateLoop() {
				rafRef.current = requestAnimationFrame(animateLoop);
				const dt = clock.getDelta();
				time += dt;
				core.rotation.y = time * 0.2;
				core.rotation.x = time * 0.08;
				ring.rotation.z = time * 0.05;
				cubes.forEach((c, i) => {
					c.rotation.y = time * (0.15 + (i % 3) * 0.02);
					c.rotation.x = time * 0.06;
					c.position.y = c.userData.baseY + Math.sin(time + c.userData.angle) * 0.15;
				});
				renderer.render(scene, camera);
			}
			animateLoop();

			// Scroll-driven camera
			ScrollTrigger.create({
				trigger: section,
				start: "top center",
				end: "bottom center",
				scrub: 1.2,
				onUpdate: (self) => {
					const p = self.progress;
					camera.position.x = Math.sin(p * Math.PI * 1.2) * 4;
					camera.position.y = (p - 0.5) * 3;
					camera.position.z = 12 - p * 2;
					camera.lookAt(0, 0, 0);
				},
			});

			// Resize
			const observer = new ResizeObserver(() => {
				if (!canvasWrap.parentElement) return;
				const w = canvasWrap.clientWidth;
				const h = canvasWrap.clientHeight;
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				renderer.setSize(w, h);
			});
			observer.observe(canvasWrap);

			// Store for cleanup
			canvasWrap._cleanup = () => {
				observer.disconnect();
				scene.traverse((child) => {
					if (child.isMesh) {
						child.geometry.dispose();
						if (child.material.dispose) child.material.dispose();
					}
				});
			};
		});

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			ScrollTrigger.getAll().forEach((t) => {
				if (t.trigger === section) t.kill();
			});
			if (canvasWrap._cleanup) canvasWrap._cleanup();
			if (renderer) {
				renderer.dispose();
				renderer.forceContextLoss();
				if (canvasWrap.contains(renderer.domElement)) canvasWrap.removeChild(renderer.domElement);
			}
		};
	}, [sectionRef]);

	return <div className="vault3d-canvas-wrap" ref={canvasWrapRef} aria-hidden="true" />;
}

export default function ArchitectVault3D() {
	const sectionRef = useRef(null);
	const cardsWrapRef = useRef(null);
	const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
	const hasWebGL = typeof window !== "undefined" && canRunWebGL();

	// Cards entrance animation (replaces Anime.js)
	useEffect(() => {
		const wrap = cardsWrapRef.current;
		if (!wrap) return;
		const cards = wrap.querySelectorAll(".vault3d-card");
		if (!cards.length) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(cards,
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.7,
					stagger: 0.1,
					ease: "back.out(1.4)",
					scrollTrigger: {
						trigger: wrap,
						start: "top 85%",
						once: true,
					},
				}
			);
		}, wrap);

		return () => ctx.revert();
	}, []);

	return (
		<section className="arch-vault3d" ref={sectionRef}>
			{isDesktop && hasWebGL && <Vault3DCanvas sectionRef={sectionRef} />}
			{!isDesktop || !hasWebGL ? (
				<div className="vault3d-canvas-wrap vault3d-fallback" aria-hidden="true">
					<div className="chief-hero-fallback-shape chief-hero-fallback-shape--1" />
					<div className="chief-hero-fallback-shape chief-hero-fallback-shape--2" />
					<div className="chief-hero-fallback-glow" />
				</div>
			) : null}
			<div className="vault3d-content">
				<h2 className="arch-section-title vault3d-title">Vault // Achievements & Projects</h2>
				<p className="vault3d-sub">Certifications & deployed projects</p>
				<div className="vault3d-cards" ref={cardsWrapRef}>
					<div className="vault3d-cards-group">
						<span className="vault3d-group-label">Certifications</span>
						{mainItems.map((item, i) => (
							<div key={`c-${i}`} className="vault3d-card vault3d-card-cert">
								<span className="material-symbols-outlined" aria-hidden="true">{item.icon}</span>
								<span>{item.title}</span>
							</div>
						))}
					</div>
					<div className="vault3d-cards-group">
						<span className="vault3d-group-label">Projects</span>
						{projectItems.map((item, i) => (
							<a
								key={`p-${i}`}
								href={item.link}
								target="_blank"
								rel="noopener noreferrer"
								className="vault3d-card vault3d-card-proj"
								data-cursor="icons"
								aria-label={`View ${item.title} project`}
							>
								<span className="material-symbols-outlined" aria-hidden="true">{item.icon}</span>
								<span>{item.title}</span>
							</a>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
