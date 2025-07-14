import { test, expect } from "@playwright/test"

test.describe("Error Handling", () => {
  test("should handle required parameter errors", async ({ page }) => {
    await page.goto("/error-test")

    // Select required params test
    await page.getByTestId("test-type-select").selectOption("params")

    // Run test
    await page.getByTestId("run-test-btn").click()

    // Check error message appears
    await expect(page.getByTestId("error-message")).toBeVisible()
    const errorText = await page.getByTestId("error-message").textContent()
    expect(errorText).toContain("Required parameter")
    expect(errorText).toContain("is missing")
  })

  test("should handle required search parameter errors", async ({ page }) => {
    await page.goto("/error-test")

    // Select search params test
    await page.getByTestId("test-type-select").selectOption("searchParams")

    // Run test
    await page.getByTestId("run-test-btn").click()

    // Check error message appears
    await expect(page.getByTestId("error-message")).toBeVisible()
    const errorText = await page.getByTestId("error-message").textContent()
    expect(errorText).toContain("Required search parameter")
    expect(errorText).toContain("is missing")
  })

  test("should handle required location state errors", async ({ page }) => {
    await page.goto("/error-test")

    // Select location state test
    await page.getByTestId("test-type-select").selectOption("locationState")

    // Run test
    await page.getByTestId("run-test-btn").click()

    // Check error message appears
    await expect(page.getByTestId("error-message")).toBeVisible()
    const errorText = await page.getByTestId("error-message").textContent()
    expect(errorText).toContain("Required location state is missing")
  })

  test("should require test type selection", async ({ page }) => {
    await page.goto("/error-test")

    // Run test without selecting type
    await page.getByTestId("run-test-btn").click()

    // Check error message appears
    await expect(page.getByTestId("error-message")).toBeVisible()
    const errorText = await page.getByTestId("error-message").textContent()
    expect(errorText).toContain("Please select a test type")
  })
})
