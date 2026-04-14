import { expect, test } from "@playwright/test";

/**
 * Smoke test: the app boots and serves the landing page.
 *
 * Agents extending this file should add one test per user-visible journey.
 * See e2e/README.md.
 */
test.describe("smoke", () => {
  test("landing page responds", async ({ page }) => {
    const response = await page.goto("/");
    expect(
      response?.status(),
      "landing page should respond successfully",
    ).toBeLessThan(400);
  });

  test("trace id header is present on every response", async ({ page }) => {
    const response = await page.goto("/");
    const traceId = response?.headers()["x-trace-id"] ?? "";
    expect(
      traceId,
      "middleware must stamp x-trace-id on responses",
    ).toBeTruthy();
    expect(traceId.length, "trace id should be non-trivial").toBeGreaterThan(6);
  });
});
