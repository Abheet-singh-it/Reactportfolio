import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CustomCursor from "../components/chief/CustomCursor";
import ChiefLanding from "../components/chief/ChiefLanding";
import ArchitectNav from "../components/quantum/ArchitectNav";
import ArchitectStats from "../components/quantum/ArchitectStats";
import ArchitectArchive from "../components/quantum/ArchitectArchive";
import ArchitectChronology from "../components/quantum/ArchitectChronology";
import ArchitectCore from "../components/quantum/ArchitectCore";
import BuildLogSection from "../components/chief/BuildLogSection";
import ArchitectProtocol from "../components/quantum/ArchitectProtocol";
import ArchitectFooter from "../components/quantum/ArchitectFooter";

import { useSmoothScroll } from "../hooks/useSmoothScroll";
import SEO from "../data/seo";

import "../styles/chief-theme.css";
import "../styles/architect-portfolio.css";

gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
	useSmoothScroll(true);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const sections = [".arch-stats", ".arch-archive-header", ".arch-chronology", ".arch-core-wrap", ".buildlog-section", ".arch-protocol"];
		sections.forEach((sel) => {
			const el = document.querySelector(sel);
			if (!el) return;
			gsap.fromTo(el, { opacity: 0, y: 50 }, {
				opacity: 1,
				y: 0,
				duration: 0.9,
				ease: "power3.out",
				scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
			});
		});
		return () => ScrollTrigger.getAll().forEach((t) => t.kill());
	}, []);

	const currentSEO = SEO.find((item) => item.page === "home");

	return (
		<>
			<Helmet>
				<title>Abheet Singh // Chief Frontend Engineer · AI & Gaming UI</title>
				<meta name="description" content={currentSEO.description} />
				<meta name="keywords" content={currentSEO.keywords.join(", ")} />
			</Helmet>
			<SpeedInsights />
			<Analytics />
			<div className="arch-root chief-root">
				<div className="chief-glow-orb chief-glow-orb--tl" aria-hidden="true" />
				<div className="chief-glow-orb chief-glow-orb--br2" aria-hidden="true" />
				<ArchitectNav />
				<main>
					<ChiefLanding />
					<ArchitectStats />
					<ArchitectArchive />
					<ArchitectChronology />
					<ArchitectCore />
					<BuildLogSection />
					<ArchitectProtocol />
				</main>
				<ArchitectFooter />
			</div>
		</>
	);
};

export default Homepage;
