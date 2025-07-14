import { test, expect } from "@playwright/test"

test.describe("User Page - useSafeParams", () => {
  test("should display user parameters correctly", async ({ page }) => {
    await page.goto("/user/123/profile")

    // Check page title
    await expect(page.getByTestId("page-title")).toHaveText("User Page")

    // Check individual parameter display
    await expect(page.getByTestId("user-id")).toHaveText("User ID: 123")
    await expect(page.getByTestId("user-tab")).toHaveText("Current Tab: profile")

    // Check safe params debug info
    const safeParams = await page.getByTestId("safe-params").textContent()
    expect(safeParams).toContain('"id": "123"')
    expect(safeParams).toContain('"tab": "profile"')

    // Check required params debug info
    const requiredParams = await page.getByTestId("required-params").textContent()
    expect(requiredParams).toContain('"id": "123"')
  })

  test("should use default values when tab parameter is missing", async ({ page }) => {
    await page.goto("/user/456")

    // Check that default tab value is used
    await expect(page.getByTestId("user-id")).toHaveText("User ID: 456")
    await expect(page.getByTestId("user-tab")).toHaveText("Current Tab: profile")

    // Check debug info shows default value
    const safeParams = await page.getByTestId("safe-params").textContent()
    expect(safeParams).toContain('"id": "456"')
    expect(safeParams).toContain('"tab": "profile"')
  })

  test("should handle individual parameter hooks", async ({ page }) => {
    await page.goto("/user/789/settings")

    const individualParams = await page.getByTestId("individual-params").textContent()
    expect(individualParams).toContain("User ID: 789")
    expect(individualParams).toContain("User Tab: settings")
  })
})
