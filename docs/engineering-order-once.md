# Engineering case study: the order that should happen only once

## Visitor experience

The first Follow a Failure story lives at /engineering/order-once. The homepage keeps the flagship chatbot as the primary action and adds a secondary hero link, a dedicated story invitation after the chatbot, and a case-study link on the Playwright project card.

Visitors predict the expected behavior of a repeated checkout request, reveal the recorded healthy result, and compare it with an injected duplicate-order fault. The evidence, engineering decisions, source links and local replay recipe remain available without completing the prediction. Browser interactions reveal static evidence; they do not submit orders or call a model.

## Evidence provenance

public/evidence/order-once.json is a curated safe capture from a real local PostgreSQL execution of J-REPLAY with the duplicate-replay fault. It was produced using:

```bash
npm run showcase:replay -- --journey=J-REPLAY --fault=duplicate-replay
```

The source framework is pinned to commit dbcbb6e2a773a37b1325af4f8a58bdd89369cc02, tag v5.0.0. The record includes its capture time, run ID, authored origin, journey hash, expected/actual observations and reproduction command. Credentials, cookies, shipping inputs and connection strings are excluded.

The healthy run returns 201 then 200 with the original order identity and later observes one order in history. The injected fault returns 201 on replay with a different order identity. The faulty run stops at its first divergence; later faulty database row counts are not inferred or displayed.

An unclear response is the illustrative business setup. This particular captured journey repeats the request; it does not simulate a dropped network response. The scope is a stored customer/key within one database transaction, not distributed exactly-once delivery or payment-provider guarantees.

## Implementation

The page is prerendered static content with a small client component for the prediction and comparison. All state is held in memory for the current page; no account, model, analytics event or database is added. The code-native social image has a committed SVG source and PNG rendering. Regenerate it with npm run render:engineering-share using the installed local Chromium binary.

Source links are pinned to the captured commit. Historical V5 framework verification is kept distinct from the website interaction checks. The legacy .about-backup file is unrelated and remains untouched.

## Verification

- Production Next.js build passed, with /engineering/order-once prerendered as static content.
- 227 existing Learning Studio checks passed.
- Four new Node checks passed: captured replay outcomes, rejection of incomplete/untrusted evidence, secret exclusion/provenance, and pinned source links.
- Ten browser executions passed: five scenarios on desktop and 390px mobile, covering native keyboard prediction, healthy/faulty comparison, reset focus, safe JSON download, homepage navigation, no POST requests during story interaction, viewport overflow, and selected WCAG-tagged axe checks.
- TypeScript and lint on all changed source/test files passed.

The repository-wide npm run lint baseline still reports errors in generated PDF.js vendor assets and older account/recruiter/test files. Those files were not modified for this feature; a passing focused lint check is not presented as a clean repository-wide lint run. Automated accessibility checks are selected checks, not certification.

## Spending and deployment

The existing erdal-ai Vercel workspace was observed on the Hobby plan before publishing; its current usage was within the displayed included limits. No plan upgrade, paid add-on, new hosting account, AI request or AWS resource is part of this change. Deployment uses the existing GitHub main integration. Local tests and builds do not by themselves establish a successful hosted deployment; verify its returned status and public route separately.
