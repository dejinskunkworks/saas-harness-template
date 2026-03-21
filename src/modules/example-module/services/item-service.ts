/**
 * Example domain service.
 *
 * CUSTOMIZE: Replace with your domain logic.
 * This demonstrates the pattern: types → test → service → export via index.ts
 */

import type { CreateItemInput } from "../types/item";

const MAX_NAME_LENGTH = 255;

/** Validate an item name */
export function validateItemName(name: string): boolean {
  return name.length > 0 && name.length <= MAX_NAME_LENGTH;
}

/** Map camelCase input to snake_case for DB insert */
export function buildItemInsert(input: CreateItemInput) {
  return {
    tenant_id: input.tenantId,
    name: input.name,
    status: "active" as const,
  };
}
