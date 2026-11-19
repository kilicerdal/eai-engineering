# Whole-site improvement implementation — local only

November 19, 2026. Preview: http://127.0.0.1:3038

This report tracks the 16 recommendations in `2026-11-19-whole-site-review.md`. It does not mark the earlier 30-item package or the entire editorial review complete. No deployment, Git push, repository visibility change, model request or API spending occurred.

## Implemented locally

- Authored same-concept mappings now exist in all 12 certification paths: 177 mapped questions across the core and two new-path banks, up from 90. Coverage is deliberately partial. New-path fresh checks only offer an unseen, explicitly mapped example and remain temporary and unscored. Existing broader retries remain available.
- Source mapping dates, document kind, section pointers and independent verification are distinguished. Source receipts ask the reader to check the claim; a working link is not described as verified support.
- Certification answer review groups source checks and deeper optional tools while keeping the primary explanation and existing retry controls. Secondary learning activities mount on first opening and stay mounted when closed to protect writing.
- Curiosity has one top-level Sources, evidence & wording drawer. Existing evidence, history, source details and model controls remain inside. First/oldest/largest/smallest/fastest wording now prompts scope checking. Twelve additional authored cross-topic bridges include explicit analogy limits.
- Public homepage and room-directory Tutor links agree on /study/tutor. Context-specific embedded Tutor handoffs are retained.
- Footer Start here and Artwork links remain reachable inside Explore the rooms, reducing repeated top-level links.
- Guided room backups cover eight rooms, explain export limits, open the original controls in a separate tab and use temporary user-confirmed checkmarks. The guide neither reads room work nor claims to verify or restore it. Tutor Session settings now expose the existing session download action normally, rather than only after an error. Writing downloads are clearly distinguished from a full restorable backup.
- Materials without documents start with Add your first material and a sample lesson. Mode selectors and passage-review panels appear when relevant. Existing populated libraries retain them.
- Reader Your place displays the original adjacent paragraphs through the existing context component. Recommendations across all 200 books use concrete reading questions in fallback comparisons, while explicit selected pairings retain priority.
- Code highlighting loads when a code block needs it, with readable plain code during loading. Certification secondary activities load on demand.

## Review work and practical limits

1. **Question-by-question verification remains open.** `scripts/build-certification-review-ledger.mjs` inventories all 1,090 questions, alternatives, rationales, dates and source snapshots. All 1,090 have downloaded reference documents available; all 1,090 remain pending explicit editorial sign-off in this new ledger. Retrieval, mapping and automated checks are not factual verification.
2. **Overlap triage:** `scripts/classify-certification-overlaps.mjs` classifies the 269 flagged pairs using existing shared-case/distinct-objective dispositions. All 269 match intentional linked-case structures; this resolves the lexical-duplication signal only. It does not independently verify each task, distractor or technical answer. No IDs, questions or saved editions were deleted.
3. **Reading anchors:** all 200 compressed books pass exact anchor existence, uniqueness and order checks with zero issues. Semantic inspection of every introduction, note and appendix heading remains open. Saved positions and book bytes are unchanged.
4. **Curiosity:** superlative checks are triage, not a completed source-by-source validation of all 1,000 discoveries. New bridges are authored comparisons, not claims of historical influence.
5. **Mobile:** automated tasks and screenshots cover mobile reading feedback, evidence access, Save/Next and an unsent Tutor draft, plus eight entry routes without horizontal overflow. A desktop browser viewport is not a physical phone keyboard test.
6. **Owner walkthrough:** real feedback is still pending in `2026-11-19-learner-walkthrough.md`. No participant feedback has been invented.
7. **Live Tutor:** provider response tests remain pending by the owner's instruction. No model calls were made.

## Verification

- Production build passes route generation and asset budgets: JavaScript 8,262,756 bytes versus limit 8,367,823; CSS 564,774 versus 641,508; images 13,983,374 versus 14,168,531; packed books 90,791,154, unchanged.
- 1,023 unit tests pass; TypeScript and diff whitespace checks pass. Lint has zero errors and one existing StudyAccount navigation warning.
- Browser suite: all 130 tests pass in the final combined run, including the added mobile Save/Next task; recorded in `tmp/site16-browser-final-all.log`.
- Inventory: 12 paths, 1,090 questions, 200 books, 1,000 discoveries; no audit issues.
- Desktop evidence drawer and backup guide inspected in the browser. Mobile discovery screenshot inspected. Background artwork and original room data schemas retained.

## Local initial script measurement

Initial HTML script tags only, with gzip estimated locally. Excludes subsequent dynamic imports, preloads, artwork and interaction cost. These are not Vercel storage or bill measurements.

| Route | Before estimated gzip bytes | After | Difference |
|---|---:|---:|---:|
| Studio | 1,177,576 | 956,957 | -220,619 |
| Tutor | 1,140,792 | 920,306 | -220,486 |
| Cloud Practitioner | 649,229 | 629,481 | -19,748 |
| Reading catalog | 631,913 | 632,226 | +313 |
| Curiosity | 556,315 | 557,155 | +840 |

Homepage, engineering problem and Explore script totals differ by only six estimated gzip bytes each. Deferred code still downloads when used. More performance work remains possible; no instant-load claim is made.
