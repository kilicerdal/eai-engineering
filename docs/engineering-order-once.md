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

## Connected healthcare release — November 6, 2026

The healthcare project remains independent at /engineering/claim-twice, with its own repository and source links. Homepage project cards and both case studies link between the stories. The flagship chatbot remains the primary homepage action.

public/evidence/checkout-scenarios.json adds three independently captured PostgreSQL cases: repeated checkout, three concurrent requests, and changed payload with the same key. Each observes one order, notebook stock 20 → 18, and an empty cart. The concurrent status list is a result set, not a chronology. Source: playwright-ai-automation commit 1ddd99a55c7e6b6a7ca4859662b05b26267a6b73.

public/evidence/claim-redelivery.json records a synthetic local PostgreSQL/Moto execution: acknowledgement failure after persistence, successful redelivery, and changed content at the same object key. API statuses are 201, 201, 409; the persisted row count stays one. Source: ai-healthcare-quality-platform commit b175a55d882658583e617a95b4a8631b87fd069a. The amount is an input value, not a payment; RECEIVED does not mean approval. No real AWS or model calls were made. The healthcare public CI run 42257611714 succeeded using the standard public runner, with no cache or artifact upload.

## Verification

- Production Next.js build passed; both engineering stories are prerendered static routes.
- 227 Learning Studio checks, 37 recruiter checks, and seven evidence checks passed.
- Twenty browser executions passed across desktop and 390px mobile: recorded interactions, keyboard controls, downloads, cross-links, selected accessibility rules, viewport overflow, and synthetic invitation initialization without sending verification.
- The healthcare repository's 59 unit checks passed; both capture scripts ran against local PostgreSQL, with Moto for the healthcare queue/object simulation.
- Repository-wide lint passes with zero errors and five existing warnings. Generated PDF.js vendor assets are excluded; application code is still checked. Account initialization effects and reserved test variable names were corrected.
- Desktop and mobile screenshots were reviewed. Automated accessibility checks are selected checks, not certification.

The unrelated .about-backup file remains untouched. These checks establish the recorded scenarios, not production healthcare compliance or distributed exactly-once guarantees.

## Spending and deployment

The existing erdal-ai Vercel workspace was observed on the Hobby plan before publishing; its current usage was within the displayed included limits. No plan upgrade, paid add-on, new hosting account, AI request or AWS resource is part of this change. Deployment uses the existing GitHub main integration. Local tests and builds do not by themselves establish a successful hosted deployment; verify its returned status and public route separately.
