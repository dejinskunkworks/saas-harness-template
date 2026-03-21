import { describe, expect, it, vi } from "vitest";

import { ROLES } from "@/lib/constants";

import { resolveAuthContext } from "./tenant-resolver";

describe("resolveAuthContext", () => {
  it("returns auth context when user has active membership", async () => {
    const mockUser = { id: "auth-001", email: "test@example.com" };
    const mockUserRow = { id: "u-001", auth_provider_id: "auth-001" };
    const mockMembership = {
      id: "m-001",
      tenant_id: "t-001",
      organization_id: null,
      role: ROLES.MEMBER,
      status: "active",
    };

    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: mockUser }, error: null }),
      },
      from: vi.fn().mockImplementation((table: string) => {
        if (table === "users") {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({ data: mockUserRow, error: null }),
              }),
            }),
          };
        }
        if (table === "memberships") {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                  order: vi.fn().mockReturnValue({
                    limit: vi.fn().mockReturnValue({
                      single: vi.fn().mockResolvedValue({ data: mockMembership, error: null }),
                    }),
                  }),
                }),
              }),
            }),
          };
        }
        return {};
      }),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await resolveAuthContext(mockSupabase as any);

    expect(result).toEqual({
      userId: "u-001",
      email: "test@example.com",
      tenantId: "t-001",
      organizationId: null,
      role: ROLES.MEMBER,
    });
  });

  it("returns null when no authenticated user", async () => {
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await resolveAuthContext(mockSupabase as any);
    expect(result).toBeNull();
  });
});
