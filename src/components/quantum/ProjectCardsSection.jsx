import React from "react";
import INFO from "../../data/user";

const STATUS_LABELS = ["DEPLOYED", "BETA", "CONCEPT"];

const ProjectCardsSection = () => (
	<section className="qp-section qp-projects" id="projects">
		<div className="qp-projects-grid">
			{INFO.projects.slice(0, 3).map((project, i) => (
				<a
					key={i}
				 href={project.link}
				 target="_blank"
				 rel="noreferrer"
				 className="qp-card qp-project-card"
				>
					<div className="qp-project-card-visual">
						<div className={`qp-project-icon qp-project-icon-${i + 1}`} />
					</div>
					<div className="qp-project-card-body">
						<span className="qp-project-status">STATUS: {STATUS_LABELS[i] || "DEPLOYED"}</span>
						<h3 className="qp-project-title">PROJECT: {project.title.toUpperCase().replace(/\s+/g, " ")}</h3>
						<p className="qp-project-desc">{project.description}</p>
						<span className="qp-project-link">[EXPANDED VIEW]</span>
					</div>
				</a>
			))}
		</div>
	</section>
);

export default ProjectCardsSection;
