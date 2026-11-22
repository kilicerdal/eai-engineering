# Writing Studio and Your Materials — 45-item local implementation

Scope: the owner's approved 45-item list. Local only; no push or deployment is authorized by this request. The prior 75-group release is separate.

## Implementation map

| # | Requested improvement | Local implementation |
|---|---|---|
| 1 | Selected-passage critique | Review scope uses the editor's actual selection; empty selections cannot send. |
| 2 | Exact submitted text | Each completed review stores an immutable, dated text snapshot and scope label. |
| 3 | Audience and purpose | Review brief fields are supplied to standard and full-section reviews. |
| 4 | Editorial boundaries | Bounded preservation instructions accompany the reviewed passage. |
| 5 | Sentence anchors | Exact quotations that occur in the snapshot can select their current editor occurrence; changed quotations are disabled. |
| 6 | Correction versus preference | Editorial review policy separates required changes, useful refinements and optional polish. |
| 7 | Explained rewrites | Sentence/meaning review requests Original, Proposed wording and Why. |
| 8 | Meaning changes | Review policy requests explicit checks of certainty, scope, causality and factual meaning. |
| 9 | Evidence diagnosis | Evidence review distinguishes missing, irrelevant, weak and contradictory support. |
| 10 | Overclaiming | Evidence review requests justified qualifications without inventing supporting facts. |
| 11 | Fair counterarguments | Dedicated counterargument review checks credible opposing positions and straw men. |
| 12 | Paragraph function | Structure review identifies introduce/support/qualify/challenge/conclude roles. |
| 13 | Promised/delivered scope | Structure review compares the introduction's promises with the supplied coverage and identifies excerpt limitations. |
| 14 | Conclusion contribution | Conclusion review distinguishes synthesis, unsupported additions and repetition. |
| 15 | Feedback priorities | Standard and full-essay synthesis requests use the same three priority categories. |
| 16 | Several named drafts | Browser draft library holds up to 40 distinct draft copies; the existing current-editor autosave remains separate. |
| 17 | Revision checkpoints | Each library draft supports up to 20 named, dated snapshots. |
| 18 | Revision comparison | Paired paragraph views mark removed/added words; long paragraphs fall back to whole-paragraph marking. |
| 19 | Paragraph recovery | Restore a checkpoint paragraph without replacing the current essay. Paragraph alignment limitations are stated. |
| 20 | Feedback decisions | Review sections support accepted/declined/deferred plus a reason; unrelated review updates merge safely. |
| 21 | Revision recheck | Review comments and checkpoints can initiate a recheck against current editor text using the selected review scope. |
| 22 | Comment-only mode | Explicit review brief setting requests diagnosis without replacement prose. |
| 23 | Insertable templates | Templates insert at the editor selection/cursor rather than replacing the whole essay. |
| 24 | Paragraph budgets | Default target plus individually adjustable paragraph targets and over-target counts. Targets follow paragraph positions. |
| 25 | Separate exports | Draft-only export, selected comments with decisions, and a checkpoint revision record have descriptive filenames; existing coach reports remain available. |
| 26 | Extraction preview | File and pasted-note imports wait for explicit review/commit; queued imports can be skipped individually. |
| 27 | Page extraction quality | Every PDF position shows character coverage, sparse/empty status and available warnings. |
| 28 | Column order warnings | PDF text coordinates detect possible parallel columns and request inspection. This is a heuristic. |
| 29 | Repeated page edges | Repeated first/last lines are listed and can be excluded; original extraction remains attached. |
| 30 | Split-word repair | Optional conservative line-break hyphen joining has side-by-side original/cleaned previews and an inspection notice. |
| 31 | Meaningful structure | Extracted headings/list/paragraph line breaks remain in source text and have a dedicated structured source view. No semantic structure is invented. |
| 32 | Table warnings | Repeated aligned text rows or spaced columns can trigger a warning about lost row/column relationships. This is a heuristic. |
| 33 | Printed/PDF positions | PDF page labels are read when available and displayed beside physical PDF positions. |
| 34 | Source metadata | Title, author, date and edition are editable and survive strict library normalization. |
| 35 | Short source names | Display names can change while the original filename is retained. |
| 36 | Contributing sources | Answers record sent coverage and distinguish actually cited pages from selected but unused sources. |
| 37 | Retrieval preview | Before generation, a modal shows the exact excerpts to be sent. No request starts until approval. |
| 38 | Excerpt exclusions | Uncheck irrelevant excerpts; an empty evidence selection cannot send. |
| 39 | Retrieval miss/absence | Empty retrieval guidance and model policy distinguish no matching excerpt from whole-document absence. |
| 40 | Narrow evidence | Single-excerpt and single-citation cases show their limited scope. |
| 41 | Conflicting statements | Source policy requires attributed disagreement and forbids silently merging contradictory accounts. This remains a model instruction, not a deterministic contradiction detector. |
| 42 | Document revisions | Exact content duplicates are rejected; same-name/different-content imports are identified and can link to an earlier source as a separately retained revision. |
| 43 | Version-bound answers | Content-derived document IDs and stored source-edition snapshots preserve the source version behind earlier answers. Removing a source still explicitly removes its library answers, as existing UI explains. |
| 44 | Visual-dependent questions | Figure/table/chart questions show a pre-send warning; model instructions prohibit inventing unavailable visual evidence. |
| 45 | Guide balance | Sent/cited page coverage is shown; narrow or opening-concentrated guide coverage is explicitly identified. This measures excerpt distribution, not comprehension. |

