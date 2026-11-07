# Security boundaries and reporting

For a suspected vulnerability, contact erdal@eai.engineering privately with a minimal synthetic reproduction. Do not publish credentials, personal records or working exploit data in public issues. Do not test against other users or production accounts.

Cloudflare AI tokens, privileged Supabase credentials, automation keys and optional GitHub tokens belong only in server-side environment configuration. NEXT_PUBLIC values are exposed to browsers and must never contain privileged secrets. Database row policies, provider settings and server-side access checks remain necessary even when the UI hides a feature.

AI tools process user-supplied text. Failure-log redaction is best effort and cannot guarantee detection of every sensitive format. Use synthetic inputs and never submit real credentials or confidential records. Model responses require review; they do not establish execution, accuracy or authorization.

Account, recruiter invitation/session and rate-limit paths have separate controls. Origin checks supplement access checks; they are not user authentication. Do not bypass an unavailable limiter or identity dependency with a permissive fallback. Review cross-user isolation before activating optional account features.

The automated quality workflow uses no production credentials and performs no deployment. Vercel remains an independent integration. Deployment permission, production configuration, incident handling and provider quotas require separate review; a green test run is not a security certification.
