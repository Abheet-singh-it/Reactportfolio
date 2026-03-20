import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import INFO from "../../data/user";

const work = INFO.homepage?.workExperience || [];

const TYPE_COLORS = {
	"FULL-TIME": "#22c55e",
	FREELANCE: "#5eead4",
	CONTRACT: "#22d3ee",
	TRAINING: "#f59e0b",
	INTERNSHIP: "#a78bfa",
};

const ArchitectChronology = () => {
	const sectionRef = useRef(null);
	const lineRef = useRef(null);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const ctx = gsap.context(() => {
			if (lineRef.current) {
				gsap.fromTo(lineRef.current,
					{ scaleY: 0, transformOrigin: "top" },
					{
						scaleY: 1, duration: 1.5, ease: "power2.out",
						scrollTrigger: { trigger: section, start: "top 70%", end: "bottom 30%", scrub: 0.8 },
					}
				);
			}

			const items = section.querySelectorAll(".chrono-card");
			items.forEach((item, i) => {
				const isLeft = i % 2 === 0;
				gsap.fromTo(item,
					{ opacity: 0, x: isLeft ? -40 : 40 },
					{
						opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
						scrollTrigger: { trigger: item, start: "top 88%", once: true },
					}
				);
			});

			const dots = section.querySelectorAll(".chrono-dot");
			dots.forEach((dot) => {
				gsap.fromTo(dot, { scale: 0 }, {
					scale: 1, duration: 0.4, ease: "back.out(2)",
					scrollTrigger: { trigger: dot, start: "top 85%", once: true },
				});
			});
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<section className="arch-section arch-chronology" id="chronology" ref={sectionRef}>
			<div className="chrono-header">
				<h2 className="arch-section-title">System // Chronology</h2>
				<p className="arch-section-subtitle">Professional Journey & Growth Trajectory</p>
			</div>

			<div className="chrono-timeline">
				<div className="chrono-line" ref={lineRef} aria-hidden="true" />
				{work.map((job, i) => (
					<div key={i} className={`chrono-card ${i % 2 === 0 ? "chrono-card--left" : "chrono-card--right"}`}>
						<div className="chrono-dot" aria-hidden="true">
							<span className="material-symbols-outlined">{job.icon || "work"}</span>
						</div>
						<div className="chrono-card-inner">
							<div className="chrono-card-header">
								<span className="chrono-period">{job.period}</span>
								<span className="chrono-type" style={{ "--type-color": TYPE_COLORS[job.type] || "#5eead4" }}>
									{job.type || "ROLE"}
								</span>
							</div>
							<h3 className="chrono-company">{job.company}</h3>
							<p className="chrono-role">{job.position}</p>
							{job.location && <p className="chrono-location">{job.location}</p>}

							{job.stack && (
								<div className="chrono-stack">
									{job.stack.map((tech, j) => (
										<span key={j} className="chrono-stack-tag">{tech}</span>
									))}
								</div>
							)}

							{job.achievements && (
								<ul className="chrono-highlights">
									{job.achievements.map((h, j) => (
										<li key={j}>{h}</li>
									))}
								</ul>
							)}

							{job.learned && (
								<div className="chrono-learned">
									<span className="material-symbols-outlined" aria-hidden="true">lightbulb</span>
									<span>{job.learned}</span>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default ArchitectChronology;
