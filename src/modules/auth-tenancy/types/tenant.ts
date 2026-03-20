/**
 * Tenant and organization types.
 */

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  status: "active" | "suspended" | "archived";
  billingPlan: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  tenantId: string;
  name: string;
  type: "client_workspace" | "internal_team" | "practice_unit";
  status: "active" | "archived";
  createdAt: string;
  updatedAt: string;
}
