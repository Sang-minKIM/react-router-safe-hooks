"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { useSafeLocation, useLocationState } from "../hooks/useSafeLocation"

interface TestState {
  from: string
  user: { id: string; name: string }
  timestamp: string
}

const NavigationTestPage: React.FC = () => {
  const navigate = useNavigate()
  const { getState, hasState, getStateProperty } = useSafeLocation<TestState>()
  const locationState = useLocationState<TestState>()

  const handleNavigateWithState = () => {
    navigate("/destination", {
      state: {
        from: "/navigation",
        user: { id: "456", name: "Jane Doe" },
        timestamp: new Date().toISOString(),
      },
    })
  }

  const handleNavigateWithoutState = () => {
    navigate("/destination")
  }

  const state = getState()
  const hasLocationState = hasState()
  const from = getStateProperty("from", "unknown")
  const user = getStateProperty("user", { id: "unknown", name: "Unknown" })

  return (
    <div className="card">
      <h1 data-testid="page-title">Navigation Test Page</h1>

      <div className="debug-info">
        <h3>Location State Information:</h3>
        <pre data-testid="location-state">
          Has State: {String(hasLocationState)}
          From: {from}
          User: {JSON.stringify(user, null, 2)}
          Full State: {JSON.stringify(state, null, 2)}
        </pre>
      </div>

      <div className="debug-info">
        <h3>useLocationState Hook:</h3>
        <pre data-testid="use-location-state">{JSON.stringify(locationState, null, 2)}</pre>
      </div>

      <div className="card">
        <h2>Navigation Controls</h2>
        <button className="btn" onClick={handleNavigateWithState} data-testid="navigate-with-state-btn">
          Navigate with State
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleNavigateWithoutState}
          data-testid="navigate-without-state-btn"
        >
          Navigate without State
        </button>
      </div>

      {hasLocationState && (
        <div className="success" data-testid="state-success">
          Successfully received navigation state from: {from}
        </div>
      )}

      {!hasLocationState && (
        <div className="error" data-testid="no-state-info">
          No navigation state received
        </div>
      )}
    </div>
  )
}

export default NavigationTestPage
