# ? Motion & Micro-Interactions Guide

Subtle, high-performance animations inspired by Meng To's design workflows.

---

## 1. Spring Physics with Framer Motion
Avoid linear easing; use natural spring damping for interactive components:
`	sx
import { motion } from "framer-motion";

export const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 24,
};

export function InteractiveCard({ title, description }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={springTransition}
      className="cursor-pointer rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-2">{description}</p>
    </motion.div>
  );
}
`

## 2. Scroll Reveal & Staggered Container
`	sx
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};
`
