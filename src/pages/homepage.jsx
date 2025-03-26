import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTwitter,
	faGithub,
	faStackOverflow,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import Article from "../components/homepage/article";
import Works from "../components/homepage/works";
import Cert from "../components/homepage/Certificate";
import AllProjects from "../components/projects/allProjects";

import INFO from "../data/user";
import SEO from "../data/seo";
import myArticles from "../data/articles";

import "./styles/homepage.css";

const Homepage = () => {
	const [stayLogo, setStayLogo] = useState(false);
	const [logoSize, setLogoSize] = useState(80);
	const [oldLogoSize, setOldLogoSize] = useState(80);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			let scroll = Math.round(window.pageYOffset, 2);

			let newLogoSize = 80 - (scroll * 4) / 10;

			if (newLogoSize < oldLogoSize) {
				if (newLogoSize > 40) {
					setLogoSize(newLogoSize);
					setOldLogoSize(newLogoSize);
					setStayLogo(false);
				} else {
					setStayLogo(true);
				}
			} else {
				setLogoSize(newLogoSize);
				setStayLogo(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [logoSize, oldLogoSize]);

	const currentSEO = SEO.find((item) => item.page === "home");

	const logoStyle = {
		display: "flex",
		position: stayLogo ? "fixed" : "relative",
		top: stayLogo ? "3vh" : "auto",
		zIndex: 999,
		border: stayLogo ? "1px solid white" : "none",
		borderRadius: stayLogo ? "50%" : "none",
		boxShadow: stayLogo ? "0px 4px 10px rgba(0, 0, 0, 0.25)" : "none",
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{INFO.main.title}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>
			<SpeedInsights/>
			<Analytics/>
			<div className="page-content">
				<NavBar active="home" />
				<div className="content-wrapper">
					<div className="homepage-logo-container">
						<div style={logoStyle}>
							<Logo width={logoSize} link={false} />
						</div>
					</div>

					<div className="homepage-container">
						<div className="homepage-first-area">
							<div className="homepage-first-area-left-side">
								<div className="title homepage-title">
									{INFO.homepage.title}
								</div>

								<div className="subtitle homepage-subtitle">
									{INFO.homepage.description}
								</div>
							</div>

							<div className="homepage-first-area-right-side">
								<div className="homepage-image-container">
									<div className="homepage-image-wrapper">
										<img
											src="https://media.licdn.com/dms/image/v2/D5603AQF0Bo1dWEEcRQ/profile-displayphoto-shrink_800_800/B56ZTmZGE5HsAc-/0/1739032126571?e=1748476800&v=beta&t=J3jmZ2c0ARl8WcpyqECtaLLYjMDbSEM1F958O0VMUTo"
											alt="about"
											className="homepage-image"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="homepage-socials">
							<a
								href={INFO.socials.twitter}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faTwitter}
									className="homepage-social-icon"
								/>
							</a>
							<a
								href={INFO.socials.github}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faGithub}
									className="homepage-social-icon"
								/>
							</a>
							<a
								href={INFO.socials.stackoverflow}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faStackOverflow}
									className="homepage-social-icon"
								/>
							</a>
							<a
								href={INFO.socials.instagram}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faInstagram}
									className="homepage-social-icon"
								/>
							</a>
							<a
								href={`mailto:${INFO.main.email}`}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faMailBulk}
									className="homepage-social-icon"
								/>
							</a>
						</div>

						<div className="homepage-cv-button">
							<a
								href="https://replay.dropbox.com/share/UOz8JuwdjkwKGFAl"
								target="_blank"
								rel="noopener noreferrer"
								style={{ textDecoration: 'none' }}
							>
								<button className="download-cv-btn" style={{
									background: 'yellow',
									border: 'none',
									borderRadius: '30px',
									margin: '2rem auto',
									padding: '1rem 2rem',
									color: 'purple',
									fontWeight: '600',
									fontSize: '1rem',
									cursor: 'pointer',
									letterSpacing: '1px',
									boxShadow: '0 0 13.5px yellow',
									animation: 'glow 1.5s ease-in-out infinite alternate',
									transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
									display: 'block',
									width: 'fit-content',
									position: 'relative',
									overflow: 'hidden',
									justifyContent:'center',
									textAlign: 'center'
								}}
								onMouseEnter={(e) => {
									e.target.style.transform = 'translateY(-3px)';
									e.target.style.boxShadow = '0 0 18.5px yellow';
									e.target.style.background = '#ffff00';
								}}
								onMouseLeave={(e) => {
									e.target.style.transform = 'translateY(0)';
									e.target.style.boxShadow = '0 0 13.5px yellow';
									e.target.style.background = 'yellow';
								}}
								>
									<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
										<i className="fas fa-download" style={{ marginRight: '-11.3px' }}></i><center>Download CV</center>
									</span>
								</button>
							</a>
						</div>
						<div className="homepage-projects">
							<AllProjects />
						</div>

						<div className="homepage-after-title">
							<div className="homepage-articles">
								{myArticles.map((article, index) => (
									<div
										className="homepage-article"
										key={(index + 1).toString()}
									>
										<Article
											key={(index + 1).toString()}
											date={article().date}
											title={article().title}
											description={article().description}
											link={"/article/" + (index + 1)}
										/>
									</div>
								))}
							</div>

						
							<div className="homepage-works">
								<Works />
							</div>
						</div>
						<div className="homepage-projects">
								<Cert />
							</div>
						<div className="page-footer">
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Homepage;
