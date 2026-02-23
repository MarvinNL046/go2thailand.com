# Phase 1: Foundation — Design System, Header & Footer

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Establish the new Tripex-inspired design system foundation (fonts, colors, spacing, animations, decorative SVGs) and redesign the Header + Footer that wrap every page on the site.

**Architecture:** Update Tailwind config and globals.css with new design tokens, create a reusable SVG decoration library, build a scroll-animation hook, then rewrite Header (transparent→solid on scroll) and Footer (4-col modern layout). All changes are in the shared shell that wraps every page — no individual page changes yet.

**Tech Stack:** Next.js 14, Tailwind CSS 3.3, React 18, TypeScript

**Reference:** Design doc at `docs/plans/2026-02-23-tripex-redesign-design.md`, template at https://html.pixelfit.agency/tripex/index.html

---

### Task 1: Update Design Tokens — tailwind.config.js

**Files:**
- Modify: `tailwind.config.js`

**Step 1: Update the Tailwind config with new fonts, colors, and spacing**

Replace the entire file with:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        thailand: {
          red: {
            DEFAULT: '#ED1C24',
            50: '#FEF2F2',
            100: '#FEE2E2',
            200: '#FECACA',
            300: '#FCA5A5',
            400: '#F87171',
            500: '#ED1C24',
            600: '#DC2626',
            700: '#B91C1C',
            800: '#991B1B',
            900: '#7F1D1D',
          },
          blue: {
            DEFAULT: '#2D2A4A',
            50: '#F8F9FB',
            100: '#F1F3F6',
            200: '#E1E5ED',
            300: '#CED5E0',
            400: '#9CA3AF',
            500: '#2D2A4A',
            600: '#252142',
            700: '#1E1B35',
            800: '#161428',
            900: '#0F0D1B',
          },
          white: '#FFFFFF',
          gold: {
            DEFAULT: '#F5A623',
            50: '#FFF8ED',
            100: '#FFEDD5',
            200: '#FED7AA',
            300: '#FDBA74',
            400: '#FB923C',
            500: '#F5A623',
            600: '#EA580C',
            700: '#C2410C',
            800: '#9A3412',
            900: '#7C2D12',
          }
        },
        surface: {
          cream: '#FDF8F3',
          dark: '#1A1A2E',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        script: ['Kalam', 'cursive'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSoft: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(-2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

Key changes:
- Gold adjusted from `#FFD700` to warmer `#F5A623`
- New `surface.cream` (#FDF8F3) and `surface.dark` (#1A1A2E)
- New font families: `font-heading` (DM Sans), `font-script` (Kalam)
- New animations: `fade-up`, `slide-in-left`, `slide-in-right`, `float`

**Step 2: Verify build doesn't break**

Run: `cd /home/marvin/Projecten/go2thailand.com && npx next build 2>&1 | tail -5`
Expected: Build completes (or at least no Tailwind config errors)

**Step 3: Commit**

```bash
git add tailwind.config.js
git commit -m "feat: update design tokens for Tripex-style redesign

Add DM Sans + Kalam font families, surface colors, warmer gold,
and new scroll animations (fade-up, slide-in-left/right, float)."
```

---

### Task 2: Update Global Styles — globals.css

**Files:**
- Modify: `styles/globals.css`

**Step 1: Update globals.css with new fonts, animations, and component classes**

Replace the entire file with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=Inter:wght@300;400;500;600;700&family=Kalam:wght@400;700&display=swap');

/* Custom Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes expandWidth {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

@keyframes glow {
  0% {
    box-shadow: 0 0 5px rgba(219, 39, 119, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(219, 39, 119, 0.8), 0 0 30px rgba(219, 39, 119, 0.6);
  }
  100% {
    box-shadow: 0 0 5px rgba(219, 39, 119, 0.5);
  }
}

@keyframes counterUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation Classes */
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-slideInUp {
  animation: slideInUp 0.8s ease-out forwards;
}

.animate-expandWidth {
  animation: expandWidth 0.6s ease-out forwards;
}

.animate-blink {
  animation: blink 1s infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

/* Scroll-triggered animation classes */
.scroll-fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-fade-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.scroll-fade-in {
  opacity: 0;
  transition: opacity 0.6s ease-out;
}

.scroll-fade-in.is-visible {
  opacity: 1;
}

.scroll-slide-left {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-slide-left.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.scroll-slide-right {
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-slide-right.is-visible {
  opacity: 1;
  transform: translateX(0);
}

/* Stagger delays for children */
.stagger-1 { transition-delay: 0.1s; }
.stagger-2 { transition-delay: 0.2s; }
.stagger-3 { transition-delay: 0.3s; }
.stagger-4 { transition-delay: 0.4s; }
.stagger-5 { transition-delay: 0.5s; }

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .scroll-fade-up,
  .scroll-fade-in,
  .scroll-slide-left,
  .scroll-slide-right {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* Ezoic Cookie Consent Banner Customization */
/* Make the cookie banner MUCH more subtle and less overwhelming */

/* Target ALL possible consent modal containers */
.ez__cmp-wrapper,
.ez__cmp-modal,
[class*="cmp-wrapper"],
[class*="consent-wrapper"],
[class*="consent-modal"],
[class*="cookie-banner"],
[class*="cookie-modal"],
[class*="gdpr"],
#gdpr-consent-tool-wrapper,
.gdpr-consent-tool-wrapper {
  z-index: 9999 !important; /* Lower from default very high z-index */
}

/* Make the overlay much lighter or remove it */
.ez__cmp-overlay,
[class*="cmp-overlay"],
[class*="consent-overlay"],
[class*="modal-backdrop"] {
  background-color: rgba(0, 0, 0, 0.1) !important; /* Very light overlay */
  backdrop-filter: blur(2px) !important;
}

/* Make the consent modal MUCH smaller and position it at bottom corner */
.ez__cmp-modal-content,
[class*="cmp-modal-content"],
[class*="cmp-container"],
[class*="consent-container"],
[class*="consent-content"],
[class*="cookie-content"],
[class*="gdpr-content"],
.gdpr-consent-tool {
  max-width: 350px !important;
  width: 90% !important;
  max-height: 300px !important;
  position: fixed !important;
  bottom: 20px !important;
  right: 20px !important;
  left: auto !important;
  top: auto !important;
  margin: 0 !important;
  transform: none !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  font-size: 13px !important;
  overflow-y: auto !important;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .ez__cmp-modal-content,
  [class*="cmp-modal-content"],
  [class*="cmp-container"],
  [class*="consent-container"],
  [class*="consent-content"],
  [class*="cookie-content"],
  [class*="gdpr-content"],
  .gdpr-consent-tool {
    max-width: calc(100% - 20px) !important;
    width: calc(100% - 20px) !important;
    bottom: 10px !important;
    right: 10px !important;
    left: 10px !important;
  }
}

/* Reduce ALL padding */
.ez__cmp-modal-body,
[class*="cmp-body"],
[class*="cmp-content"],
[class*="consent-body"],
[class*="gdpr-body"],
div[class*="padding"] {
  padding: 1rem !important;
  margin: 0 !important;
}

/* Make ALL buttons smaller */
.ez__cmp-button,
[class*="cmp-button"],
[class*="consent-button"],
[class*="cookie-button"],
[class*="gdpr-button"],
button[class*="accept"],
button[class*="reject"],
button[class*="save"] {
  padding: 0.4rem 1rem !important;
  font-size: 13px !important;
  border-radius: 6px !important;
  min-height: auto !important;
  line-height: 1.2 !important;
}

/* Make ALL text smaller */
.ez__cmp-text,
[class*="cmp-text"],
[class*="cmp-description"],
[class*="consent-text"],
[class*="consent-description"],
[class*="gdpr-text"],
.ez__cmp-modal-content p,
[class*="cmp-modal-content"] p,
[class*="consent-container"] p,
[class*="gdpr-content"] p {
  font-size: 13px !important;
  line-height: 1.4 !important;
  margin-bottom: 0.5rem !important;
}

/* Make titles smaller */
.ez__cmp-title,
[class*="cmp-title"],
[class*="cmp-heading"],
[class*="consent-title"],
[class*="consent-heading"],
[class*="gdpr-title"],
.ez-modal h1,
.ez-modal h2,
.ez-modal h3,
.ez-modal h4,
[class*="consent"] h1,
[class*="consent"] h2,
[class*="consent"] h3,
[class*="consent"] h4 {
  font-size: 16px !important;
  margin-bottom: 0.75rem !important;
  font-weight: 600 !important;
}

/* Hide unnecessary elements */
[class*="cmp-logo"],
[class*="consent-logo"],
[class*="powered-by"],
[class*="vendor-list"],
[class*="show-vendors"] {
  display: none !important;
}

/* Compact the button container */
[class*="button-container"],
[class*="cmp-buttons"],
[class*="consent-buttons"],
[class*="action-buttons"] {
  display: flex !important;
  gap: 0.5rem !important;
  margin-top: 0.75rem !important;
}

/* Force smaller spacing everywhere */
* {
  --cmp-spacing: 0.5rem !important;
  --cmp-gap: 0.5rem !important;
}

@layer base {
  html {
    font-family: 'Inter', system-ui, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'DM Sans', 'Inter', system-ui, sans-serif;
  }

  body {
    @apply bg-surface-cream text-gray-700;
  }

  /* Prevent horizontal scroll on mobile while allowing sticky positioning */
  html {
    overflow-x: hidden;
  }

  body {
    overflow-x: hidden;
    /* Allow vertical scrolling for sticky elements */
    overflow-y: auto;
  }

  /* Ensure proper width constraint */
  body > * {
    max-width: 100%;
  }
}

@layer components {
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .btn-primary {
    @apply bg-thailand-red text-white px-6 py-3 rounded-xl font-medium hover:bg-thailand-red-600 transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2;
  }

  .btn-secondary {
    @apply border-2 border-thailand-blue text-thailand-blue px-6 py-3 rounded-xl font-medium hover:bg-thailand-blue hover:text-white transition-all duration-300 inline-flex items-center gap-2;
  }

  .btn-outline {
    @apply border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:border-thailand-red hover:text-thailand-red transition-all duration-300 inline-flex items-center gap-2;
  }

  .card {
    @apply bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden;
  }

  .section-padding {
    @apply py-16 lg:py-24;
  }

  .section-label {
    @apply font-script text-thailand-red text-lg lg:text-xl mb-2 block;
  }

  .section-title {
    @apply font-heading text-3xl lg:text-5xl font-bold text-gray-900 leading-tight;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

Key changes from current:
- Added DM Sans + Kalam font imports
- DM Sans auto-applied to all headings via `@layer base`
- Body background changed from `bg-gray-50` to `bg-surface-cream`
- `btn-primary` changed: now thailand-red (was thailand-blue), rounded-xl, shadow, inline-flex
- `btn-secondary` updated: rounded-xl, inline-flex
- New `btn-outline` class
- `card` updated: rounded-2xl, hover shadow transition
- `section-padding` increased: py-16 lg:py-24 (was py-12 lg:py-16)
- New `section-label` class (Kalam script font, red)
- New `section-title` class (DM Sans, bigger sizing)
- New scroll-triggered animation classes with `prefers-reduced-motion` support
- Stagger delay utilities

**Step 2: Commit**

```bash
git add styles/globals.css
git commit -m "feat: update globals.css with new design system

Add DM Sans headings, Kalam script labels, warm cream background,
updated button styles, scroll animations, and section utilities."
```

---

### Task 3: Update _document.tsx — Preconnect to Google Fonts

**Files:**
- Modify: `pages/_document.tsx`

**Step 1: Add Google Fonts preconnect**

Add these lines inside `<Head>` before the production-only block (after line 18):

```tsx
{/* Google Fonts preconnect */}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```

This ensures DM Sans + Kalam load fast.

**Step 2: Commit**

```bash
git add pages/_document.tsx
git commit -m "feat: add Google Fonts preconnect for DM Sans and Kalam"
```

---

### Task 4: Create Decorative SVG Components

**Files:**
- Create: `components/decorations/AirplaneDecoration.tsx`
- Create: `components/decorations/PalmTreeDecoration.tsx`
- Create: `components/decorations/CloudDecoration.tsx`
- Create: `components/decorations/DottedPath.tsx`
- Create: `components/decorations/index.ts`

**Step 1: Create the decoration components directory and barrel export**

Create `components/decorations/AirplaneDecoration.tsx`:
```tsx
interface Props {
  className?: string;
}

export default function AirplaneDecoration({ className = '' }: Props) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M45 15L70 35L45 30L50 55L40 35L10 45L35 30L30 5L45 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="42" cy="28" r="2" fill="currentColor"/>
    </svg>
  );
}
```

Create `components/decorations/PalmTreeDecoration.tsx`:
```tsx
interface Props {
  className?: string;
}

export default function PalmTreeDecoration({ className = '' }: Props) {
  return (
    <svg className={className} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 120V55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M50 55C50 55 30 35 15 40C15 40 35 25 50 35C50 35 65 25 85 40C85 40 70 35 50 55Z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M50 45C50 45 25 20 10 30C10 30 30 15 50 30" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M50 45C50 45 75 20 90 30C90 30 70 15 50 30" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M50 50C50 50 35 25 20 20C20 20 40 20 50 40" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M50 50C50 50 65 25 80 20C80 20 60 20 50 40" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}
```

Create `components/decorations/CloudDecoration.tsx`:
```tsx
interface Props {
  className?: string;
}

export default function CloudDecoration({ className = '' }: Props) {
  return (
    <svg className={className} viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 45C10 45 5 38 8 30C3 25 5 15 15 13C18 5 30 2 40 8C50 2 65 5 68 15C78 12 88 18 85 28C95 30 95 42 85 45Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
```

Create `components/decorations/DottedPath.tsx`:
```tsx
interface Props {
  className?: string;
}

export default function DottedPath({ className = '' }: Props) {
  return (
    <svg className={className} viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 80C40 80 50 20 100 50C150 80 160 20 190 20" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
```

Create `components/decorations/index.ts`:
```ts
export { default as AirplaneDecoration } from './AirplaneDecoration';
export { default as PalmTreeDecoration } from './PalmTreeDecoration';
export { default as CloudDecoration } from './CloudDecoration';
export { default as DottedPath } from './DottedPath';
```

**Step 2: Commit**

```bash
git add components/decorations/
git commit -m "feat: add decorative SVG components for travel theme

Hand-drawn style airplane, palm tree, cloud, and dotted path
decorations for use as section backgrounds throughout the site."
```

---

### Task 5: Create Scroll Animation Hook

**Files:**
- Create: `hooks/useScrollAnimation.ts`

**Step 1: Create the IntersectionObserver-based scroll animation hook**

```ts
import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

This hook:
- Returns a `ref` to attach to any element
- Returns `isVisible` boolean that turns `true` once the element scrolls into view
- Automatically respects `prefers-reduced-motion`
- Unobserves after first trigger (one-shot animation)

Usage in components: `<div ref={ref} className={`scroll-fade-up ${isVisible ? 'is-visible' : ''}`}>`

**Step 2: Commit**

```bash
git add hooks/useScrollAnimation.ts
git commit -m "feat: add useScrollAnimation hook for scroll-triggered animations

IntersectionObserver-based hook that respects prefers-reduced-motion.
One-shot trigger for fade-up, fade-in, slide-left/right CSS classes."
```

---

### Task 6: Redesign Header Component

**Files:**
- Modify: `components/Header.tsx` (full rewrite — 540 lines → ~380 lines)

**Step 1: Rewrite the Header**

Key design changes:
- Transparent on top (for hero pages), becomes solid white + shadow on scroll
- Remove red bottom border
- Cleaner nav spacing with DM Sans headings
- Simplified dropdowns with modern styling
- Mobile: full-screen overlay menu
- Remove AnnouncementBar from Header (move decision to _app.tsx later)

The new Header.tsx should be a complete replacement. The navigation links and dropdowns remain the same (same URLs), only the styling changes.

Important behaviors:
- `useState` for mobile menu and scroll state
- `useEffect` with scroll listener: after 50px scroll → add solid bg + shadow
- Logo stays the same image (`/go2thailand-logo-small.webp`)
- All existing nav links preserved (Home, Cities, Islands, Food & Drinks, Travel Needs, Visa & Info, Plan Trip, Top 10, Regions)
- LanguageSwitcher component still used
- Mobile menu: full-screen overlay with smooth transition

**Step 2: Verify the header renders correctly**

Run: `cd /home/marvin/Projecten/go2thailand.com && npx next build 2>&1 | tail -10`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: redesign Header with transparent-to-solid scroll behavior

Modern Tripex-inspired header: transparent on top, solid white with
shadow on scroll. Cleaner nav spacing, modern dropdowns with backdrop
blur, full-screen mobile overlay menu. Same nav links preserved."
```

---

### Task 7: Redesign Footer Component

**Files:**
- Modify: `components/Footer.tsx` (full rewrite — 302 lines → ~250 lines)

**Step 1: Rewrite the Footer**

Key design changes:
- 4-column layout (from 7): Brand | Quick Links | Travel Resources | Newsletter
- `surface-dark` background (#1A1A2E) instead of gray-900
- Newsletter email input with Subscribe button
- Large outlined "Go2Thailand" decorative text
- Social media icons (Facebook, Instagram, Twitter/X, YouTube)
- Cleaner bottom bar: copyright left, policy links right
- Keep the most important links but consolidate (remove redundant columns)

Important: Keep the same footer links that are important for SEO internal linking — cities, regions, weather, transport routes, top-10 guides. Just organize them better in fewer columns with expandable sections or grouped under 2 main columns instead of 7.

**Step 2: Verify the footer renders correctly**

Run: `cd /home/marvin/Projecten/go2thailand.com && npx next build 2>&1 | tail -10`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: redesign Footer with modern 4-column layout

Tripex-inspired footer: surface-dark background, 4-column grid,
newsletter signup, social icons, large decorative brand text.
All important SEO links preserved in consolidated layout."
```

---

### Task 8: Update AnnouncementBar Styling

**Files:**
- Modify: `components/AnnouncementBar.tsx`

**Step 1: Update the styling to match new design**

Minor update — make it fit the new design language:
- Change from gradient red to solid thailand-blue (less loud, more premium)
- Slightly smaller text
- Smoother dismiss animation

```tsx
import { useState } from 'react';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-thailand-blue text-white py-2 px-4 text-center relative transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs md:text-sm font-medium">
          New content added regularly! Check back often for the latest Thailand travel guides and tips!
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
        aria-label="Close announcement"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default AnnouncementBar;
```

**Step 2: Commit**

```bash
git add components/AnnouncementBar.tsx
git commit -m "feat: restyle AnnouncementBar to match new design

Solid thailand-blue background instead of gradient red,
smaller text, subtler dismiss button."
```

---

### Task 9: Install DM Sans and Kalam Fonts

**Files:**
- No files to create — fonts loaded via Google Fonts CSS import in globals.css

**Step 1: Verify fonts are loading**

The Google Fonts import was already added in Task 2 (globals.css line 5):
```
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=Inter:wght@300;400;500;600;700&family=Kalam:wght@400;700&display=swap');
```

Run dev server and check that headings render in DM Sans:
```bash
cd /home/marvin/Projecten/go2thailand.com && npx next dev &
sleep 5
curl -s http://localhost:3000 | grep -o "DM Sans" | head -1
```

Expected: "DM Sans" appears in the page source (via the font import)

---

### Task 10: Full Build Verification and Deploy

**Step 1: Run full build**

```bash
cd /home/marvin/Projecten/go2thailand.com && npx next build 2>&1 | tail -20
```

Expected: Build succeeds with no errors.

**Step 2: Spot-check key pages in dev mode**

Start dev server and manually verify:
- Homepage loads with new header (transparent top)
- Footer shows new 4-column layout
- Headings use DM Sans font
- Background is warm cream instead of gray
- Buttons have new rounded-xl styling

**Step 3: Deploy to production**

```bash
cd /home/marvin/Projecten/go2thailand.com && npx vercel --prod
```

**Step 4: Verify on live site**

Visit https://go2-thailand.com and confirm:
- Header is transparent at top, solid on scroll
- Footer has new design
- Typography is updated
- No broken pages

---

## Summary of All Files Changed

| File | Action | Description |
|------|--------|-------------|
| `tailwind.config.js` | Modify | New fonts, colors, animations |
| `styles/globals.css` | Modify | Font imports, headings, buttons, animations |
| `pages/_document.tsx` | Modify | Google Fonts preconnect |
| `components/decorations/AirplaneDecoration.tsx` | Create | SVG decoration |
| `components/decorations/PalmTreeDecoration.tsx` | Create | SVG decoration |
| `components/decorations/CloudDecoration.tsx` | Create | SVG decoration |
| `components/decorations/DottedPath.tsx` | Create | SVG decoration |
| `components/decorations/index.ts` | Create | Barrel export |
| `hooks/useScrollAnimation.ts` | Create | Scroll trigger hook |
| `components/Header.tsx` | Modify | Full redesign |
| `components/Footer.tsx` | Modify | Full redesign |
| `components/AnnouncementBar.tsx` | Modify | Restyle |
