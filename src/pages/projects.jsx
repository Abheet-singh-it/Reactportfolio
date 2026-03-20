import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import ArchitectNav from "../components/quantum/ArchitectNav";
import ArchitectFooter from "../components/quantum/ArchitectFooter";
import Logo from "../components/common/logo";
import AllProjects from "../components/projects/allProjects";

import INFO from "../data/user";
import SEO from "../data/seo";

import "../styles/chief-theme.css";
import "./styles/projects.css";

const Projects = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "projects");

	return (
		<React.Fragment>
			<Helmet>
				<title>{currentSEO?.title || `Projects | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<ArchitectNav />
				<div className="content-wrapper">
					<div className="projects-logo-container">
						<div className="projects-logo">
							<Logo width={46} />
						</div>
					</div>
					<main id="main-content" className="projects-container">
						<h3 className="quantum-section-label">{`// NEURAL INTERFACE MODULES`}</h3>
						<div className="title projects-title">
							Things I’ve made trying to put my dent in the
							universe.
						</div>

						<div className="subtitle projects-subtitle">
							I've worked on a variety of projects over the years
							and I'm proud of the progress I've made. Many of
							these projects are open-source and available for
							others to explore and contribute to. If you're
							interested in any of the projects I've worked on,
							please feel free to check out the code and suggest
							any improvements or enhancements you might have in
							mind. Collaborating with others is a great way to
							learn and grow, and I'm always open to new ideas and
							feedback.
						</div>

						<div className="projects-list">
							<AllProjects />
						</div>
					</main>
					<div className="page-footer">
						<ArchitectFooter />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Projects;
