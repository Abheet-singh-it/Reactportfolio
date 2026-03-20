import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate, stagger } from "animejs";
import INFO from "../../data/user";
import "./ArchitectVault3D.css";

gsap.registerPlugin(ScrollTrigger);

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
			{ title: "AI NPC Game", icon: "smart_toy", link: "https://github.com/X-Gaming-Club/AI_AGENT_lobby" },
			{ title: "AI PvP Bot", icon: "sports_esports", link: "https://github.com/X-Gaming-Club/AI-PVP-BOT" },
			{ title: "Ranked PvP", icon: "hub", link: "https://github.com/X-Gaming-Club/RankedPvP" },
	  ];

export default function ArchitectVault3D() {
	const sectionRef = useRef(null);
	const canvasWrapRef = useRef(null);
	const cardsWrapRef = useRef(null);

	useEffect(() => {
		const section = sectionRef.current;
		const canvasWrap = canvasWrapRef.current;
		if (!section || !canvasWrap) return;

		const width = canvasWrap.clientWidth;
		const height = canvasWrap.clientHeight;
		const aspect = width / height;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
		camera.position.set(0, 0, 12);
		camera.lookAt(0, 0, 0);

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1;
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		canvasWrap.appendChild(renderer.domElement);

		// Lights
		const dirLight = new THREE.DirectionalLight(0x5eead4, 1);
		dirLight.position.set(3, 4, 6);
		scene.add(dirLight);
		const pointLight = new THREE.PointLight(0x22d3ee, 0.8, 30);
		pointLight.position.set(-4, 2, 5);
		scene.add(pointLight);
		scene.add(new THREE.AmbientLight(0x0a0e17, 0.5));

		// Central core (dodecahedron)
		const coreGeo = new THREE.DodecahedronGeometry(0.8, 0);
		const coreMat = new THREE.MeshStandardMaterial({
			color: 0x0a0e17,
			metalness: 0.5,
			roughness: 0.4,
			emissive: 0x5eead4,
			emissiveIntensity: 0.15,
		});
		const core = new THREE.Mesh(coreGeo, coreMat);
		scene.add(core);

		// Orbiting cubes (certificates + projects)
		const cubeCount = mainItems.length + projectItems.length;
		const cubes = [];
		const radius = 3.2;
		for (let i = 0; i < cubeCount; i++) {
			const geo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
			const mat = new THREE.MeshStandardMaterial({
				color: i < mainItems.length ? 0x14b8a6 : 0x22d3ee,
				metalness: 0.3,
				roughness: 0.6,
				transparent: true,
				opacity: 0.9,
			});
			const mesh = new THREE.Mesh(geo, mat);
			const angle = (i / cubeCount) * Math.PI * 2;
			mesh.position.x = Math.cos(angle) * radius;
			mesh.position.z = Math.sin(angle) * radius;
			mesh.position.y = (i % 2) * 0.6 - 0.3;
			mesh.userData.angle = angle;
			mesh.userData.baseY = mesh.position.y;
			scene.add(mesh);
			cubes.push(mesh);
		}

		// Ring
		const ringGeo = new THREE.TorusGeometry(4, 0.04, 16, 64);
		const ringMat = new THREE.MeshBasicMaterial({
			color: 0x5eead4,
			transparent: true,
			opacity: 0.2,
			side: THREE.DoubleSide,
		});
		const ring = new THREE.Mesh(ringGeo, ringMat);
		ring.rotation.x = Math.PI / 2;
		scene.add(ring);

		let time = 0;
		const clock = new THREE.Clock();

		function animateLoop() {
			requestAnimationFrame(animateLoop);
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

		// GSAP: scroll-driven camera
		const st = ScrollTrigger.create({
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
				camera.updateProjectionMatrix();
			},
		});

		const onResize = () => {
			if (!canvasWrap.parentElement) return;
			const w = canvasWrap.clientWidth;
			const h = canvasWrap.clientHeight;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
		};
		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("resize", onResize);
			st.kill();
			renderer.dispose();
			coreGeo.dispose();
			ringGeo.dispose();
			coreMat.dispose();
			ringMat.dispose();
			cubes.forEach((c) => {
				c.geometry.dispose();
				c.material.dispose();
			});
			if (canvasWrap.contains(renderer.domElement)) canvasWrap.removeChild(renderer.domElement);
		};
	}, []);

	// Anime.js: DOM cards entrance
	useEffect(() => {
		const wrap = cardsWrapRef.current;
		if (!wrap) return;
		const cards = wrap.querySelectorAll(".vault3d-card");
		if (!cards.length) return;
		animate(cards, {
			translateY: [40, 0],
			opacity: [0, 1],
			duration: 900,
			delay: stagger(100),
			ease: "outElastic",
			elasticity: 400,
		});
	}, []);

	return (
		<section className="arch-vault3d" ref={sectionRef}>
			<div className="vault3d-canvas-wrap" ref={canvasWrapRef} aria-hidden="true" />
			<div className="vault3d-content">
				<h2 className="arch-section-title vault3d-title">Vault // Achievements & Projects</h2>
				<p className="vault3d-sub">3D scene driven by scroll · Three.js, GSAP, Anime.js</p>
				<div className="vault3d-cards" ref={cardsWrapRef}>
					<div className="vault3d-cards-group">
						<span className="vault3d-group-label">Certifications</span>
						{mainItems.map((item, i) => (
							<div key={`c-${i}`} className="vault3d-card vault3d-card-cert">
								<span className="material-symbols-outlined">{item.icon}</span>
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
							>
								<span className="material-symbols-outlined">{item.icon}</span>
								<span>{item.title}</span>
							</a>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
