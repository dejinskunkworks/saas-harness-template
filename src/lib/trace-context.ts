/**
 * Server-side trace context for structured logging.
 *
 * The middleware assigns a trace id to every request (x-trace-id header).
 * Server code (route handlers, server actions) wraps work in `runWithTrace`
 * so the logger can pick up the current trace id without plumbing it through
 * every function signature.
 *
 * HARNESS RULE (MANIFESTO §16): every log line for a request carries its trace id.
 *
 * This file imports node:async_hooks and is therefore NOT edge-safe.
 * Do not import from Next.js middleware. Use `@/lib/trace-id` for the id generator.
 */
import { AsyncLocalStorage } from "node:async_hooks";

export interface TraceContext {
  traceId: string;
  tenantId?: string;
  userId?: string;
}

const storage = new AsyncLocalStorage<TraceContext>();

export function runWithTrace<T>(ctx: TraceContext, fn: () => T): T {
  return storage.run(ctx, fn);
}

export function getTraceContext(): TraceContext | undefined {
  return storage.getStore();
}
