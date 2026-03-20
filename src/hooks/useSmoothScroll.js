import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll(enabled = true) {
	const lenisRef = useRef(null);

	useEffect(() => {
		if (!enabled || typeof window === "undefined") return;
		let lenis = null;
		let rafId;
		import("lenis").then((mod) => {
			const Lenis = mod.default;
			lenis = new Lenis({
				lerp: 0.08,
				smoothWheel: true,
				syncTouch: true,
			});
			lenisRef.current = lenis;
			lenis.on("scroll", ScrollTrigger.update);
			function raf(time) {
				lenis.raf(time);
				rafId = requestAnimationFrame(raf);
			}
			rafId = requestAnimationFrame(raf);
		});
		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			if (lenis) lenis.destroy();
		};
	}, [enabled]);

	return lenisRef;
}
