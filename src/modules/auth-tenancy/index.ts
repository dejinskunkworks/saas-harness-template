/**
 * Public API for auth-tenancy module.
 *
 * HARNESS RULE: Other modules must import from this file only.
 * Do not import from internal files (services/, types/, etc.) directly.
 * If you need something that isn't exported here, add the export.
 *
 * See: eslint import-x/no-restricted-paths rule
 */

// Actions
export { signInWithEmail, signUp, signOut } from "./actions/auth-actions";

// Services
export { resolveAuthContext } from "./services/tenant-resolver";
export { createTenantWithOwner, generateSlug } from "./services/tenant-service";

// Types
export type { AuthContext, ActorContext } from "./types/auth";
export type { Tenant, Organization } from "./types/tenant";
export type { Membership, EntityAccess } from "./types/membership";
