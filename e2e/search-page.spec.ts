import { test, expect } from "@playwright/test"

test.describe("Search Page - useSafeSearchParams", () => {
  test("should display search parameters correctly", async ({ page }) => {
    await page.goto("/search?q=react&page=2&active=true&tags=frontend,typescript")

    // Check page title
    await expect(page.getByTestId("page-title")).toHaveText("Search Page")

    // Check search parameters display
    const searchParams = await page.getByTestId("search-params").textContent()
    expect(searchParams).toContain("Query: react")
    expect(searchParams).toContain("Page: 2")
    expect(searchParams).toContain("Active: true")
    expect(searchParams).toContain("Tags: frontend, typescript")

    // Check search results
    await expect(page.getByTestId("search-results")).toHaveText('Showing results for "react"')
    await expect(page.getByTestId("pagination-info")).toHaveText("Page 2 of results")
    await expect(page.getByTestId("filter-status")).toHaveText("Filter: Active items only")
    await expect(page.getByTestId("tags-info")).toHaveText("Tags: frontend, typescript")
  })

  test("should use default values when parameters are missing", async ({ page }) => {
    await page.goto("/search")

    const searchParams = await page.getByTestId("search-params").textContent()
    expect(searchParams).toContain("Query: ")
    expect(searchParams).toContain("Page: 1") // Default value
    expect(searchParams).toContain("Active: false")
    expect(searchParams).toContain("Tags: ")

    await expect(page.getByTestId("search-results")).toHaveText("No search query")
    await expect(page.getByTestId("pagination-info")).toHaveText("Page 1 of results")
    await expect(page.getByTestId("filter-status")).toHaveText("Filter: All items")
  })

  test("should update search parameters", async ({ page }) => {
    await page.goto("/search")

    // Fill in new parameters
    await page.getByTestId("query-input").fill("typescript")
    await page.getByTestId("page-input").fill("3")

    // Click update button
    await page.getByTestId("update-params-btn").click()

    // Check URL was updated
    await expect(page).toHaveURL(/q=typescript/)
    await expect(page).toHaveURL(/page=3/)

    // Check display was updated
    await expect(page.getByTestId("search-results")).toHaveText('Showing results for "typescript"')
    await expect(page.getByTestId("pagination-info")).toHaveText("Page 3 of results")
  })

  test("should toggle active parameter", async ({ page }) => {
    await page.goto("/search?active=false")

    // Check initial state
    await expect(page.getByTestId("filter-status")).toHaveText("Filter: All items")

    // Toggle active
    await page.getByTestId("toggle-active-btn").click()

    // Check URL was updated
    await expect(page).toHaveURL(/active=true/)

    // Check display was updated
    await expect(page.getByTestId("filter-status")).toHaveText("Filter: Active items only")
  })

  test("should display all parameters object", async ({ page }) => {
    await page.goto("/search?q=test&page=1&custom=value")

    const allParams = await page.getByTestId("all-params").textContent()
    const params = JSON.parse(allParams || "{}")

    expect(params).toHaveProperty("q", "test")
    expect(params).toHaveProperty("page", "1")
    expect(params).toHaveProperty("custom", "value")
    expect(params).toHaveProperty("limit", "10") // Default value
  })
})
