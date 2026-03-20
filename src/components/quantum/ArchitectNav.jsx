import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import INFO from "../../data/user";
import "./ArchitectNav.css";

const NavLink = ({ to, children, active, onClick }) => (
	<Link to={to} className={`chief-nav-link ${active ? "chief-nav-link--active" : ""}`} data-cursor="icons" onClick={onClick}>
		<span className="chief-nav-link-inner">
			<span className="chief-nav-link-text">{children}</span>
			<span className="chief-nav-link-text chief-nav-link-text--hover" aria-hidden="true">{children}</span>
		</span>
	</Link>
);

const SectionLink = ({ sectionId, children, active, onClick }) => (
	<button
		className={`chief-nav-link chief-nav-section-link ${active ? "chief-nav-link--active" : ""}`}
		data-cursor="icons"
		onClick={() => onClick(sectionId)}
		type="button"
	>
		<span className="chief-nav-link-inner">
			<span className="chief-nav-link-text">{children}</span>
			<span className="chief-nav-link-text chief-nav-link-text--hover" aria-hidden="true">{children}</span>
		</span>
	</button>
);

const ArchitectNav = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState("");
	const isHome = location.pathname === "/";

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Track active section on homepage
	useEffect(() => {
		if (!isHome) return;
		const sections = ["landing", "archive", "core", "protocol"];
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
		);

		sections.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, [isHome]);

	useEffect(() => {
		setMenuOpen(false);
	}, [location]);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => { document.body.style.overflow = ""; };
	}, [menuOpen]);

	const scrollToSection = useCallback((sectionId) => {
		setMenuOpen(false);
		if (isHome) {
			const el = document.getElementById(sectionId);
			if (el) {
				el.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		} else {
			navigate("/", { state: { scrollTo: sectionId } });
		}
	}, [isHome, navigate]);

	return (
		<header className={`chief-header ${scrolled ? "chief-header--scrolled" : ""}`}>
			<div className="chief-header-inner">
				<Link to="/" className="chief-header-logo" data-cursor="disable" aria-label="Home">
					AS
				</Link>
				<a
					href={`mailto:${INFO.main?.email || ""}`}
					className="chief-header-email"
					data-cursor="icons"
					aria-label={`Email ${INFO.main?.email}`}
				>
					{INFO.main?.email || "Contact"}
				</a>
				<nav className="chief-nav" aria-label="Main navigation">
					<NavLink to="/about" active={location.pathname === "/about"}>About</NavLink>
					{isHome ? (
						<>
							<SectionLink sectionId="archive" active={activeSection === "archive"} onClick={scrollToSection}>Work</SectionLink>
							<SectionLink sectionId="core" active={activeSection === "core"} onClick={scrollToSection}>Stack</SectionLink>
							<SectionLink sectionId="protocol" active={activeSection === "protocol"} onClick={scrollToSection}>Contact</SectionLink>
						</>
					) : (
						<>
							<NavLink to="/projects" active={location.pathname === "/projects"}>Work</NavLink>
							<NavLink to="/" active={false}>Stack</NavLink>
							<NavLink to="/contact" active={location.pathname === "/contact"}>Contact</NavLink>
						</>
					)}
				</nav>
				<Link to="/contact" className="chief-header-cta" data-cursor="disable">
					Let&apos;s Talk
				</Link>
				<button
					className={`chief-hamburger ${menuOpen ? "chief-hamburger--open" : ""}`}
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label={menuOpen ? "Close menu" : "Open menu"}
					aria-expanded={menuOpen}
				>
					<span />
					<span />
					<span />
				</button>
			</div>
			{/* Mobile menu */}
			<div className={`chief-mobile-menu ${menuOpen ? "chief-mobile-menu--open" : ""}`}>
				<nav className="chief-mobile-nav" aria-label="Mobile navigation">
					<NavLink to="/about" active={location.pathname === "/about"} onClick={() => setMenuOpen(false)}>About</NavLink>
					{isHome ? (
						<>
							<SectionLink sectionId="archive" active={activeSection === "archive"} onClick={scrollToSection}>Work</SectionLink>
							<SectionLink sectionId="core" active={activeSection === "core"} onClick={scrollToSection}>Stack</SectionLink>
							<SectionLink sectionId="protocol" active={activeSection === "protocol"} onClick={scrollToSection}>Contact</SectionLink>
						</>
					) : (
						<>
							<NavLink to="/projects" active={location.pathname === "/projects"} onClick={() => setMenuOpen(false)}>Work</NavLink>
							<NavLink to="/contact" active={location.pathname === "/contact"} onClick={() => setMenuOpen(false)}>Contact</NavLink>
						</>
					)}
					<Link to="/contact" className="chief-btn-primary chief-mobile-cta" onClick={() => setMenuOpen(false)}>
						Let&apos;s Talk
					</Link>
				</nav>
			</div>
			<div className="chief-nav-fade" aria-hidden="true" />
		</header>
	);
};

export default ArchitectNav;
