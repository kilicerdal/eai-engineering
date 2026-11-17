eAI: one retry, one intended effect

This is a small authored sequential teaching model, not a copy of the PostgreSQL application, a concurrency test, or production-ready checkout code.

Run locally with Node.js 20 or later:
  node retry-contract.mjs

No packages, credentials, database, AI service or network connection are required. The script does not write files or contact services.

Expected observations:
- Same key and same content: status 201 then 200, same order identity, one order, stock 20 to 18.
- Same key and changed content: status 201 then 409, one order, stock 18.
- Different key on a supposed retry: status 201 then 201, two orders, stock 16. The model cannot infer shared intent across distinct keys. A genuinely new purchase should use a new identity.

Limits:
The model omits authentication, persistence, concurrency, transactions, key expiry, cart state, real shipping, payments and network loss. A lost reply is a reason to discuss retries; no network failure is simulated here.

Public implementation and historical recorded evidence:
https://github.com/kilicerdal/playwright-ai-automation/commit/1ddd99a55c7e6b6a7ca4859662b05b26267a6b73
https://www.eai.engineering/evidence/checkout-scenarios.json

Website walkthrough:
https://www.eai.engineering/engineering/change-story
