/**
 * Test helpers for Sekretari.
 * Add shared test utilities here as the project grows.
 */

/** Create a mock tenant context for tests */
export function createTestTenantContext(overrides?: {
  tenantId?: string;
  userId?: string;
  entityId?: string;
}) {
  return {
    tenantId: overrides?.tenantId ?? "test-tenant-001",
    userId: overrides?.userId ?? "test-user-001",
    entityId: overrides?.entityId ?? "test-entity-001",
  };
}
