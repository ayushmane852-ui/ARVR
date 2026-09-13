# ?? Trending Interactive Effects & Scroll Mechanics Catalog

Complete copy-paste production components using React, Tailwind CSS, Framer Motion, and GSAP.

---

## 1. 3D Perspective Card Tilt with Specular Glare
*Tracks normalized cursor position `[-0.5, 0.5]` driving `rotateX` and `rotateY` via spring physics, with dynamic specular glare.*

```tsx
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const PerspectiveCard3D: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), { stiffness: 250, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), { stiffness: 250, damping: 25 });

  const glareX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div style={{ perspective: 1000 }} className="inline-block">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-80 h-96 rounded-2xl bg-zinc-900 border border-zinc-800/80 p-6 overflow-hidden shadow-2xl cursor-pointer group"
      >
        <motion.div
          className="pointer-events-none absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-soft-light"
          style={{
            background: `radial-gradient(circle 350px at ${glareX} ${glareY}, rgba(255,255,255,0.22), transparent 70%)`,
          }}
        />
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 h-full flex flex-col justify-between">
          <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700/60 flex items-center justify-center font-bold text-white shadow-inner">
            ?
          </div>
          <div>
            <h4 className="text-xl font-bold text-white tracking-tight">Haptic Precision</h4>
            <p className="text-zinc-400 text-sm mt-1">Calibrated spring kinematics with specular illumination.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
```

---

## 2. Cursor-Tracking Spotlight Card (Zero Re-render)
*Uses CSS variables `--mouse-x` and `--mouse-y` for 60fps radial border and surface glow.*

```tsx
import React, { useRef } from "react";

export const SpotlightCard: React.FC<{ title: string; desc: string }> = ({ title, desc }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl border border-zinc-800 bg-zinc-950 p-8 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.1), transparent 80%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(250px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.3), transparent 70%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <h4 className="text-xl font-semibold text-zinc-100">{title}</h4>
      <p className="mt-2 text-zinc-400 text-sm">{desc}</p>
    </div>
  );
};
```

---

## 3. Magnetic Action Button with Spring Physics
*Pulls button and label towards pointer within a 40px aura, snapping back elastically on leave.*

```tsx
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const MagneticButton: React.FC<{ children: React.ReactNode; pullStrength?: number }> = ({
  children,
  pullStrength = 0.35,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (e.clientX - centerX) * pullStrength;
    const deltaY = (e.clientY - centerY) * pullStrength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative px-8 py-4 rounded-full bg-white text-zinc-950 font-medium text-sm tracking-wide shadow-lg hover:shadow-xl active:scale-95 transition-shadow"
    >
      <motion.span style={{ x: useSpring(x, { stiffness: 220, damping: 18 }) }} className="inline-block">
        {children}
      </motion.span>
    </motion.button>
  );
};
```

---

## 4. Border Beam / Animated Gradient Ray
*Running laser ray orbiting card borders using CSS `offsetPath`.*

```tsx
import React from "react";

export const BorderBeam: React.FC<{
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
}> = ({
  size = 180,
  duration = 8,
  borderWidth = 1.5,
  colorFrom = "#ffffff",
  colorTo = "#3b82f6",
}) => {
  return (
    <div
      style={{
        ["--size" as string]: `${size}px`,
        ["--duration" as string]: `${duration}s`,
        ["--border-width" as string]: `${borderWidth}px`,
        ["--color-from" as string]: colorFrom,
        ["--color-to" as string]: colorTo,
      }}
      className="pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]"
    >
      <div
        className="absolute aspect-square w-[var(--size)] bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent"
        style={{
          offsetPath: "rect(0 auto auto 0 round calc(var(--border-width) * 1px))",
          animation: "border-beam calc(var(--duration) * 1s) infinite linear",
        }}
      />
    </div>
  );
};
```

---

## 5. Dynamic Dock Magnification (macOS Style)
*Gaussian bell-curve scaling with Framer Motion springs.*