## Owning code

- `src/app/study/writing/page.tsx`
- `src/components/WritingWorkbench.tsx`
- `src/components/WritingReviewEvidence.tsx`
- `src/lib/writing-workbench.ts`
- `src/components/CourseMaterials.tsx`
- `src/components/MaterialImportReview.tsx`
- `src/components/MaterialRetrievalReview.tsx`
- `src/lib/material-editorial.ts`
- `src/lib/study-materials.ts`
- `src/lib/study-material-files.ts`

## Verification and limits

Unit tests cover prompt capacity, exact quote anchors, paragraph diffs, optional cleaning, repeated edges, metadata/label preservation, evidence coverage, source policies and existing storage conflict protection. The full unit suite has 1,144 passing tests.

Browser tests exercise both desktop and 390px phone views. Local AI endpoints are mocked for reproducible interface/request/citation tests. They do not establish live model quality. Live Tutor/provider assessment remains pending under the owner's earlier instruction; no credentials were requested or exposed.

The import heuristics do not certify reading order or reconstruct PDF tables, diagrams or OCR. Users inspect originals and choose cleaning explicitly. Draft/checkpoint libraries and feedback decisions are browser-local; their export controls provide portable copies.

The asset check adds a bounded 32 KiB raw JavaScript and 4 KiB CSS allowance for this approved package, with no additional images. The optimized production build and packed-book/asset checks pass. Full lint has no errors; the pre-existing StudyAccount navigation warning remains.

Final local production-build run: **46/46 browser checks passed**, covering desktop and 390px phone projects. This includes 22 new-workflow checks and 24 affected regression checks. Scoped accessibility checks found no serious or critical issues in the workbench and import dialog.

Visually inspected the generated desktop/mobile screenshots for the default rooms, revision workbench, word/paragraph comparison, attached review/decisions, import metadata, PDF page quality/text preview and retrieval confirmation. Optional metadata and revision controls are collapsed in the default flows to keep the primary work visible. Screenshots are in `artifacts/dai45/`.

The production run exposed an immediate-import/reload race. Imports now await the durable IndexedDB write before dismissing their preview, prevent duplicate commits, and guard leaving while that write is pending. Source detail saves also await storage. Extended metadata is canonicalized for compare-and-swap checks, avoiding false conflicts from property ordering; the storage regression test covers successive saves.

Local production preview: `http://127.0.0.1:3046/study/writing` and `/study/materials`. No commit, push, production deployment or new external service was performed.
