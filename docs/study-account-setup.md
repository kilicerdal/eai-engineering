# Optional dAI learning accounts

Status: application code prepared; provider project not yet connected. Do not mark public sign-in or database isolation as verified until the checks below pass. No subscriptions or payments are implemented.

## Service setup (free plan only)

1. Connect the owner's Supabase account. Use a dedicated project in a Free organization. Do not upgrade plans or purchase Apple membership without approval.
2. Apply `supabase/migrations/202611020001_study_accounts.sql` once. Run `supabase/tests/study_learning_rls.sql`; its fixtures roll back. Verify anonymous denial and isolation between two real authenticated test accounts as well.
3. Set Auth Site URL to `https://www.eai.engineering`. Allow exact callback `https://www.eai.engineering/study/account` (and the explicit localhost callback only for development). Use the standard Supabase magic-link template with `{{ .ConfirmationURL }}`. This client-only account route uses PKCE and the Supabase SDK detects/exchanges callbacks; no server-held session or privileged key is used.
4. Configure Google OAuth client on the owner's Google Cloud project using Supabase's exact callback URL. Request only basic identity/email scopes. Verify published consent-screen and test-user restrictions before public access.
5. Email magic links require a configured email delivery service for general students; Supabase default email is limited to project team members. Use a free service tier if suitable, verify sending-domain ownership, then test delivery, expiry, cancellation, resend limits, and same-browser PKCE completion. Keep email flag off until successful.
6. Apple stays disabled until the owner has an Apple Developer account and authorizes any membership costs. Configure web Services ID, redirect URL, Team ID, key/secret and rotation before enabling. No paid enrollment has been requested.

## Public build settings in Vercel

These are public settings, not administrator secrets:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLIC_PUBLISHABLE_KEY
NEXT_PUBLIC_STUDY_GOOGLE_ENABLED=true
NEXT_PUBLIC_STUDY_EMAIL_ENABLED=true
NEXT_PUBLIC_STUDY_APPLE_ENABLED=false
```

Only set each provider true after it works. Rebuild/redeploy after public settings change. Never put a Supabase service-role/secret key, Google client secret, Apple private key, or email SMTP password in a NEXT_PUBLIC variable, source file, chat, or export.

## Learning data behavior

- Existing browser storage keys remain intact. Authentication tokens and unrelated site data are excluded from snapshots. Original PDF binaries and temporary lesson drafts are excluded.
- Signing in never uploads or restores automatically. The student chooses Save this browser or Restore account work. Restore replaces rather than merges, downloads a local backup first, validates materials without dropping entries, then reloads the studio.
- Saving/restoring opts the current tab into saving every 30 seconds while visible. Refreshing preserves that tab's opt-in. New tabs/devices need an explicit choice. Closing the tab can lose changes since the last save; manual save is available. Pausing, signing out, switching user, network errors, or revision conflicts stop automatic writes.
- Each user has one private learning snapshot, max 4 MB. PostgreSQL RLS enforces owner access; updates compare an opaque UUID revision to prevent stale overwrites, including delete/recreate cases.
- Sign-out leaves browser work on the device. Shared-device users must clear browser data themselves. Cloud-data deletion removes the snapshot, not the sign-in identity or browser work.
- Accounts do not bypass existing AI request limits. Monitor free database/egress limits; do not enable paid overages.

## Release verification still required

The unit tests exercise corrupted data, storage rollback, account switching, and mocked cloud compare-and-swap. They do not prove deployed RLS or OAuth configuration. Before public activation, run the SQL isolation test and real two-account checks; verify Google/email sign-in, logout, cancellation, account switching, save/restore across two browser sessions, conflict handling, and cloud deletion. Check desktop/mobile UI. Apple requires its own live test before its flag is enabled.

## Verified setup on November 2, 2026

The owner's existing Free Supabase project `adyjjsfytwcgfbbrroqu` was empty and has now received the migration. The SQL isolation suite passed live, including cross-owner insert/read/update/delete rejection, anonymous denial, malformed-snapshot rejection, and stale-revision protection; final fixture counts were zero.

A separate, unbilled Google project `dai-learning-studio-eai` was created. After the owner explicitly approved the Google User Data Policy and client setup, the web OAuth client was configured and stored in Supabase. Google basic identity sign-in, PKCE completion, authenticated cloud save, backup-and-restore of a synthetic notebook entry plus sample library, and automatic saving were verified through the real UI on isolated localhost:3012. Automatic saving was paused after the test. Google remains in Testing status; no public-production or two-real-account end-to-end test is claimed.

The exact local callback `http://localhost:3012/study/account` is temporarily allowlisted; remove after local testing is finished. Production public Supabase settings and provider flags were saved in Vercel, with all providers initially false. A new deployment is needed for changes to apply. Public provider activation still needs completed Google branding/publishing, email delivery setup, and final website verification. Apple remains disabled with no membership purchased. Privacy information is at `/study/privacy`.
