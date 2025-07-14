import type React from "react"
import { useSafeParams, useRequiredParams, useSafeParam } from "../hooks/useSafeParams"

const UserPage: React.FC = () => {
  // Test useSafeParams with default values
  const params = useSafeParams<{ id: string; tab: string }>({
    defaultValues: { tab: "profile" },
  })

  // Test useRequiredParams
  const requiredParams = useRequiredParams(["id"], { tab: "overview" })

  // Test useSafeParam
  const userId = useSafeParam("id")
  const userTab = useSafeParam("tab", "default-tab")

  return (
    <div className="card">
      <h1 data-testid="page-title">User Page</h1>

      <div className="debug-info">
        <h3>useSafeParams (with defaults):</h3>
        <pre data-testid="safe-params">{JSON.stringify(params, null, 2)}</pre>
      </div>

      <div className="debug-info">
        <h3>useRequiredParams:</h3>
        <pre data-testid="required-params">{JSON.stringify(requiredParams, null, 2)}</pre>
      </div>

      <div className="debug-info">
        <h3>Individual Parameters:</h3>
        <pre data-testid="individual-params">
          User ID: {userId}
          User Tab: {userTab}
        </pre>
      </div>

      <div className="card">
        <h2>User Information</h2>
        <p data-testid="user-id">User ID: {params.id}</p>
        <p data-testid="user-tab">Current Tab: {params.tab}</p>
      </div>
    </div>
  )
}

export default UserPage
