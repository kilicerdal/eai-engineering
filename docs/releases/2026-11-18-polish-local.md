# Focused polish pass — local only

No deployment. Existing local preview: http://127.0.0.1:3037/

## Eight areas addressed

1. Homepage: the fictional Practice Lab entrance remains reachable under an optional disclosure rather than repeating a full secondary invitation.
2. First minute: the compact entrance says to choose one thing and clarifies that exploration needs no account. The existing introduction remains available.
3. Responsive fit: room guidance and long titles wrap; the artwork Close control stays on one line. Checked 360, 390, 768, 1024 and 1440 px widths.
4. Saving guidance: shared explanations distinguish reading an old copy, a confirmed write, unsaved changes and a failure. Successful writes in another room cannot mask an unresolved failure. The backup guide uses the same wording.
5. Empty search: Clear filters restores saved notebook items without rewriting the original notes.
6. A connected stopping point: a personal engineering problem can optionally lead to one authored retry model. The private notebook is not passed automatically; stopping remains explicitly welcome.
7. Tutor quality: eight synthetic cases and manual-review criteria are recorded in `docs/quality/tutor-eight-case-review.json`. The existing public Cloudflare tutor returned eight answers: six meet the case criteria; two need work (an unrequested transfer exercise and a paraphrase misattributed as source wording). Added explicit feedback-only stopping and source-wording guardrails locally. These revised instructions have not been model-validated: the local checkout has no Cloudflare or rate-limiter credentials. No saved learner content, OpenAI credits, production code changes or deployment were involved.
8. Performance: added a reusable local-only cold-cache measurement script. Prioritized responsive delivery of the original Reading Room hero and lazy responsive delivery of the original lower discovery artwork. Original source assets remain intact; no new artwork files were added.

## Checks

- 947 unit tests pass.
- Production build, TypeScript, packed-book and size checks pass.
- ESLint has no errors; one existing StudyAccount navigation warning remains.
- 18 desktop/mobile refinement and polish interaction checks pass on the local production build.
- Screenshots inspected: Reading Room desktop/mobile and saving guide. No horizontal overflow in the sampled responsive checks.
- Saved shelves, notes, questions and original data schemas are not migrated. Search-reset tests verify original notes remain unchanged.

## Slower-connection sample

Conditions: cold browser cache, 120 ms latency, 1.5 Mbps simulated download, 4× CPU slowdown, local headless Chromium. This is a lab comparison, not field Core Web Vitals, deployment storage or billing.

Reading Room transfer: 2,543,507 → 2,298,188 bytes (245,319 bytes, about 9.6% lower).
Observed LCP candidate: 9,884 → 9,580 ms. This is a modest single-sample change; the page still needs broader performance work under constrained conditions. No claim of a fast field experience is made.

Raw background and book archive assets remain unchanged. Generated reports and screenshots are in `artifacts/site-refinement/`.

Owner walkthrough remains available at `/guide/site-refinement`. Nothing has been published.
