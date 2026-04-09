# Travelpayouts Click Recovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recover Travelpayouts click volume on the highest-traffic templates by restoring stronger high-visibility Travelpayouts placements without removing SafetyWing from visa-relevant pages.

**Architecture:** Add a shared Travelpayouts recovery helper plus a reusable panel component, then wire it into blog, visa, transport, and homepage templates. Keep the logic small and testable so placement order and offer selection can be checked with a lightweight script.

**Tech Stack:** Next.js pages router, React, TypeScript, existing Travelpayouts affiliate links and widgets, `tsx` for lightweight test execution

---

### Task 1: Add the regression test harness

**Files:**
- Create: `scripts/test-affiliate-recovery.ts`
- Test: `scripts/test-affiliate-recovery.ts`

- [ ] **Step 1: Write the failing test**

Create a script that imports `getTravelpayoutsRecoveryConfig` from `lib/travelpayouts-recovery.ts` and asserts the expected first-button priorities for `blog`, `visa`, `transport`, and `home`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx scripts/test-affiliate-recovery.ts`
Expected: FAIL because `lib/travelpayouts-recovery.ts` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Add `lib/travelpayouts-recovery.ts` with a pure context-to-config helper that returns page-specific offer IDs and copy.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx tsx scripts/test-affiliate-recovery.ts`
Expected: PASS

### Task 2: Add the reusable Travelpayouts recovery panel

**Files:**
- Create: `components/TravelpayoutsRecoveryPanel.tsx`
- Modify: `lib/travelpayouts-recovery.ts`
- Test: `scripts/test-affiliate-recovery.ts`

- [ ] **Step 1: Render button metadata from the helper**

Map helper button IDs to Travelpayouts URLs, localized labels, and visual emphasis.

- [ ] **Step 2: Append placement-aware subids**

Use `useSubId()` and `withSubId()` so each rendered button is measurable by panel location.

- [ ] **Step 3: Run regression script**

Run: `npx tsx scripts/test-affiliate-recovery.ts`
Expected: PASS

### Task 3: Recover blog click density

**Files:**
- Modify: `pages/blog/[slug].tsx`
- Modify: `components/blog/InlineEngagementCTAs.tsx`
- Test: `scripts/test-affiliate-recovery.ts`

- [ ] **Step 1: Add a top-of-article recovery panel**

Place the shared Travelpayouts panel near the top of blog post content.

- [ ] **Step 2: Move the inline affiliate CTA earlier**

Change inline article injection so the affiliate CTA appears earlier in long posts.

- [ ] **Step 3: Run regression script**

Run: `npx tsx scripts/test-affiliate-recovery.ts`
Expected: PASS

### Task 4: Recover visa click density

**Files:**
- Modify: `pages/visa/[slug].tsx`
- Test: `scripts/test-affiliate-recovery.ts`

- [ ] **Step 1: Add a sidebar Travelpayouts recovery panel**

Insert the shared panel in the visa sidebar while leaving the insurance CTA and eSIM block intact.

- [ ] **Step 2: Keep SafetyWing path undisturbed**

Do not remove existing non-Travelpayouts insurance positioning in this round.

- [ ] **Step 3: Run regression script**

Run: `npx tsx scripts/test-affiliate-recovery.ts`
Expected: PASS

### Task 5: Recover transport and homepage click density

**Files:**
- Modify: `pages/transport/[route].tsx`
- Modify: `pages/index.tsx`
- Test: `scripts/test-affiliate-recovery.ts`

- [ ] **Step 1: Add a transport planning panel**

Place a Travelpayouts panel on transport route pages to capture follow-on hotel and planning clicks alongside 12Go intent.

- [ ] **Step 2: Add a homepage fast-click panel**

Place a broad Travelpayouts action cluster near the homepage search/widget area.

- [ ] **Step 3: Run regression script**

Run: `npx tsx scripts/test-affiliate-recovery.ts`
Expected: PASS

### Task 6: Verify implementation

**Files:**
- Modify: `components/TravelpayoutsRecoveryPanel.tsx`
- Modify: `lib/travelpayouts-recovery.ts`
- Modify: `pages/blog/[slug].tsx`
- Modify: `pages/visa/[slug].tsx`
- Modify: `pages/transport/[route].tsx`
- Modify: `pages/index.tsx`
- Modify: `components/blog/InlineEngagementCTAs.tsx`
- Test: `scripts/test-affiliate-recovery.ts`

- [ ] **Step 1: Run the regression script**

Run: `npx tsx scripts/test-affiliate-recovery.ts`
Expected: PASS

- [ ] **Step 2: Run targeted lint**

Run: `npm run lint -- --file components/TravelpayoutsRecoveryPanel.tsx --file lib/travelpayouts-recovery.ts --file pages/blog/[slug].tsx --file pages/visa/[slug].tsx --file pages/transport/[route].tsx --file pages/index.tsx --file components/blog/InlineEngagementCTAs.tsx`
Expected: PASS with no lint errors

- [ ] **Step 3: Review final diff**

Run: `git diff -- components/TravelpayoutsRecoveryPanel.tsx lib/travelpayouts-recovery.ts pages/blog/[slug].tsx pages/visa/[slug].tsx pages/transport/[route].tsx pages/index.tsx components/blog/InlineEngagementCTAs.tsx scripts/test-affiliate-recovery.ts`
Expected: focused click-recovery changes only
