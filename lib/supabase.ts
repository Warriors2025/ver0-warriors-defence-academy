import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

type SupabaseConfig = {
  url: string
  anonKey: string
}

function readSupabaseConfig(): SupabaseConfig | null {
  const url =
    process.env.WDA_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey =
    process.env.WDA_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) return null
  return { url, anonKey }
}

function requireSupabaseConfig(): SupabaseConfig {
  const config = readSupabaseConfig()
  if (!config) {
    throw new Error(
      "Supabase is not configured. Set WDA_SUPABASE_URL and WDA_SUPABASE_ANON_KEY in your environment."
    )
  }
  return config
}

let publicClient: SupabaseClient<Database> | null = null

export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (publicClient) return publicClient
  const config = readSupabaseConfig()
  if (!config) return null
  publicClient = createClient<Database>(config.url, config.anonKey)
  return publicClient
}

/** Public client — anon key, respects RLS. Safe for public reads and form inserts. */
export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop) {
    const client = getSupabaseClient()
    if (!client) {
      throw new Error(
        "Supabase is not configured. Set WDA_SUPABASE_URL and WDA_SUPABASE_ANON_KEY in your environment."
      )
    }
    const value = Reflect.get(client, prop, client)
    return typeof value === "function" ? value.bind(client) : value
  },
})

/**
 * Server admin client — bypasses RLS. Use only in API routes and Server Components.
 * NEVER import in a "use client" file.
 */
export function createServerClient() {
  const { url } = requireSupabaseConfig()
  const supabaseServiceKey =
    process.env.WDA_SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseServiceKey || supabaseServiceKey === "YOUR_SERVICE_ROLE_KEY_HERE") {
    throw new Error(
      "WDA_SUPABASE_SERVICE_ROLE_KEY is missing. Add it to .env.local from Supabase Dashboard → Settings → API → service_role key."
    )
  }

  return createClient<Database>(url, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

/** Public server client — uses anon key on the server for RLS-scoped writes (forms). */
export function createPublicServerClient() {
  const { url, anonKey } = requireSupabaseConfig()
  return createClient<Database>(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
