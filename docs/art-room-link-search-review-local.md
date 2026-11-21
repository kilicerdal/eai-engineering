# Art Room local link and search review

2026-11-20. Local-only follow-up; nothing published.

Reproduced and corrected two issues:

1. A remembered Introduction depth hid legacy research fragment targets such as #research-materials. Study navigation now determines the appropriate depth from the target element's actual essay/research container. Older looking anchors are covered too; no legacy IDs were removed.
2. Search tokenization discarded non-Latin characters, making a nonempty query behave like an empty query and return all 112 paintings. Matching now retains Unicode letters/numbers and rejects nonempty symbol-only input. Accented and translated-title matching continues to work.

Validation: 113 Art Room browser tests pass; four focused search unit tests pass; scoped lint and production build/size budgets pass. The anchor audit retains all 1,922 required anchors across 112 paintings. Learning inventory is unchanged: 200 books, 1,000 discoveries, 12 certification paths and 1,090 questions. Visually inspected the repaired research target at mobile width; no horizontal overflow.

Local preview: http://127.0.0.1:3038/study/art. Evidence: artifacts/art-review/legacy-research-mobile.png and /tmp/art-review-*.log. No content, backgrounds or saved-work formats changed.
