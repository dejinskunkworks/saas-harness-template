import { describe, expect, it, vi } from "vitest";

import { ROLES } from "@/lib/constants";

import { createTenantWithOwner, generateSlug } from "./tenant-service";

describe("generateSlug", () => {
  it("converts name to lowercase kebab-case", () => {
    expect(generateSlug("Wanjiku & Associates")).toBe("wanjiku-associates");
  });

  it("removes special characters", () => {
    expect(generateSlug("Acme (Kenya) Ltd.")).toBe("acme-kenya-ltd");
  });

  it("collapses multiple hyphens", () => {
    expect(generateSlug("foo---bar")).toBe("foo-bar");
  });

  it("trims leading and trailing hyphens", () => {
    expect(generateSlug("--hello--")).toBe("hello");
  });
});

describe("createTenantWithOwner", () => {
  it("creates a tenant and membership in a transaction", async () => {
    const mockTenant = {
      id: "t-001",
      name: "Test CS Firm",
      slug: "test-cs-firm",
      status: "active",
      billing_plan: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const mockMembership = {
      id: "m-001",
      user_id: "u-001",
      tenant_id: "t-001",
      organization_id: null,
      role: ROLES.ORG_ADMIN,
      status: "active",
    };

    const mockSupabase = {
      from: vi.fn().mockImplementation((table: string) => {
        if (table === "tenants") {
          return {
            insert: vi.fn().mockReturnValue({
              select: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({ data: mockTenant, error: null }),
              }),
            }),
          };
        }
        if (table === "memberships") {
          return {
            insert: vi.fn().mockReturnValue({
              select: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({ data: mockMembership, error: null }),
              }),
            }),
          };
        }
        return {};
      }),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await createTenantWithOwner(mockSupabase as any, {
      tenantName: "Test CS Firm",
      userId: "u-001",
    });

    expect(result.tenant).toEqual(mockTenant);
    expect(result.membership).toEqual(mockMembership);
    expect(mockSupabase.from).toHaveBeenCalledWith("tenants");
    expect(mockSupabase.from).toHaveBeenCalledWith("memberships");
  });

  it("throws if tenant creation fails", async () => {
    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { message: "duplicate slug" },
            }),
          }),
        }),
      }),
    };

    await expect(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createTenantWithOwner(mockSupabase as any, {
        tenantName: "Test",
        userId: "u-001",
      }),
    ).rejects.toThrow("Failed to create tenant");
  });
});
