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
	const [errors, setErrors] = useState({});

	const currentSEO = SEO.find((item) => item.page === "contact");

	const validate = () => {
		const errs = {};
		if (!formData.name.trim()) errs.name = "Name is required";
		if (!formData.email.trim()) errs.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Invalid email";
		if (!formData.message.trim()) errs.message = "Message is required";
		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errs = validate();
		setErrors(errs);
		if (Object.keys(errs).length > 0) return;
		window.location.href = `mailto:${INFO.main.email}?subject=Contact from Portfolio&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{currentSEO?.title || `Contact | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta name="keywords" content={currentSEO.keywords.join(", ")} />
			</Helmet>

			<div className="page-content chief-page">
				<ArchitectNav />
				<div className="content-wrapper chief-content-wrapper">
					<div className="contact-logo-container">
						<div className="contact-logo">
							<Logo width={46} />
						</div>
					</div>

					<main id="main-content" className="contact-container">
						<h1 className="title contact-title">
							Let's Get in Touch
						</h1>
						<p className="subtitle contact-subtitle">
							Open to collaborations in AI, Web3, and Game Design.
							Feel free to email me directly at{" "}
							<a href={`mailto:${INFO.main.email}`}>{INFO.main.email}</a>.
						</p>
					</main>

					<div className="contact-terminal glass-card">
						<div className="contact-terminal-header">
							<div className="contact-terminal-dots" aria-hidden="true">
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
									Drop a transmission below to establish link.
								</p>
								<div className="contact-terminal-links">
									<a href={INFO.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">[GIT] github.com/Abheet-singh-it</a>
									<a href={INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">[LNK] LinkedIn</a>
									<a href={INFO.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram profile">[IG] Instagram</a>
									<a href={`mailto:${INFO.main.email}`} aria-label="Send email">[EML] {INFO.main.email}</a>
								</div>
							</div>
							<form className="contact-terminal-form" onSubmit={handleSubmit} noValidate>
								<div>
									<label className="quantum-label" htmlFor="contact-name">User_Identity</label>
									<input className="quantum-input" id="contact-name" name="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleChange} aria-invalid={errors.name ? "true" : undefined} required />
									{errors.name && <span className="arch-protocol-error" role="alert">{errors.name}</span>}
								</div>
								<div>
									<label className="quantum-label" htmlFor="contact-email">Comm_Link</label>
									<input className="quantum-input" id="contact-email" name="email" type="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} aria-invalid={errors.email ? "true" : undefined} required />
									{errors.email && <span className="arch-protocol-error" role="alert">{errors.email}</span>}
								</div>
								<div>
									<label className="quantum-label" htmlFor="contact-message">Message_Packet</label>
									<textarea className="quantum-input" id="contact-message" name="message" rows={4} placeholder="Brief project overview..." value={formData.message} onChange={handleChange} aria-invalid={errors.message ? "true" : undefined} required />
									{errors.message && <span className="arch-protocol-error" role="alert">{errors.message}</span>}
								</div>
								<button type="submit" className="chief-btn-primary contact-submit-btn">Execute_Transfer</button>
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
