import React from "react";
import { Link, useLocation } from "react-router-dom";
import INFO from "../../data/user";
import "./ArchitectNav.css";

const NavLink = ({ to, children, active }) => (
	<Link to={to} className={`chief-nav-link ${active ? "chief-nav-link--active" : ""}`} data-cursor="icons">
		<span className="chief-nav-link-inner">
			<span className="chief-nav-link-text">{children}</span>
			<span className="chief-nav-link-text chief-nav-link-text--hover" aria-hidden="true">{children}</span>
		</span>
	</Link>
);

const ArchitectNav = () => {
	const location = useLocation();

	return (
		<header className="chief-header">
			<div className="chief-header-inner">
				<Link to="/" className="chief-header-logo" data-cursor="disable">
					AS
				</Link>
				<a
					href={`mailto:${INFO.main?.email || ""}`}
					className="chief-header-email"
					data-cursor="icons"
				>
					{INFO.main?.email || "Contact"}
				</a>
				<nav className="chief-nav">
					<NavLink to="/about" active={location.pathname === "/about"}>About</NavLink>
					<NavLink to="/projects" active={location.pathname === "/projects"}>Work</NavLink>
					<NavLink to="/" active={location.pathname === "/"}>Stack</NavLink>
					<NavLink to="/contact" active={location.pathname === "/contact"}>Contact</NavLink>
				</nav>
				<Link to="/contact" className="chief-header-cta" data-cursor="disable">
					Let&apos;s Talk
				</Link>
			</div>
			<div className="chief-nav-fade" aria-hidden="true" />
		</header>
	);
};

export default ArchitectNav;
