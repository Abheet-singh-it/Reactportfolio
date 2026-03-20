import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import INFO from "../../data/user";
import "./styles/socials.css";

const Socials = () => {
	return (
		<div className="socials">
			<div className="social">
				<a href={INFO.socials.github} target="_blank" rel="noopener noreferrer" aria-label="Follow on GitHub">
					<div className="social-icon">
						<FontAwesomeIcon icon={faGithub} className="social-icon" aria-hidden="true" />
					</div>
					<div className="social-text">Follow on GitHub</div>
				</a>
			</div>
			<div className="social">
				<a href={INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Follow on LinkedIn">
					<div className="social-icon">
						<FontAwesomeIcon icon={faLinkedin} className="social-icon" aria-hidden="true" />
					</div>
					<div className="social-text">Follow on LinkedIn</div>
				</a>
			</div>
			<div className="social">
				<a href={INFO.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow on Instagram">
					<div className="social-icon">
						<FontAwesomeIcon icon={faInstagram} className="social-icon" aria-hidden="true" />
					</div>
					<div className="social-text">Follow on Instagram</div>
				</a>
			</div>
			<div className="email">
				<div className="email-wrapper">
					<a href={`mailto:${INFO.main.email}`} aria-label={`Send email to ${INFO.main.email}`}>
						<div className="social-icon">
							<FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
						</div>
						<div className="social-text">{INFO.main.email}</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Socials;
