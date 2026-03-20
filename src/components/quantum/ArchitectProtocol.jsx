import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate, stagger } from "animejs";
import INFO from "../../data/user";
import "./ArchitectProtocol.css";

gsap.registerPlugin(ScrollTrigger);

const ArchitectProtocol = () => {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const sectionRef = useRef(null);
	const boxRef = useRef(null);
	const headerRef = useRef(null);
	const formRef = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		window.location.href = `mailto:${INFO.main.email}?subject=Contact from Portfolio&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
	};

	const handleChange = (e) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	useEffect(() => {
		const section = sectionRef.current;
		const box = boxRef.current;
		const formEl = formRef.current;
		if (!section || !box) return;

		// GSAP: section and box scroll reveal
		gsap.fromTo(box, { opacity: 0, y: 40 }, {
			opacity: 1,
			y: 0,
			duration: 1,
			ease: "power3.out",
			scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
		});

		// Anime.js: stagger form elements
		if (formEl) {
			const labels = formEl.querySelectorAll("label");
			const inputs = formEl.querySelectorAll("input, textarea, button");
			const all = [...labels, ...inputs];
			animate(all, {
				translateX: [-20, 0],
				opacity: [0, 1],
				duration: 700,
				delay: stagger(80, { start: 0.2 }),
				ease: "outQuad",
			});
		}
	}, []);

	// GSAP: focus glow on inputs
	useEffect(() => {
		const formEl = formRef.current;
		if (!formEl) return;
		const inputs = formEl.querySelectorAll("input, textarea");
		inputs.forEach((el) => {
			el.addEventListener("focus", () => {
				gsap.to(el, { boxShadow: "0 0 0 2px var(--chief-accent), 0 0 20px rgba(94, 234, 212, 0.2)", duration: 0.3 });
			});
			el.addEventListener("blur", () => {
				gsap.to(el, { boxShadow: "none", duration: 0.3 });
			});
		});
	}, []);

	return (
		<section className="arch-protocol arch-protocol-advanced" id="protocol" ref={sectionRef}>
			<div className="arch-protocol-box arch-protocol-glass" ref={boxRef}>
				<div className="arch-protocol-inner">
					<div className="arch-protocol-header" ref={headerRef}>
						<div className="arch-protocol-dot red" />
						<div className="arch-protocol-dot yellow" />
						<div className="arch-protocol-dot green" />
						<span>INITIATE_PROTOCOL.SH</span>
					</div>
					<div className="arch-protocol-prompt">
						<p>$ ssh guest@abheet.dev</p>
						<p className="comment"># Welcome. Please enter your request.</p>
					</div>
					<form className="arch-protocol-form" ref={formRef} onSubmit={handleSubmit}>
						<label htmlFor="arch-name">IDENTIFIER:</label>
						<input
							id="arch-name"
							name="name"
							type="text"
							placeholder="YOUR NAME"
							value={form.name}
							onChange={handleChange}
						/>
						<label htmlFor="arch-email">ADDRESS:</label>
						<input
							id="arch-email"
							name="email"
							type="email"
							placeholder="EMAIL@SERVER.COM"
							value={form.email}
							onChange={handleChange}
							required
						/>
						<label htmlFor="arch-msg">PAYLOAD:</label>
						<textarea
							id="arch-msg"
							name="message"
							placeholder="TRANSMIT YOUR MESSAGE..."
							rows={4}
							value={form.message}
							onChange={handleChange}
						/>
						<button type="submit" className="arch-btn-submit" data-cursor="disable">
							Execute_Transmission
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ArchitectProtocol;
