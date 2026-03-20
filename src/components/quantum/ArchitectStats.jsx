import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import INFO from "../../data/user";

const STATS = INFO.stats || [];

const ArchitectStats = () => {
	const sectionRef = useRef(null);
	const barsRef = useRef([]);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const ctx = gsap.context(() => {
			barsRef.current.forEach((bar, i) => {
				if (!bar || !STATS[i]) return;
				gsap.fromTo(bar,
					{ width: "0%" },
					{
						width: `${STATS[i].barWidth}%`,
						duration: 1.2, delay: i * 0.1, ease: "power2.out",
						scrollTrigger: { trigger: section, start: "top 85%", once: true },
					}
				);
			});

			const cards = section.querySelectorAll(".arch-stat-card");
			gsap.fromTo(cards,
				{ opacity: 0, y: 30 },
				{
					opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
					scrollTrigger: { trigger: section, start: "top 85%", once: true },
				}
			);
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<section className="arch-stats" ref={sectionRef}>
			<div className="arch-stats-grid">
				{STATS.map((stat, i) => (
					<div key={i} className="arch-stat-card">
						<div className="arch-stat-label">{stat.label}</div>
						<div className="arch-stat-value">{stat.value}</div>
						<div className="arch-stat-bar">
							<div
								className="arch-stat-bar-fill"
								ref={(el) => (barsRef.current[i] = el)}
								style={{ width: 0 }}
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default ArchitectStats;
