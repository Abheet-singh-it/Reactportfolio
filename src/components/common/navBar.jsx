import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./styles/navBar.css";

const NavBar = (props) => {
	const { active } = props;
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<React.Fragment>
			<nav className="nav-quantum glass-card">
				<div className="nav-quantum-inner">
					<Link to="/" className="nav-quantum-brand">
						<div className="nav-quantum-orb" />
						<span className="nav-quantum-version">Abheet_v1.0</span>
					</Link>
					<div className={`nav-quantum-links ${mobileOpen ? "open" : ""}`}>
						<Link to="/" className={active === "home" ? "nav-quantum-item active" : "nav-quantum-item"}>Core</Link>
						<Link to="/about" className={active === "about" ? "nav-quantum-item active" : "nav-quantum-item"}>About</Link>
						<Link to="/projects" className={active === "projects" ? "nav-quantum-item active" : "nav-quantum-item"}>Neural_Net</Link>
						<Link to="/articles" className={active === "articles" ? "nav-quantum-item active" : "nav-quantum-item"}>Logs</Link>
						<Link to="/contact" className={active === "contact" ? "nav-quantum-item nav-quantum-cta active" : "nav-quantum-item nav-quantum-cta"}>Connect</Link>
					</div>
					<button type="button" className="nav-quantum-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
						<svg className="nav-quantum-mobile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
						</svg>
					</button>
				</div>
			</nav>
		</React.Fragment>
	);
};

export default NavBar;
