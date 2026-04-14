import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { logger } from "./logger";
import { getTraceContext, runWithTrace } from "./trace-context";
import { newTraceId } from "./trace-id";

describe("trace-context", () => {
  it("returns undefined outside of runWithTrace", () => {
    expect(getTraceContext()).toBeUndefined();
  });

  it("makes trace context available inside runWithTrace", () => {
    const traceId = newTraceId();
    runWithTrace({ traceId, tenantId: "t-001" }, () => {
      const ctx = getTraceContext();
      expect(ctx?.traceId).toBe(traceId);
      expect(ctx?.tenantId).toBe("t-001");
    });
  });

  it("isolates contexts across concurrent runs", async () => {
    const ids = await Promise.all(
      ["a", "b", "c"].map(
        (id) =>
          new Promise<string | undefined>((resolve) => {
            runWithTrace({ traceId: id }, () => {
              setTimeout(() => resolve(getTraceContext()?.traceId), 10);
            });
          }),
      ),
    );
    expect(ids).toEqual(["a", "b", "c"]);
  });
});

describe("logger + trace-context", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("picks up ambient trace context automatically", () => {
    runWithTrace({ traceId: "trace-123", tenantId: "t-42" }, () => {
      logger.info("hello");
    });

    const output = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(output.traceId).toBe("trace-123");
    expect(output.tenantId).toBe("t-42");
  });

  it("explicit context overrides ambient", () => {
    runWithTrace({ traceId: "ambient", tenantId: "t-42" }, () => {
      logger.info("hello", { traceId: "explicit" });
    });

    const output = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(output.traceId).toBe("explicit");
    expect(output.tenantId).toBe("t-42");
  });
});
