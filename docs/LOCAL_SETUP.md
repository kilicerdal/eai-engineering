# Local setup and optional integrations

## Reproducible baseline

Use Node 24.x and npm. Run `npm ci` from the repository root, then `npm run check`. The lockfile fixes dependency resolution. Node tests use injected dependencies; no live AI, email delivery or production database is needed. `npm run dev` starts the UI on localhost:3000.

The repository's package.json is marked private to prevent accidental npm publication; this does not make the GitHub repository private.

## Optional environment

Copy `.env.example` to `.env.local` only when enabling an integration. The example contains blank values and disabled provider/portal flags. Do not copy a real environment file into Git. Changing Vercel settings is a separate deployment operation and is not part of local setup.

| Variables | Purpose | Without configuration |
|---|---|---|
| CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN | Server-side AI requests | Live AI returns a configuration/unavailable response |
| UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN | Shared request limiting | Protected AI endpoints fail closed rather than running without the limiter |
| NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY | Browser account/portal authentication | Account-backed features remain unavailable |
| NEXT_PUBLIC_STUDY_GOOGLE_ENABLED / EMAIL_ENABLED / APPLE_ENABLED | Provider presentation flags | All are false in the example; enabling a flag does not configure a provider |
| RECRUITER_PORTAL_ENABLED, RECRUITER_PORTAL_ORIGIN | Optional invitation portal | Keep disabled for ordinary repository review |
| RECRUITER_SUPABASE_SERVICE_ROLE_KEY | Privileged portal database access | Protected portal functionality unavailable |
| RECRUITER_AUTOMATION_KEY, RECRUITER_INVITE_API_KEY | Authorized invitation/session operations | Automation endpoints remain unavailable or unauthorized |
| RECRUITER_CALL_EMAIL_KEY | Optional call-request notification | Email request fallback remains; do not exercise real delivery in tests |
| GITHUB_ACTIONS_TOKEN | Optional workflow failure retrieval | Private workflow access is unavailable |

Keep privileged credentials server-only. Never place a service-role key, AI token or automation secret in NEXT_PUBLIC variables. The Supabase publishable key is intentionally public and relies on correct database policies. Follow [study account setup](study-account-setup.md) for migrations, provider callbacks and isolation checks before enabling accounts.

The default local portal origin is http://localhost:3000. Production origin restrictions remain separate. Do not point tests at production accounts, invite real users or send notifications as part of local verification.

## Test scopes

- `npm test`: every top-level tests/*.test.mjs file, with deterministic fixtures.
- `npm run test:study`: study-only subset retained for focused work.
- `npm run test:engineering-story`: story-specific Node checks.
- `npm run test:engineering-browser`: configured desktop/mobile Playwright journeys on loopback.
- `npm run test:study-layout`: separate study browser checks.

Install Chromium with `npx playwright install chromium` before browser checks. The quality workflow runs deterministic checks and a build; it does not imply that browser suites or live-provider checks ran. Existing lint warnings are distinct from errors. Do not silence a rule globally to make a check appear clean.

## Branch and deployment handling

Vercel is connected separately from GitHub Actions. A branch push may create a preview deployment, and pushing to the production branch may deploy the live site. To prepare changes without any deployment, keep the branch local. Review the complete diff and check the current deployment configuration before publishing or merging. No deployment credentials are needed by the quality workflow.
