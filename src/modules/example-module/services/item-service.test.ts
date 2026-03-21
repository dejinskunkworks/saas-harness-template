import { describe, expect, it } from "vitest";

import { validateItemName, buildItemInsert } from "./item-service";

describe("validateItemName", () => {
  it("returns true for valid names", () => {
    expect(validateItemName("My Item")).toBe(true);
  });

  it("returns false for empty names", () => {
    expect(validateItemName("")).toBe(false);
  });

  it("returns false for names exceeding max length", () => {
    expect(validateItemName("a".repeat(256))).toBe(false);
  });
});

describe("buildItemInsert", () => {
  it("maps camelCase input to snake_case", () => {
    const result = buildItemInsert({
      tenantId: "t-001",
      name: "Test Item",
    });

    expect(result).toEqual({
      tenant_id: "t-001",
      name: "Test Item",
      status: "active",
    });
  });
});
