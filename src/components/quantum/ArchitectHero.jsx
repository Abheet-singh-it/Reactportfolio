import React from "react";
import INFO from "../../data/user";

const ArchitectHero = () => (
	<section className="arch-hero" id="system">
		<div className="arch-hero-left">
			<div className="arch-hero-badge">
				<span className="arch-hero-badge-dot" />
				<span>System Online // Creative Core v4.0.2</span>
			</div>
			<h1 className="arch-hero-title">
				ABHEET <span>//</span> <br />CREATIVE <br />CORE
			</h1>
			<p className="arch-hero-desc">
				[STATUS: ACTIVE] {INFO.homepage.description}
			</p>
			<div className="arch-hero-btns">
				<a href="#archive" className="arch-btn-primary">
					Deploy_Core
					<span className="material-symbols-outlined" style={{ fontSize: 18 }}>terminal</span>
				</a>
				<a href="#protocol" className="arch-btn-outline">View_Schematics</a>
			</div>
		</div>
		<div className="arch-hero-right">
			<div className="arch-hero-viz-inner">
				<div className="arch-hero-viz-box">
					<span className="material-symbols-outlined">architecture</span>
				</div>
				<div className="arch-hero-overlay arch-hero-overlay-tl">
					COORD: 34.0522 N, 118.2437 W<br />VECTOR: [0.44, 0.82, -0.12]
				</div>
				<div className="arch-hero-overlay arch-hero-overlay-br">
					RENDER_ENGINE: WEBGL_2.0<br />SHADERS: COMPILED
				</div>
			</div>
		</div>
	</section>
);

export default ArchitectHero;
