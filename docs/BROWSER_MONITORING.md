# Browser checks and production monitoring

## Before merging

The **Browser regression** workflow runs on pull requests targeting main, pushes to main, and manual dispatch. `npm run test:browser:ci` builds once, starts its own production-mode server on loopback port 3040, and runs the existing engineering and study suites together: 214 desktop/mobile journeys. It does not reuse an unrelated server. Retries are disabled; failure evidence is retained rather than retried away.

GitHub installs the lockfile dependencies and Chromium with Linux system dependencies. No AI, mail, account, or production database credentials are supplied. Provider-dependent tests use synthetic fixtures and request mocks. The browser check appears alongside the existing Node/build quality workflow; this change does not configure a branch-protection requirement or prevent Vercel deploying main before Actions finishes.

Run locally:

```sh
npm ci
npx playwright install chromium
npm run test:browser:ci
```

Open the **browser-regression** run artifact for the HTML/JSON report, screenshots, and retained failure traces. Artifacts expire after seven days. Browser CI has a 15-minute test limit and a 25-minute job limit so failed builds cannot run indefinitely.

## Live production checks

The **Production monitor** workflow runs at minutes 17 and 47 of every hour (UTC), on a successful Vercel commit status associated with main, and through **Run workflow** in Actions. The observed Vercel integration uses commit statuses rather than GitHub Deployment objects. Preview statuses and unrelated checks are excluded. The monitor always checks the fixed canonical domain, `https://www.eai.engineering`, and checks out main without persisting credentials.

`npm run monitor:http` checks 15 public pages for successful HTML responses with application main content, discovers up to 40 homepage JavaScript/CSS assets and checks their HTTP availability, verifies the apex-domain redirect, and requires an unknown route to return 404. Requests time out after 15 seconds, with a shared three-minute HTTP deadline so an outage still leaves time to write evidence and run browser checks. A failed check returns a nonzero process exit code and writes both JSON and a readable summary.

`npm run monitor:browser` checks six critical journeys at desktop/mobile sizes (12 checks): flagship projects and viewport fit, Atlas hydration/interaction, recorded retry evidence, hyphenated book search, synthetic unsent tutor draft persistence, and study navigation. It never presses Send. All API requests are intercepted; any attempted non-read request fails the smoke test. Browser state is isolated and discarded. These checks do not verify authenticated accounts, email delivery, live model quality, or production database writes.

```sh
npm run test:monitor  # deterministic failure controls; no network
npm run monitor:http # real public GET requests
npm run monitor:browser # real deployed frontend, read-only browser smoke
```

The HTTP check and browser check have separate steps; browser evidence is still collected after an HTTP failure. The run summary links the results, and the **production-monitor** artifact contains JSON, HTML, screenshots, and failure traces for seven days. The monitor has a 12-minute job limit and a four-minute browser limit. It does not redeploy or roll back the site automatically.

## Alerts and incident response

A failed monitor is a failed GitHub Actions run with a summary and retained evidence. GitHub email/web delivery follows your personal Actions notification preferences. Enable **Actions → failed workflows only** under [GitHub notification settings](https://github.com/settings/notifications) if you want failure emails; this repository cannot guarantee delivery or change your personal settings. No Slack, email provider, webhook secret, or paid monitoring service is configured.

When a check fails:

1. Open the failed step and production-monitor artifact. Separate HTTP/asset outages from browser interaction failures.
2. Check the production URL and the Vercel deployment associated with the latest main commit. A skipped run from an unrelated status is not a successful monitor.
3. Re-run **Production monitor** after investigating. If a production regression is confirmed, fix it through a reviewed PR or use Vercel's approved rollback process; the monitor itself does not change production.
4. Confirm the next monitor is green. Preserve the failed run as evidence instead of changing assertions to hide a regression.

GitHub schedules can be delayed or dropped under load and public-repository schedules may be disabled after 60 days of repository inactivity. A 30-minute cron is not a guaranteed 30-minute detection SLA or an independent 24/7 uptime service. Check the Actions schedule periodically, especially after a long period without repository activity.

References: [Playwright CI](https://playwright.dev/docs/ci-intro), [GitHub workflow events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows), [GitHub workflow notifications](https://docs.github.com/en/actions/concepts/workflows-and-actions/notifications-for-workflow-runs).
