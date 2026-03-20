---
title: "Abheet Singh Portfolio — Design Analysis & Improvement Roadmap"
version: "1.5.0"
date: "2026-03-20"
stack: "React 18 + GSAP + Three.js + Lenis"
theme: "Chief (Dark Cinematic + Teal/Cyan)"
status: "Active Development"
---

# Portfolio Design Analysis & Improvement Roadmap

## Table of Contents

0. [UI Improvements Implemented (v1.1.0)](#0-ui-improvements-implemented-v110)
1. [Current Design System](#1-current-design-system)
2. [Component Architecture](#2-component-architecture)
3. [Animation Library Audit](#3-animation-library-audit)
4. [UI/UX Issues & Anti-Patterns](#4-uiux-issues--anti-patterns)
5. [Improvement Plan — Animations](#5-improvement-plan--animations)
6. [ReactBits Integration Plan](#6-reactbits-integration-plan)
7. [shadcn/ui Integration Strategy](#7-shadcnui-integration-strategy)
8. [Performance Optimization](#8-performance-optimization)
9. [Accessibility Fixes](#9-accessibility-fixes)
10. [Implementation Priority Matrix](#10-implementation-priority-matrix)

---

## 0. UI Improvements Implemented (v1.1.0)

### Global Layout & Tokens
- Global page layout primitives (consistent wrapper, spacing): `src/app.css`
- Reusable glass-card + button system (primary/outline): `src/app.css`
- Chief theme tokens + cinematic background layers: `src/styles/chief-theme.css`

### Navigation
- New fixed header with scrolled state + active link styling: `src/components/quantum/ArchitectNav.jsx`
- Mobile overlay menu + body scroll lock while open: `src/components/quantum/ArchitectNav.jsx`

### Accessibility & Interaction
- Skip-to-content link + focus-visible outlines: `src/index.css` + `src/App.js`
- Reduced-motion handling (CSS + GSAP global disable): `src/index.css` + `src/App.js`

### Pages
- Contact page terminal layout + inline validation + external links in new tab: `src/pages/contact.jsx` + `src/pages/styles/contact.css`
- Terminal-style protocol form with ARIA error wiring + GSAP input focus glow: `src/components/quantum/ArchitectProtocol.jsx`
- 404 page layout + entry animation: `src/pages/404.jsx` + `src/pages/styles/404.css`

---

## 0.5 UI/UX Pro Max Improvements (v1.2.0)

### Hero Section 3D Redesign
- **New geometry:** IcosahedronGeometry (detail=1) replaces TorusKnot — more premium, modern feel
- **Inner glow sphere:** Phong material with emissive pulse for cinematic depth
- **3 orbital rings** at different radii with opposing rotations
- **Particle field:** Using `Points` + `AdditiveBlending` (200 particles desktop, 80 mobile) — 10x more performant than individual meshes
- **Orbiting accent spheres:** 6 spheres on elliptical paths with Y-axis bobbing
- **Mouse interaction:** `mousemove` on container drives group rotation via smooth lerp — responds to user movement
- **Cinematic lighting:** HemisphereLight + key + rim + fill + ambient (5-light setup)
- **Files:** `src/components/chief/Hero3D.jsx`, `src/components/chief/Hero3D.css`

### Footer Redesign
- **4-column grid layout:** Brand | Navigate | Connect | Back-to-top
- **Navigation links:** Home, About, Projects, Contact with hover slide effect
- **Social icons:** GitHub, LinkedIn, Email in bordered glass boxes with hover lift
- **Back-to-top button:** Arrow + label, smooth scroll behavior
- **Bottom bar:** Copyright + production-ready status with pulse dot
- **Files:** `src/components/quantum/ArchitectFooter.jsx`, `src/components/quantum/ArchitectFooter.css`

### Project Cards Redesign
- **4-project grid** (was 3) with responsive columns (1 → 2 → 4)
- **Status indicators:** Color-coded dots (green=deployed, teal=active, amber=alpha)
- **Arrow icon:** Appears on hover with translate animation
- **Extra tags:** 3 tags per project (was 2)
- **Clean interaction:** No cursor effects, no tilt — stable hover with border highlight only
- **Files:** `src/components/quantum/ArchitectArchive.jsx`, `src/styles/architect-portfolio.css`

### System Chronology Redesign (v1.3.0)
- **Rich timeline cards** — Each role now shows: tech stack tags, detailed achievements, "learned" callout with lightbulb icon
- **ROLE_DETAILS mapping** — 6 roles with curated highlights elaborating on real work: Three.js scene architecture, GSAP ScrollTrigger orchestration, MCP protocol design, Minecraft JSON UI, enterprise training, cybersecurity foundations
- **Employment type badges** — Color-coded: FULL-TIME (green), FREELANCE (teal), CONTRACT (cyan), TRAINING (amber)
- **Animated timeline line** — GSAP scrub draws the vertical line as user scrolls through the section
- **Card stagger** — Cards slide in from alternating sides (left/right) with `power3.out` easing on scroll
- **Dot pulse** — Timeline dots animate with `back.out(2)` spring when entering viewport
- **Stack // System section** — 4-category technical proficiency showcase:
  - **3D & Graphics:** Three.js (90%), WebGL (85%) — with detail on IcosahedronGeometry, Points, dispose patterns
  - **Animation:** GSAP (95%), Anime.js (80%), Lenis (85%) — with detail on ScrollTrigger, matchMedia, RAF sync
  - **Frontend:** React 18 (95%), JavaScript (95%), CSS Architecture (90%) — glassmorphism, reduced-motion, IntersectionObserver
  - **Backend & AI:** Node.js (92%), Python (85%), MongoDB (88%) — MCP protocol, AI pipelines, aggregation
- **Animated skill bars** — Width fills on scroll with `cubic-bezier(0.22, 1, 0.36, 1)` easing
- **Glassmorphism cards** — blur(12px), teal border, hover border highlight
- **Mobile responsive** — Timeline switches to single-column with left-aligned line on <1024px
- **Files:** `src/components/quantum/ArchitectChronology.jsx`, `src/styles/architect-portfolio.css`

### Single Source of Truth — JSON-Driven (v1.4.0) `DONE`
All hardcoded data removed from components. Everything reads from `portfolio-data.json`:

| Data | JSON Path | Used By |
|------|-----------|---------|
| Name, role, intro, tagline | `main.*` | ChiefLanding |
| Social links | `socials.*` | Socials, Footer, Protocol |
| Stats (4 cards + bar widths) | `stats[]` | ArchitectStats |
| Work experience (6 roles + type/icon/stack/achievements/learned) | `homepage.workExperience[]` | ArchitectChronology |
| Certificates (title/date/issuer/image/desc) | `homepage.certificates[]` | BuildLogSection |
| Projects (title/desc/link/status/tags) | `projects[]` | ArchitectArchive, BuildLogSection |
| Skills (5 categories) | `skills[]` | BuildLogSection |
| Skill bars (3 bars + pct/tags) | `skillBars[]` | ArchitectCore |
| Tech stack (4 categories + items/level/detail) | `techStack[]` | ArchitectChronology Stack System |
| Build log (stages/title/subtitle/footerNote) | `buildLog.*` | BuildLogSection |
| Contact (title/subtitle/terminal labels/formFields/address/languages) | `contact.*` | ArchitectProtocol, Contact page |

### Build Log Polish (v1.4.0) `DONE`
- Skills summary group added — shows all 5 skill categories from JSON
- Certificate issuer now displayed (hidden on mobile, shown on desktop)
- Project status read from JSON (`DEPLOYED`/`ACTIVE`/`ALPHA`) with green color for shipped
- Count indicators: "certifications (2)", "projects (4)"
- All labels/titles/footerNote from `buildLog` JSON object

### Contact Protocol Polish (v1.4.0) `DONE`
- Contact info section added: address, email, languages — all from `contact` JSON
- Social link badges (`[GIT]`, `[LNK]`, `[IG]`) from `socials` JSON
- Form fields dynamically rendered from `contact.formFields[]` — id, label, type, placeholder, rows
- Submit/submitted labels from JSON (`submitLabel`, `submittedLabel`)
- Terminal label and description from JSON
- Validation dynamically generated from field definitions

### Full-Width Layout + Content Polish (v1.5.0) `DONE`

**Layout — Full-Width Sections:**
- `.arch-section` no longer has `max-width: 80rem` — sections span full viewport width
- Inner content constrained via `.arch-section > * { max-width: 80rem; margin: auto; }`
- Hero `.arch-hero` max-width removed — full-width hero
- Content wrapper widened from 1200px to 1400px
- Hero landing container widened to 1400px
- Footer inner widened to 1400px
- Nav header uses `calc(100% - 3rem)` instead of fixed variable
- Build log pipeline widened to 56rem, logs grid to 64rem
- Protocol form widened from 42rem to 48rem
- Hero right side (3D) widened to 600px
- Hero left text widened to 40rem, desc to 34rem

**Typography — UI/UX Pro Max Rules Applied:**
- Section titles: responsive `clamp()`, weight 800, line-height 1.2
- Section subtitles: 0.8rem, letter-spacing 0.12em, line-height 1.5
- Project card descriptions: switched from mono to body font for readability
- Stat values: responsive clamp, uses CSS variables for color
- Hero title: tighter clamp (max 4rem), weight 800, letter-spacing -0.03em
- Hero role: line-height 1.5, increased spacing
- Hero desc: wider (34rem), slightly larger font, line-height 1.7
- Build log: line-height 1.2-1.5 added across all text elements
- Protocol form: field spacing increased to 1.25rem
- Contact terminal: tighter gap, max-width on desc for readability
- About page: line-height 1.3 on title, 1.7 on description, max-width 40rem

**Spacing — 8dp Rhythm:**
- Section padding standardized to `6rem 2rem`
- Mobile padding: `0 1rem 3rem`
- Consistent margins between title → subtitle → content

### Section Routing (Next Level) `DONE`
- **IntersectionObserver:** Tracks which section is in viewport, highlights active nav link
- **SectionLink component:** On homepage, nav buttons smooth-scroll to `#archive`, `#core`, `#protocol`
- **Cross-page routing:** From non-homepage, clicking Work/Stack/Contact navigates to `/` with `state.scrollTo` — homepage reads it and scrolls after mount
- **Files:** `src/components/quantum/ArchitectNav.jsx`, `src/pages/homepage.jsx`

### UI/UX Pro Max Design System Applied
- **Style:** Modern Dark (Cinema Mobile) — no pure #000, LinearGradient base, ambient blobs, blur glassmorphism
- **Pattern:** Portfolio Grid — visuals first, clean cards, footer contact
- **Interaction:** 150-300ms micro-interactions, spring easing, no decorative cursor effects
- **Anti-patterns avoided:** No emoji icons, consistent SVG/Material icons, prefers-reduced-motion respected, all text >=0.6rem

---

## 1. Current Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--chief-bg` | `#0a0e17` | Primary dark navy background |
| `--chief-bg-soft` | `#050810` | Deeper variant for sections |
| `--chief-accent` | `#5eead4` | Primary teal accent (CTAs, highlights) |
| `--chief-accent-dim` | `#2dd4bf` | Muted teal for secondary elements |
| `--chief-cyan` | `#22d3ee` | Bright cyan for 3D emissive, glows |
| `--chief-teal` | `#14b8a6` | Deep teal for borders, subtle accents |
| `--chief-text` | `#eae5ec` | Primary light text |
| `--chief-muted` | `#94a3b8` | Muted gray for secondary text |

### Typography
- **Primary Font:** Geist (Google Fonts, variable 100-900)
- **Monospace:** JetBrains Mono (terminal sections)
- **Fallback:** Roboto, sans-serif
- **Scale:** clamp()-based responsive (mobile-first)
- **Letter-spacing:** 0.12em badges, 0.2em titles, 2px intro

### Effects
- **Glassmorphism:** blur(12px), 0.6 opacity bg, 1px teal border
- **Background Grid:** 48x48px pattern at 3% opacity
- **Glow Orbs:** 300px circles, 60px blur, rotating/floating CSS animations
- **Radial Gradients:** Teal/cyan overlays at top (-20%) and bottom (80%)

### Design Language
- Dark cinematic aesthetic with terminal/developer personality
- Glass morphism cards with hover elevation
- Grid + radial gradient layered backgrounds
- Monospace labels for "system" sections (Build Log, Protocol, etc.)

---

## 2. Component Architecture

### Page Structure (Homepage Flow)
```
ArchitectNav (sticky)
  └─ ChiefLanding (Hero)
       ├─ Intro Badge ("Available for work")
       ├─ Name (GSAP stagger)
       ├─ Role (Anime.js char-by-char blur-in)
       ├─ CTAs (View Work / Contact)
       └─ Hero3D (Three.js torus knot + rings + particles)
  └─ ArchitectStats (4-col skill bars)
  └─ ArchitectArchive (Project cards)
  └─ ArchitectChronology (Work timeline)
  └─ ArchitectCore (Skills matrix)
  └─ BuildLogSection (Pipeline + certs + projects)
       └─ ArchitectVault3D (3D dodecahedron with orbiting cubes)
  └─ ArchitectProtocol (Contact form — terminal style)
  └─ ArchitectFooter
```

### Component Inventory: 30+ components across 7 directories
- **chief/** (6 components): Landing, Hero3D, LoadingScreen, CustomCursor, BuildLog, Vault3D
- **quantum/** (13 components): Nav, Stats, Archive, Chronology, Core, Protocol, Footer, Orbit, Hero, Vault, SystemNav, ProjectCards, DataStreamFooter
- **common/** (4): NavBar, Footer, Logo, Card
- **about/** (1): Socials
- **homepage/** (4): Works, Article, Certificate, CertificateNew
- **projects/** (2): AllProjects, Project
- **articles/** (1): Article

### Data Flow
```
portfolio-data.json → user.js (INFO export) → All pages/components
articles.js (hardcoded) → Article pages
seo.js → React Helmet per page
LoadingContext (React Context) → Global loading state
```

---

## 3. Animation Library Audit

### Current State: Two Libraries + CSS (Anime.js removed)

| Library | Version | Where Used | Purpose | Status |
|---------|---------|-----------|---------|--------|
| **GSAP** | 3.12.7 | All components | ScrollTrigger, entrance, scroll-linked 3D, char animations | `ACTIVE` |
| **Three.js** | 0.168.0 | Hero3D, ArchitectVault3D | 3D icosahedron, particles, orbiting cubes | `ACTIVE` |
| **Lenis** | 1.1.13 | useSmoothScroll hook | Smooth scroll (homepage) | `ACTIVE` |
| **Anime.js** | — | — | — | `REMOVED` |
| **CSS** | native | Throughout | Keyframe animations (orbs, marquee, float, spin) | `ACTIVE` |

### Issues — All Resolved

#### GSAP Issues
1. ~~ScrollTrigger memory leaks~~ — `DONE` All components use `gsap.context()` + `ctx.revert()`
2. ~~Overlapping triggers~~ — `DONE` Using `once: true` for entrances, consistent `scrub: 0.8`
3. ~~No scrub consistency~~ — `DONE` Standardized to `scrub: 0.8` for scroll-linked, `once: true` for entrances
4. ~~Missing prefers-reduced-motion~~ — `DONE` `gsap.matchMedia()` in App.js + CSS `@media`
5. ~~Plugin registration~~ — `DONE` Single `gsap.registerPlugin(ScrollTrigger)` in App.js

#### Anime.js Issues
1-4. ~~All issues~~ — `DONE` Anime.js fully removed; all animations migrated to GSAP equivalents

#### Three.js Issues
1. ~~No responsive canvas~~ — `DONE` Using `ResizeObserver` instead of window resize
2. ~~No dispose pattern~~ — `DONE` `scene.traverse()` + `renderer.forceContextLoss()` on unmount
3. ~~No fallback for low-end devices~~ — `DONE` CSS fallback on mobile/no-WebGL, tiered rendering
4. ~~No lazy loading~~ — `DONE` `React.lazy()` + `Suspense` for Hero3D
5. ~~RAF not cancelled~~ — `DONE` `rafRef` pattern with `cancelAnimationFrame` in cleanup
6. ~~Particle count hardcoded~~ — `DONE` Points particle field: 200 desktop, 80 mobile

#### Cross-Library Issues
1. ~~Bundle bloat~~ — `DONE` Removed Anime.js (-17KB), Three.js code-split into chunk
2. ~~No animation orchestration~~ — `DONE` GSAP is sole animation engine
3. ~~Duplicate capabilities~~ — `DONE` Anime.js removed entirely
4. ~~No loading prioritization~~ — `DONE` Three.js lazy loaded via React.lazy

---

## 4. UI/UX Issues & Anti-Patterns

### Critical (Priority 1 — Accessibility)
| Issue | Location | Rule Violated | Status |
|-------|----------|---------------|--------|
| Improve `alt` text on project logos | `project.jsx` | `alt-text` | `DONE` — about.jsx has proper alt |
| Missing `aria-label` on icon-only social links | `socials.jsx`, `ArchitectFooter.jsx` | `aria-labels` | `DONE` |
| Missing `prefers-reduced-motion` support | Global | `reduced-motion` | `DONE` — CSS + GSAP matchMedia |
| Missing keyboard focus treatment | Global | `focus-states` | `DONE` — `:focus-visible` in index.css |
| Color contrast `--chief-muted` vs `--chief-bg` | Global | `color-contrast` ~5.2:1 | `PASS AA` — Monitor |
| Missing skip-to-content link | `App.js` | `skip-links` | `DONE` |
| Custom cursor hides native focus | `CustomCursor.jsx` | `keyboard-nav` | `DONE` — Desktop-only, pointer:fine check |
| Pink/purple cursor color | `CustomCursor.css` | `color-consistency` | `DONE` — Changed to teal #5eead4 |
| `outline: none` without `:focus-visible` | Protocol, Contact CSS | `focus-states` | `DONE` — Changed to `outline: 0` with border focus |
| Font sizes below 12px | Multiple files | `readable-font-size` | `DONE` — All increased to min 0.6rem |
| Low text opacity (<0.85) | BuildLog, LoadingScreen | `contrast-readability` | `DONE` — Increased to 0.9/0.25 |

### High (Priority 2 — Interaction & Navigation)
| Issue | Location | Rule Violated | Status |
|-------|----------|---------------|--------|
| Missing `cursor: pointer` on cards/links | Cards, projects, socials | `cursor-pointer` | `DONE` — Global rule + per-element |
| Missing form validation | `ArchitectProtocol.jsx`, `contact.jsx` | `error-feedback` | `DONE` — Inline errors + aria |
| Missing back-to-top on long homepage | Homepage | `back-behavior` | `DONE` — Footer back-to-top button |
| Mobile nav hamburger lacks animation | `ArchitectNav.jsx` | `state-transition` | `DONE` — X morph + overlay |
| Grab cursor on 3D canvas | `Hero3D.css` | `cursor-pointer` | `DONE` — Removed grab/grabbing |
| Social links open in same tab | `socials.jsx` | Standard UX | `DONE` — target="_blank" |
| Missing 404 page animation | `404.jsx` | `empty-states` | `DONE` — GSAP entrance |
| Section routing not smooth | `ArchitectNav.jsx` | `navigation-consistency` | `DONE` — IntersectionObserver + scrollTo |
| Missing hover transitions | `socials.css`, buttons | `state-transition` | `DONE` — 0.2s ease on all |
| Inconsistent border-radius | Multiple files | `consistency` | `DONE` — Standardized to rem/pill |

### Medium (Priority 3 — Performance & Layout)
| Issue | Location | Rule Violated | Status |
|-------|----------|---------------|--------|
| Missing lazy loading on images | `about.jsx` | `lazy-loading` | `DONE` — loading="lazy" on about image |
| Three.js not code-split | `Hero3D.jsx`, `ArchitectVault3D.jsx` | `bundle-splitting` | `DONE` — React.lazy + dynamic import |
| Missing skeleton screens | Loading states | `progressive-loading` | `BACKLOG` |
| Font not preloaded | `index.html` | `font-preload` | `DONE` — Geist preload added |
| Missing `image-dimension` declarations | `about.jsx` | `content-jumping` | `DONE` — width/height on img |
| CSS files not critical-path optimized | Multiple imports | `critical-css` | `BACKLOG` |
| Scrollbar custom styling | `app.css` | `reduce-reflows` | `DONE` — Refined to 6px |
| Hardcoded colors not using vars | LoadingScreen.css | `color-semantic` | `DONE` — Replaced with var() |

### UI/UX Pro Max Polish (Priority 4 — v1.2.1)
| Issue | Location | Rule | Status |
|-------|----------|------|--------|
| Hero 3D icosahedron redesign | `Hero3D.jsx` | `hero-centric` | `DONE` |
| Mouse-interactive 3D rotation | `Hero3D.jsx` | `gesture-feedback` | `DONE` |
| Project cards clean (no tilt/cursor) | `ArchitectArchive.jsx` | `stable-interaction` | `DONE` |
| Project cards glare removed | `architect-portfolio.css` | `no-decorative-only` | `DONE` |
| Status dot indicators | `ArchitectArchive.jsx` | `state-clarity` | `DONE` |
| Footer 4-column redesign | `ArchitectFooter.jsx` | `nav-hierarchy` | `DONE` |
| Footer back-to-top button | `ArchitectFooter.jsx` | `back-behavior` | `DONE` |
| Section scroll routing | `ArchitectNav.jsx` | `navigation-consistency` | `DONE` |
| Active section tracking | `ArchitectNav.jsx` | `nav-state-active` | `DONE` |
| Cross-page scrollTo | `homepage.jsx` | `deep-linking` | `DONE` |

---

## 5. Improvement Plan — Animations

### Strategy: Consolidate + Enhance

**Decision:** Keep GSAP as primary animation engine. Replace Anime.js usage with GSAP equivalents. Keep Three.js but optimize. Keep Lenis for smooth scroll.

### 5.1 GSAP Fixes & Enhancements

```jsx
// FIX 1: Global plugin registration (once in App.js)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// FIX 2: Reduced motion support
gsap.matchMedia().add("(prefers-reduced-motion: reduce)", () => {
  gsap.globalTimeline.timeScale(0); // Kill all animations
  ScrollTrigger.getAll().forEach(t => t.kill());
});

// FIX 3: Proper cleanup pattern
useEffect(() => {
  const ctx = gsap.context(() => {
    // All animations here
    gsap.from('.element', { opacity: 0, y: 50, scrollTrigger: { ... } });
  }, containerRef);
  return () => ctx.revert(); // Clean kill of all GSAP in this scope
}, []);

// FIX 4: Consistent scrub config
const SCROLL_CONFIG = {
  scrub: 0.8,        // Smooth but responsive
  start: "top 85%",  // Consistent trigger point
  end: "bottom 20%",
  once: true          // For entrance animations
};

// ENHANCE: Stagger text (replaces Anime.js char-by-char)
gsap.from('.role-char', {
  filter: 'blur(10px)',
  opacity: 0,
  y: 20,
  stagger: 0.03,
  duration: 0.6,
  ease: 'power2.out'
});
```

### 5.2 Three.js Optimization

```jsx
// FIX 1: Lazy load Three.js components
const Hero3D = React.lazy(() => import('./Hero3D'));
const ArchitectVault3D = React.lazy(() => import('./ArchitectVault3D'));

// Wrap in Suspense with fallback
<Suspense fallback={<div className="hero3d-placeholder" />}>
  <Hero3D />
</Suspense>

// FIX 2: Proper dispose on unmount
useEffect(() => {
  return () => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
    renderer.dispose();
    renderer.forceContextLoss();
  };
}, []);

// FIX 3: Responsive canvas
useEffect(() => {
  const handleResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// FIX 4: Adaptive particle count
const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 12 : 32;

// FIX 5: Device capability check
const canRun3D = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  return !!gl;
};
```

### 5.3 Anime.js → GSAP Migration Map

| Anime.js Usage | GSAP Replacement |
|---------------|-----------------|
| Character blur-in stagger | `gsap.from('.char', { filter: 'blur(10px)', stagger: 0.03 })` |
| Scale pulse loop | `gsap.to('.el', { scale: 1.05, yoyo: true, repeat: -1 })` |
| Orbit rotation loop | `gsap.to('.orbit', { rotation: 360, repeat: -1, ease: 'none' })` |
| Form input glow | `gsap.to('input:focus', { boxShadow: '0 0 20px teal' })` |
| Cube entrance stagger | `gsap.from('.cube', { scale: 0, opacity: 0, stagger: 0.1 })` |

**After migration: Remove `animejs` from package.json — saves 17KB.**

---

## 6. ReactBits Integration Plan

### Recommended Components from [ReactBits](https://reactbits.dev)

#### Text Animations (Replace custom implementations)
| Component | Use Case | Replaces |
|-----------|----------|----------|
| **BlurText** | Role text reveal on hero | Custom Anime.js char blur-in |
| **SplitText** | Name animation stagger | Custom GSAP word split |
| **ScrollReveal** | Section title reveals | Custom GSAP fromTo |
| **GlitchText** | Terminal section headers | No equivalent (new effect) |
| **DecryptedText** | "Build Log" section labels | No equivalent (new effect) |
| **ShinyText** | "Available for work" badge | Custom CSS animation |
| **CountUp** | Stats section numbers | Static numbers currently |
| **ScrollFloat** | Floating text on scroll | CSS only float |
| **GradientText** | Accent text highlights | No equivalent (new) |
| **FuzzyText** | 404 page title | Static text currently |
| **ScrambledText** | Project code names | Static labels |
| **TextCursor** | Terminal input sections | Custom cursor implementation |

#### Animations (Enhance interactions)
| Component | Use Case | Replaces |
|-----------|----------|----------|
| **AnimatedContent** | Section entrance wrapper | Custom GSAP ScrollTrigger wrappers |
| **BlobCursor** | Custom cursor alternative | CustomCursor.jsx |
| **ClickSpark** | CTA button click feedback | No click feedback currently |
| **Magnet** | CTA hover magnetism | Custom cursor tracking |
| **StarBorder** | Card hover border effect | CSS border-color transition |
| **GlareHover** | Project card hover glare | No equivalent |
| **PixelTransition** | Page transitions | No page transitions |
| **SplashCursor** | Splash effect on click | No equivalent |
| **MagnetLines** | Background interaction | Static background |
| **ElectricBorder** | Active section borders | Static borders |
| **MetallicPaint** | Hero section texture | No equivalent |
| **Ribbons** | Section dividers | Hard line dividers |

#### Backgrounds (Upgrade static backgrounds)
| Component | Use Case | Replaces |
|-----------|----------|----------|
| **Aurora** | Hero section bg | CSS radial gradients |
| **Particles** | Hero particle field | Three.js particle spheres |
| **Hyperspeed** | Loading screen bg | Static dark bg |
| **Threads** | About section bg | Plain background |
| **Galaxy** | 3D section bg | Static dark bg |
| **Waves** | Contact section bg | Plain background |
| **Silk** | Footer section bg | Plain dark bg |
| **GridDistortion** | Project cards bg | Static grid pattern |
| **Iridescence** | Certificate section bg | No equivalent |
| **LiquidChrome** | Hero metallic effect | No equivalent |
| **Orb** | Animated orb bg | CSS animated orbs |
| **Lightning** | Build log section | No equivalent |

#### UI Components (Upgrade card/nav patterns)
| Component | Use Case | Replaces |
|-----------|----------|----------|
| **TiltedCard** | Project cards | Flat glass cards |
| **SpotlightCard** | Featured project | No spotlight effect |
| **ProfileCard** | About section card | Custom layout |
| **Dock** | Navigation dock | Standard nav |
| **CircularGallery** | Certificate carousel | Linear scroll |
| **FlowingMenu** | Mobile menu | Basic hamburger |
| **GlassIcons** | Social media icons | FontAwesome flat icons |
| **Lanyard** | Discord presence | No equivalent |
| **ScrollStack** | Work timeline | Linear timeline |
| **Stepper** | Form steps (contact) | Single form |
| **Stack** | Article cards stack | Grid layout |
| **PixelCard** | Skill cards | Progress bars |

### Installation
```bash
# ReactBits uses copy-paste components (no package install)
# Each component is self-contained with minimal dependencies
# Visit reactbits.dev → Copy component → Paste into project
```

---

## 7. shadcn/ui Integration Strategy

### Why shadcn/ui for a Portfolio?
- **Accessible by default** — All components follow WAI-ARIA patterns
- **Themeable** — Works with CSS variables (matches current `--chief-*` tokens)
- **Tree-shakeable** — Only include what you use
- **Headless-compatible** — Style with existing glassmorphism CSS

### Recommended shadcn/ui Components
| Component | Use Case |
|-----------|----------|
| **Button** | CTAs with loading states, variants (primary/outline/ghost) |
| **Dialog** | Certificate detail popups, project modals |
| **Sheet** | Mobile navigation drawer |
| **Tabs** | Skills section category tabs |
| **Toast** | Contact form success/error feedback |
| **Form** | Contact form with Zod validation |
| **Card** | Standardized card base for projects/articles |
| **Badge** | "Available for work", skill tags |
| **Separator** | Section dividers |
| **Tooltip** | Icon explanations, skill details |
| **Navigation Menu** | Desktop nav with dropdowns |
| **Accordion** | Work experience expandable details |
| **Avatar** | Profile image with fallback |
| **Skeleton** | Loading states for 3D/images |
| **Command** | Terminal-themed command palette (easter egg) |

### Theme Bridge: Chief → shadcn/ui
```css
/* Map chief tokens to shadcn/ui CSS variables */
:root {
  --background: 222 47% 6%;           /* #0a0e17 */
  --foreground: 290 14% 92%;          /* #eae5ec */
  --primary: 170 77% 64%;             /* #5eead4 */
  --primary-foreground: 222 47% 6%;   /* dark on teal */
  --secondary: 188 82% 53%;           /* #22d3ee */
  --muted: 215 16% 62%;              /* #94a3b8 */
  --muted-foreground: 215 16% 62%;
  --accent: 170 77% 64%;
  --border: 170 77% 64% / 0.15;       /* teal border at 15% */
  --ring: 170 77% 64%;
  --radius: 0.75rem;
  --card: 222 47% 6% / 0.6;           /* glass card bg */
}
```

---

## 8. Performance Optimization

### Current Bundle Size Estimate
| Library | Size (gzip) | Notes |
|---------|------------|-------|
| React + ReactDOM | ~42KB | Required |
| Three.js | ~150KB | Can reduce with tree-shaking |
| GSAP + ScrollTrigger | ~28KB | Required |
| Anime.js | ~7KB | **Remove after migration** |
| Lenis | ~5KB | Required |
| FontAwesome | ~30KB | Replace with Lucide (~3KB per icon) |
| styled-components | ~13KB | Only used in article reader |
| **Total JS** | **~275KB** | Target: <200KB |

### Optimization Checklist
- [ ] Code-split Three.js with `React.lazy()` — saves ~150KB initial
- [ ] Remove Anime.js after GSAP migration — saves ~7KB
- [ ] Replace FontAwesome with Lucide React — saves ~27KB
- [ ] Tree-shake Three.js imports (import specific modules, not `import * as THREE`)
- [ ] Add `loading="lazy"` to all below-fold images
- [ ] Preload Geist font: `<link rel="preload" href="...geist..." as="font">`
- [ ] Move styled-components to CSS modules (article reader)
- [ ] Add `will-change: transform` to animated elements
- [ ] Cap `devicePixelRatio` at 2 for Three.js renderer
- [ ] Implement route-based code splitting

### Core Web Vitals Targets
| Metric | Current (est.) | Target |
|--------|---------------|--------|
| LCP | ~3.5s (3D loading) | <2.5s |
| FID | ~150ms (JS parsing) | <100ms |
| CLS | ~0.15 (font swap) | <0.1 |

---

## 9. Accessibility Fixes

### Immediate Fixes Required

```jsx
// 1. Skip to content link (App.js)
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// 2. Reduced motion (index.css)
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .chief-glow-orb { display: none; }
  canvas { display: none; } /* Hide Three.js */
}

// 3. Alt text on project logos
<img src={logo} alt={`${title} project logo`} width={40} height={40} />

// 4. Social link labels
<a href={url} aria-label={`Visit ${name} profile`} target="_blank" rel="noopener noreferrer">
  <FontAwesomeIcon icon={icon} />
</a>

// 5. Focus visible styles
:focus-visible {
  outline: 2px solid var(--chief-accent);
  outline-offset: 2px;
}

// 6. Form validation
<input
  type="email"
  required
  aria-invalid={errors.email ? "true" : "false"}
  aria-describedby="email-error"
/>
{errors.email && <span id="email-error" role="alert">{errors.email}</span>}
```

---

## 10. Implementation Priority Matrix

### Phase 1: Foundation (Week 1)
- [ ] Fix GSAP cleanup patterns across all components
- [ ] Add `prefers-reduced-motion` support globally
- [ ] Add alt text, aria-labels, focus styles
- [ ] Register GSAP plugins once in App.js
- [ ] Code-split Three.js with React.lazy

### Phase 2: Migration (Week 2)
- [ ] Migrate Anime.js animations to GSAP
- [ ] Remove animejs dependency
- [ ] Fix Three.js dispose patterns
- [ ] Add responsive canvas handling
- [ ] Replace FontAwesome with Lucide

### Phase 3: Enhancement (Week 3)
- [ ] Integrate ReactBits text animations (BlurText, SplitText, DecryptedText)
- [ ] Add ReactBits backgrounds (Aurora, Particles, Silk)
- [ ] Integrate shadcn/ui Button, Toast, Form, Dialog
- [ ] Add page transitions (PixelTransition or GSAP)
- [ ] Implement CountUp for stats section

### Phase 4: Polish (Week 4)
- [ ] Add ReactBits interaction components (ClickSpark, Magnet, GlareHover)
- [ ] Implement TiltedCard / SpotlightCard for projects
- [ ] Add Dock navigation option
- [ ] Performance audit with Lighthouse
- [ ] Final accessibility audit

---

## Appendix A: ReactBits Full Component Catalog

### Text Animations (23)
ASCIIText, BlurText, CircularText, CountUp, CurvedLoop, DecryptedText, FallingText, FuzzyText, GlitchText, GradientText, RotatingText, ScrambledText, ScrollFloat, ScrollReveal, ScrollVelocity, ShinyText, Shuffle, SplitText, TextCursor, TextPressure, TextType, TrueFocus, VariableProximity

### Animations (29)
AnimatedContent, Antigravity, BlobCursor, ClickSpark, Crosshair, Cubes, ElectricBorder, FadeContent, GhostCursor, GlareHover, GradualBlur, ImageTrail, LaserFlow, LogoLoop, MagicRings, Magnet, MagnetLines, MetaBalls, MetallicPaint, Noise, OrbitImages, PixelTrail, PixelTransition, Ribbons, ShapeBlur, SplashCursor, StarBorder, StickerPeel, TargetCursor

### Backgrounds (40)
Aurora, Balatro, Ballpit, Beams, ColorBends, DarkVeil, Dither, DotGrid, EvilEye, FaultyTerminal, FloatingLines, Galaxy, GradientBlinds, Grainient, GridDistortion, GridMotion, GridScan, Hyperspeed, Iridescence, LetterGlitch, LightPillar, LightRays, Lightning, LineWaves, LiquidChrome, LiquidEther, Orb, Particles, PixelBlast, PixelSnow, Plasma, Prism, PrismaticBurst, Radar, RippleGrid, ShapeGrid, Silk, SoftAurora, Threads, Waves

### UI Components (36)
AnimatedList, BorderGlow, BounceCards, BubbleMenu, CardNav, CardSwap, Carousel, ChromaGrid, CircularGallery, Counter, DecayCard, Dock, DomeGallery, ElasticSlider, FlowingMenu, FluidGlass, FlyingPosters, Folder, GlassIcons, GlassSurface, GooeyNav, InfiniteMenu, Lanyard, MagicBento, Masonry, ModelViewer, PillNav, PixelCard, ProfileCard, ReflectiveCard, ScrollStack, SpotlightCard, Stack, StaggeredMenu, Stepper, TiltedCard

**Total: 128 components across 4 categories**

---

## Appendix B: Animation Use Case Matrix

### GSAP — Primary Engine (Keep + Expand)
| Use Case | Technique | Example |
|----------|-----------|---------|
| Section entrance | `gsap.from()` + ScrollTrigger | Fade + slide from below |
| Scroll-linked progress | `scrub: 0.8` | 3D camera movement |
| Text stagger | `stagger: { each: 0.03 }` | Name words, skill items |
| Parallax layers | `gsap.to()` + ScrollTrigger | Background depth effect |
| Timeline sequences | `gsap.timeline()` | Loading → hero → stats flow |
| Hover magnetism | `gsap.to()` + mouse event | CTA button follow cursor |
| Form focus glow | `gsap.to()` on focus | Input border + shadow |
| Exit animations | `gsap.to()` + onComplete | Page transitions |
| Pinned sections | ScrollTrigger pin | 3D showcase section |
| Counter animation | `gsap.to()` with snap | Stats numbers |

### Three.js — 3D Engine (Keep + Optimize)
| Use Case | Current | Improved |
|----------|---------|----------|
| Hero visual | Torus knot + rings + 32 particles | Same but lazy-loaded, device-adaptive |
| Vault section | Dodecahedron + orbiting cubes | Same but with dispose pattern |
| Background | N/A | Consider Three.js particle field OR ReactBits Particles |
| Page transitions | N/A | Optional: 3D dissolve effect |
| Interactive resume | N/A | Future: 3D object representing skills |

### Lenis — Smooth Scroll (Keep)
| Use Case | Current | Notes |
|----------|---------|-------|
| Homepage scroll | lerp 0.08, smoothWheel | Good — keep |
| Sub-pages | Not applied | Consider enabling globally |
| Mobile | syncTouch: true | Test on real devices |

---

## Appendix C: Design System Recommendations (UI/UX Pro Max)

### Style Match: **Glassmorphism + Dark Mode** (Score: 95/100)
- Perfect for developer portfolios — signals technical sophistication
- Teal/cyan on dark navy follows the "digital ocean" color theory
- Glass cards create depth hierarchy without heavy shadows

### Recommended Enhancements
1. **Add micro-interactions** to all clickable elements (scale 0.97 on press, spring return)
2. **Implement stagger-sequence** for list/grid items (30-50ms per item)
3. **Use spring physics** easing instead of cubic-bezier for natural feel
4. **Exit animations** should be 60-70% of enter duration
5. **Shared element transitions** between project card → project detail
6. **Crossfade** for content replacement within containers
7. **Modal motion** should animate from trigger source (scale+fade)

### Anti-Patterns to Fix
- No decorative-only animation (every animation must express cause-effect)
- No animations >500ms for micro-interactions
- No animating `width`/`height` (use `transform` only)
- No layout-shifting animations (use `transform` for position)
- No blocking animation (UI must stay interactive during animations)
