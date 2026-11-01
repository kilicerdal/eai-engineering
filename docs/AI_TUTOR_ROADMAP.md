# EAI Study Assistant: product direction

Build a rigorous personal tutor for school, university, and professional learners. The product should help learners explain and apply ideas independently, rather than simply generate answers.

## First release: tutoring foundation

- Session-specific level, subject, goal, and teaching approach.
- Guided learning, worked explanations, one-at-a-time practice, work review, and study planning.
- Contextual hints, alternate explanations, related problems, and session summaries.
- Bounded role-based conversation context, streamed answers, visible retry states, and browser-local session persistence.
- Professional learning covering engineering, cloud architecture, testing, AI, and interview reasoning.

These are model instructions and workflow controls. They are not proof of teaching accuracy or measured learner progress. Local sessions are not account-backed storage.

## Next: prove teaching quality

Create a versioned evaluation set with reference answers and review rubrics: arithmetic, algebra, units, scientific misconceptions, code reasoning, historical evidence, academic writing, and engineering trade-offs. Include multi-turn tests for wrong answers, hints that reveal too much, ambiguous problems, uncertainty, and prompt injection. Compare candidate models using correctness, pedagogical quality, latency, and cost before changing the provider or model. Human review is required for educational quality; structural unit tests cannot establish it.

## Learning workspace

Add structured lessons and practice items with explicit objectives, reference solutions, rubrics, and attempt records. Show progress based on observed attempts, distinguish exposure from demonstrated understanding, and add spaced review. Never infer mastery from chat volume alone.

## Learning materials and continuity

Add authenticated learner accounts and per-user storage before cross-device history. Then add course materials with document processing, source citations, and retrieval tests. Uploaded content must remain separate from system instructions, and every citation should resolve to an actual passage. Include clear retention and deletion controls.

## Later experiences

Consider diagrams, voice tutoring, accessibility improvements, and educator tools after the core learning loop is reliable. Do not advertise uploads, persistent memory, scores, verified mastery, browsing, or reminders until those capabilities actually exist.

## Verification

Run `npm run test:study` on Node 24+, `npx tsc --noEmit --incremental false`, and `npm run build`. Browser checks should cover subject selection, learning settings, reload persistence, mobile layout, errors, retry, and a live multi-turn lesson. Mocked tests do not replace evaluation of actual model responses.
