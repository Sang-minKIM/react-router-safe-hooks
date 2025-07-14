"use client"

import type React from "react"
import { useState } from "react"
import { useRequiredParams } from "../hooks/useSafeParams"
import { useSafeSearchParams } from "../hooks/useSafeSearchParams"
import { useRequiredLocationState } from "../hooks/useSafeLocation"

const ErrorTestPage: React.FC = () => {
  const [testType, setTestType] = useState<string>("")
  const [error, setError] = useState<string>("")
  const params = useRequiredParams(["userId", "companyId"])
  const { getRequired } = useSafeSearchParams()
  const state = useRequiredLocationState()

  const testRequiredParams = () => {
    try {
      setError("")
      // This should throw an error since we don't have required params
      console.log("Params:", params)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const testRequiredSearchParams = () => {
    try {
      setError("")
      // This should throw an error if 'requiredParam' is not in URL
      const value = getRequired("requiredParam")
      console.log("Required param:", value)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const testRequiredLocationState = () => {
    try {
      setError("")
      // This should throw an error since we don't have location state
      console.log("State:", state)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const runTest = () => {
    switch (testType) {
      case "params":
        testRequiredParams()
        break
      case "searchParams":
        testRequiredSearchParams()
        break
      case "locationState":
        testRequiredLocationState()
        break
      default:
        setError("Please select a test type")
    }
  }

  return (
    <div className="card">
      <h1 data-testid="page-title">Error Test Page</h1>
      <p>This page tests error handling scenarios for the safe hooks.</p>

      <div className="card">
        <h2>Error Test Controls</h2>
        <div className="form-group">
          <label>Select Test Type:</label>
          <select value={testType} onChange={(e) => setTestType(e.target.value)} data-testid="test-type-select">
            <option value="">Select a test...</option>
            <option value="params">Required Route Parameters</option>
            <option value="searchParams">Required Search Parameters</option>
            <option value="locationState">Required Location State</option>
          </select>
        </div>
        <button className="btn" onClick={runTest} data-testid="run-test-btn">
          Run Test
        </button>
      </div>

      {error && (
        <div className="error" data-testid="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="card">
        <h2>Test Descriptions</h2>
        <ul>
          <li>
            <strong>Required Route Parameters:</strong> Tests error when required route parameters are missing
          </li>
          <li>
            <strong>Required Search Parameters:</strong> Tests error when required search parameters are missing
          </li>
          <li>
            <strong>Required Location State:</strong> Tests error when required location state is missing
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ErrorTestPage
