"use client"

import type React from "react"
import { useState } from "react"
import { useSafeSearchParams } from "../hooks/useSafeSearchParams"

const SearchPage: React.FC = () => {
  const { get, getNumber, getBoolean, getArray, setMultiple, toggle, getAll } = useSafeSearchParams({
    defaultValues: { page: "1", limit: "10" },
  })

  const [newQuery, setNewQuery] = useState("")
  const [newPage, setNewPage] = useState("")

  const handleUpdateParams = () => {
    setMultiple({
      q: newQuery || undefined,
      page: newPage || 1,
      updated: new Date().toISOString(),
    })
  }

  const handleToggleActive = () => {
    toggle("active")
  }

  const query = get("q", "")
  const page = getNumber("page", 1)
  const isActive = getBoolean("active", false)
  const tags = getArray("tags")
  const allParams = getAll()

  return (
    <div className="card">
      <h1 data-testid="page-title">Search Page</h1>

      <div className="debug-info">
        <h3>Current Search Parameters:</h3>
        <pre data-testid="search-params">
          Query: {query}
          Page: {page}
          Active: {String(isActive)}
          Tags: {tags.join(", ")}
        </pre>
      </div>

      <div className="debug-info">
        <h3>All Parameters:</h3>
        <pre data-testid="all-params">{JSON.stringify(allParams, null, 2)}</pre>
      </div>

      <div className="card">
        <h2>Update Search Parameters</h2>
        <div className="form-group">
          <label>Query:</label>
          <input
            type="text"
            value={newQuery}
            onChange={(e) => setNewQuery(e.target.value)}
            placeholder="Enter search query"
            data-testid="query-input"
          />
        </div>
        <div className="form-group">
          <label>Page:</label>
          <input
            type="number"
            value={newPage}
            onChange={(e) => setNewPage(e.target.value)}
            placeholder="Enter page number"
            data-testid="page-input"
          />
        </div>
        <button className="btn" onClick={handleUpdateParams} data-testid="update-params-btn">
          Update Parameters
        </button>
        <button className="btn btn-secondary" onClick={handleToggleActive} data-testid="toggle-active-btn">
          Toggle Active ({String(isActive)})
        </button>
      </div>

      <div className="card">
        <h2>Search Results</h2>
        <p data-testid="search-results">{query ? `Showing results for "${query}"` : "No search query"}</p>
        <p data-testid="pagination-info">Page {page} of results</p>
        <p data-testid="filter-status">Filter: {isActive ? "Active items only" : "All items"}</p>
        {tags.length > 0 && <p data-testid="tags-info">Tags: {tags.join(", ")}</p>}
      </div>
    </div>
  )
}

export default SearchPage
