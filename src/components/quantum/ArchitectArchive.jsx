import React from "react";
import INFO from "../../data/user";

const PROJECT_IDS = ["CODE_BRAIN_00", "AI_NPC_01", "PVP_BOT_02", "RANKED_03"];
const STATUSES = ["DEPLOYED", "DEPLOYED", "ACTIVE", "ALPHA"];
const TAGS = [
	["NODE", "MCP"],
	["PYTHON", "REACT"],
	["JAVASCRIPT", "NODE"],
	["REACT", "NODE"]
];
const ICONS = ["psychology", "smart_toy", "cloud_sync", "leaderboard"];

const ArchitectArchive = () => (
	<section className="arch-section" id="archive">
		<div className="arch-archive-header">
			<div>
				<h2 className="arch-section-title">Project // Archive</h2>
				<p className="arch-section-subtitle">Architectural Blueprints of Neural Systems</p>
			</div>
			<span className="arch-archive-badge">TOTAL_RECORDS: {INFO.projects.length}</span>
		</div>
		<div className="arch-projects-grid">
			{INFO.projects.slice(0, 3).map((project, i) => (
				<a
					key={i}
					href={project.link}
					target="_blank"
					rel="noreferrer"
					className="arch-project-card"
				>
					<div className="arch-project-id">ID: {PROJECT_IDS[i]}</div>
					<div className="arch-project-icon">
						<span className="material-symbols-outlined">{ICONS[i]}</span>
					</div>
					<h3>{project.title.replace(/\s+/g, " ")}</h3>
					<p>{project.description}</p>
					<div className="arch-project-meta">
						<span>FULL-STACK // AI</span>
						<span>STATUS: {STATUSES[i]}</span>
					</div>
					<div className="arch-project-divider" />
					<div className="arch-project-tags">
						{TAGS[i].map((tag, j) => (
							<span key={j} className="arch-project-tag">{tag}</span>
						))}
					</div>
				</a>
			))}
		</div>
	</section>
);

export default ArchitectArchive;
