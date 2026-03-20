import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import ArchitectNav from "../components/quantum/ArchitectNav";
import ArchitectFooter from "../components/quantum/ArchitectFooter";
import Logo from "../components/common/logo";
import Socials from "../components/about/socials";

import INFO from "../data/user";
import SEO from "../data/seo";

import "../styles/chief-theme.css";
import "./styles/contact.css";

const Contact = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [formData, setFormData] = useState({ name: "", email: "", message: "" });

	const currentSEO = SEO.find((item) => item.page === "contact");

	const handleSubmit = (e) => {
		e.preventDefault();
		window.location.href = `mailto:${INFO.main.email}?subject=Contact from Portfolio&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
	};

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Contact | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<ArchitectNav />
				<div className="content-wrapper">
					<div className="contact-logo-container">
						<div className="contact-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="contact-container">
						<div className="title contact-title">
							Let's Get in Touch: Ways to Connect with Me
						</div>

						<div className="subtitle contact-subtitle">
							Thank you for your interest in getting in touch with
							me. I welcome your feedback, questions, and
							suggestions. If you have a specific question or
							comment, please feel free to email me directly at
							&nbsp;{" "}
							<a href={`mailto:${INFO.main.email}`}>
								{INFO.main.email}
							</a>
							. I make an effort to respond to all messages within
							24 hours, although it may take me longer during busy
							periods. Alternatively, you can use the contact form
							below to get in touch. Finally, if you prefer to connect on
							social media, you can find me on the links below.
							Thanks again for your interest, and I look forward
							to hearing from you!
						</div>
					</div>

					<div className="contact-terminal glass-card">
						<div className="contact-terminal-header">
							<div className="contact-terminal-dots">
								<span className="dot dot-rose" />
								<span className="dot dot-amber" />
								<span className="dot dot-green" />
							</div>
							<span className="contact-terminal-label">root@abheet-singh:~/contact_portal</span>
						</div>
						<div className="contact-terminal-body">
							<div className="contact-terminal-info">
								<h2 className="contact-terminal-title">Initiate Protocol</h2>
								<p className="contact-terminal-desc">
									Open to collaborations in AI, Web3, and Game Design.
									Drop a transmission below to establish link.
								</p>
								<div className="contact-terminal-links">
									<a href={INFO.socials.github} target="_blank" rel="noreferrer">[GIT] github.com/Abheet-singh-it</a>
									<a href={INFO.socials.linkedin} target="_blank" rel="noreferrer">[LNK] LinkedIn</a>
									<a href={INFO.socials.instagram} target="_blank" rel="noreferrer">[IG] Instagram</a>
									<a href={`mailto:${INFO.main.email}`}>[EML] {INFO.main.email}</a>
								</div>
							</div>
							<form className="contact-terminal-form" onSubmit={handleSubmit}>
								<div>
									<label className="quantum-label" htmlFor="name">User_Identity</label>
									<input className="quantum-input" id="name" name="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleChange} />
								</div>
								<div>
									<label className="quantum-label" htmlFor="email">Comm_Link</label>
									<input className="quantum-input" id="email" name="email" type="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} required />
								</div>
								<div>
									<label className="quantum-label" htmlFor="message">Message_Packet</label>
									<textarea className="quantum-input" id="message" name="message" rows={4} placeholder="Brief project overview..." value={formData.message} onChange={handleChange} />
								</div>
								<button type="submit" className="quantum-btn-primary contact-submit-btn">Execute_Transfer</button>
							</form>
						</div>
					</div>

					<div className="socials-container">
						<div className="contact-socials">
							<Socials />
						</div>
					</div>

					<div className="page-footer">
						<ArchitectFooter />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Contact;
