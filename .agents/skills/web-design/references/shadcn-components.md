# ?? shadcn/ui & Tailwind CSS Reference

Use these standards when building components.

---

## Quick Component CLI Reference
When installing new components into a React/Next.js project:
`ash
# Add essential layout & interactive primitives
npx shadcn@latest add button card dialog sheet dropdown-menu tabs accordion avatar badge tooltip
`

## Essential Component Architecture Patterns

### 1. The Accessible Button with States
`	sx
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

export function ActionButton({ isLoading, children, ...props }) {
  return (
    <Button
      className="group relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-offset-2"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      {children}
      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Button>
  );
}
`

### 2. Bento Grid Layout Pattern
`	sx
export function BentoGrid({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto px-4">
      {/* 2-column span feature card */}
      <div className="md:col-span-2 rounded-2xl border border-border/80 bg-card p-6 md:p-8 hover:border-primary/40 transition-colors">
        ...
      </div>
      {/* 1-column span secondary card */}
      <div className="md:col-span-1 rounded-2xl border border-border/80 bg-card p-6 md:p-8 hover:border-primary/40 transition-colors">
        ...
      </div>
    </div>
  );
}
`
