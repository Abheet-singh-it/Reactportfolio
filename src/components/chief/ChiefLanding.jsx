import React, { useRef, useEffect, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import INFO from "../../data/user";
import "./ChiefLanding.css";

// Lazy load Three.js hero
const Hero3D = lazy(() => import("./Hero3D"));

// CSS fallback for mobile/no-WebGL
function HeroFallback() {
	return (
		<div className="chief-hero-fallback" aria-hidden="true">
			<div className="chief-hero-fallback-shape chief-hero-fallback-shape--1" />
			<div className="chief-hero-fallback-shape chief-hero-fallback-shape--2" />
			<div className="chief-hero-fallback-shape chief-hero-fallback-shape--3" />
			<div className="chief-hero-fallback-glow" />
		</div>
	);
}

function canRunWebGL() {
	try {
		const canvas = document.createElement("canvas");
		return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
	} catch {
		return false;
	}
}

export default function ChiefLanding() {
	const sectionRef = useRef(null);
	const titleRef = useRef(null);
	const roleRef = useRef(null);
	const descRef = useRef(null);
	const btnsRef = useRef(null);
	const rightRef = useRef(null);
	const badgeRef = useRef(null);

	const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
	const hasWebGL = typeof window !== "undefined" && canRunWebGL();
	const show3D = isDesktop && hasWebGL;

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const ctx = gsap.context(() => {
			// Badge entrance
			gsap.fromTo(
				badgeRef.current,
				{ opacity: 0, y: 20, scale: 0.95 },
				{ opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.2, ease: "power2.out" }
			);

			// Badge subtle pulse (replaces Anime.js loop)
			gsap.to(badgeRef.current, {
				scale: 1.03,
				opacity: 0.92,
				duration: 1.25,
				yoyo: true,
				repeat: -1,
				ease: "sine.inOut",
				delay: 2,
			});

			// Title word stagger
			const titleWords = titleRef.current?.querySelectorAll(".chief-landing-title span");
			if (titleWords?.length) {
				gsap.fromTo(
					titleWords,
					{ opacity: 0, y: 50 },
					{ opacity: 1, y: 0, duration: 0.9, stagger: 0.06, delay: 0.4, ease: "power3.out" }
				);
			}

			// Role text character blur-in (replaces Anime.js)
			const roleEl = roleRef.current;
			if (roleEl) {
				const text = roleEl.textContent || "";
				roleEl.textContent = "";
				roleEl.style.display = "inline";
				text.split("").forEach((char) => {
					const span = document.createElement("span");
					span.className = "chief-role-char";
					span.textContent = char === " " ? "\u00A0" : char;
					span.style.display = "inline-block";
					span.style.opacity = "0";
					roleEl.appendChild(span);
				});
				const chars = roleEl.querySelectorAll(".chief-role-char");
				gsap.fromTo(
					chars,
					{ opacity: 0, y: 12, filter: "blur(6px)" },
					{
						opacity: 1,
						y: 0,
						filter: "blur(0px)",
						duration: 0.5,
						stagger: 0.02,
						delay: 0.6,
						ease: "power2.out",
					}
				);
			}

			// Description
			gsap.fromTo(
				descRef.current,
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.8, delay: 1.0, ease: "power2.out" }
			);

			// CTA buttons
			if (btnsRef.current?.children) {
				gsap.fromTo(
					btnsRef.current.children,
					{ opacity: 0, y: 20 },
					{ opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 1.2, ease: "power2.out" }
				);
			}

			// Right side (3D / fallback)
			gsap.fromTo(
				rightRef.current,
				{ opacity: 0, scale: 0.95 },
				{ opacity: 1, scale: 1, duration: 1.2, delay: 0.3, ease: "power2.out" }
			);
		}, section);

		return () => ctx.revert();
	}, []);

	const name = INFO?.main?.name || "Abheet Singh";
	const intro = INFO?.main?.intro || "Hello, I'm";
	const role = INFO?.main?.role || "Chief Frontend Engineer · AI & Gaming UI";
	const desc = INFO?.main?.tagline || INFO?.homepage?.description || "Building product-based AIGC solutions.";

	return (
		<section className="chief-landing" id="landing" ref={sectionRef}>
			<div className="chief-landing-container">
				<div className="chief-landing-left">
					<p className="chief-landing-intro">{intro}</p>
					<div className="chief-landing-badge" ref={badgeRef}>
						<span className="chief-landing-badge-dot" aria-hidden="true" />
						<span>Available for work</span>
					</div>
					<h1 className="chief-landing-title" ref={titleRef}>
						{name.split(" ").map((word, i) => (
							<span key={i}>{word} </span>
						))}
					</h1>
					<p className="chief-landing-role" ref={roleRef}>{role}</p>
					<p className="chief-landing-desc" ref={descRef}>
						{desc}
					</p>
					<div className="chief-landing-btns" ref={btnsRef}>
						<Link to="/projects" className="chief-btn-primary" data-cursor="icons">
							View Work
						</Link>
						<Link to="/contact" className="chief-btn-outline" data-cursor="icons">
							Contact
						</Link>
					</div>
				</div>
				<div className="chief-landing-right" ref={rightRef}>
					{show3D ? (
						<Suspense fallback={<HeroFallback />}>
							<Hero3D />
						</Suspense>
					) : (
						<HeroFallback />
					)}
				</div>
			</div>
			<div className="chief-landing-gradient" aria-hidden="true" />
		</section>
	);
}
