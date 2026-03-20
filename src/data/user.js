/**
 * Portfolio data is loaded from portfolio-data.json.
 * Edit src/data/portfolio-data.json to update projects, about, work experience, and contact.
 */
import data from "./portfolio-data.json";

const INFO = {
	...data,
	main: {
		...data.main,
		logo: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/1aa8ea29847173.5606bbf23840b.png",
	},
	articles: {
		title: "Sharing insights on web development, AI gaming, and technology innovation",
		description:
			"Exploring the intersection of web development and AI gaming through technical articles and project insights. Focused on sharing practical knowledge and innovative solutions in game development and web technologies.",
	},
};

export default INFO;
