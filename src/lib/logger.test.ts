import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { logger } from "./logger";

describe("logger", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs info messages as JSON with timestamp", () => {
    logger.info("test message", { module: "test" });

    expect(logSpy).toHaveBeenCalledOnce();
    const output = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(output.level).toBe("info");
    expect(output.message).toBe("test message");
    expect(output.module).toBe("test");
    expect(output.timestamp).toBeDefined();
  });

  it("logs error messages to stderr", () => {
    logger.error("something broke", { tenantId: "t-001" });

    expect(errorSpy).toHaveBeenCalledOnce();
    const output = JSON.parse(errorSpy.mock.calls[0][0] as string);
    expect(output.level).toBe("error");
    expect(output.tenantId).toBe("t-001");
  });

  it("includes tenant and entity context when provided", () => {
    logger.info("entity action", {
      tenantId: "t-001",
      entityId: "e-001",
      userId: "u-001",
    });

    const output = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(output.tenantId).toBe("t-001");
    expect(output.entityId).toBe("e-001");
    expect(output.userId).toBe("u-001");
  });
});
