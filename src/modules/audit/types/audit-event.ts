/**
 * Audit event types.
 */

import type { ActionTier } from "@/lib/constants";

export interface AuditEvent {
  id: string;
  tenantId: string;
  entityId: string | null;
  actorType: "user" | "agent" | "system";
  actorId: string;
  effectiveActorId: string | null;
  agentSessionId: string | null;
  actionType: string;
  actionTier: ActionTier;
  targetType: string;
  targetId: string;
  requestId: string | null;
  traceId: string | null;
  outcome: "success" | "failure" | "denied";
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

export interface CreateAuditEventInput {
  tenantId: string;
  entityId?: string | null;
  actorType: "user" | "agent" | "system";
  actorId: string;
  effectiveActorId?: string | null;
  agentSessionId?: string | null;
  actionType: string;
  actionTier: ActionTier;
  targetType: string;
  targetId: string;
  requestId?: string | null;
  traceId?: string | null;
  outcome: "success" | "failure" | "denied";
  metadata?: Record<string, unknown> | null;
}
