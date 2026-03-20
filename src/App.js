import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";

import { LoadingProvider, useLoading } from "./context/LoadingContext";
import LoadingScreen from "./components/chief/LoadingScreen";
import Homepage from "./pages/homepage";
import About from "./pages/about";
import Projects from "./pages/projects";
import Articles from "./pages/articles";
import ReadArticle from "./pages/readArticle";
import Contact from "./pages/contact";
import Notfound from "./pages/404";

import { TRACKING_ID } from "./data/tracking";
import CustomCursor from "./components/chief/CustomCursor";
import "./app.css";

function AppContent() {
	const { isLoading } = useLoading();
	useEffect(() => {
		if (TRACKING_ID !== "") {
			ReactGA.initialize(TRACKING_ID);
		}
	}, []);

	return (
		<>
			{isLoading && <LoadingScreen />}
			<div className="App chief-root">
				<CustomCursor />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/about" element={<About />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/articles" element={<Articles />} />
					<Route path="/article/:slug" element={<ReadArticle />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="*" element={<Notfound />} />
				</Routes>
			</div>
		</>
	);
}

function App() {
	return (
		<LoadingProvider>
			<AppContent />
		</LoadingProvider>
	);
}

export default App;
