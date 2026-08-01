# Framework security audit — 23 July 2026

## Decision

- Upgraded the Pages Router application from Next.js 14.2.35 to 15.5.21.
- Kept React and React DOM on 18.3.1. Next.js 15 explicitly supports React 18 for Pages Router projects.
- Upgraded direct production dependencies: `convex` 1.42.3, `resend` 6.18.0 and `sharp` 0.35.3.
- Upgraded direct PostCSS to 8.5.22 and aligned `eslint-config-next` with Next 15.5.21.
- Added a minimum Node.js runtime of 20.9.0.
- Migrated deprecated Next.js config keys and added a non-interactive ESLint gate.

## Evidence

- `npx next build`: passed; 1,254 static pages generated.
- `npx tsc --noEmit`: passed.
- `npm run lint -- --quiet`: passed with zero errors.
- `npm run design:verify`: passed.
- Official Next.js 15 release documentation confirms Pages Router compatibility with React 18.

## Residual audit findings

`npm audit --omit=dev` still reports three high findings through Next.js' own nested `postcss@8.4.31` and optional `sharp@0.34.5`. The project-level versions are patched, but npm cannot safely replace the versions bundled by Next 15.5.21. A tested override was rejected because npm left the nested packages invalid, so it was removed rather than presenting false assurance.

Track the next Next.js maintenance release and re-run the production audit. A Next 16 migration remains a separate, tested framework task because it changes bundler and configuration behavior.

## Performance follow-ups from the build

- The generic city template currently ships about 3.18 MB first-load JavaScript; this is a release blocker for that template family and must be reduced during the destination-template rollout.
- The blog index serializes about 167 kB page data; reduce list payloads before the final performance gate.
