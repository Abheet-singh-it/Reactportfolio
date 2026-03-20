import React, { useState } from "react";
import INFO from "../../data/user";

const certs = INFO.homepage.certificates || [];
const fallbackCerts = [
	{ title: "Advanced Neural Networks", issuer: "Galactic Tech Institute", id: "#77-ALPHA", type: "CERTIFICATE" },
	{ title: "Quantum Computing Fellowship", issuer: "Future Systems Collective", id: "#88-BETA", type: "ACHIEVEMENT" }
];
const items = certs.length >= 2
	? certs.map((c, i) => ({ ...c, id: `#${i + 1}`, type: i === 0 ? "CERTIFICATE" : "ACHIEVEMENT" }))
	: fallbackCerts;

const VaultSection = () => {
	const [start, setStart] = useState(0);
	const show = [items[start % items.length], items[(start + 1) % items.length]];

	return (
		<section className="qp-section qp-vault" id="vault">
			<div className="qp-vault-header">
				<span>VAULT ACCESS: CERTIFIED ACHIEVEMENTS</span>
				<div className="qp-vault-nav">
					<button type="button" onClick={() => setStart((s) => s - 1)} aria-label="Previous">←</button>
					<button type="button" onClick={() => setStart((s) => s + 1)} aria-label="Next">→</button>
				</div>
			</div>
			<div className="qp-vault-grid">
				{show.map((item, i) => (
					<div key={i} className="qp-card qp-vault-card">
						<div className="qp-vault-card-icon">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
								{item.type === "ACHIEVEMENT" ? (
									<path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
								) : (
									<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
								)}
							</svg>
						</div>
						<div className="qp-vault-card-body">
							<span className="qp-vault-label">{item.type}:</span>
							<h4 className="qp-vault-title">{item.title}</h4>
							<div className="qp-vault-meta">
								<p>Issuer: {item.issuer}</p>
								<p>ID: {item.id}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default VaultSection;
