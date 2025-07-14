import { test, expect } from "@playwright/test"

test.describe("Navigation", () => {
  test("should navigate between pages correctly", async ({ page }) => {
    await page.goto("/")

    // Check home page
    await expect(page.getByTestId("page-title")).toHaveText("React Router Safe Hooks Test App")

    // Navigate to user page
    await page.getByTestId("nav-user").click()
    await expect(page).toHaveURL("/user/123/profile")
    await expect(page.getByTestId("page-title")).toHaveText("User Page")

    // Navigate to search page
    await page.getByTestId("nav-search").click()
    await expect(page).toHaveURL(/\/search\?.*q=react/)
    await expect(page.getByTestId("page-title")).toHaveText("Search Page")

    // Navigate to navigation test page
    await page.getByTestId("nav-navigation").click()
    await expect(page).toHaveURL("/navigation")
    await expect(page.getByTestId("page-title")).toHaveText("Navigation Test Page")

    // Navigate to error test page
    await page.getByTestId("nav-error").click()
    await expect(page).toHaveURL("/error-test")
    await expect(page.getByTestId("page-title")).toHaveText("Error Test Page")

    // Navigate back to home
    await page.getByTestId("nav-home").click()
    await expect(page).toHaveURL("/")
    await expect(page.getByTestId("page-title")).toHaveText("React Router Safe Hooks Test App")
  })
})
