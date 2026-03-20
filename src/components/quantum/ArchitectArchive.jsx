import React from "react";
import INFO from "../../data/user";

const PROJECT_IDS = ["CODE_BRAIN_00", "AI_NPC_01", "PVP_BOT_02", "RANKED_03"];
const STATUS_COLORS = { DEPLOYED: "#22c55e", ACTIVE: "#5eead4", ALPHA: "#f59e0b" };
const ICONS = ["psychology", "smart_toy", "cloud_sync", "leaderboard"];

const ArchitectArchive = () => (
	<section className="arch-section" id="archive">
		<div className="arch-archive-header">
			<div>
				<h2 className="arch-section-title">Project // Archive</h2>
				<p className="arch-section-subtitle">Deployed Systems & Neural Architectures</p>
			</div>
			<span className="arch-archive-badge">
				<span className="arch-archive-badge-dot" aria-hidden="true" />
				{INFO.projects.length} PROJECTS
			</span>
		</div>
		<div className="arch-projects-grid">
			{INFO.projects.slice(0, 4).map((project, i) => (
				<a
					key={i}
					href={project.link}
					target="_blank"
					rel="noopener noreferrer"
					className="arch-project-card"
					aria-label={`View ${project.title} project`}
				>
					<div className="arch-project-id">ID: {PROJECT_IDS[i] || `PROJ_${String(i).padStart(2, "0")}`}</div>
					<div className="arch-project-icon">
						<span className="material-symbols-outlined" aria-hidden="true">{ICONS[i] || "code"}</span>
					</div>
					<h3>{project.title}</h3>
					<p>{project.description}</p>
					<div className="arch-project-meta">
						<span>FULL-STACK // AI</span>
						<span className="arch-project-status" style={{ "--status-color": STATUS_COLORS[project.status] || "#5eead4" }}>
							<span className="arch-project-status-dot" aria-hidden="true" />
							{project.status || "ACTIVE"}
						</span>
					</div>
					<div className="arch-project-divider" />
					<div className="arch-project-tags">
						{(project.tags || []).map((tag, j) => (
							<span key={j} className="arch-project-tag">{tag}</span>
						))}
					</div>
					<div className="arch-project-arrow" aria-hidden="true">
						<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path d="M7 17L17 7M17 7H7M17 7v10" />
						</svg>
					</div>
				</a>
			))}
		</div>
	</section>
);

export default ArchitectArchive;
