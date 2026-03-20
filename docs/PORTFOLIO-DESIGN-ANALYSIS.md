---
title: "Abheet Singh Portfolio — Design Analysis & Improvement Roadmap"
version: "1.0"
date: "2026-03-20"
stack: "React 18 + GSAP + Anime.js + Three.js + Lenis"
theme: "Chief (Dark Cinematic + Teal/Cyan)"
status: "Active Development"
---

# Portfolio Design Analysis & Improvement Roadmap

## Table of Contents

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

### Current State: Three Libraries + CSS

| Library | Version | Where Used | Purpose |
|---------|---------|-----------|---------|
| **GSAP** | 3.12.7 | ChiefLanding, BuildLog, Vault3D, Protocol, Footer | ScrollTrigger, entrance animations, scroll-linked 3D |
| **Anime.js** | 4.3.6 | ChiefLanding, BuildLog, Orbit | Char-level text animations, looped pulses, form glow |
| **Three.js** | 0.168.0 | Hero3D, ArchitectVault3D | 3D torus knot, particles, orbiting cubes |
| **Lenis** | 1.1.13 | useSmoothScroll hook | Smooth scroll (homepage only) |
| **CSS** | native | Throughout | Keyframe animations (orbs, marquee, float, spin) |

### Issues Identified

#### GSAP Issues
1. **ScrollTrigger memory leaks** — Missing cleanup in some components (BuildLogSection, ArchitectFooter)
2. **Overlapping triggers** — Multiple ScrollTrigger instances on adjacent sections cause janky scroll
3. **No `scrub` consistency** — Some use `scrub: 1`, others `scrub: true`, some have no scrub
4. **Missing `prefers-reduced-motion`** — No GSAP matchMedia for accessibility
5. **Plugin registration** — `gsap.registerPlugin(ScrollTrigger)` called in multiple components instead of once globally

#### Anime.js Issues
1. **v4 API migration incomplete** — Some patterns look like v3 API mixed with v4
2. **No cleanup on unmount** — Anime.js animations not paused/removed in useEffect cleanup
3. **Redundant with GSAP** — Character stagger animations can be done with GSAP SplitText (already have GSAP)
4. **Performance conflict** — Running Anime.js and GSAP simultaneously on same elements risks timing conflicts

#### Three.js Issues
1. **No responsive canvas** — Canvas doesn't resize cleanly on window resize
2. **No dispose pattern** — Geometries, materials, and textures not disposed on unmount (GPU memory leak)
3. **No fallback for low-end devices** — Three.js renders regardless of device capability
4. **No lazy loading** — Three.js bundle (~600KB) loads immediately even if 3D section is below fold
5. **requestAnimationFrame** not cancelled on unmount in some cases
6. **Particle count hardcoded** — 32 particles regardless of device performance

#### Cross-Library Issues
1. **Bundle bloat** — GSAP (50KB) + Anime.js (17KB) + Three.js (600KB) + Lenis (15KB) = ~682KB of animation libraries
2. **No animation orchestration** — Libraries run independently, no unified timeline
3. **Duplicate capabilities** — GSAP and Anime.js both do stagger/timeline animations
4. **No loading prioritization** — All libraries load at once; should code-split Three.js

---

## 4. UI/UX Issues & Anti-Patterns

### Critical (Priority 1 — Accessibility)
| Issue | Location | Rule Violated |
|-------|----------|---------------|
| No `alt` text on project logos | `project.jsx` | `alt-text` |
| No `aria-label` on icon-only social links | `socials.jsx`, `ArchitectFooter.jsx` | `aria-labels` |
| No `prefers-reduced-motion` support | Global | `reduced-motion` |
| Focus rings removed on buttons | `chief-theme.css` | `focus-states` |
| Color contrast on `--chief-muted` (#94a3b8) vs `--chief-bg` (#0a0e17) | Global | `color-contrast` — ratio is ~5.2:1 (passes AA but barely) |
| No skip-to-content link | `App.js` | `skip-links` |
| Custom cursor hides native focus | `CustomCursor.jsx` | `keyboard-nav` |

### High (Priority 2 — Interaction & Navigation)
| Issue | Location | Rule Violated |
|-------|----------|---------------|
| No loading/disabled state on CTA buttons | `ChiefLanding.jsx` | `loading-buttons` |
| Contact form has no validation | `ArchitectProtocol.jsx` | `error-feedback` |
| No back-to-top on long homepage | Homepage | `back-behavior` |
| Mobile nav hamburger has no animation | `navBar.jsx` | `state-transition` |
| 3D canvas blocks scroll on touch devices | `Hero3D.jsx` | `gesture-conflicts` |
| Social links open in same tab | `socials.jsx` | Standard UX |
| No 404 page animation | `404.jsx` | `empty-states` |

### Medium (Priority 3 — Performance & Layout)
| Issue | Location | Rule Violated |
|-------|----------|---------------|
| No lazy loading on images | Throughout | `lazy-loading` |
| Three.js not code-split | `Hero3D.jsx`, `ArchitectVault3D.jsx` | `bundle-splitting` |
| No skeleton screens | Loading states | `progressive-loading` |
| Font not preloaded | `index.html` | `font-preload` |
| No `image-dimension` declarations | Image elements | `content-jumping` |
| CSS files not critical-path optimized | Multiple imports | `critical-css` |
| Scrollbar custom styling heavy | `app.css` | `reduce-reflows` |

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
