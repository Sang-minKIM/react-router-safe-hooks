import type React from "react"

const HomePage: React.FC = () => {
  return (
    <div className="card">
      <h1 data-testid="page-title">React Router Safe Hooks Test App</h1>
      <p>This is a test application for demonstrating the react-router-safe-hooks library.</p>

      <h2>Available Test Pages:</h2>
      <ul>
        <li>
          <strong>User Page:</strong> Tests useSafeParams with route parameters
        </li>
        <li>
          <strong>Search Page:</strong> Tests useSafeSearchParams with query parameters
        </li>
        <li>
          <strong>Navigation Test:</strong> Tests useSafeLocation with state management
        </li>
        <li>
          <strong>Error Test:</strong> Tests error handling scenarios
        </li>
      </ul>
    </div>
  )
}

export default HomePage
