# ? Accessibility & Performance Quality Gate

Enforce senior engineering standards (Addy Osmani workflows).

---

## 1. WCAG 2.1 AA Accessibility Checklist
- [ ] **Headings**: Single <h1> per page; logical descent (<h1> -> <h2> -> <h3>) without skipping levels.
- [ ] **Contrast**: 
  - Body text: >= 4.5:1 against background.
  - Large text (>=18pt or bold >=14pt): >= 3:1.
  - Form borders / focus rings: >= 3:1 against surrounding space.
- [ ] **Keyboard Interaction**:
  - Visible focus indicator (ocus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none).
  - Dropdowns/Modals dismissible with Escape.
- [ ] **Screen Readers**:
  - All images have contextual lt descriptions.
  - Decorative icons use ria-hidden="true".
  - Icon buttons have <span className="sr-only">Label</span> or ria-label.

---

## 2. Core Web Vitals Optimization Checklist
- [ ] **LCP (Largest Contentful Paint < 2.5s)**:
  - Preload main hero image with priority / <link rel="preload">.
  - Serve modern web formats (WebP / AVIF).
- [ ] **CLS (Cumulative Layout Shift < 0.1)**:
  - Set explicit width and height or spect-ratio on all images, videos, and ads.
  - Reserve space for dynamic content / banners.
- [ ] **INP (Interaction to Next Paint < 200ms)**:
  - Break up long tasks (>50ms).
  - Use debouncing or throttling on live search and resize listeners.
