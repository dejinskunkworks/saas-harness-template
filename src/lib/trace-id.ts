/**
 * Edge-safe trace id generator.
 *
 * Kept in a dedicated file so it can be imported from Next.js middleware
 * (which runs on the edge runtime) without pulling in node:async_hooks.
 */
export function newTraceId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export const TRACE_HEADER = "x-trace-id";
