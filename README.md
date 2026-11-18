# eAI Engineering

[![Quality](https://github.com/kilicerdal/eai-engineering/actions/workflows/quality.yml/badge.svg?branch=main)](https://github.com/kilicerdal/eai-engineering/actions/workflows/quality.yml) [![Browser regression](https://github.com/kilicerdal/eai-engineering/actions/workflows/browser.yml/badge.svg?branch=main)](https://github.com/kilicerdal/eai-engineering/actions/workflows/browser.yml)
![Node 24](https://img.shields.io/badge/Node-24-339933?logo=nodedotjs) [![MIT license](https://img.shields.io/github/license/kilicerdal/eai-engineering)](LICENSE)

**Review in five minutes:** [What to run, which failure to inspect, and what it proves](docs/REVIEWER_GUIDE.md) · [Evidence provenance](docs/EVIDENCE.md).

An independent engineering portfolio and AI learning platform by **Erdal Kilic, Senior SDET / QA Automation Engineer**. The project combines interactive learning tools, an engineering assistant, and case studies backed by executable automation projects.

[Live website](https://www.eai.engineering) · [Engineering Studio](https://www.eai.engineering/engineering) · [Learning Studio](https://www.eai.engineering/study) · [Setup](docs/LOCAL_SETUP.md) · [Contributing](CONTRIBUTING.md)

**Project roles:** [Choose the right source project](docs/PROJECTS.md) · [Feature/service boundaries](docs/FEATURE_BOUNDARIES.md) · [Documentation index](docs/README.md).

## Repository map

| Purpose | What belongs here | Review |
|---|---|---|
| Production website | Next.js pages, server routes and optional authenticated/provider integrations | [Runtime boundaries](#architecture-and-boundaries), [setup](docs/LOCAL_SETUP.md) |
| Engineering portfolio | Public case presentations and dated synthetic evidence; the reference systems live in separate repositories | [Five-minute project tour](https://www.eai.engineering/engineering/tour), public/evidence/ |
| Experiments and practice | Investigation/Practice Lab exercises and authored learning material; not production customer outcomes | src/app/engineering/practice/, src/components/practice-lab/ |
| Automated validation | Deterministic Node/build checks, browser regression, and read-only production monitoring | tests/, .github/workflows/, [monitoring](docs/BROWSER_MONITORING.md) |

The checked-in compressed reading library under `data/reading/` is roughly 87 MiB; images and dated evidence add storage too. GitHub repository size also includes history and is not a browser JavaScript download measurement. See [the repository guide](docs/REPOSITORY_MAP.md) before proposing a split.

## Explore the work

| Experience | What to inspect |
|---|---|
| [Engineering Studio](https://www.eai.engineering/engineering) | Guided financial, commerce and healthcare failure/recovery stories with recorded execution evidence |
| [SettlementLab](https://www.eai.engineering/engineering/settlementlab#showcase-v30) | Python financial assurance, shared-ledger settlement and independent-service reuse; [source](https://github.com/kilicerdal/settlementlab) |
| [Order Once](https://www.eai.engineering/engineering/order-once) | Commerce retry, stock and duplicate-operation investigation |
| [Claim Twice](https://www.eai.engineering/engineering/claim-twice) | Healthcare message redelivery and processing controls |
| [Learning Studio](https://www.eai.engineering/study) | AI tutoring, plans, linked materials, lesson checks, practice and a mistake notebook |
| [Writing Studio](https://www.eai.engineering/study/writing) | Draft feedback, argument/structure analysis and rate-limit handling |
| [Engineering assistant](https://www.eai.engineering/chat) | Coding, testing, debugging and review conversations |

[![Recorded SettlementLab console](public/images/engineering/settlementlab-v22.png)](https://www.eai.engineering/engineering/settlementlab)
*Recorded V2.2 financial console shown in the Engineering Studio. Current V3.0 execution reports are linked from the case study. This repository hosts the presentation; the financial framework has its own repository.*

## Run locally

Use **Node.js 24.x** (see [.nvmrc](.nvmrc)) and npm. Core pages, deterministic tests and the production build need no AI credentials. Live integrations require your own configured services.

```sh
nvm use                 # if you use nvm; otherwise select Node 24 directly
npm ci
npm run dev
```

Open http://localhost:3000. Optional integrations are documented in [local setup](docs/LOCAL_SETUP.md), with a blank [.env.example](.env.example). Do not copy production credentials into a public issue, test fixture or screenshot.

## Verify the repository

```sh
npm test                # all top-level Node test files, including recruiter and engineering controls
npm run lint
npm run typecheck       # generate Next route types, then run TypeScript without emit
npm run build
# Or run the four checks in order:
npm run check
```

Tests use injected/local fixtures and do not require live model calls. These are separate from browser checks:

```sh
npx playwright install chromium
npm run test:engineering-browser
npm run test:study-layout
```

Browser configuration builds and starts an isolated production-mode server on 127.0.0.1:3040 and records failure traces/screenshots. It must not target production for write operations. Some historical evidence under docs/ and public/evidence/ records earlier runs; those records are not results of the command you just executed.

The [repository quality workflow](.github/workflows/quality.yml) runs Node tests, lint, type checking and a production build with read-only repository permissions and no service credentials. It does not deploy. Vercel deployment is a separate existing integration; pushing a branch can still trigger that integration independently.

## Architecture and boundaries

```mermaid
flowchart TD
    UI[Next.js pages and client components] --> API[Server route handlers]
    API --> Guards[Validation, request limits and access checks]
    Guards --> CF[Cloudflare Workers AI]
    Guards --> SB[Supabase account and portal data]
    Guards --> GH[Optional GitHub workflow reads]
    UI --> Evidence[Recorded synthetic engineering evidence]
```

| Area | Location |
|---|---|
| Pages and server routes | src/app/ |
| Interface components | src/components/ |
| Pure policies, contracts and adapters | src/lib/ |
| Node and browser checks | tests/ |
| Case-study evidence and images | public/evidence/, public/images/ |
| Design records and setup details | docs/ |

Cloudflare and privileged service credentials stay server-side. Public Supabase settings use NEXT_PUBLIC names intentionally; they are not authorization. Provider setup, database row policies and invitation/session checks have their own requirements. See [security boundaries](SECURITY.md) and [account setup](docs/study-account-setup.md).

Failure-log analysis performs best-effort redaction before sending text to the model. This does not guarantee removal of every possible sensitive format. Use synthetic logs; never submit credentials or confidential financial/health records. AI output is advisory and does not establish correctness. Detailed AI-generated test execution, coverage intelligence and broader repository-health workflows remain development areas, not completed enterprise capabilities.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, Cloudflare Workers AI, Supabase, Upstash, Node's test runner, Playwright and Vercel. Versions are recorded in package.json and package-lock.json.

## Project status and ownership

I set the direction and priorities for this personal portfolio. I use AI assistance for implementation, test development and documentation. The interface, integrations, learning workflows and regression checks are available for inspection; dated evidence records state what was actually exercised. Employer source code and confidential data are not included.

[Five-minute project tour](https://www.eai.engineering/engineering/tour): three flagship projects, the decisions to inspect, public evidence and ownership scope. [Tour design and evidence boundaries](docs/RECRUITER_TOUR.md).

The source is [MIT licensed](LICENSE), copyright 2026 Erdal Kilic. External services, dependencies and model providers retain their own terms. [Contribution guide](CONTRIBUTING.md) · [Security policy](SECURITY.md).

## Automated browser checks and monitoring

[Browser regression](https://github.com/kilicerdal/eai-engineering/actions/workflows/browser.yml) runs the engineering and study journeys for pull requests and main. [Production monitor](https://github.com/kilicerdal/eai-engineering/actions/workflows/production-monitor.yml) checks public routes, frontend assets, and critical desktop/mobile flows every 30 minutes and after successful Vercel deployment statuses. [Setup, evidence, notification settings, and incident response](docs/BROWSER_MONITORING.md).

## Compatibility and maintenance

[Supported versions, quick/full checks, dependency decisions and upgrade policy](docs/MAINTENANCE.md). Historical evidence stays dated; current CI status is linked above.
