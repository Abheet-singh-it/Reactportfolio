import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./CustomCursor.css";

export default function CustomCursor() {
	const cursorRef = useRef(null);
	const rafRef = useRef(null);

	useEffect(() => {
		// Only show custom cursor on desktop with pointer device
		const isPointer = window.matchMedia("(pointer: fine)").matches;
		const isDesktop = window.innerWidth >= 768;
		if (!isPointer || !isDesktop) return;

		const cursor = cursorRef.current;
		if (!cursor) return;

		cursor.style.display = "block";

		const mouse = { x: 0, y: 0 };
		const pos = { x: 0, y: 0 };
		let hover = false;
		const smoothing = 6;

		const onMove = (e) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};

		const loop = () => {
			if (!hover) {
				pos.x += (mouse.x - pos.x) / smoothing;
				pos.y += (mouse.y - pos.y) / smoothing;
				gsap.set(cursor, { x: pos.x, y: pos.y, xPercent: -50, yPercent: -50 });
			}
			rafRef.current = requestAnimationFrame(loop);
		};

		document.addEventListener("mousemove", onMove);
		rafRef.current = requestAnimationFrame(loop);

		const handleEnter = (el) => () => {
			if (el.dataset.cursor === "icons") {
				cursor.classList.add("chief-cursor--icon");
				const rect = el.getBoundingClientRect();
				gsap.set(cursor, { x: rect.left, y: rect.top, xPercent: 0, yPercent: 0 });
				cursor.style.setProperty("--cursor-h", `${rect.height}px`);
				hover = true;
			}
			if (el.dataset.cursor === "disable") cursor.classList.add("chief-cursor--hide");
		};

		const handleLeave = () => {
			cursor.classList.remove("chief-cursor--icon", "chief-cursor--hide");
			hover = false;
		};

		// Use MutationObserver to handle dynamic elements
		const bindCursorTargets = () => {
			document.querySelectorAll("[data-cursor]").forEach((el) => {
				el.removeEventListener("mouseenter", el._cursorEnter);
				el.removeEventListener("mouseleave", el._cursorLeave);
				el._cursorEnter = handleEnter(el);
				el._cursorLeave = handleLeave;
				el.addEventListener("mouseenter", el._cursorEnter);
				el.addEventListener("mouseleave", el._cursorLeave);
			});
		};

		bindCursorTargets();
		const observer = new MutationObserver(bindCursorTargets);
		observer.observe(document.body, { childList: true, subtree: true });

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			document.removeEventListener("mousemove", onMove);
			observer.disconnect();
			document.querySelectorAll("[data-cursor]").forEach((el) => {
				el.removeEventListener("mouseenter", el._cursorEnter);
				el.removeEventListener("mouseleave", el._cursorLeave);
			});
		};
	}, []);

	return <div className="chief-cursor" ref={cursorRef} style={{ display: "none" }} aria-hidden="true" />;
}
