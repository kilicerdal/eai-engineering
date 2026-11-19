# Project claim consistency

The checked public facts live in `src/data/project-claim-ledger.json`. The date describes a review snapshot, not live repository freshness or a new benchmark run. Only public repository facts belong there; never add private runtime metrics, recruiter material or personal information.

- The checkout case retains its V5 source revision and bundled authored-scenario record. The record's origin label and execution note remain visible; website viewing is not independent re-execution.
- The claim-redelivery case retains its pinned PostgreSQL/Moto synthetic capture and mutable-main walkthrough caveat.
- The settlement case uses its V4.1 summary. Its preserved V3 picture, historical walkthrough and archive are labelled separately. A newer repository release does not retroactively upgrade that evidence.
- Healthcare Quality Lab's website page is an authored illustration. The public repository release and its artifacts are a separate destination, not results produced by the illustration.
- Exploratory AI tools are not promoted to a verified release or benchmark without new evidence.

When changing a case, update the ledger, project card and tour's evidence link together. Validate the bundled capture's timestamp/source revision and verify public pinned source/release assets separately. Existing screenshots must retain their genuine version; do not relabel a V3 picture as V4.1. Keep a dated release observation explicit rather than showing a permanent “latest” badge.

Run `node --test tests/project-claims.test.mjs` and `npm run test:recruiter-browser`. The latter exercises Chromium, Firefox and WebKit on desktop and narrow/mobile viewports. Firefox's narrow viewport is responsive coverage, not the Android Firefox app. WebKit automation is not branded Safari or a physical iPhone test. Record any native Safari checks separately.
