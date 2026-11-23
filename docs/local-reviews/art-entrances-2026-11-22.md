# Art Room entrances — local review, 2026-11-22

Local only. No commit, push or deployment performed for this change.

- Art Room: existing complete Face That Outlived Paper composition, prominently labeled AI-created illustration. Dark navy entrance with gallery and existing visit links.
- Drawings: complete Vitruvian Man sheet, institutional-style caption and linked Commons reproduction record. Existing optional sensitive-image preference respected; explicit reveal does not modify the saved preference.
- Existing 124 paintings / 25 painters and 24 works on paper unchanged.

## Validation

Production build including TypeScript and asset-budget checks passed. Targeted ESLint passed. Existing Art Room and works-on-paper browser regression suites: 23 passed.

Manually inspected generated screenshots of both entrances at 1440px desktop and 390px phone viewport widths, including full entrance and viewport captures. Both images preserve original aspect ratio, full compositions and captions. No horizontal overflow, no browser page errors, no serious or critical axe violations in either entrance. Both primary anchor links and hide/reveal preference checked at both widths.

Artifacts: `artifacts/art-entrances/` (screenshots, check script, results.json). Build log: `/tmp/art-entrances-build.log`. Browser regression log: `/tmp/art-entrances-regressions.log`.

Preview: http://127.0.0.1:3048/study/art and http://127.0.0.1:3048/study/art/on-paper . Phone checks use browser emulation, not a physical phone.

Vitruvian reproduction provenance and SHA-256: `public/images/art/entrances/provenance.json`.
