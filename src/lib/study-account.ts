import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const accountConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
export const accountProviders = {
  google: process.env.NEXT_PUBLIC_STUDY_GOOGLE_ENABLED === "true",
  apple: process.env.NEXT_PUBLIC_STUDY_APPLE_ENABLED === "true",
  email: process.env.NEXT_PUBLIC_STUDY_EMAIL_ENABLED === "true",
};
let client: SupabaseClient | null = null;
export function studyAccountClient(): SupabaseClient | null {
  if (!accountConfigured) return null;
  return client ??= createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    auth: { flowType: "pkce", persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: "dai-account-auth-v1" },
  });
}
