import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./CustomCursor.css";

export default function CustomCursor() {
	const cursorRef = useRef(null);

	useEffect(() => {
		const cursor = cursorRef.current;
		if (!cursor) return;

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
			requestAnimationFrame(loop);
		};

		document.addEventListener("mousemove", onMove);
		loop();

		document.querySelectorAll("[data-cursor]").forEach((el) => {
			el.addEventListener("mouseenter", (e) => {
				if (el.dataset.cursor === "icons") {
					cursor.classList.add("chief-cursor--icon");
					const rect = el.getBoundingClientRect();
					gsap.set(cursor, { x: rect.left, y: rect.top, xPercent: 0, yPercent: 0 });
					cursor.style.setProperty("--cursor-h", `${rect.height}px`);
					hover = true;
				}
				if (el.dataset.cursor === "disable") cursor.classList.add("chief-cursor--hide");
			});
			el.addEventListener("mouseleave", () => {
				cursor.classList.remove("chief-cursor--icon", "chief-cursor--hide");
				hover = false;
			});
		});

		return () => {
			document.removeEventListener("mousemove", onMove);
		};
	}, []);

	return <div className="chief-cursor" ref={cursorRef} aria-hidden="true" />;
}
