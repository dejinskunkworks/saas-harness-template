import { describe, expect, it } from "vitest";

import { healthCheck } from "./example";

describe("healthCheck", () => {
  it("returns ok status", () => {
    const result = healthCheck();
    expect(result.status).toBe("ok");
  });

  it("returns a valid ISO timestamp", () => {
    const result = healthCheck();
    expect(() => new Date(result.timestamp)).not.toThrow();
  });
});
