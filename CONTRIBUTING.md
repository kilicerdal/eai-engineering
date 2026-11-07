# Contributing

Use Node 24.x and `npm ci`. Create a focused branch and read AGENTS.md plus the relevant bundled Next.js guide before editing framework code. Run `npm run check`; add the relevant browser suite when interface behavior changes.

Keep changes focused and include the problem, resulting behavior and actual verification in a pull request. Add behavioral regression tests for defects, with synthetic inputs and independent expected results. Never submit credentials, recruiter conversations, real resumes or confidential health/financial data. Use `.env.example` for configuration names only.

Repository documentation and recorded evidence must distinguish implemented behavior, local tests, browser execution, live-model evaluation and roadmap work. Do not turn a selected historical report into a claim of current full-suite coverage.

Do not change production credentials, deployment settings or the live branch as part of a repository-quality update. Vercel may deploy pushed branches independently of CI. Prepare changes locally when deployment is not authorized. See [setup and deployment boundaries](docs/LOCAL_SETUP.md).

The project uses the MIT license. Preserve third-party notices and do not add employer-owned code or restricted assets.
