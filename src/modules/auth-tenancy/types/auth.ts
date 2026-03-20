/**
 * Auth-related types.
 */

import type { Role } from "@/lib/constants";

/** The resolved identity of the current request */
export interface AuthContext {
  userId: string;
  email: string;
  tenantId: string;
  organizationId: string | null;
  role: Role;
}

/** Represents who performed an action (for audit) */
export interface ActorContext {
  actorType: "user" | "agent" | "system";
  actorId: string;
  effectiveActorId: string | null;
  agentSessionId: string | null;
  tenantId: string;
}
