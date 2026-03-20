import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate, stagger } from "animejs";
import INFO from "../../data/user";
import Hero3D from "./Hero3D";
import "./ChiefLanding.css";

gsap.registerPlugin(ScrollTrigger);

export default function ChiefLanding() {
	const sectionRef = useRef(null);
	const leftRef = useRef(null);
	const titleRef = useRef(null);
	const roleRef = useRef(null);
	const descRef = useRef(null);
	const btnsRef = useRef(null);
	const rightRef = useRef(null);
	const badgeRef = useRef(null);

	useEffect(() => {
		const section = sectionRef.current;
		const left = leftRef.current;
		if (!section || !left) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				badgeRef.current,
				{ opacity: 0, y: 20, scale: 0.95 },
				{ opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.2, ease: "power2.out" }
			);
			gsap.fromTo(
				titleRef.current?.querySelectorAll(".chief-landing-title span"),
				{ opacity: 0, y: 50 },
				{ opacity: 1, y: 0, duration: 0.9, stagger: 0.06, delay: 0.4, ease: "power3.out" }
			);
			gsap.fromTo(
				descRef.current,
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.8, delay: 0.9 }
			);
			gsap.fromTo(
				btnsRef.current?.children,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 1.1 }
			);
			gsap.fromTo(
				rightRef.current,
				{ opacity: 0, scale: 0.98 },
				{ opacity: 1, scale: 1, duration: 1.2, delay: 0.3, ease: "power2.out" }
			);
		}, section);

		// Anime.js: role line character stagger (blur-in)
		const roleEl = roleRef.current;
		if (roleEl) {
			const text = roleEl.textContent || "";
			roleEl.textContent = "";
			roleEl.style.display = "inline";
			text.split("").forEach((char) => {
				const span = document.createElement("span");
				span.className = "chief-role-char";
				span.textContent = char;
				span.style.display = "inline-block";
				roleEl.appendChild(span);
			});
			const chars = roleEl.querySelectorAll(".chief-role-char");
			animate(chars, {
				opacity: [0, 1],
				translateY: [12, 0],
				filter: ["blur(6px)", "blur(0px)"],
				duration: 600,
				delay: stagger(25, { start: 0.5 }),
				ease: "outQuad",
			});
		}

		// Anime.js: badge subtle pulse loop
		if (badgeRef.current) {
			animate(badgeRef.current, {
				scale: [1, 1.03, 1],
				opacity: [1, 0.92, 1],
				duration: 2500,
				ease: "inOutSine",
				loop: true,
				delay: 1500,
			});
		}

		return () => ctx.revert();
	}, []);

	const name = INFO?.main?.name || "Abheet Singh";
	const intro = "Hello, I'm";
	const role = "Chief Frontend Engineer · AI & Gaming UI";
	const desc = INFO?.homepage?.description || "Building product-based AIGC solutions.";

	return (
		<section className="chief-landing" id="landing" ref={sectionRef}>
			<div className="chief-landing-container">
				<div className="chief-landing-left" ref={leftRef}>
					<p className="chief-landing-intro">{intro}</p>
					<div className="chief-landing-badge" ref={badgeRef}>
						<span className="chief-landing-badge-dot" />
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
					<Hero3D />
				</div>
			</div>
			<div className="chief-landing-gradient" aria-hidden="true" />
		</section>
	);
}
