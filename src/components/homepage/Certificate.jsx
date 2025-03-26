// c:\Users\Asus\OneDrive\Documents\Portfolio\reactfolio\src\components\homepage\Certificate.jsx
import React, { useState } from "react";
import "./styles/certificate.css";

const Certificate = () => {
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    const certificates = [
        {
            id: 1,
            title: "AIGC Training Certification",
            issuedBy: "AIGC",
            date: "July 2024",
            certificateUrl: "https://media.licdn.com/dms/image/v2/D5622AQHbg-8YZMsT_g/feedshare-shrink_800/feedshare-shrink_800/0/1721327297470?e=1746057600&v=beta&t=foVSjkLm3GNfFhPFtuBxgMgkS9beNDQLan7AAhfxcrM"
        },
        {
            id: 2,
            title: "Cyber Security Certification",
            issuedBy: "Acemegrade",
            date: "2024",
            certificateUrl: "https://media.licdn.com/dms/image/v2/D5622AQFvdy14hYRnQA/feedshare-shrink_800/feedshare-shrink_800/0/1710308609485?e=1746057600&v=beta&t=jnzKTJkKAmETomnQABjZ-obvOFFbhyPs0whVkicHXgk"
        },
        {
            id: 3,
            title: "Software Development Certification",
            issuedBy: "Solitaire Infosys",
            date: "2024",
            certificateUrl: "https://media.licdn.com/dms/image/v2/D562DAQGeMxbG6NDB1Q/profile-treasury-image-shrink_1920_1920/profile-treasury-image-shrink_1920_1920/0/1722340932316?e=1743570000&v=beta&t=SU5E0GOzxY7K6Rrn9WnsexMWk9X3ebSZWnjR9lcjZFU"
        }
    ];

    const handleView = (cert) => {
        setSelectedCertificate(cert);
    };

    const handleClose = () => {
        setSelectedCertificate(null);
    };

    return (
        <>
            <div className="certificates-container">
                {certificates.map((cert) => (
                    <div key={cert.id} className="certificate-card">
                        <div className="certificate-content">
                            <div className="certificate-title">{cert.title}</div>
                            <div className="certificate-issuer">
                                Issued by: {cert.issuedBy}
                            </div>
                            <div className="certificate-date">
                                {cert.date}
                            </div>
                            <button 
                                className="view-certificate-btn" 
                                onClick={() => handleView(cert)}
                            >
                                View Certificate
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedCertificate && (
                <div className="certificate-modal-overlay" onClick={handleClose}>
                    <div className="certificate-modal" onClick={e => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={handleClose}>×</button>
                        <img 
                            src={selectedCertificate.certificateUrl} 
                            alt={selectedCertificate.title}
                            className="certificate-modal-image"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Certificate;