import React from "react";
import INFO from "../../data/user";

const BARS = [
	{ label: "AI / ML Frameworks", pct: 92, tags: "MERN, REACT, NODE, PYTHON" },
	{ label: "Web Architecture", pct: 88, tags: "REACT, NODE.JS, TYPESCRIPT" },
	{ label: "Cloud & Infra", pct: 85, tags: "FULL-STACK, BACKEND, AUTOMATION" },
];

const MATRIX = ["01", "11", "00", "10", "11", "01", "00", "11", "01", "00"];

const ArchitectCore = () => (
	<section className="arch-section" id="core">
		<div className="arch-core-wrap">
			<div className="arch-core-bars">
				<h2 className="arch-section-title" style={{ marginBottom: "2rem" }}>Technical // Core</h2>
				{BARS.map((bar, i) => (
					<div key={i} className="arch-core-bar">
						<div className="arch-core-bar-header">
							<span>{bar.label}</span>
							<span>{bar.pct}% Rendering</span>
						</div>
						<div className="arch-core-bar-track">
							<div className="arch-core-bar-fill" style={{ width: `${bar.pct}%` }} />
						</div>
						<p className="arch-core-bar-tags">{bar.tags}</p>
					</div>
				))}
			</div>
			<div className="arch-core-matrix">
				<h3>Encryption & PPML Matrix</h3>
				<div className="arch-core-matrix-grid">
					{MATRIX.map((cell, i) => (
						<div
							key={i}
							className={`arch-core-matrix-cell ${i === 4 || i === 6 ? "highlight" : ""}`}
						>
							{cell}
						</div>
					))}
				</div>
				<p>
					Specializing in Full-Stack Engineering, Generative AI & Automation to build scalable systems.
				</p>
			</div>
		</div>
	</section>
);

export default ArchitectCore;
