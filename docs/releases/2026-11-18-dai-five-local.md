# Five tutor refinements — local only

Implemented: a quieter first question with optional prepared examples; direct access to supplied material; session return card showing the last learner question and saved reflection separately from a newer draft; explicit prepared continuation from that checkpoint; source wording windows tied to the original submitted passage; editable pause checkpoint and download using existing recap/next-step fields.

Preservation: no storage schema/key changes, no automatic sends, no replacement of an existing composer draft, no new external service. Existing session, source, workbench, recap, save/recovery and adaptation controls remain. Homepage artwork untouched. All earlier pending eAI improvements remain local.

Accuracy: strengthened evidence, causal-limit and follow-up instructions from the preceding pass remain local. Three additional held-out cases are available in scripts/evaluate-study-tutor.mjs: cache-population-heldout, experiment-replication-heldout, record-provenance-heldout. Their rubrics require checking expiry assumptions, causal uncertainty and unsupported provenance. They have NOT been run against the revised model instructions: local Cloudflare credentials are absent. Previous live ten-case review recorded seven passes and three needs-work results. This remains an open release gate; no claim of verified model improvement.

Validation: 958 unit tests passed. Production build and packed-book/asset-size audits passed. Targeted desktop/mobile browser run: 22 passed, including checkpoint persistence, message/draft preservation, source matching, first-question controls and accessibility. Broader browser result recorded after completion below.

Owner preview: http://127.0.0.1:3037/guide/tutor-preview
Production-build validation preview: http://127.0.0.1:3047/study#ai-assistant
Nothing published.

Final checks: 264 desktop/mobile browser tests passed (1.9 minutes). Final typecheck and production build passed, including packed-book and size audits. Lint has no errors and one pre-existing StudyAccount navigation warning. Inventory audit confirms 12 paths, 1,090 questions, 200 books and 1,000 discoveries. Desktop and phone first-session screenshots visually inspected. Model rerun remains pending as described above.
