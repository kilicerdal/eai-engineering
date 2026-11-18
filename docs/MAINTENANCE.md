# Compatibility, verification and dependency policy

## Supported setup

Node.js 24.x from .nvmrc and npm ci. Browser suites use the locked Playwright package and Chromium. Local deterministic checks need no Supabase, Cloudflare, email, production database or model credentials.

From a fresh checkout at the repository root, after installing those prerequisites:

```sh
npm ci && npx playwright install chromium
```



## Quick check and complete validation

Quick, bounded check:

```sh
npm run test:monitor
```

Complete deterministic checks:

```sh
npm run check
npm run test:browser:ci
```

[Architecture](../README.md#architecture-and-boundaries) · [Evidence and reproduction](../docs/BROWSER_MONITORING.md). npm run test:monitor tests the monitor contract offline; it is not a production uptime check. Production monitoring uses separate read-only HTTP/browser commands. Authenticated integrations, live model quality and mail delivery require separate verification.

Commands resolve pinned requirements/lockfiles where supplied. A runtime major or supported Python floor is a deliberate compatibility decision, not an automatic dependency update. Container major/patch tags can receive upstream updates unless an exact version is stated; this is not a bit-for-bit image reproducibility claim.

## Update decisions

Review recorded: **2026-11-17**. This is a policy review date, not a claim that every optional live integration was rerun that day. Current hosted execution appears in Actions; historical counts retain their dates and source identifiers.

No runtime migration is authorized automatically. Keep Node 24, the exact Next/React versions and the lockfile coordinated; candidate updates must pass Node/build checks and desktop/mobile browser validation.

Dependabot checks application/tool dependencies weekly and GitHub Actions monthly. Updates are reviewed in PRs and are not auto-merged. Monthly, review deferred PRs, runtime support, security advisories and the oldest open genuine defects. Record the tested version and run link before changing a compatibility boundary. Remove an ignore rule when its migration is approved; do not keep it silently forever. Security fixes may require raising a runtime floor rather than bypassing tests.

A green CI badge describes that workflow's current result, not a security, accessibility or production-readiness certification. Framework and license badges identify tools/terms, not test results. Do not publish a static passing test-count badge without a dated run.

## Known development-tool advisory

The 2026-11-17 audit found the upstream picomatch advisory [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) in development tooling, with no compatible patched release listed at that review. The offline CI badge is not a vulnerability-scan badge. Recheck npm audit during dependency review; do not force unrelated framework downgrades merely to remove an advisory count.
