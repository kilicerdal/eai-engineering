# Local certification learning refinement — November 14, 2026

Local review approved for production publication on November 14, 2026. Release uses the existing main-branch Vercel integration. Existing save keys and backgrounds are preserved.

## Implemented

- Official guide, learning and practice resources for all ten paths; ISTQB matching sample questions and answers; source versions, access/sign-in information and reviewed date.
- Official domain/section links beside answer feedback and notebook mistakes. AWS domain pages, verified Microsoft Learn section anchors, ISTQB syllabus chapter/PDF page pointers where verified. GenAI uses the official syllabus contents rather than an unverified page number.
- Personal Reviewed markers, 3,000-character notes, 200-character manual reading bookmarks, last-resource resume and export. External reading progress and provider scores are not tracked/imported.
- One recommended Continue action on the hub; all existing path cards and controls retained in their disclosure.
- Optional attempt-specific Confident / Unsure / Guessing choices, frozen after checking; confident mistakes prioritized for short review.
- Short reviews of up to three different scenarios in missed domains, with honest empty/fallback messages.
- Selected-answer feedback, deciding clue, alternate-condition explanations for twenty new transfer scenarios, and conceptual diagrams/tables.
- Progress labels: Not explored yet, Needs another look, Practiced. No pass/readiness prediction.
- Clear session ending: practiced focus, ideas to revisit and next reading/practice step.
- Personal question concerns with type/note/source context and export. These are saved locally and explicitly not submitted to eAI or the provider.
- Existing practical challenges gain controllable deterministic consequence illustrations. No live infrastructure, workflows, test runner or model calls.

## Preservation and scope

All existing 153 question records are identical to HEAD. Twenty new transfer questions bring the total to 173, without renumbering existing records or changing answer meanings. New questions include plausible alternatives and condition-specific rationales. Existing ten path definitions, sources, notebooks, timer behavior, plans, tutor route and backgrounds remain.

Existing `eai-certification-v1:<track>` and challenge keys remain. The study parser accepts a notebook entry for every known question in its path (needed for 27-question foundation banks); its schema/version and old data shape remain unchanged.

New independent key: `eai-certification-learning-v1:<track>`. It stores resource work, manual reading position, confidence and concerns. Bounded parser and writes protect corruption, quota failures and concurrent changes. Exports remain available when persistence is blocked. These personal records are not included in tutor requests.

Official materials remain provider-hosted. No official question bank or document contents are copied or rehosted. AWS courses/practice may require sign-in or subscription; the DVA-C03 upcoming version remains explicitly labeled.

## Validation

- 583 tests passed; lint has only the existing StudyAccount navigation warning.
- Type generation/typecheck and optimized production build passed; final summary wording correction rebuilt successfully.
- All 153 published question records compared identically with HEAD.
- Browser confirmed reading notes, Reviewed marker, bookmark, confidence and concern persist after reload; fresh practice from a domain section; selected-choice feedback; short review offers a different scenario; session-end actions; consequence controls require both workflow repairs; old Cloud notebook/reflection/reviewed flag retained.
- Mobile official-prep view at 390px: document width equals viewport width.

## Official resource sources

- https://aws.amazon.com/certification/certification-prep/
- Existing AWS CLF-C02, AIF-C01, SAA-C03 and DVA-C03 official exam guides, with domain pages.
- https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/
- https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/
- https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/
- https://istqb.org/certifications/gen-ai/
- https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200
- https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300
- https://learn.microsoft.com/en-us/credentials/certifications/github-actions/
- https://learn.microsoft.com/en-us/credentials/certifications/github-copilot/
- https://docs.github.com/en/actions
- https://learn.microsoft.com/en-us/training/paths/copilot/
