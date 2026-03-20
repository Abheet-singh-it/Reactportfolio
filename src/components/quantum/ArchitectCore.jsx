import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import INFO from "../../data/user";

const BARS = INFO.skillBars || [];
const skills = INFO.skills || [];

const ArchitectCore = () => {
	const sectionRef = useRef(null);
	const barsRef = useRef([]);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const ctx = gsap.context(() => {
			// Skill bars animate on scroll
			barsRef.current.forEach((bar, i) => {
				if (!bar) return;
				gsap.fromTo(bar,
					{ width: "0%" },
					{
						width: `${BARS[i]?.pct || 0}%`,
						duration: 1.4,
						delay: i * 0.1,
						ease: "power2.out",
						scrollTrigger: { trigger: section, start: "top 80%", once: true },
					}
				);
			});

			// Cards stagger
			const cards = section.querySelectorAll(".core-skill-card");
			gsap.fromTo(cards,
				{ opacity: 0, y: 24 },
				{
					opacity: 1, y: 0,
					duration: 0.5, stagger: 0.08,
					ease: "power2.out",
					scrollTrigger: { trigger: ".core-skills-grid", start: "top 85%", once: true },
				}
			);
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<section className="arch-section" id="core" ref={sectionRef}>
			<div className="core-header">
				<h2 className="arch-section-title">Technical // Core</h2>
				<p className="arch-section-subtitle">Engineering Proficiency & Domain Expertise</p>
			</div>

			{/* Skill Bars */}
			<div className="core-bars">
				{BARS.map((bar, i) => (
					<div key={i} className="core-bar">
						<div className="core-bar-header">
							<span className="core-bar-label">{bar.label}</span>
							<span className="core-bar-pct">{bar.pct}%</span>
						</div>
						<div className="core-bar-track">
							<div
								className="core-bar-fill"
								ref={(el) => (barsRef.current[i] = el)}
								style={{ width: 0 }}
							/>
						</div>
						<div className="core-bar-tags">
							{bar.tags.split(",").map((tag, j) => (
								<span key={j} className="core-bar-tag">{tag.trim()}</span>
							))}
						</div>
					</div>
				))}
			</div>

			{/* Skills Grid */}
			<div className="core-skills-grid">
				{skills.map((cat, i) => (
					<div key={i} className="core-skill-card">
						<h3 className="core-skill-title">{cat.category}</h3>
						<div className="core-skill-items">
							{cat.items.map((item, j) => (
								<span key={j} className="core-skill-item">{item}</span>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default ArchitectCore;
