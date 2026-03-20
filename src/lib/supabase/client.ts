/**
 * Supabase browser client.
 *
 * HARNESS RULE: This is for client components only.
 * For server-side access, use @/lib/supabase/server.
 */

import { createBrowserClient as createClient } from "@supabase/ssr";

import { publicEnv } from "@/lib/env";

import type { Database } from "./types";

export function createBrowserClient() {
  return createClient<Database>(publicEnv.supabaseUrl, publicEnv.supabaseAnonKey());
}
