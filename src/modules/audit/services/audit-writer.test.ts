import { describe, expect, it, vi } from "vitest";

import { ACTION_TIERS } from "@/lib/constants";

import type { CreateAuditEventInput } from "../types/audit-event";

import { createAuditEvent, buildAuditInsert } from "./audit-writer";

describe("buildAuditInsert", () => {
  it("maps camelCase input to snake_case DB row", () => {
    const input: CreateAuditEventInput = {
      tenantId: "t-001",
      entityId: "e-001",
      actorType: "user",
      actorId: "u-001",
      effectiveActorId: null,
      agentSessionId: null,
      actionType: "tenant.created",
      actionTier: ACTION_TIERS.DRAFT,
      targetType: "tenant",
      targetId: "t-001",
      outcome: "success",
      metadata: { source: "test" },
    };

    const row = buildAuditInsert(input);

    expect(row.tenant_id).toBe("t-001");
    expect(row.entity_id).toBe("e-001");
    expect(row.actor_type).toBe("user");
    expect(row.action_tier).toBe("draft");
    expect(row.outcome).toBe("success");
    expect(row.metadata).toEqual({ source: "test" });
  });

  it("defaults optional fields to null", () => {
    const input: CreateAuditEventInput = {
      tenantId: "t-001",
      actorType: "system",
      actorId: "system",
      actionType: "system.startup",
      actionTier: ACTION_TIERS.READ,
      targetType: "system",
      targetId: "system",
      outcome: "success",
    };

    const row = buildAuditInsert(input);

    expect(row.entity_id).toBeNull();
    expect(row.effective_actor_id).toBeNull();
    expect(row.agent_session_id).toBeNull();
    expect(row.request_id).toBeNull();
    expect(row.trace_id).toBeNull();
    expect(row.metadata).toBeNull();
  });
});

describe("createAuditEvent", () => {
  it("calls supabase insert and returns the event", async () => {
    const mockEvent = {
      id: "ae-001",
      tenant_id: "t-001",
      created_at: new Date().toISOString(),
    };

    const mockInsert = vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ data: mockEvent, error: null }),
      }),
    });

    const mockSupabase = {
      from: vi.fn().mockReturnValue({ insert: mockInsert }),
    };

    const input: CreateAuditEventInput = {
      tenantId: "t-001",
      actorType: "user",
      actorId: "u-001",
      actionType: "test.action",
      actionTier: ACTION_TIERS.DRAFT,
      targetType: "test",
      targetId: "test-001",
      outcome: "success",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await createAuditEvent(mockSupabase as any, input);

    expect(mockSupabase.from).toHaveBeenCalledWith("audit_events");
    expect(result).toEqual(mockEvent);
  });
});
