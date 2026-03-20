/**
 * Tenant resolution service.
 *
 * Resolves the current user's auth context including their active tenant membership.
 * Called on every authenticated request to establish the tenant boundary.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Role } from "@/lib/constants";
import type { Database } from "@/lib/supabase/types";

import type { AuthContext } from "../types/auth";

/**
 * Resolve the full auth context for the current request.
 * Returns null if the user is not authenticated or has no active membership.
 */
export async function resolveAuthContext(
  supabase: SupabaseClient<Database>,
  tenantId?: string,
): Promise<AuthContext | null> {
  // 1. Get authenticated user from Supabase Auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // 2. Get app user record
  const { data: appUser, error: userError } = await supabase
    .from("users")
    .select("id, auth_provider_id")
    .eq("auth_provider_id", user.id)
    .single();

  if (userError || !appUser) return null;

  // 3. Get active membership (use specified tenant or first available)
  const query = supabase
    .from("memberships")
    .select("id, tenant_id, organization_id, role, status")
    .eq("user_id", appUser.id)
    .eq("status", "active");

  const membershipQuery = tenantId
    ? query.eq("tenant_id", tenantId)
    : query.order("created_at", { ascending: true }).limit(1);

  const { data: membership, error: membershipError } = await membershipQuery.single();

  if (membershipError || !membership) return null;

  return {
    userId: appUser.id,
    email: user.email ?? "",
    tenantId: membership.tenant_id,
    organizationId: membership.organization_id,
    role: membership.role as Role,
  };
}
