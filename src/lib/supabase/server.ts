/**
 * Supabase server client.
 *
 * HARNESS RULE: This is for server components, server actions, and API routes.
 * Never import the browser client in server code.
 */

import { createServerClient as createClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { publicEnv } from "@/lib/env";

import type { Database } from "./types";

export async function createServerClient() {
  const cookieStore = await cookies();

  return createClient<Database>(
    publicEnv.supabaseUrl,
    publicEnv.supabaseAnonKey(),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );
}

export { type Database } from "./types";
