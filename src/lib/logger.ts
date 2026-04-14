/**
 * Structured logger.
 *
 * HARNESS RULE: Use this instead of console.* in application code.
 * `no-console` is an ESLint error — see eslint.config.mjs.
 *
 * When called from server code wrapped in `runWithTrace` (see src/lib/trace-context),
 * the active trace/tenant/user context is automatically merged into every log line.
 * Explicit context passed to the logger call takes precedence over the ambient context.
 */

import { getTraceContext } from "./trace-context";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  tenantId?: string;
  entityId?: string;
  userId?: string;
  traceId?: string;
  module?: string;
  [key: string]: unknown;
}

function log(level: LogLevel, message: string, context?: LogContext): void {
  const ambient = getTraceContext();
  const entry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(ambient ?? {}),
    ...(context ?? {}),
  };

  if (level === "error") {
    console.error(JSON.stringify(entry)); // eslint-disable-line no-console
  } else {
    console.log(JSON.stringify(entry)); // eslint-disable-line no-console
  }
}

export const logger = {
  debug: (message: string, context?: LogContext) =>
    log("debug", message, context),
  info: (message: string, context?: LogContext) =>
    log("info", message, context),
  warn: (message: string, context?: LogContext) =>
    log("warn", message, context),
  error: (message: string, context?: LogContext) =>
    log("error", message, context),
};
