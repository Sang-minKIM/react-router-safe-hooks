import { test, expect } from "@playwright/test"

test.describe("Navigation Test - useSafeLocation", () => {
  test("should handle navigation with state", async ({ page }) => {
    await page.goto("/navigation")

    // Check initial state (no state)
    await expect(page.getByTestId("no-state-info")).toBeVisible()

    const initialLocationState = await page.getByTestId("location-state").textContent()
    expect(initialLocationState).toContain("Has State: false")
    expect(initialLocationState).toContain("From: unknown")

    // Navigate with state
    await page.getByTestId("navigate-with-state-btn").click()

    // Check we're on destination page
    await expect(page).toHaveURL("/destination")

    // Check state was received
    await expect(page.getByTestId("state-success")).toBeVisible()
    await expect(page.getByTestId("state-success")).toHaveText(
      "Successfully received navigation state from: /navigation",
    )

    const locationState = await page.getByTestId("location-state").textContent()
    expect(locationState).toContain("Has State: true")
    expect(locationState).toContain("From: /navigation")
    expect(locationState).toContain('"name": "Jane Doe"')
    expect(locationState).toContain('"id": "456"')
  })

  test("should handle navigation without state", async ({ page }) => {
    await page.goto("/navigation")

    // Navigate without state
    await page.getByTestId("navigate-without-state-btn").click()

    // Check we're on destination page
    await expect(page).toHaveURL("/destination")

    // Check no state was received
    await expect(page.getByTestId("no-state-info")).toBeVisible()

    const locationState = await page.getByTestId("location-state").textContent()
    expect(locationState).toContain("Has State: false")
    expect(locationState).toContain("From: unknown")
  })

  test("should use useLocationState hook correctly", async ({ page }) => {
    await page.goto("/navigation")

    // Navigate with state
    await page.getByTestId("navigate-with-state-btn").click()

    // Check useLocationState hook output
    const useLocationState = await page.getByTestId("use-location-state").textContent()
    const stateData = JSON.parse(useLocationState || "null")

    expect(stateData).toHaveProperty("from", "/navigation")
    expect(stateData).toHaveProperty("user")
    expect(stateData.user).toHaveProperty("id", "456")
    expect(stateData.user).toHaveProperty("name", "Jane Doe")
    expect(stateData).toHaveProperty("timestamp")
  })
})
