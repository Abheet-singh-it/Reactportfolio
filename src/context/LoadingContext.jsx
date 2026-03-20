import { createContext, useContext, useState } from "react";

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
	const [isLoading, setIsLoading] = useState(true);
	const [percent, setPercent] = useState(0);

	return (
		<LoadingContext.Provider value={{ isLoading, setIsLoading, percent, setPercent }}>
			{children}
		</LoadingContext.Provider>
	);
}

export function useLoading() {
	const ctx = useContext(LoadingContext);
	if (!ctx) throw new Error("useLoading must be used within LoadingProvider");
	return ctx;
}
