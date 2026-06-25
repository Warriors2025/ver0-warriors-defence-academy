import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

const supabaseUrl =
  process.env.WDA_SUPABASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_URL!

const supabaseAnonKey =
  process.env.WDA_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabaseServiceKey =
  process.env.WDA_SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SERVICE_ROLE_KEY

/** Public client — anon key, respects RLS. Safe for public reads and form inserts. */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

/**
 * Server admin client — bypasses RLS. Use only in API routes and Server Components.
 * NEVER import in a "use client" file.
 */
export function createServerClient() {
  if (!supabaseServiceKey || supabaseServiceKey === "YOUR_SERVICE_ROLE_KEY_HERE") {
    throw new Error(
      "WDA_SUPABASE_SERVICE_ROLE_KEY is missing. Add it to .env.local from Supabase Dashboard → Settings → API → service_role key."
    )
  }
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

/** Public server client — uses anon key on the server for RLS-scoped writes (forms). */
export function createPublicServerClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
