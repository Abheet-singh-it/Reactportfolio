# Rajesh Portfolio (raxx21/rajesh-portfolio) — UI/UX Deep-Dive Report

**Repository:** [https://github.com/raxx21/rajesh-portfolio](https://github.com/raxx21/rajesh-portfolio)  
**Tech stack (stated):** React, TypeScript, GSAP, Three.js, WebGL, HTML, CSS, JavaScript  
**Analysis basis:** Cloned repo codebase review (structure, components, styles, animations, 3D pipeline).

---

## 1. Executive Summary

The portfolio is a **single-page, scroll-driven narrative** that combines a **3D character (WebGL)** with **smooth scroll**, **text choreography**, and a **custom cursor** to create a high-impact, “stunning” first impression. The “wow” comes from: (1) a **consistent dark + teal/cyan palette** with glowing orbs, (2) **scroll-synced timelines** that move the character, camera, and UI in one story, (3) **character interactivity** (head follows mouse, hover eyebrow, screen glow), (4) **premium loading** (marquee + click-to-expand), and (5) **GSAP Club-style plugins** (ScrollSmoother, SplitText) used in trial form. Below we break down design references, 3D structures, UI/UX patterns, and why it reads as polished and distinctive.

---

## 2. Design References & Visual Language

### 2.1 Design Direction (Inferred)

- **Aesthetic:** Dark, cinematic, “developer portfolio” with a single 3D avatar as hero. No explicit design system doc; choices are consistent and feel intentional.
- **References it evokes:**  
  - **Awwwards / one-page storytelling:** Full-viewport sections, scroll-linked motion, one focal 3D element.  
  - **GSAP showcase:** ScrollTrigger + ScrollSmoother + SplitText used in a narrative way.  
  - **Three.js / creative coders:** Character in scene, HDR environment, subtle lighting and rim glow.

### 2.2 Color & Theme

| Token / usage | Value / usage | Role |
|---------------|----------------|------|
| `--backgroundColor` | `#0a0e17` | Main background (dark blue-black). |
| `--accentColor` | `#5eead4` | Primary accent (teal); used for intro text, links, hovers. |
| Cyan / teal glow | `#22d3ee`, `#14b8a6`, `#2dd4bf`, `#B0F5EA` | Character rim, circles, screen light, loading hover, “Developer/Engineer” text. |
| Body text | `#eae5ec` | High-contrast light gray on dark. |
| Loading screen | `#e0f2f1` (light teal) | Contrast with main app; transition to dark on “enter.” |

**Why it works:** One accent family (teal/cyan) on a single dark base keeps the look cohesive and “premium” without feeling noisy. The character’s rim and screen light use the same family, tying 3D and UI together.

### 2.3 Typography

- **Font:** **Geist** (Google Fonts, variable `100..900`). Used for headings and body.
- **Hierarchy:**  
  - Landing: “Hello! I’m” (small, accent), “RAJESH CHITYAL” (large, bold), “A Full Stack” + “Developer” / “Engineer” (alternating with SplitText).  
  - Sections: `.title` (section titles, often split by char), `.para` (body, split by word/line for scroll-in).
- **Details:** Letter-spacing (e.g. 2px, 7px on “About Me”), uppercase for nav and key labels, `font-kerning: none` and `optimizeSpeed` on animated text to reduce layout thrash.

### 2.4 Layout & Structure

- **Sections (order):** Landing → About → What I Do → Career → Work (carousel) → TechStack (lazy) → Contact.
- **Landing (desktop):** Two-column: left = name + role text, right = 3D character. Character is `position: fixed`, full viewport height; text is in flow. Scroll pushes content and drives GSAP timelines.
- **Containers:** `--cWidth`, `--cMaxWidth` (1920px) for horizontal cap; `.section-container` (1300px → 1200 → 900 → 500 by breakpoint) for content width.
- **Responsive:** 3D character hidden on small viewports (`isDesktopView`: `window.innerWidth > 1024`); mobile gets text-only landing and no ScrollSmoother-driven character choreography.

---

## 3. 3D Structures & WebGL Pipeline

### 3.1 Stack (No React Three Fiber in Scene)

- **Three.js** is used **imperatively** inside `Character/Scene.tsx` (refs, `useEffect`), not via `@react-three/fiber`. Dependencies include `@react-three/*` (e.g. drei, postprocessing) but the main scene is custom: **THREE.Scene**, **WebGLRenderer**, **PerspectiveCamera**, **GLTFLoader**, **DRACOLoader**, **RGBELoader**.
- **Model:** Single **GLTF character** (desktop-only), loaded from **encrypted blob** (`/models/character.enc`, decrypted client-side), then parsed as GLB. Draco used for decoding.  
  - **Note:** Repo uses LFS for `character.glb`; clone may miss the binary. Production uses encrypted asset.

### 3.2 Scene Setup

- **Renderer:** `alpha: true`, `antialias: true`, `toneMapping: ACESFilmicToneMapping`, `toneMappingExposure: 1`, `setPixelRatio(devicePixelRatio)`.
- **Camera:** `PerspectiveCamera(14.5, aspect, 0.1, 1000)`, position `(0, 13.1, 24.7)`, zoom `1.1`. Position/rotation later animated by GSAP (scroll).
- **Lighting:**  
  - **DirectionalLight** `#5eead4`, intensity 0 → 1 via GSAP after load.  
  - **PointLight** `#22d3ee`, intensity driven by “screen” mesh emissive (monitor on character).  
  - **HDR environment:** `char_enviorment.hdr` with `EquirectangularReflectionMapping`; `environmentIntensity` 0 → 0.64 via GSAP.
- **Character materials:** Shirt set to `#8B4513`, pants `#000000`; monitor and “screenlight” mesh controlled for opacity/emissive in scroll timelines.

### 3.3 Character Behavior (Why It Feels Alive)

- **Bone-driven head:** `spine006` (head bone) rotation driven by **mouse/touch** (NDC -1..1), with **lerp** for smooth follow; scroll &gt; 200px locks head to a fixed “looking forward” pose.
- **Animations (mixer):**  
  - **introAnimation** (once), then **Blink** (loop).  
  - **key1, key2, key5, key6** (idle/typing).  
  - **typing** (filtered to specific bones).  
  - **browup** on **hover** over `.character-hover` (invisible div over face) for a small “reaction.”
- **Rim glow:** `.character-rim` is a blurred cyan circle behind the character; opacity/scale/position animated in GSAP (scroll) and on “lights on.”

### 3.4 Why the 3D Feels “Stunning”

- **Single hero asset** with clear purpose (avatar + monitor).  
- **Consistent lighting** (HDR + directional + point) and **teal/cyan** aligned with UI.  
- **Interactivity:** head follow + hover reaction make it feel responsive, not static.  
- **Scroll integration:** camera and character move together (e.g. character rotates, moves left, monitor fades in; later character moves up and away), so 3D is part of the narrative, not a separate block.

---

## 4. GSAP & Animation Design

### 4.1 Plugins Used

- **gsap** (core).  
- **ScrollTrigger** (scroll-linked timelines).  
- **ScrollSmoother** (smooth scroll; **gsap-trial**).  
- **SplitText** (chars/lines/words; **gsap-trial**).  

README states trial plugins are used; for production hosting, GSAP Club license is required for ScrollSmoother/SplitText.

### 4.2 Scroll-Linked Timelines (`GsapScroll.ts`)

- **Landing → About transition (tl1):**  
  - Character rotation Y, camera Z, character-model translate X (e.g. -25%), landing text opacity/y, about-me translate Y.  
- **About → What I Do (tl2):**  
  - Camera position (z 75, y 8.4), about section move/fade, character pointer-events and position, character/neck rotation, **monitor and screen light opacity**, “what-box-in” display, character-rim scale/opacity.  
- **What I Do (tl3):**  
  - Character model Y -100%, section Y, character rotation X.  

All use `scrub: true` and `invalidateOnRefresh: true` so scroll position directly drives progress.

### 4.3 ScrollSmoother

- **Navbar.tsx:** `ScrollSmoother.create({ wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: 1.7, speed: 1.7, effects: true })`.  
- Nav links use `smoother.scrollTo(section, true, "top top")`.  
- Smoother is **paused** until loading finishes; `initialFX()` calls `smoother.paused(false)`.

### 4.4 SplitText & Text Animation

- **splitText.ts:** On `.para` (lines+words) and `.title` (chars+lines), creates SplitText and `gsap.fromTo(..., { y: 80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger, scrollTrigger })`.  
- **initialFX.ts:** Landing text (e.g. `.landing-info h3`, `.landing-intro h2`, `.landing-intro h1`) split into chars/lines; **fromTo** with blur and y; **LoopText** for “Developer” / “Engineer” and the alternate line: infinite loop of char stagger in/out (repeat -1, repeatDelay 1).

### 4.5 Why Animations Feel Premium

- **One scroll = one story:** Scroll progress drives both 3D (camera, character, materials) and DOM (sections, text visibility).  
- **Staggered text:** Char/word stagger and blur-to-sharp on landing and section titles.  
- **Easing:** `power3.inOut`, `power2.inOut`, `power1.inOut` used consistently.  
- **ScrollSmoother** adds weight and continuity to scroll, which fits a “cinematic” one-pager.

---

## 5. Loading & First Impression

- **LoadingProvider** wraps app; shows **Loading** until `setIsLoading(false)` after user click.  
- **Progress:** Fake progress (random steps to ~50%, then slower to 100%); real model load drives `setProgress.loaded()`.  
- **Visual:**  
  - **Marquee** (“Full Stack Developer”, “Software Engineer”) in large type.  
  - **Pill button:** “Loading XX%” with cursor-follow hover (blur circle); on 100% becomes “Welcome”; **on click** `initialFX()` runs and pill **expands** (scale to full viewport) to reveal the dark site.  
- **Loader game:** Small “pong-like” lines + ball animation in corner (optional flair).  
- **Transition:** `body` background to `#0a0e17`, main content fades in (`.main-active`), smooth scroll starts.

**UX takeaway:** Loading is part of the experience (marquee + click-to-enter), not a generic spinner, which sets a high-end tone.

---

## 6. Cursor & Micro-Interactions

- **Cursor.tsx:** Custom div (`.cursor-main`) following mouse with **lerp** (divide by 6) and **GSAP .to()** for position.  
- **States:**  
  - `data-cursor="icons"`: class `cursor-icons`, snaps to element rect, height variable for “magnet” effect.  
  - `data-cursor="disable"`: class `cursor-disable`, size 0 (hidden).  
- **Style:** 50px circle, `#e6c3ff` with box-shadow, **mix-blend-mode: difference** so it inverts over content.  
- **Desktop only:** Size 0 below 600px (no custom cursor on touch).

---

## 7. Component-Level UX Highlights

- **Navbar:** Fixed, minimal (logo “RC”, email, About / Work / Contact). Hover links use **HoverLinks** (slide-up duplicate text, accent color). Decorative `.landing-circle1` (blurred cyan) and `.nav-fade` gradient.  
- **About:** Title + paragraph; `.title` and `.para` get SplitText + scroll-triggered reveal.  
- **What I Do:** Two cards (Frontend / Backend) with dashed SVG borders; desktop can use hover (or touch: click toggles `.what-content-active`).  
- **Work:** Carousel (prev/next + dots), project image + title/category/tools.  
- **TechStack:** Lazy-loaded; section with large “TECHSTACK” title.  
- **Contact:** Section present; styling in Contact.css.  
- **SocialIcons:** Presumably fixed side icons (not fully inspected).

---

## 8. Why It “Looks Stunning” — Summary

| Factor | Implementation |
|--------|----------------|
| **Cohesive palette** | Single dark base + teal/cyan accent and glows everywhere (UI + 3D). |
| **3D as hero** | One character, good lighting/HDR, head follow + hover reaction, scroll-synced motion. |
| **Scroll = narrative** | ScrollSmoother + scrub timelines tie character, camera, and sections into one story. |
| **Text choreography** | SplitText + stagger + blur on landing and section titles; loop on “Developer/Engineer.” |
| **Intentional loading** | Marquee + pill + click-to-expand transition into dark theme. |
| **Custom cursor** | Blend-mode cursor and hover states add polish on desktop. |
| **Typography & spacing** | Geist, clear hierarchy, letter-spacing, and section containers. |
| **Responsive fallback** | Below 1024px, 3D and heavy scroll effects disabled; content still readable. |

---

## 9. Technical Quick Reference

- **3D:** Three.js (no R3F in main scene), GLTF + Draco, HDR env, bone animation, mouse/touch head follow.  
- **Animation:** GSAP + ScrollTrigger + ScrollSmoother (trial) + SplitText (trial).  
- **Font:** Geist (Google Fonts).  
- **CSS:** Variables for theme, many breakpoints (500, 600, 768, 900, 1025, 1200, 1400, 1600).  
- **State:** React (useState, useEffect), LoadingContext for loading/percent.  
- **Lazy:** Character, MainContainer, TechStack.

---

## 10. Recommendations for Your Portfolio

If you want to adopt ideas from this repo:

1. **Design:** Pick one dark base + one accent family and use it in both UI and 3D (rim, lights, links).  
2. **Scroll story:** Use ScrollTrigger (and optionally ScrollSmoother with a license) to drive one or two “hero” elements (e.g. character or big type) in sync with scroll.  
3. **Text:** Use SplitText (or similar) for key headlines with staggered reveal and optional blur.  
4. **3D:** One strong hero (character or object), HDR + directional/point lights, simple interaction (follow, one hover state).  
5. **Loading:** Consider a single, branded moment (progress + one click or auto transition) instead of a generic spinner.  
6. **Cursor:** Optional custom cursor with blend mode for desktop only; hide on touch.  
7. **License:** If you use ScrollSmoother/SplitText in production, budget for GSAP Club or replace with free alternatives (e.g. Lenis + custom text split).

---

*Report generated from codebase analysis of [raxx21/rajesh-portfolio](https://github.com/raxx21/rajesh-portfolio). Design references and “why it works” are inferred from implementation and UI/UX best practices.*
