# Ten-path local preview — November 14, 2026

Local review approved for production publication on November 14, 2026. Release uses the existing Vercel integration on main; no storage migration or background change.

## Scope

Three compact provider collections: AWS (4), ISTQB (4), Microsoft & GitHub (2).
The original Cloud Practitioner, AI Practitioner and CTFL routes and study keys are unchanged.
New paths: SAA-C03, DVA-C03, CTAL-TAE v2.0, CT-AI v2.0, CT-GenAI v1.1, GH-200 and GH-300.

153 original questions total: the original 75 are identical to HEAD, plus 78 new questions (two selected-concept questions per new syllabus chapter/domain). New banks contain 8–16 questions and explicitly disclose starter coverage; they are not complete syllabus coverage or official mocks. Every new path retains assessment, focused/timed practice, authored feedback, notebook, plan and optional reasoning tutor.

## Three improvements

- Optional goal/background chooser with explained recommendations.
- Interactive synthetic architecture, workflow, automation and AI-output-review challenges. Each path has a relevant challenge; some paths share a scenario. Draft and reviewed decision persist independently per path. No real infrastructure or workflow execution.
- Visible level, prerequisites, recommended background, source versions, per-domain question counts and planning-allocation explanation.

New challenge keys: `eai-certification-challenge-v1:<track>:<scenario>`.
Existing certification keys/parser and all unrelated saves remain unchanged. Corrupt/conflicting challenge data is protected from overwrite; work remains exportable.

## Sources

- SAA-C03: https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html
- DVA-C03: https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03.html
- Transition dates: https://aws.amazon.com/blogs/training-and-certification/september-2026-new-offerings/
- CTAL-TAE: https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/
- CT-AI: https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/
- CT-GenAI: https://istqb.org/certifications/gen-ai/
- GH-200: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-200
- GH-300: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300

DVA-C03 is explicitly upcoming December 1, 2026; DVA-C02 remains available through November 30. ISTQB advanced/specialist prerequisites distinguish required CTFL and advanced practical experience from recommendations. GitHub planning uses rounded local allocations informed by official ranges; new ISTQB chapter planning uses equal allocations, not purported exam weights.

## Validation

- 574 tests passed; lint has only the pre-existing StudyAccount navigation warning.
- Type generation/typecheck and production build passed.
- Original 75 question records and three track definitions compared identically with HEAD.
- Browser: chooser goal/background changes, provider filter, new path navigation, challenge wrong/correct feedback, persisted challenge after reload, new assessment choice/reasoning resumed after reload, original Cloud notebook/reflection/review status retained.
- Mobile hub at 390px: document width equals viewport, no horizontal overflow.
- Optional AI route unchanged; canonical context/guard tests cover all 153 questions. No new live model invocation in this preview.
