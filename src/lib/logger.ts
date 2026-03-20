/**
 * Structured logger for Sekretari.
 *
 * HARNESS RULE: Use this instead of console.log.
 * All log entries include context for observability.
 */

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
  const entry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...context,
  };

  if (level === "error") {
    console.error(JSON.stringify(entry)); // eslint-disable-line no-console
  } else {
    console.log(JSON.stringify(entry)); // eslint-disable-line no-console
  }
}

export const logger = {
  debug: (message: string, context?: LogContext) => log("debug", message, context),
  info: (message: string, context?: LogContext) => log("info", message, context),
  warn: (message: string, context?: LogContext) => log("warn", message, context),
  error: (message: string, context?: LogContext) => log("error", message, context),
};
