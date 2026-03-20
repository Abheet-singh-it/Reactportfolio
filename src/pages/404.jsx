import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import ArchitectNav from "../components/quantum/ArchitectNav";
import ArchitectFooter from "../components/quantum/ArchitectFooter";
import Logo from "../components/common/logo";
import INFO from "../data/user";

import "../styles/chief-theme.css";
import "./styles/404.css";

const Notfound = () => {
	const containerRef = useRef(null);

	useEffect(() => {
		document.title = `404 | ${INFO.main.title}`;
	}, []);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(".notfound-code", { opacity: 0, scale: 0.8, filter: "blur(10px)" }, {
				opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out",
			});
			gsap.fromTo(".not-found-message", { opacity: 0, y: 20 }, {
				opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out",
			});
			gsap.fromTo(".not-found-link", { opacity: 0, y: 20 }, {
				opacity: 1, y: 0, duration: 0.5, delay: 0.5, ease: "power2.out",
			});
		}, container);

		return () => ctx.revert();
	}, []);

	return (
		<React.Fragment>
			<div className="not-found page-content chief-page" ref={containerRef}>
				<ArchitectNav />
				<div className="content-wrapper chief-content-wrapper">
					<div className="notfound-logo-container">
						<div className="projects-logo">
							<Logo width={46} />
						</div>
					</div>
					<main id="main-content" className="notfound-container">
						<div className="notfound-message">
							<div className="notfound-code">404</div>
							<div className="notfound-title">
								Page Not Found
							</div>
							<div className="not-found-message">
								The page you're looking for doesn't exist or has been moved.
							</div>
							<Link to="/" className="chief-btn-primary not-found-link">
								Back to Home
							</Link>
						</div>
					</main>
				</div>
				<div className="page-footer">
					<ArchitectFooter />
				</div>
			</div>
		</React.Fragment>
	);
};

export default Notfound;
