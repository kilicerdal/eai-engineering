# Feature and service boundaries

The primary recruiter entry is the public engineering portfolio. Other experiences are independent capabilities within the same deployed application. This map describes source behavior, not a claim that every external integration is currently configured.

| Experience | Role | Evidence/runtime mode | Fresh checkout without credentials |
|---|---|---|---|
| Engineering tour and case studies | Primary portfolio | Recorded synthetic evidence plus deterministic presentation | Read the bundled stories; reference applications run separately |
| Practice/investigation exercises | Supporting engineering practice | Authored fixtures and deterministic exercise controls; optional AI explanations use a provider | Authored material is distinct from model output |
| Learning Studio | Learning product | Bundled content/local interaction plus provider-backed tutoring, plans and checks | Deterministic pages/tests/build work; live AI needs configured provider |
| Writing Studio | Learning product feature | Authored UI/editor state plus provider-backed feedback | Do not mistake fixture-backed browser tests for live feedback availability |
| Engineering assistant | Optional live AI experience | Server-side Cloudflare Workers AI | Provider configuration required; see local setup |
| Study sign-in and saved account data | Optional account features | Supabase auth/database; provider flags, migrations and row policies are separate requirements | No configured-account or cross-user-isolation claim from a build |
| Recruiter portal | Optional access-controlled experience | Invitation/session checks, service-backed data and optional notifications | No private documents are included in public case-study evidence |
| GitHub status/failure reads | Optional integration | GitHub API with server-side configuration | Mock/injected contract tests do not establish live token access |

[Local setup](LOCAL_SETUP.md) describes exact environment names. Keep privileged credentials server-side. Use synthetic prompts/logs; model output is advisory. Configured public keys or feature flags do not establish authorization by themselves. [Security policy](../SECURITY.md).

Repository quality uses deterministic/injected checks. Browser regression mocks provider-dependent calls on an isolated local production build. Production monitoring is read-only and does not send chat messages, access recruiter materials or verify live model quality. [Check/deployment separation](REVIEWER_GUIDE.md#distinguish-three-kinds-of-checks).
