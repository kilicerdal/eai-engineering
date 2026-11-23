# Picasso studies — local review, November 22, 2026

Local implementation only. No commit, push or deployment performed. The earlier approved face/Vitruvian entrance changes were preserved.

Preview: http://127.0.0.1:3049/study/art/on-paper/picasso

## Implemented

Ten dedicated study pages with 4,154 words of essays, close-looking guidance and evidence distinctions; three optional routes; individual references with source scopes and review dates; an eleven-state guide linking each Bull impression to its National Gallery of Art record. Entry links are present in Drawings and Picasso’s painter page. Sources and sitemap include the new studies. Essays remain server-rendered; small client components handle state selection and route continuity. Existing 124-work and 24-object selections retain their records and save identifiers.

## Research limits

Picasso images remain with their source institutions/publications; zero new Picasso reproductions are hosted. The Dove viewing link uses MoMA’s specific impression, with Fuji providing additional context. The Camel’s original leaf is not securely catalogued here; the linked museum-shop product is explicitly a later reproduction. The familiar Lump outline is not silently dated from the separately documented 1957 plate. MP1351 is distinguished from the La Femme-Fleur painting. Don Quixote’s 10/11 August discrepancy remains attributed. The Minotaur study is an editorial comparison of identified prints, with subject notes, rather than a falsely unified drawing title.

## Validation

- Production build, TypeScript and existing asset budgets: passed without budget increases.
- ESLint on changed source and new browser tests: passed.
- Full unit suite: 1,172 passed; final targeted content checks: 9 passed.
- Final browser suite: 28 passed. Covers all ten studies at 1440 × 1000 and 390 × 844, WCAG A/AA axe scans, no horizontal overflow or page errors, reading anchors, return links, three route sequences, all eleven Bull links, enlarged text and preserved unrelated local storage. Includes the existing Art Room and works-on-paper regressions.
- Manually inspected screenshot captures of all ten desktop and phone study headers, plus close-looking, evidence and source-panel layouts. Phone verification is browser emulation, not physical-device testing.

Visual review led to moving source-image links above metadata on phones. Browser review caught and corrected a duplicate Guernica anchor; study sections now have study-specific IDs. The tests scope active pages because Next.js retains visited pages hidden in the DOM. Unknown slugs show the existing not-found page and noindex; streamed Next.js responses can retain HTTP 200 as documented by the installed Next.js version.

Artifacts: `artifacts/picasso-studies/` includes screenshots, review.json and a local Playwright configuration. Run against the existing preview with `npx playwright test --config=artifacts/picasso-studies/playwright.local.config.ts`. Logs: `/tmp/art-picasso-build.log`, `/tmp/art-picasso-browser.log`, `/tmp/art-picasso-unit.log`. The new browser test is also registered in the existing CI suite for a future release.
