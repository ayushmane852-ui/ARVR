---
name: web-design
description: >-
  All-in-one website designing and building super-skill. Combines Anthropic frontend-design (anti-AI-slop aesthetics, typography, color harmony), Meng To UI & motion (creative animations, high-end hero sections), shadcn/ui & Tailwind CSS component craft, Addy Osmani engineering workflows (/spec, /plan, /build, /motion, /a11y, /perf, /review), and modern high-hype interactive effects from Aceternity UI, Magic UI, 21st.dev, and UI Labs (Lenis smooth scroll, sticky stacking cards, text scrub reveal, 3D card tilt with glare, magnetic buttons, spotlight cards, border beams, dynamic dock, and glassmorphic grain). Activate whenever the user asks to design, build, redesign, style, or review a webpage, landing page, web app, or frontend component, or when they use /web-design, /design, /webcraft, /effects, /scroll, or any frontend subcommands.
---

# ?? Web Design & Builder Super-Skill (`/web-design`)

This super-skill unifies the industry's highest-tier agent playbooks, design systems, and modern interactive effect libraries into a single autonomous workflow:
1. **Aesthetic Direction & Anti-AI Slop** (Anthropic `frontend-design`)
2. **Creative Motion & Visual Polish** (Meng To `Skills` & Emil Kowalski `UI Labs`)
3. **Component Craft & Architecture** (`shadcn/ui` + Tailwind CSS v3/v4)
4. **Engineering Rigor & SDLC** (Addy Osmani `agent-skills`: spec, plan, a11y, webperf, review)
5. **High-Hype Modern Effects** (Aceternity UI, Magic UI, 21st.dev, Awwwards-grade interactions)
6. **Kinetic Scroll Mechanics** (Lenis smooth scroll, GSAP ScrollTrigger, sticky card stacking, text scrub)

---

## ? Slash Commands & Quick Subcommands

You can invoke this skill with the master command or target a specific phase:

| Command | Action / Mode | Key Output |
| :--- | :--- | :--- |
| **`/web-design`** or **`/webcraft`** | **Full Pipeline** | Runs the complete sequence: Spec -> Aesthetic Choice -> Component Build -> Motion/Effects -> Audit. |
| **`/web-design effects`** or **`/effects`** | **Interactive Effects Engine** | Injects high-hype interactive effects: 3D tilt, spotlight glow, magnetic button, border beam, dynamic dock, or marquee. |
| **`/web-design scroll`** or **`/scroll`** | **Kinetic Scroll Engine** | Implements Lenis smooth scroll, sticky stacking card decks, text scrub reveal, or horizontal pinned galleries. |
| **`/web-design spec`** or **`/spec`** | **Requirements & UX** | Defines audience, user flows, content hierarchy, and page goals before coding. |
| **`/web-design design`** or **`/design`** | **Aesthetics & Tokens** | Commits to an opinionated visual archetype, custom fonts, color palette, and mood (Anti-AI Slop). |
| **`/web-design build`** or **`/build`** | **Component & Code** | Builds semantic HTML/React using `shadcn/ui`, Tailwind CSS tokens, and responsive layout. |
| **`/web-design motion`** or **`/motion`** | **Animations & Micro-interactions** | Implements fluid spring physics, scroll reveals, hover states, and transitions. |
| **`/web-design a11y`** or **`/a11y`** | **Accessibility Audit** | Audits WCAG 2.1 AA compliance, ARIA attributes, keyboard navigation, and contrast. |
| **`/web-design perf`** or **`/perf`** | **Web Performance** | Optimizes Core Web Vitals (LCP, CLS, INP), asset sizes, lazy-loading, and DOM depth. |
| **`/web-design review`** or **`/review`** | **Design & Code Review** | Critiques against AI clich?s, checks visual hierarchy, and refines polish. |

---

## ?? Phase 1: `/spec` (Design Grounding & UX Architecture)
*Never write UI code blindly. First establish who the website is for and what problem it solves.*

1. **Product Identity & Goal**:
   - What is the product or brand?
   - What is the primary conversion or takeaway (Sign Up, Buy, Schedule Demo, Read, Explore)?
2. **Target Audience & Tone**:
   - Technical developers? Corporate executives? Creative artists? Everyday consumers?
   - Tone keywords: Minimalist, authoritative, playful, rebellious, editorial, or luxurious.
3. **Content & Reading Architecture**:
   - Top-down visual hierarchy: Hero -> Value Proposition -> Social Proof -> Features / Capabilities -> Interactive Showcase -> Call to Action -> Footer.
