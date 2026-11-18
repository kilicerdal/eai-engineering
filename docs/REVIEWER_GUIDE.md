# Reviewer journey

## What this demonstrates
The primary public experience is an engineering portfolio presenting reproducible failure/recovery stories. Learning tools and the assistant are separate experiences with their own service requirements. This repository hosts their presentation, not the source for every reference system.

## Inspect without an account
1. Open https://www.eai.engineering/engineering/tour.
2. Pick a financial, commerce or healthcare story and inspect its expected/observed result.
3. Open the dated source evidence and follow the source-repository link to reproduce it there.

Recorded case studies are not live transactions against the reference applications. No real healthcare or financial data is needed. [Feature/service boundaries](FEATURE_BOUNDARIES.md) · [Evidence provenance](EVIDENCE.md).

## Reproduce this website
Node 24/npm; deterministic checks need no provider credentials:

```sh
npm ci
npm run check
npx playwright install chromium
npm run test:engineering-browser
npm run test:study-layout
```

The browser checks build/start an isolated production-mode local server. Use `npm run dev` to explore at http://localhost:3000. Optional live AI or account-backed routes require separate configuration; a successful build does not prove provider availability.

## Distinguish three kinds of checks
| Check | Target | Does it deploy? |
|---|---|---|
| Repository quality | Node tests, types, lint, production build | No |
| Browser regression | Isolated local production-mode server | No |
| Production monitor | Read-only checks of the deployed website | No |
| Vercel integration | Deployment from eligible repository branches | Yes, independently of quality jobs |

Dependabot and the portfolio review branch are excluded from Vercel previews by configuration; main remains deployable. Other eligible branch pushes can create previews. [Monitoring and deployment behavior](BROWSER_MONITORING.md) · [Documentation index](README.md) · [Source layout](REPOSITORY_MAP.md).
