import React from "react";
import INFO from "../../data/user";

const work = INFO.homepage.workExperience || [];

const ArchitectChronology = () => {
	const left = work.filter((_, i) => i % 2 === 0);
	const right = work.filter((_, i) => i % 2 === 1);

	return (
		<section className="arch-section arch-chronology">
			<h2 className="arch-section-title">System // Chronology</h2>
			<div className="arch-timeline">
				<div>
					{left.map((job, i) => (
						<div key={i} className="arch-timeline-item right">
							<span className="arch-timeline-period">{job.period}</span>
							<h3>{job.company}</h3>
							<p className="arch-timeline-role">{job.position}</p>
							<p className="arch-timeline-desc">
								{job.achievements && job.achievements[0]}
							</p>
						</div>
					))}
				</div>
				<div className="arch-timeline-line" />
				<div style={{ paddingTop: "6rem" }}>
					{right.map((job, i) => (
						<div key={i} className="arch-timeline-item left">
							<span className="arch-timeline-period">{job.period}</span>
							<h3>{job.company}</h3>
							<p className="arch-timeline-role">{job.position}</p>
							<p className="arch-timeline-desc">
								{job.achievements && job.achievements[0]}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ArchitectChronology;
