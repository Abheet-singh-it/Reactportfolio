import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";

import ArchitectNav from "../components/quantum/ArchitectNav";
import ArchitectFooter from "../components/quantum/ArchitectFooter";
import Logo from "../components/common/logo";

import INFO from "../data/user";

import "../styles/chief-theme.css";
import "./styles/404.css";

const Notfound = () => {
	useEffect(() => {
		document.title = `404 | ${INFO.main.title}`;
	}, []);

	return (
		<React.Fragment>
			<div className="not-found page-content chief-page">
				<ArchitectNav />
				<div className="content-wrapper chief-content-wrapper">
					<div className="notfound-logo-container">
						<div className="projects-logo">
							<Logo width={46} />
						</div>
					</div>
					<div className="notfound-container">
						<div className="notfound-message">
							<div className="notfound-title">
								Oops! <FontAwesomeIcon icon={faFaceSadTear} />
							</div>
							<div className="not-found-message">
								We can't seem to find the page you're looking for.
								<br />
								The requested URL was not found on this server.
							</div>
							<Link to="/" className="chief-btn-primary not-found-link">
								Back to Home
							</Link>
						</div>
					</div>
				</div>
				<div className="page-footer">
					<ArchitectFooter />
				</div>
			</div>
		</React.Fragment>
	);
};

export default Notfound;
