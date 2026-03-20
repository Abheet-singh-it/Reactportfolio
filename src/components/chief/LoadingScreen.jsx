import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useLoading } from "../../context/LoadingContext";
import "./LoadingScreen.css";

export default function LoadingScreen() {
	const { setIsLoading, percent, setPercent } = useLoading();
	const [loaded, setLoaded] = useState(false);
	const [clicked, setClicked] = useState(false);

	// Simulate loading progress
	useEffect(() => {
		let p = 0;
		const t = setInterval(() => {
			if (p < 90) {
				p += Math.round(Math.random() * 6) + 2;
				if (p > 90) p = 90;
				setPercent(p);
			}
		}, 120);
		return () => clearInterval(t);
	}, [setPercent]);

	useEffect(() => {
		if (percent >= 90) {
			const id = setTimeout(() => setLoaded(true), 400);
			return () => clearTimeout(id);
		}
	}, [percent]);

	const handleEnter = () => {
		if (!loaded) return;
		setClicked(true);
		gsap.to(document.body, { backgroundColor: "#0a0e17", duration: 0.5, delay: 0.2 });
		setTimeout(() => {
			setIsLoading(false);
		}, 900);
	};

	const handleMouseMove = (e) => {
		const t = e.currentTarget;
		const rect = t.getBoundingClientRect();
		t.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
		t.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
	};

	return (
		<div className="chief-loading-wrap">
			<div className="chief-loading-header">
				<span className="chief-loading-logo" data-cursor="disable">AS</span>
			</div>
			<div className="chief-loading-marquee">
				<div className="chief-loading-marquee-inner">
					<span>Full Stack Engineer</span>
					<span>Generative AI</span>
					<span>Full Stack Engineer</span>
					<span>Generative AI</span>
				</div>
			</div>
			<div
				className={`chief-loading-pill-wrap ${clicked ? "chief-loading-clicked" : ""}`}
				onMouseMove={handleMouseMove}
			>
				<div className="chief-loading-hover" />
				<button
					type="button"
					className={`chief-loading-pill ${loaded ? "chief-loading-ready" : ""}`}
					onClick={handleEnter}
					disabled={!loaded}
					aria-label="Enter site"
				>
					<div className="chief-loading-pill-inner">
						<div className="chief-loading-label">
							{loaded ? "Enter" : "Loading"}
							<span className="chief-loading-pct">{loaded ? "" : ` ${percent}%`}</span>
						</div>
					</div>
					<div className="chief-loading-cursor" />
				</button>
			</div>
		</div>
	);
}
