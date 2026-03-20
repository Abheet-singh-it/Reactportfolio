import React from "react";
import INFO from "../../data/user";

const HeroSection = () => (
	<section className="qp-hero" id="hero">
		<div className="qp-hero-bg">
			<div className="qp-hero-glow qp-hero-glow-1" />
			<div className="qp-hero-glow qp-hero-glow-2" />
			<div className="qp-hero-stars" aria-hidden="true" />
		</div>
		<div className="qp-hero-hud">
			<div className="qp-hud-line">SYSTEM_LOAD</div>
			<div className="qp-hud-line">CORE_TEMP</div>
			<div className="qp-hud-line">LATENCY</div>
			<div className="qp-hud-line">ACTIVE_NODES</div>
			<div className="qp-hud-line">STATUS: OPTIMIZED</div>
		</div>
		<div className="qp-hero-content qp-hero-content-top">
			<h1 className="qp-hero-title">QUANTUM CORE ACTIVATED</h1>
			<p className="qp-hero-subtitle">
				Initiating personal creative engine. Explore 2026 portfolio. Version 4.1.2.
			</p>
		</div>
		<div className="qp-hero-viz-wrap">
			<div className="qp-hero-glass qp-hero-glass-left" />
			<div className="qp-hero-glass qp-hero-glass-left-2" />
			<div className="qp-hero-viz">
				<div className="qp-orb-outer qp-orb-ring-1" />
				<div className="qp-orb-outer qp-orb-ring-2" />
				<div className="qp-orb-glow" />
				<div className="qp-orb-core">
					<div className="qp-orb-inner" />
				</div>
			</div>
			<div className="qp-hero-glass qp-hero-glass-right" />
			<div className="qp-hero-glass qp-hero-glass-right-2" />
		</div>
	</section>
);

export default HeroSection;
