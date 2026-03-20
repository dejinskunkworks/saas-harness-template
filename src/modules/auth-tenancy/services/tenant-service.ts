/**
 * Tenant creation and management service.
 *
 * HARNESS RULE: Tenant context is always explicit.
 * This service handles tenant lifecycle operations.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

import { ROLES } from "@/lib/constants";
import { logger } from "@/lib/logger";
import type { Database } from "@/lib/supabase/types";

type TenantRow = Database["public"]["Tables"]["tenants"]["Row"];
type MembershipRow = Database["public"]["Tables"]["memberships"]["Row"];

interface CreateTenantInput {
  tenantName: string;
  userId: string;
  billingPlan?: string;
}

/** Generate a URL-safe slug from a tenant name */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Create a new tenant and assign the creating user as practice_admin.
 * Returns both the tenant and the membership.
 */
export async function createTenantWithOwner(
  supabase: SupabaseClient<Database>,
  input: CreateTenantInput,
) {
  const slug = generateSlug(input.tenantName);

  // 1. Create the tenant
  const { data: tenantData, error: tenantError } = await supabase
    .from("tenants")
    .insert({
      name: input.tenantName,
      slug,
      status: "active",
      billing_plan: input.billingPlan ?? null,
    })
    .select()
    .single();

  const tenant = tenantData as TenantRow | null;

  if (tenantError || !tenant) {
    logger.error("Failed to create tenant", {
      module: "auth-tenancy",
      userId: input.userId,
    });
    throw new Error(`Failed to create tenant: ${tenantError?.message}`);
  }

  // 2. Create membership for the owner
  const { data: membershipData, error: membershipError } = await supabase
    .from("memberships")
    .insert({
      user_id: input.userId,
      tenant_id: tenant.id,
      organization_id: null,
      role: ROLES.PRACTICE_ADMIN,
      status: "active",
      starts_at: new Date().toISOString(),
      ends_at: null,
    })
    .select()
    .single();

  const membership = membershipData as MembershipRow | null;

  if (membershipError || !membership) {
    logger.error("Failed to create owner membership", {
      module: "auth-tenancy",
      tenantId: tenant.id,
      userId: input.userId,
    });
    throw new Error(`Failed to create membership: ${membershipError?.message}`);
  }

  logger.info("Tenant created with owner", {
    module: "auth-tenancy",
    tenantId: tenant.id,
    userId: input.userId,
  });

  return { tenant, membership };
}