```tsx
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

const DockIcon: React.FC<{ mouseX: MotionValue<number>; label: string }> = ({ mouseX, label }) => {
  const iconRef = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = iconRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [44, 80, 44]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 220, damping: 14 });

  return (
    <motion.div
      ref={iconRef}
      style={{ width, height: width }}
      className="rounded-2xl bg-zinc-800/90 border border-zinc-700/60 shadow-lg flex items-center justify-center cursor-pointer hover:bg-zinc-700 transition-colors"
    >
      <span className="text-zinc-300 text-xs font-mono">{label}</span>
    </motion.div>
  );
};

export const DynamicDock: React.FC = () => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 flex h-16 items-end gap-3 rounded-2xl bg-zinc-950/70 backdrop-blur-xl border border-zinc-800/80 px-4 pb-2 shadow-2xl"
    >
      {["Home", "Code", "Docs", "Team", "Vault"].map((name) => (
        <DockIcon key={name} mouseX={mouseX} label={name.slice(0, 3)} />
      ))}
    </div>
  );
};
```

---

## 6. Lenis Smooth Scroll + GSAP ScrollTrigger Integration
*Virtual momentum scroll normalized across browsers, synced to GSAP.*

```tsx
import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
};
```

---

## 7. Text Scrub / Character-by-Character Scroll Reveal
*Scrubs opacity, blur, and vertical translation as text traverses viewport.*

```tsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface WordProps {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const Word: React.FC<WordProps> = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const filter = useTransform(progress, range, ["blur(4px)", "blur(0px)"]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <motion.span style={{ opacity, filter, y }} className="inline-block mr-2 transition-colors duration-200">
      {children}
    </motion.span>
  );
};

export const TextScrollScrub: React.FC<{ text: string }> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className="py-24 max-w-4xl mx-auto px-6">
      <p className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-100 leading-relaxed flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} range={[start, end]} progress={scrollYProgress}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
};
```

---

## 8. Sticky Stacking Cards (Deck of Cards Scroll)
*Earlier cards scale down and dim as newer cards pin above them.*

```tsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface CardData {
  id: number;
  title: string;
  description: string;
  badge: string;
  bg: string;
}

const CARDS: CardData[] = [
  { id: 1, title: "Autonomous Planning", badge: "Engine", description: "Multi-agent task decomposition.", bg: "from-zinc-900 to-zinc-950" },
  { id: 2, title: "Deterministic Tooling", badge: "Runtime", description: "Sandboxed execution and schema validation.", bg: "from-zinc-800 to-zinc-900" },
  { id: 3, title: "Zero Layout Shift", badge: "Performance", description: "Sub-50ms INP and Core Web Vitals guarantees.", bg: "from-neutral-900 to-stone-950" },
];

const CardItem: React.FC<{ card: CardData; index: number; total: number; progress: any }> = ({
  card,
  index,
  total,
  progress,
}) => {
  const targetScale = 1 - (total - index - 1) * 0.05;
  const range = [index * (1 / total), 1];
  const scale = useTransform(progress, range, [1, targetScale]);
  const brightness = useTransform(progress, range, [1, 0.7]);

  return (
    <div className="sticky top-24 flex items-center justify-center mb-12">
      <motion.div
        style={{
          scale,
          filter: useTransform(brightness, (b) => `brightness(${b})`),
          top: `calc(10% + ${index * 32}px)`,
        }}
        className={`w-full max-w-2xl rounded-3xl border border-zinc-700/60 p-8 shadow-2xl bg-gradient-to-b ${card.bg} text-white`}
      >
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-700/50 text-zinc-300 border border-zinc-600/40">
          {card.badge}
        </span>
        <h3 className="text-2xl font-bold mt-4 tracking-tight">{card.title}</h3>
        <p className="text-zinc-400 mt-2 text-base leading-relaxed">{card.description}</p>
      </motion.div>
    </div>
  );
};

export const StackingCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative py-20">
      {CARDS.map((card, i) => (
        <CardItem key={card.id} card={card} index={i} total={CARDS.length} progress={scrollYProgress} />
      ))}
    </div>
  );
};
```