4. **Device Targets**:
   - Mobile-first approach: design for 375px (mobile) -> 768px (tablet) -> 1280px+ (desktop).

---

## ?? Phase 2: `/design` (Anti-AI Slop & Aesthetic Direction)
*Reject AI clich?s: no generic purple-indigo gradients, rounded gray cards, or boring unconfigured Inter font.*

### 1. Select an Explicit Visual Archetype
Commit to ONE distinct personality before generating CSS or components:

*   **?? Clean Editorial / Modern Journal**:
    *   *Typography*: High-contrast serif headings (Fraunces, Playfair Display, Instrument Serif) + clean sans body (Plus Jakarta Sans, Inter).
    *   *Palette*: Warm paper background (`#F9F9F6`), deep charcoal ink (`#1A1A1A`), single accent color (terracotta `#C85A32` or forest `#2D4F3E`).
    *   *Structure*: Generous whitespace, hairline divider rules (`border-stone-200`), asymmetric editorial columns.

*   **? Modern Precision SaaS / Bento Tech**:
    *   *Typography*: Crisp technical neo-grotesk (Geist Sans, Archivo, Space Grotesk).
    *   *Palette*: Dark charcoal/zinc (`#09090B`), subtle 1px border dividers (`border-zinc-800/80`), luminous radial spotlight or ambient glow (`bg-gradient-to-b from-zinc-900 to-zinc-950`).
    *   *Structure*: Bento grid layout, subtle glassmorphism (`backdrop-blur-md bg-zinc-900/60`), monospace metadata pills.

