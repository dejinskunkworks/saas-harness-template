/**
 * Example domain types.
 *
 * CUSTOMIZE: Replace with your domain entity types.
 */

export interface Item {
  id: string;
  tenantId: string;
  name: string;
  status: "active" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemInput {
  tenantId: string;
  name: string;
}
