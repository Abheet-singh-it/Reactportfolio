import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import INFO from "../../data/user";
import "./BuildLogSection.css";

const certs = INFO.homepage?.certificates || [];
const projects = INFO.projects || [];
const buildLog = INFO.buildLog || {};
const stages = buildLog.stages || [];
const milestones = buildLog.milestones || [];

export default function BuildLogSection() {
	const sectionRef = useRef(null);
	const pipelineRef = useRef(null);
	const lineRef = useRef(null);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const ctx = gsap.context(() => {
			// Pipeline line scroll animation
			if (lineRef.current) {
				ScrollTrigger.create({
					trigger: pipelineRef.current,
					start: "top 70%",
					end: "bottom 40%",
					scrub: 0.8,
					onUpdate: (self) => {
						gsap.set(lineRef.current, { scaleX: self.progress });
					},
				});
			}

			// Stage dots entrance
			const dots = section.querySelectorAll(".buildlog-stage-dot");
			gsap.fromTo(dots,
				{ scale: 0, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)",
					scrollTrigger: { trigger: pipelineRef.current, start: "top 82%", once: true } }
			);

			// Milestone cards stagger
			const cards = section.querySelectorAll(".buildlog-milestone");
			gsap.fromTo(cards,
				{ opacity: 0, y: 24 },
				{ opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out",
					scrollTrigger: { trigger: ".buildlog-milestones", start: "top 85%", once: true } }
			);

			// Log groups stagger
			const groups = section.querySelectorAll(".buildlog-group");
			gsap.fromTo(groups,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out",
					scrollTrigger: { trigger: ".buildlog-logs", start: "top 85%", once: true } }
			);
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<section className="buildlog-section" ref={sectionRef}>
			{/* Header */}
			<div className="buildlog-header">
				<h2 className="arch-section-title">{buildLog.title || "Build Log"}</h2>
				<p className="arch-section-subtitle">{buildLog.subtitle}</p>
			</div>

			{/* Pipeline stages */}
			<div className="buildlog-pipeline" ref={pipelineRef}>
				<div className="buildlog-line-wrap">
					<div className="buildlog-line" ref={lineRef} />
				</div>
				{stages.map((s) => (
					<div key={s.id} className="buildlog-stage">
						<div className="buildlog-stage-dot">
							<span className="material-symbols-outlined" aria-hidden="true">{s.icon}</span>
						</div>
						<span className="buildlog-stage-label">{s.label}</span>
					</div>
				))}
			</div>

			{/* Career Milestones */}
			{milestones.length > 0 && (
				<div className="buildlog-milestones">
					<div className="buildlog-milestones-grid">
						{milestones.map((m, i) => (
							<div key={i} className={`buildlog-milestone ${m.status === "active" ? "buildlog-milestone--active" : ""}`}>
								<div className="buildlog-milestone-year">{m.year}</div>
								<div className="buildlog-milestone-content">
									<h4 className="buildlog-milestone-title">{m.title}</h4>
									<p className="buildlog-milestone-desc">{m.desc}</p>
								</div>
								<div className={`buildlog-milestone-status ${m.status === "active" ? "buildlog-milestone-status--active" : ""}`}>
									<span className="buildlog-milestone-dot" aria-hidden="true" />
									<span>{m.status === "active" ? "Active" : "Done"}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Logs: Certifications + Projects + Skills */}
			<div className="buildlog-logs">
				<div className="buildlog-group">
					<div className="buildlog-group-header">
						<span className="material-symbols-outlined" aria-hidden="true">verified</span>
						<span className="buildlog-group-title">Certifications</span>
						<span className="buildlog-group-count">{certs.length}</span>
					</div>
					{certs.map((c, i) => (
						<div key={i} className="buildlog-row">
							<span className="buildlog-date">{c.date}</span>
							<span className="buildlog-name">{c.title}</span>
							<span className="buildlog-issuer">{c.issuer}</span>
							<span className="buildlog-badge buildlog-badge--verified">Verified</span>
						</div>
					))}
				</div>

				<div className="buildlog-group">
					<div className="buildlog-group-header">
						<span className="material-symbols-outlined" aria-hidden="true">deployed_code</span>
						<span className="buildlog-group-title">Shipped Projects</span>
						<span className="buildlog-group-count">{projects.length}</span>
					</div>
					{projects.map((p, i) => (
						<a key={i} href={p.link} target="_blank" rel="noopener noreferrer"
							className="buildlog-row buildlog-row-link"
							aria-label={`View ${p.title}`}>
							<span className="buildlog-name">{p.title}</span>
							<span className="buildlog-badge" data-status={p.status?.toLowerCase()}>
								{p.status}
							</span>
						</a>
					))}
				</div>

				</div>

			{/* Footer */}
			<div className="buildlog-footer-note">
				<span className="material-symbols-outlined" aria-hidden="true">terminal</span>
				{buildLog.footerNote}
			</div>
		</section>
	);
}
