/**
 * Audit event writer service.
 *
 * HARNESS RULE: Every write action must produce an audit event.
 * Use createAuditEvent() after any mutation.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

import { logger } from "@/lib/logger";
import type { Database } from "@/lib/supabase/types";

import type { CreateAuditEventInput } from "../types/audit-event";

type AuditEventInsert = Database["public"]["Tables"]["audit_events"]["Insert"];

/** Map camelCase input to snake_case DB row */
export function buildAuditInsert(input: CreateAuditEventInput): AuditEventInsert {
  return {
    tenant_id: input.tenantId,
    entity_id: input.entityId ?? null,
    actor_type: input.actorType,
    actor_id: input.actorId,
    effective_actor_id: input.effectiveActorId ?? null,
    agent_session_id: input.agentSessionId ?? null,
    action_type: input.actionType,
    action_tier: input.actionTier,
    target_type: input.targetType,
    target_id: input.targetId,
    request_id: input.requestId ?? null,
    trace_id: input.traceId ?? null,
    outcome: input.outcome,
    metadata: input.metadata ?? null,
  };
}

/** Insert an audit event into the database */
export async function createAuditEvent(
  supabase: SupabaseClient<Database>,
  input: CreateAuditEventInput,
) {
  const row = buildAuditInsert(input);

  const { data, error } = await supabase.from("audit_events").insert(row).select().single();

  if (error) {
    logger.error("Failed to write audit event", {
      module: "audit",
      tenantId: input.tenantId,
      actionType: input.actionType,
    });
    throw new Error(`Audit write failed: ${error.message}`);
  }

  return data;
}
