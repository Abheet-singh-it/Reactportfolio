import React from "react";
import { Link } from "react-router-dom";

import "./styles/footer.css";

const Footer = () => {
	return (
		<React.Fragment>
			<footer className="footer-quantum">
				<div className="footer-quantum-links">
					<ul className="footer-quantum-nav">
						<li><Link to="/">Home</Link></li>
						<li><Link to="/about">About</Link></li>
						<li><Link to="/projects">Projects</Link></li>
						<li><Link to="/articles">Articles</Link></li>
						<li><Link to="/contact">Contact</Link></li>
					</ul>
				</div>
				<div className="footer-quantum-credits">
					© {new Date().getFullYear()} Abheet Singh. All Rights Reserved.
				</div>
			</footer>
		</React.Fragment>
	);
};

export default Footer;
