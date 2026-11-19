# Reliability cleanup — local, unpublished

1. Duplicated hint/different-explanation shortcuts are hidden after a completed reply, where the existing reply-help disclosure contains those actions. Remaining follow-ups now prepare editable drafts instead of immediately sending requests. The separate stuck control remains for an unanswered question.
2. Conversation navigation offers a direct route to the message box.
3. Back to my question and latest reply controls remain reachable in a sticky, wrapping navigation row; existing question picker is retained.
4. Readable next-request preview uses the actual Send payload builder, including the current question, selected source, recent history, goal and extra-context settings. Exact request data is optional. Server-added instructions/reference selection are explicitly outside this preview. Source-only excludes history, goal and extra context from the client payload as well as the server prompt.
5. A shared internal-link guard responds only to writers reporting unsaved changes/failed saving. Cancellation stays on the page. Normally saved work is not blocked. Existing storage conflict checks, backups and before-unload protection remain. Tutor storage failures now participate in this shared warning.
6. Failed-request UI preserves the question, offers review in composer, and clarifies manual retry creates another request; a previously interrupted request may already have been processed. No automatic retry.
7. Mobile checks cover wrapping navigation, controls, request preview and original room artwork; no background changes.
8. Shared focus-visible outlines and reduced-motion overrides; keyboard-accessible source/request text. Existing accessibility/browser checks retained.
9. Existing room empty states were retained; Your space now offers one primary discovery action and discloses the book alternative. Filtered and truly empty states remain distinct.
10. Read-only official-source audit expanded from ten to twelve paths. 67 documents fetched, no unavailable documents or missing linked sections. 44 existing fingerprints unchanged; 23 additional documents lack a prior review baseline. Those need editorial baseline review; reachability is not fact verification. Personal notes and source content unchanged. Report: docs/quality/2026-11-18-official-source-audit.json.
11. Canonical Certification Studio and Your Materials labels in the study menu; shared breadcrumb adds Your space return link. Existing URLs unchanged.
12. Model accuracy remains OPEN: local Cloudflare credentials are unavailable. The revised local instructions cannot yet be evaluated against the real provider. 7/10 prior live review does not establish current local accuracy. No deployment or OpenAI calls used to bypass this gate.

Checks: 965 unit tests passed; initial complete desktop/mobile run 276 passed. Final focused run after shortcut cleanup: 36 passed. Production build/packed-book/asset-size audits passed. Lint: no errors, one existing StudyAccount warning. Inventory unchanged: 12 paths, 1,090 questions, 200 books, 1,000 discoveries. Request preview revised after desktop/mobile visual inspection to lead with human-readable context. Final preview recheck recorded below.

Owner preview: http://127.0.0.1:3037/study#ai-assistant
No publication performed. Retain prior local eAI and dAI changes and all original data keys.

Final readable preview checks: 8 desktop/mobile reliability tests passed after fixing a nested-summary selector and a viewport/menu timing assumption in the tests. Phone and desktop request screenshots visually inspected. The preview now leads with readable question/source/history sections and uses the tutor's friendly help/level labels; raw data is secondary. Final label-only production build passed. Temporary earlier verification servers stopped; owner 3037 preview untouched.
