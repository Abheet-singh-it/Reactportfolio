import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate, stagger } from "animejs";
import INFO from "../../data/user";
import "./BuildLogSection.css";

gsap.registerPlugin(ScrollTrigger);

const certs = INFO.homepage?.certificates || [];
const projects = INFO.projects || [];

const STAGES = [
	{ id: "train", label: "Training", icon: "school" },
	{ id: "cert", label: "Certs", icon: "verified" },
	{ id: "code", label: "Code", icon: "code" },
	{ id: "ship", label: "Ship", icon: "rocket_launch" },
];

export default function BuildLogSection() {
	const sectionRef = useRef(null);
	const pipelineRef = useRef(null);
	const lineRef = useRef(null);
	const logsRef = useRef(null);

	useEffect(() => {
		const section = sectionRef.current;
		const line = lineRef.current;
		if (!section || !line) return;

		// GSAP: animate pipeline progress line on scroll
		ScrollTrigger.create({
			trigger: section,
			start: "top 60%",
			end: "bottom 30%",
			scrub: 1,
			onUpdate: (self) => {
				gsap.set(line, { scaleX: self.progress });
			},
		});
	}, []);

	useEffect(() => {
		const section = sectionRef.current;
		const pipeline = pipelineRef.current;
		const logs = logsRef.current;
		if (!section || !pipeline || !logs) return;

		const runEntrance = () => {
			const stageDots = pipeline.querySelectorAll(".buildlog-stage-dot");
			animate(stageDots, {
				scale: [0, 1],
				opacity: [0, 1],
				duration: 600,
				delay: stagger(120),
				ease: "outElastic",
				elasticity: 400,
			});

			const logRows = logs.querySelectorAll(".buildlog-row");
			animate(logRows, {
				translateX: [-24, 0],
				opacity: [0, 1],
				duration: 500,
				delay: stagger(80, { start: 0.3 }),
				ease: "outQuad",
			});
		};

		const st = ScrollTrigger.create({
			trigger: section,
			start: "top 82%",
			once: true,
			onEnter: runEntrance,
		});
		return () => st.kill();
	}, []);

	return (
		<section className="buildlog-section" ref={sectionRef}>
			<div className="buildlog-header">
				<h2 className="buildlog-title">Build Log</h2>
				<p className="buildlog-sub">Training → Certs → Code → Ship · AIGC, MCP, Gaming</p>
			</div>

			<div className="buildlog-pipeline" ref={pipelineRef}>
				<div className="buildlog-line-wrap">
					<div className="buildlog-line" ref={lineRef} />
				</div>
				{STAGES.map((s) => (
					<div key={s.id} className="buildlog-stage">
						<div className="buildlog-stage-dot">
							<span className="material-symbols-outlined">{s.icon}</span>
						</div>
						<span className="buildlog-stage-label">{s.label}</span>
					</div>
				))}
			</div>

			<div className="buildlog-logs" ref={logsRef}>
				<div className="buildlog-group">
					<div className="buildlog-group-title">
						<span className="buildlog-prompt">$</span> certifications
					</div>
					{certs.slice(0, 3).map((c, i) => (
						<div key={i} className="buildlog-row">
							<span className="buildlog-date">[{c.date || "2024"}]</span>
							<span className="buildlog-name">{c.title}</span>
							<span className="buildlog-status">verified</span>
						</div>
					))}
				</div>
				<div className="buildlog-group">
					<div className="buildlog-group-title">
						<span className="buildlog-prompt">$</span> projects
					</div>
					{projects.slice(0, 4).map((p, i) => (
						<a
							key={i}
							href={p.link || "#"}
							target="_blank"
							rel="noopener noreferrer"
							className="buildlog-row buildlog-row-link"
							data-cursor="icons"
						>
							<span className="buildlog-tag">[{p.linkText?.toLowerCase().replace(/\s/g, "_") || "view"}]</span>
							<span className="buildlog-name">{p.title}</span>
							<span className="buildlog-status">shipped</span>
						</a>
					))}
				</div>
			</div>

			<div className="buildlog-footer-note">
				<span className="material-symbols-outlined">terminal</span>
				Chief Frontend · AI Engineering · Gaming UI · Krafton-level
			</div>
		</section>
	);
}
