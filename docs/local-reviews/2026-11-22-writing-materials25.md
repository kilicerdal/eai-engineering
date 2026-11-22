# Writing Studio / Your Materials: 25 local refinements

This implements the owner's follow-up list of 25 refinements. It is additional to the previous 45-item local package, which remains in this checkout. No release, push or external service was requested or performed.

## Exact implementation map

| # | Refinement | Implementation |
|---|---|---|
| 1 | Shorter empty phone editor | A bounded 320px phone editor replaces the 650px minimum; the editor panel no longer stretches to the coach's height. |
| 2 | Collapse templates while writing | Templates start open for an empty draft, collapse when a draft starts, and remain available through a disclosure. Inserting a template collapses the panel again. |
| 3 | Editor focus view | Focus view hides local hero/navigation, templates, revision tools, coach and help. Exit focus and Escape restore the ordinary workspace without changing text. |
| 4 | Return to editor | The coach has a direct return action that scrolls and restores keyboard focus to the editor. |
| 5 | Compact review chooser | One grouped review select and one action replace the long action-button list. Full-essay analysis remains separately available. |
| 6 | Single critique presentation | Completed reviews render each critique section once with its associated decision, reason and recheck controls. The exact reviewed snapshot remains optional. Legacy feedback without snapshots still renders. |
| 7 | Formatted critique headings | Critique cards render safe Markdown with proper headings, lists and math instead of visible Markdown syntax. |
| 8 | One feedback scrolling surface | The conversation and reviewed text no longer have nested fixed-height vertical scroll panes. The page handles ordinary scrolling. |
| 9 | Hide unavailable report controls | Report actions appear only for a valid evaluated report. Available actions use wrapping flex controls to prevent the mobile overlap found in regression testing. |
| 10 | Delay advanced follow-ups | Follow-up controls appear after completed feedback. A separate local conversation reset remains available after a request error and does not clear rate-limit delays. |
| 11 | Checkpoint names | A dedicated checkpoint-name field is independent of the draft name, with a numbered fallback. |
| 12 | Draft previews | Optional draft cards show the opening line and saved update date, and open through the existing unsaved-library-copy guard. |
| 13 | Changed paragraphs only | Comparison can hide unchanged paragraphs. |
| 14 | Navigate changes | Previous/next change buttons scroll and focus the corresponding paragraph, with position and endpoint states. |
| 15 | Revision summary | Comparison reports changed/added/removed paragraph counts. Alignment remains positional; it does not claim semantic paragraph tracking. |
| 16 | Cancel extraction | Abort signals interrupt loading, labels, pages and text extraction, destroy the PDF loading task, and return promptly even during worker startup. No partial document is queued. |
| 17 | Retry one failed file | Failed or cancelled files stay in a tab-local retry list. Retrying preserves successful imports and pending reviews; dismissing releases the retry entry. |
| 18 | Original PDF beside text | A lazy PDF.js canvas renders one page from the transient local File beside its extraction (stacked on phones). Original bytes are neither library records nor AI-request content. Page-render tasks are cancelled on page changes/unmount; preview dimensions are bounded. |
| 19 | Visible cleaning edits | Removed edges and joined words are highlighted in the before/after extraction. A change list identifies each proposed edit. |
| 20 | Undo individual cleaning | Each page/edit pair can be undone or restored independently before commit. The original extraction remains available and saved alongside changed study text. |
| 21 | Readable source versions | Ordinary evidence views show filename and edition. Full content-derived identifiers are behind a disclosure and have a copy action with explicit failure feedback. |
| 22 | Navigate evidence excerpts | Previous/next supporting-excerpt controls open, scroll and focus the selected citation summary. |
| 23 | Remember source page | Read resumes the last available page for that document within the browser session. Explicit citation links retain their own exact page. Invalid or unavailable stored positions fall back safely. |
| 24 | Omitted guide sections | Coverage now lists every unsupplied PDF position/note section using compact ranges; it distinguishes partial excerpts from complete text coverage. |
| 25 | Inspection summary | Before commit, a compact summary shows recovered pages, self-marked inspection counts, flagged pages and applied/undone cleaning counts. Self-marks are explicitly a checklist, not extraction certification. |

## Scope and safety of data

The previous durable-import commit boundary and canonical IndexedDB conflict checks remain. Source metadata, original extraction, answers, editions, draft snapshots and review decisions are retained. PDFs used for comparison and failed-file retries exist only in the current tab's memory. Library/source storage and AI requests contain extracted text, not those File objects.

AI-backed review policies still use the existing provider integration. Local UI/request/citation tests use deterministic mocked responses; live model-quality assessment remains pending under the owner's prior instruction.

## Verification

- Full unit suite: 1,147 passed, including interrupted PDF extraction, per-change undo, and complete omitted-page enumeration.
- TypeScript / optimized production build / packed-book and bounded asset checks: pass.
- Full lint: no errors; the pre-existing StudyAccount navigation warning remains.
- Added scoped desktop/mobile browser checks for focus, readable feedback, named checkpoints, change navigation, local PDF rendering, cleaning undo, cancellation/retry, omitted guide sections, evidence navigation and report-button geometry.
- Existing writing/materials browser tests were updated to use the compact chooser and optional source identifiers; their original storage, interruption, report-attribution, request-size and citation assertions remain.
- The incremental package has a bounded 24 KiB raw JavaScript and 4 KiB CSS allowance and adds no image assets. PDF.js and its assets are shared with the existing importer.

Final optimized-build verification: **78 of 78 desktop/mobile browser checks passed**. This includes the new refinement scenarios and affected earlier writing/materials regressions. Scoped accessibility checks found no serious or critical violations in the coach.

Visually inspected the production screenshots for desktop and 390px phone focus views, formatted feedback/decision cards, draft previews and named checkpoints, change navigation, PDF/text comparison, individual cleaning undo and summary, evidence omissions/navigation, and report controls. The phone feedback was widened by removing redundant nested frames/padding, with a browser assertion requiring at least 260px of critique reading width. Report actions were also checked for geometric overlap.

Screenshots: `artifacts/dai25/`. Full unit log: `/tmp/dai25-unit.log`; production browser log: `/tmp/dai25-production-browser.log`; build: `/tmp/dai25-build.log`; lint: `/tmp/dai25-lint.log`.

Preview remains local at `http://127.0.0.1:3046/study/writing` and `/study/materials`. No commit, push or public deployment was performed.
