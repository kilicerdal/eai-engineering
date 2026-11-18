# What this repository contains

This is one deployed Next.js application with several clearly scoped experiences, not the source for every linked reference system.

| Area | Paths | Runtime/evidence boundary |
|---|---|---|
| Production application | `src/app/`, `src/components/`, `src/lib/` | Public pages and optional server-side integrations. Real services require explicit configuration; deterministic checks use doubles. |
| Portfolio presentations | `src/app/engineering/`, `public/evidence/`, `public/images/engineering/` | Read-only stories and dated records. Checkout, healthcare and settlement reference implementations remain in their own public repositories. |
| Authored exercises and experiments | `src/app/engineering/practice/`, `src/components/practice-lab/`, `src/app/engineering/lab/` | Practice/teaching workspaces and exploratory tools. An authored exercise is not a discovered customer defect or independently measured production outcome. |
| Automated validation | `tests/`, `playwright*.config.ts`, `.github/workflows/` | Node/build validation, desktop/mobile journeys and read-only production checks. Live provider correctness is separate. |
| Reading content | `data/reading/`, reading routes under `src/app/` | Compressed book content served by the application, not a generated test report directory. |
| Reproduction and decisions | `docs/`, `scripts/` | Setup, policies, build audits and supporting utilities. Historical reports keep their dates and source scope. |

A 2026-11-17 working-tree inspection found about 87 MiB of compressed reading content, 7.6 MiB of public images and 0.5 MiB of public evidence. These are approximate source-folder sizes, not Git-history size or production bundle measurements. The build's packed-content audit reports delivery trace scope separately.

Keep reports, browser traces and transient databases in ignored artifact paths and GitHub Actions artifacts. Use releases for substantial recordings; do not commit another complete generated report tree for each run. Existing historical source/evidence should not be deleted just to reduce a displayed repository size.

Splitting is justified when a component gains its own deployment, dependency lifecycle or consumer—not because the GitHub size looks large. This pass documents boundaries without moving routes, changing deployed URLs, removing content or rewriting Git history.
