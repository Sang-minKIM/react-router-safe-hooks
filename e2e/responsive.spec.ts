import { test, expect } from "@playwright/test"

test.describe("Responsive Design", () => {
  test("should work on mobile devices", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto("/")

    // Check home page is accessible
    await expect(page.getByTestId("page-title")).toBeVisible()

    // Navigate to user page
    await page.getByTestId("nav-user").click()
    await expect(page.getByTestId("user-id")).toBeVisible()
    await expect(page.getByTestId("user-tab")).toBeVisible()

    // Navigate to search page
    await page.getByTestId("nav-search").click()
    await expect(page.getByTestId("query-input")).toBeVisible()
    await expect(page.getByTestId("page-input")).toBeVisible()

    // Test form interaction on mobile
    await page.getByTestId("query-input").fill("mobile test")
    await page.getByTestId("update-params-btn").click()

    await expect(page.getByTestId("search-results")).toHaveText('Showing results for "mobile test"')
  })

  test("should work on tablet devices", async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })

    await page.goto("/navigation")

    // Test navigation functionality on tablet
    await page.getByTestId("navigate-with-state-btn").click()
    await expect(page.getByTestId("state-success")).toBeVisible()
  })
})
