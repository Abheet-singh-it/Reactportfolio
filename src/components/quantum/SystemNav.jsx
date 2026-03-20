import React, { useState } from "react";
import { Link } from "react-router-dom";
import INFO from "../../data/user";

const SystemNav = () => {
	const [open, setOpen] = useState(false);

	const scrollTo = (id) => {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: "smooth" });
		setOpen(false);
	};

	const { linkedin, instagram, github } = INFO.socials || {};

	return (
		<header className="qp-nav">
			<button
				type="button"
				className="qp-nav-menu-btn"
				onClick={() => setOpen(!open)}
				aria-expanded={open}
				aria-label="System menu"
			>
				<span className="qp-nav-menu-label">SYSTEM MENU</span>
				<svg className="qp-nav-hamburger" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
				</svg>
			</button>
			<nav className={`qp-nav-dropdown ${open ? "qp-nav-dropdown-open" : ""}`} aria-hidden={!open}>
				<button type="button" onClick={() => scrollTo("hero")}>Core</button>
				<button type="button" onClick={() => scrollTo("projects")}>Neural_Net</button>
				<button type="button" onClick={() => scrollTo("vault")}>Vault</button>
				<Link to="/contact" onClick={() => setOpen(false)}>Connect</Link>
				{linkedin && (
					<a href={linkedin} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>LinkedIn</a>
				)}
				{instagram && (
					<a href={instagram} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Instagram</a>
				)}
				{github && (
					<a href={github} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>GitHub</a>
				)}
			</nav>
		</header>
	);
};

export default SystemNav;
