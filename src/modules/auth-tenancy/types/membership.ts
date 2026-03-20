/**
 * Membership types.
 */

import type { Role } from "@/lib/constants";

export interface Membership {
  id: string;
  userId: string;
  tenantId: string;
  organizationId: string | null;
  role: Role;
  status: "active" | "suspended" | "expired";
  startsAt: string;
  endsAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EntityAccess {
  id: string;
  entityId: string;
  userId: string;
  accessRole: string;
  grantedBy: string;
  startsAt: string;
  endsAt: string | null;
  createdAt: string;
}
