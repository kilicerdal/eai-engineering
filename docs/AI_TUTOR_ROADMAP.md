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

### Repeatable live scenarios

`node scripts/evaluate-study-tutor.mjs https://www.eai.engineering /tmp/tutor-evaluation.json` runs eight synthetic scenarios against the real protected endpoint. It consumes the existing request allowance and AI usage; use it deliberately, separately from offline tests. Review the actual answer text for correctness and teaching quality. HTTP 200 is not a passing educational assessment. The current reasoning-model candidate uses Cloudflare's compatible Chat Completions endpoint, and the portfolio model remains separate.

## Practice Lab foundation

The initial lab provides 13 fixed-answer questions across algebra, basic physics and plant biology, Python reasoning, and cache-aside fundamentals. Grading and worked explanations are deterministic. Two progressive hints are available before submission. Saved results distinguish first-attempt correctness from first-attempt correctness without hints; retakes do not change those first-attempt measures. The next-question flow prioritizes unseen items and then missed items. Results stay in browser storage and are not a mastery assessment or account-synced learning record.

A practice question can open its own guided tutor session with the problem, learner answer, and completed practice explanation. Selected chat topics receive curated notes linked to Python documentation, OpenStax, or AWS documentation. This is a small curated reference layer, not live web search or a general document-retrieval system. The open-ended tutor still requires educational evaluation beyond the fixed practice bank.

## Personalized learning plans

The practice bank now contains 31 questions with stable IDs and seven mini lessons. Learners choose a track, one of three learning goals, and a 10-, 20-, or 30-minute session. The plan proposes lesson and practice steps using the learner's actual attempts. Goal selection changes the priority of current mistakes, due reviews, supported answers, and unseen questions. Existing attempt history remains compatible, and subject, goal, and time preferences are stored locally.

Suggested review intervals are 1, 3, 7, and 14 elapsed days. Independent correct sessions must be at least 24 hours apart before the interval increases. Mistakes or hints reset that progression. These scheduling rules are product defaults, not a measured prediction of recall or a mastery assessment. Future-dated and invalid attempts are excluded from plan evidence. Review dates do not schedule notifications.

The new questions include negative and zero solutions to linear equations, further force calculations, positive and negative Python range steps, and cache-expiration boundary examples. Worked lesson examples use different numerical scenarios from the practice bank. The bank remains a small foundations collection, not a complete school, university, or professional curriculum.