*   **?? Neo-Brutalist**:
    *   *Typography*: Heavy geometric monospace or chunky grotesque (Syne, Clash Display, Space Mono).
    *   *Palette*: Stark white/cream background, deep pitch-black borders (`border-2 border-black`), vibrant saturated pops (electric yellow `#FFEB3B`, neo-mint `#00FFB2`, safety orange `#FF5722`).
    *   *Structure*: Hard drop-shadows with no blur (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`), sharp badges, deliberate raw edges.

*   **? Craft / Luxury**:
    *   *Typography*: Elegant geometric or humanist sans (Cinzel, Cabinet Grotesk, General Sans).
    *   *Palette*: Deep obsidian slate (`#0B0D13`), champagne gold or muted bronze accents (`#D4AF37`, `#A38F78`), velvety dark cards.
    *   *Structure*: Fine hairline borders, subtle noise/grain texture, ambient illumination, generous padding.

### 2. Semantic Token System (CSS Variables)
Never write hardcoded hex values in component markup. Always use design tokens:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --border: 240 5.9% 90%;
  --radius: 0.75rem;
}
```

---

## ?? Phase 3: `/build` (Component Craft & Tailwind Discipline)

### 1. Leverage shadcn/ui Primitives
*   **Don't Reinvent Accessible Wheels**: Use `shadcn/ui` components (built on Radix UI / Base UI) for complex, accessible controls:
    *   Modals & Drawers: `Dialog`, `Sheet`
    *   Menus: `DropdownMenu`, `NavigationMenu`
    *   Layout & Organizers: `Accordion`, `Tabs`, `ScrollArea`
    *   Feedback: `Toast`, `Alert`, `Skeleton`, `Tooltip`
*   **Component Architecture**:
    *   Break views into modular, single-responsibility components (`<HeroSection />`, `<FeatureBento />`, `<PricingCard />`).
    *   Keep props strictly typed with TypeScript.

### 2. Spacing & Spatial Rhythm (4px / 8px Scale)
*   Standardize padding and gaps: `p-4`, `p-6`, `p-8`, `p-12`, `p-16` / `gap-4`, `gap-6`, `gap-8`.
*   Container discipline: Keep content centered and readable (`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`).
*   Media containers: Always enforce aspect ratios (`aspect-video`, `aspect-square`, `aspect-[4/3]`) to prevent cumulative layout shift (CLS).

---

## ?? Phase 4: `/effects` (High-Hype Modern Micro-Interactions)
*Incorporate battle-tested components from Aceternity UI, Magic UI, 21st.dev, and UI Labs (Emil Kowalski).*
*See [references/trending-effects-catalog.md](./references/trending-effects-catalog.md) for complete copy-paste code.*

1. **3D Perspective Card Tilt with Specular Glare**:
   - Normalized cursor tracking `[-0.5, 0.5]` driving `rotateX` and `rotateY` via spring physics (`{ stiffness: 250, damping: 25 }`).
   - Dynamic radial gradient glare overlay simulating real-time specular reflection.
   - Elevation in Z-space with `transform: translateZ(30px)`.
2. **Cursor-Tracking Spotlight Cards**:
   - Expose cursor coordinates via CSS variables `--mouse-x` and `--mouse-y` for 60fps performance without React re-renders.
   - Dual radial gradients for soft card surface illumination and sharp border glow mask.
3. **Magnetic Action Buttons**:
   - 40px aura radius pulling button and inner icon towards cursor using spring kinematics (`stiffness: 180, damping: 15`).
   - Elastic snap-back on mouse leave.
4. **Border Beam / Animated Gradient Ray**:
   - Running laser ray orbiting card borders using CSS `offsetPath: rect(...)` or conic gradients.
   - Perfect for primary CTA cards, featured tiers, or badge borders.
5. **Dynamic Dock Magnification (macOS Style)**:
   - Gaussian bell curve scaling based on cursor proximity (44px base -> 80px peak magnification).
   - Fluid Framer Motion `useSpring` inertia preservation.
6. **Glassmorphic Specular Noise Backdrop**:
   - Photorealistic dark glass: `backdrop-blur-2xl` + `border border-white/10` + inner specular top hairline + procedural SVG fractal noise overlay (`mix-blend-overlay opacity-[0.035]`).

---

## ?? Phase 5: `/scroll` (Kinetic Scroll Mechanics)
*Transform static scrolling into a cinematic, tactile experience.*
*See [references/trending-effects-catalog.md](./references/trending-effects-catalog.md) for complete code.*

1. **Lenis Smooth Scroll Engine + GSAP ScrollTrigger**:
   - Virtual momentum-based scrolling normalizing trackpads and mouse wheels across browsers.
   - Synchronization with GSAP ScrollTrigger via `gsap.ticker` for single-loop performance.
2. **Text Scrub / Character-by-Character Scroll Reveal**:
   - Smoothly reveals text by scrubbing `opacity` (0.15 -> 1.0) and `filter: blur(4px)` -> `blur(0px)` on each word via `useScroll`.
3. **Sticky Stacking Cards (Deck of Cards Scroll)**:
   - Cards pin to the top with `position: sticky`. Earlier cards scale down (`scale: 0.92`) and dim (`brightness: 0.7`) as new cards slide over.
4. **Velocity-Based Skew on Scroll**:
   - Instantaneous scroll velocity captured with `useVelocity(scrollY)` and mapped to organic container tilt (`skewY: -8deg` to `+8deg`).
5. **Pinned Horizontal Gallery**:
   - Container pinned vertically with GSAP ScrollTrigger (`pin: true, scrub: 1`), driving horizontal track translation.

---

## ? Phase 6: `/a11y` (Accessibility Quality Gate)
- [ ] **Contrast Ratios**: Minimum 4.5:1 for body copy and 3:1 for large headlines.
- [ ] **Semantic Structure**: Single `h1`, logical descent (`h1` -> `h2` -> `h3`), landmark tags (`<header>`, `<main>`, `<nav>`, `<footer>`).
- [ ] **Keyboard Navigation**: All interactive elements reachable via `Tab`, visually focused with high-contrast rings, and activated via `Enter` / `Space`.
- [ ] **Reduced Motion**: Respect `prefers-reduced-motion` - disable 3D tilt, velocity skew, and heavy parallax when requested by the OS.
- [ ] **Screen Readers**: Decorative icons marked with `aria-hidden="true"`, icon-only buttons equipped with `aria-label` or `<span className="sr-only">`.

---

## ?? Phase 7: `/perf` (Core Web Vitals & Performance)
- [ ] **LCP (Largest Contentful Paint < 2.5s)**: Hero image preloaded with `priority` / `<link rel="preload">`, modern WebP/AVIF format.
- [ ] **CLS (Cumulative Layout Shift < 0.1)**: Set explicit `width` and `height` or `aspect-ratio` on all images, videos, and canvas layers.
- [ ] **INP (Interaction to Next Paint < 200ms)**: Defer heavy computations; avoid blocking main-thread JS during user clicks; use `transform-gpu` / `will-change-transform` for 60fps animations.

---

## ?? Phase 8: `/review` (Final Polish & Anti-Clich? Checklist)
Before concluding any design task, audit against this checklist:
- [ ] Does this design look like a unique, intentional human craft, or generic template output?
- [ ] Are all padding, margins, and gaps using consistent tokens?
- [ ] Does the page adapt cleanly from 375px mobile screens up to 1440px desktop displays?
- [ ] Do all buttons and links have hover, active, and accessible focus states?
- [ ] Is there zero horizontal scroll overflow on mobile?
