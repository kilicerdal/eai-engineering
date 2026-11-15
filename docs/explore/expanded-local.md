# eAI Explore expansion — local review

The Explore entrance now opens a compact gallery with the existing lever plus eight new experiences: bridge bending, waves, circuits, falling objects, a tiny trainable classifier, shortest-path search, a one-planet orbital model, and retry/idempotency behavior.

## Shared interaction

Each experience starts with one primary control, with additional controls collapsed. Optional prediction mode stages a change before showing its result; the prompt receives focus. Comparisons show before/current visuals and numerical changes. Three guided discoveries per room start from known inputs. Why panels document assumptions and link to sources. Animation is opt-in, pausable and scrub-able; all interactions also work without animation. Route obstacles and training labels are editable with native buttons.

The lever retains its AI companion, challenge and all existing saves. It now adds optional predictions, before/current diagrams, explicit change observations, three guided discoveries and a pivot-first opening. SVG identifiers are unique across comparison views.

## Model scope

- Beam: static Euler–Bernoulli point-load solution for a simply supported rectangular steel beam. Comparison drawings share a scale. Main drawings auto-scale with explicit captions; no strength or safety rating.
- Waves: superposition of equal sinusoidal waves and a separate damped oscillator steady-response calculation. The two quantities are explicitly distinguished.
- Circuit: ideal series/parallel fixed resistive lamps; displayed brightness represents power, not photometric output.
- Fall: analytic release-from-rest solution with constant quadratic drag, with a same-time vacuum comparison.
- Tiny AI: deterministic logistic regression trained on editable synthetic examples. Held-out labels are separate and fixed. Changing data retrains locally. No cloud AI call.
- Route: BFS/A* on a four-way unit-cost grid. Obstacles, endpoints, expanded cells and unreachable results are represented explicitly.
- Orbit: velocity Verlet integration in normalized astronomical units, fixed central star and test planet. Equal physical-time samples, numerical approximation, no multi-body interactions. Circular solution and ellipse extrema checked against analytic results.
- Retries: deterministic commit-before-response-delay illustration. Stable key prevents duplicate effects. No real requests, orders or services executed.

References are linked per model: OpenStax physics, Mechanics of Materials (Roylance), Google’s ML Crash Course, Red Blob Games’ A* explanation and AWS Builders’ Library. Visuals and explanations are original.

## Preservation and storage

Existing homepage hero artwork and old notebook keys are unchanged. Each new room uses only `eai-explore-rooms-v1:<model-id>`; the lever keeps `eai-explore-v1`. Current settings, editable examples, notes and up to 30 named snapshots resume locally. Export is included. Corrupt or conflicting storage is protected; work remains in memory and can be exported. No existing saves are migrated or removed. New room notes are not transmitted.

## Validation

542 tests pass, including 16 new mathematical, algorithmic and storage checks. Type checking and production build pass. Lint has no errors and one pre-existing StudyAccount navigation warning. Browser checks cover all eight new model controls, classifier relabeling, obstacle edits, lever prediction/comparison and existing save preservation, new-room save/refresh/resume, and all nine experience layouts at 390 px without horizontal overflow. Next route-loading validation found during browser QA was addressed with a loading boundary.

Local review only. No publication or Git push for this expansion.
