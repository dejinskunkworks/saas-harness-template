/**
 * Public API for audit module.
 *
 * HARNESS RULE: Other modules must import from this file only.
 */

export type { AuditEvent, CreateAuditEventInput } from "./types/audit-event";
export { createAuditEvent, buildAuditInsert } from "./services/audit-writer";
