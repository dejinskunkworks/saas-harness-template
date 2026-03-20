/**
 * Environment variable validation.
 *
 * HARNESS RULE: All env vars must be validated at startup.
 * If a required var is missing, the app should fail fast with a clear message.
 * Add new env vars here, not scattered across the codebase.
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Copy .env.example to .env.local and fill in the values.`,
    );
  }
  return value;
}

function optional(name: string, defaultValue: string): string {
  return process.env[name] ?? defaultValue;
}

/** Server-only environment variables. Do not import in client components. */
export const serverEnv = {
  supabaseServiceRoleKey: () => required("SUPABASE_SERVICE_ROLE_KEY"),
};

/** Public environment variables (available in browser). */
export const publicEnv = {
  supabaseUrl: optional("NEXT_PUBLIC_SUPABASE_URL", "http://localhost:54321"),
  supabaseAnonKey: () => required("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  appUrl: optional("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  appName: optional("NEXT_PUBLIC_APP_NAME", "Sekretari"),
};
