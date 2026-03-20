import React, { useRef, useEffect } from "react";
import { animate, stagger } from "animejs";
import INFO from "../../data/user";

const certs = INFO.homepage?.certificates || [];
const projects = INFO.projects || [];

const INNER_RADIUS = 100;
const OUTER_RADIUS = 165;
const CERT_ICONS = ["workspace_premium", "verified", "school"];
const PROJ_ICONS = ["code", "smart_toy", "sports_esports", "hub"];

const ArchitectOrbit = () => {
	const innerTrackRef = useRef(null);
	const outerTrackRef = useRef(null);
	const coreRef = useRef(null);

	const mainPlanets = certs.length >= 2
		? certs.slice(0, 3).map((c, i) => ({
				title: c.title,
				icon: CERT_ICONS[i] || "workspace_premium",
				primary: i === 0,
		  }))
		: [
				{ title: "AIGC Company Training", icon: "workspace_premium", primary: true },
				{ title: "Industrial Training", icon: "verified", primary: false },
				{ title: "Achievement", icon: "school", primary: false },
		  ];

	const projectPlanets = projects.length >= 3
		? projects.slice(0, 4).map((p, i) => ({
				title: p.title,
				icon: PROJ_ICONS[i] || "code",
				link: p.link || "#",
		  }))
		: [
				{ title: "Code Brain MCP", icon: "code", link: "https://www.npmjs.com/package/code-brain-mcp" },
				{ title: "AI NPC Game", icon: "smart_toy", link: "https://github.com/X-Gaming-Club/AI_AGENT_lobby" },
				{ title: "AI PvP Bot", icon: "sports_esports", link: "https://github.com/X-Gaming-Club/AI-PVP-BOT" },
				{ title: "Ranked PvP", icon: "hub", link: "https://github.com/X-Gaming-Club/RankedPvP" },
		  ];

	useEffect(() => {
		if (!innerTrackRef.current || !outerTrackRef.current) return;

		animate(innerTrackRef.current, {
			rotate: 360,
			duration: 42000,
			ease: "linear",
			loop: true,
		});

		animate(outerTrackRef.current, {
			rotate: -360,
			duration: 38000,
			ease: "linear",
			loop: true,
		});

		if (coreRef.current) {
			animate(coreRef.current, {
				scale: [1, 1.08, 1],
				opacity: [0.95, 1, 0.95],
				duration: 3000,
				ease: "inOutSine",
				loop: true,
			});
		}

		const innerPlanets = innerTrackRef.current?.querySelectorAll(".arch-galaxy-planet");
		const outerPlanets = outerTrackRef.current?.querySelectorAll(".arch-galaxy-planet");
		const planetEls = [...(innerPlanets || []), ...(outerPlanets || [])];
		if (planetEls.length) {
			animate(planetEls, {
				scale: [0, 1],
				opacity: [0, 1],
				duration: 800,
				delay: stagger(80),
				ease: "outElastic",
			});
		}
	}, []);

	const innerAngles = mainPlanets.map((_, i) => (360 / mainPlanets.length) * i);
	const outerAngles = projectPlanets.map((_, i) => (360 / projectPlanets.length) * i);

	return (
		<section className="arch-orbit-wrap arch-galaxy-wrap">
			<div className="arch-galaxy-starfield" aria-hidden="true" />
			<h2 className="arch-section-title arch-orbit-title">Achievement // Galaxy</h2>
			<div className="arch-galaxy-legend">
				<span className="arch-galaxy-legend-item main">Main planets: certifications & achievements</span>
				<span className="arch-galaxy-legend-item orbit">Orbit: projects</span>
			</div>
			<div className="arch-galaxy-viz">
				{/* Orbital path rings (decorative) */}
				<div className="arch-galaxy-ring arch-galaxy-ring-inner" />
				<div className="arch-galaxy-ring arch-galaxy-ring-outer" />

				{/* Inner orbit: certifications (main planets) */}
				<div
					className="arch-galaxy-orbit-track arch-galaxy-inner"
					ref={innerTrackRef}
					style={{ width: INNER_RADIUS * 2, height: INNER_RADIUS * 2 }}
				>
					{mainPlanets.map((item, i) => (
						<div
							key={`cert-${i}`}
							className="arch-galaxy-planet arch-galaxy-planet-main"
							style={{
								transform: `rotate(${innerAngles[i]}deg) translateX(${INNER_RADIUS}px)`,
							}}
						>
							<div
								className="arch-galaxy-planet-inner"
								style={{ transform: `rotate(${-innerAngles[i]}deg)` }}
							>
								<div className={`arch-galaxy-planet-box ${item.primary ? "primary" : ""}`}>
									<span className="material-symbols-outlined">{item.icon}</span>
								</div>
								<span className="arch-galaxy-planet-label">{item.title}</span>
							</div>
						</div>
					))}
				</div>

				{/* Outer orbit: projects */}
				<div
					className="arch-galaxy-orbit-track arch-galaxy-outer"
					ref={outerTrackRef}
					style={{ width: OUTER_RADIUS * 2, height: OUTER_RADIUS * 2 }}
				>
					{projectPlanets.map((item, i) => (
						<a
							key={`proj-${i}`}
							href={item.link || "#"}
							className="arch-galaxy-planet arch-galaxy-planet-proj"
							style={{
								transform: `rotate(${outerAngles[i]}deg) translateX(${OUTER_RADIUS}px)`,
							}}
							target="_blank"
							rel="noopener noreferrer"
						>
							<div
								className="arch-galaxy-planet-inner"
								style={{ transform: `rotate(${-outerAngles[i]}deg)` }}
							>
								<div className="arch-galaxy-planet-box proj">
									<span className="material-symbols-outlined">{item.icon}</span>
								</div>
								<span className="arch-galaxy-planet-label">{item.title}</span>
							</div>
						</a>
					))}
				</div>

				{/* Core: grade / sun */}
				<div className="arch-galaxy-core" ref={coreRef}>
					<span className="material-symbols-outlined">grade</span>
					<span className="arch-galaxy-core-label">CORE</span>
				</div>
			</div>
		</section>
	);
};

export default ArchitectOrbit;
