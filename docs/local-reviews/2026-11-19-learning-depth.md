# Learning depth package — local preview

Local preview: http://127.0.0.1:3038/
No deployment or Git push is part of this package.

## Accepted scope and implementation

| # | Improvement | Implementation / practical boundary |
|---|---|---|
| 1 | Concept-family quality review | `audit-learning-depth.mjs` groups existing authored case families and lesson memberships, identifies lexical overlap, and produces an actionable editorial queue. Overlap is a review cue, not a duplicate verdict. |
| 2 | Optional prerequisites | 15 concise concept refreshers, mapped to 90 core questions, plus existing prerequisite guidance for the two newer paths. Available inside checked-answer help. |
| 3 | AWS trade-offs | Requirement-dependent contrasts for capacity/recovery, authentication/authorization, cost analysis/alerts, purchase constraints, storage interfaces, queues and delivery. |
| 4 | ISTQB artifacts | Four switchable synthetic records: contradictory requirements, defect report, decision table and risk-aware test results. Unscored, optional, no saved-session mutation. |
| 5 | Ambiguous assumptions | An editorial wording queue; examined two metric questions and six shared-case questions. Eight rationale/source refinements clarify denominators, service scope, notification timing and evidence limits. |
| 6 | Balanced sets | Four deterministic, disjoint core forms per original path distribute domain/activity groups with at most one item difference per group. Teaching activity classifications are heuristic, not official exam weightings or validated difficulty. Existing saved question arrays never regenerate. |
| 7 | Linked-scenario recap | Finished sessions can compare shared-case questions and the explanation from their retained edition. No answer-key content before submission. |
| 8 | Prediction before options | Existing optional prediction flow retained; comparison guidance now asks whether the learner predicted the behavior or recognized a service label. No added grading or mandatory writing. |
| 9 | Visible revision history | `quality-v12` for new core sessions; explicit immutable lookup for v11 and older editions. Objective differences now appear alongside wording, choices, explanations and source changes. |
| 10 | Source support | Source-section review queue covers all 1,090 questions. Eight reviewed items now have focused supporting references. Checked-answer help distinguishes a linked topic page from evidence supporting a particular rationale. This is not a claim of a new expert review of all 1,090 items. |
| 11 | Useful Tutor clarification | Teaching contract asks one essential clarification and permits useful independent first steps; no guessed constraints. |
| 12 | Small explanation steps | Explicit one-step-then-response contract; existing reply workbench gains Previous/Next explanation-part controls. |
| 13 | Feedback distinctions | Teaching contract and optional draft controls separate arithmetic/units, unsupported assumptions and missing information. No automatic misconception diagnosis. |
| 14 | Consistent worked examples | Teaching contract requires consistent given values, units, result checks and labeled invented numbers. |
| 15 | Question → Tutor → return | Explicit full-draft preview with selected question/rationale/reasoning; separate unsent Tutor session and a local return link. Existing drafts and scored work remain intact. Includes the two newer certification paths. |
| 16 | Useful endings | Existing takeaway editor now explicitly supports stopping with a takeaway or question. Tutor instructions avoid automatic endless follow-ups or false saving claims. |
| 17 | Book starting guidance | All 200 books have an editorial question and difficulty guidance in existing Before you begin details. Six books have specific central prompts; others use a clearly editorial reading question rather than fabricated scholarship. |
| 18 | Chapter orientation | Quiet inline current/next contents label plus next-heading context in existing place details. Missing position does not claim the final chapter. |
| 19 | Meaningful discovery relationships | Eight authored bridges rank ahead of category fallback, with explicit comparison prompts and analogy limits. Generic fallback remains available for broad browsing, not presented as proof of a scientific relationship. |
| 20 | Qualify surprising claims | Six targeted scope notes explain definitions, task boundaries, archaeological uncertainty and what evidence does not establish; existing correction history is retained. |
| 21 | Quiet stopping point | Optional takeaway/question scratch area and plain-text download. Scratch writing stays while browsing in the mounted room, is explicitly not part of browser backup, and must be downloaded to persist past reload. |
| 22 | Distinct project identities | Each flagship’s concrete engineering decision appears before preview controls. |
| 23 | Screenshot evidence captions | Enlarged screenshots state the demonstrated evidence and its limits. Existing keyboard dismissal/focus return and image aspect ratio retained. |
| 24 | Helpful empty states | Tutor notebook search reset and Curiosity collection-preserving search reset; existing first-visit and unfinished-work guidance retained. |
| 25 | Consistency/accessibility | Scoped responsive styling, keyboard focus, accessible artifact selector and corrected heading order. No background or layout-artwork changes. |

## Source review performed for the eight refinements

- AI testing growth 015 / 016: actual-positive vs predicted-positive denominator. Retain both because they test distinct metrics despite similar numbers. Google ML Crash Course, Recall and Precision sections: https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall
- Cloud case 8, questions 1–3: choose monitoring, verify receipt, identify the evidence gap. Keep distinct tasks; replace generic rationale with task-specific support and periodic-update qualification. AWS Budgets: https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html
- Cloud case 4, questions 1–3: choose responsibility response, examine permissions, identify the misconception. Keep distinct tasks and qualify service-dependent duties. AWS customer-responsibility section: https://aws.amazon.com/compliance/shared-responsibility-model/
- SQS prerequisite teaching checked against https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues-at-least-once-delivery.html
- Artifact teaching aligns with CTFL topic areas; synthetic artifacts are our own and are not official exam questions: https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/

The automated queue found 269 lexical-overlap pairs and 282 wording cues. These are not 551 confirmed defects. A complete independent factual/psychometric review is not represented as completed. The eight explicit refinements above were checked against the cited primary material; remaining flags remain visible editorial triage.

## Verification

- 1,006 unit tests passed, including deterministic group balance, no pre-submission recap, retained editions, local-only return destinations, reading guidance coverage and source/rationale immutability.
- TypeScript passed. Lint has no errors; the existing StudyAccount navigation warning predates this package.
- 120 browser checks passed on the final production build, including all six new journey checks. Visually inspected the checked-answer review, Curiosity stopping controls and project screenshot dialog. Cover-image captions describe an introduction, rather than claiming that a title image displays test results; corrected an availability refresher that had used recovery-metric prerequisites in a capacity/failure scenario. The suite checks visible embedded Tutor controls before measuring layout.
- Inventory confirmed: 12 paths, 1,090 questions, 200 books, 1,000 discoveries.
- Existing asset/background and packed-book files were not edited. Raw build assets remain within the checked limits (JavaScript 8,367,823; CSS 641,508 bytes); packed books: 90,791,154 bytes, unchanged. Exact final totals are in `tmp/learning-depth-build.log`.
- No paid AI request was made. Tutor instruction changes are tested as prompt construction, not proof of live-provider response quality.

Pre-existing unrelated change `public/evidence/reading50-anchors.json` was left alone.
