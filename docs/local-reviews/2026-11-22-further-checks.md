# Further local checks — November 22

The certification report previously read only one fixed review filename. It now discovers every dated certification review file. Invalid JSON or duplicate IDs inside a review file fail visibly; changed question fingerprints, missing scope, unrecognized status or incomplete alternative checks remain pending. Historical records using `reviewed` and `agent-reviewed-with-stated-scope` retain their meaning. When several matching reviews exist, the most recent checked date is selected.

Ten additional GitHub Actions scenarios were individually inspected against official GitHub job dependencies, OIDC, workflow logs, metadata, reusable workflow and secure-use references. Every alternative has a written assessment. No answer keys, question editions or saved learner records changed. Totals are 220 scoped agent reviews and 870 pending out of 1,090; agent review is not independent human accreditation.

Firefox was also attempted in visible mode with an isolated Playwright profile. It timed out before opening a page, with macOS sandbox-extension/helper errors. The earlier headless attempts failed before navigation too. The browser remains unverified; no personal Firefox profile or platform protection was changed.

Evidence:
- `docs/content-reviews/2026-11-22-certification-reviewed.json`
- `docs/local-reviews/2026-11-22-certification-review-status.json`
- `/tmp/dai-firefox-headed-check.log`
- `/tmp/dai-more-unit.log`
- `/tmp/dai-more-browser.log`

This pass remains local. Live Tutor evaluation and a native assistive-technology session remain pending as previously recorded.

Validation: 1,131 unit tests passed; all 12 Chromium/WebKit journeys passed; targeted ESLint and git diff whitespace checks passed. Inspected refreshed desktop scholarship results, phone object-label guide and phone reader screenshots. Desktop results and checked phone views showed no horizontal overflow. No runtime layout code changed in this pass.
