"use client"
import { Routes, Route, useNavigate } from "react-router-dom"
import { render, screen, fireEvent } from "../../test/test-utils"
import { useSafeLocation, useLocationState, useRequiredLocationState } from "../useSafeLocation"

interface TestState {
  user: { id: string; name: string }
  from: string
}

const TestComponent = ({ defaultState }: { defaultState?: TestState }) => {
  const { getState, hasState, getStateProperty } = useSafeLocation<TestState>({ defaultState })

  const state = getState()
  const hasLocationState = hasState()
  const from = getStateProperty("from", "/")
  const userId = getStateProperty("user", { id: "unknown", name: "Unknown" })?.id

  return (
    <div>
      <div data-testid="has-state">{String(hasLocationState)}</div>
      <div data-testid="from">{from}</div>
      <div data-testid="user-id">{userId}</div>
      <div data-testid="full-state">{JSON.stringify(state)}</div>
    </div>
  )
}

const LocationStateTestComponent = ({ defaultState }: { defaultState?: TestState }) => {
  const state = useLocationState<TestState>(defaultState)
  return (
    <div>
      <div data-testid="location-state">{JSON.stringify(state)}</div>
    </div>
  )
}

const RequiredLocationStateTestComponent = () => {
  const state = useRequiredLocationState<TestState>()
  return (
    <div>
      <div data-testid="required-state">{JSON.stringify(state)}</div>
    </div>
  )
}

const NavigationComponent = () => {
  const navigate = useNavigate()

  const handleNavigateWithState = () => {
    navigate("/destination", {
      state: {
        user: { id: "123", name: "John Doe" },
        from: "/home",
      },
    })
  }

  const handleNavigateWithoutState = () => {
    navigate("/destination")
  }

  return (
    <div>
      <button data-testid="navigate-with-state" onClick={handleNavigateWithState}>
        Navigate with State
      </button>
      <button data-testid="navigate-without-state" onClick={handleNavigateWithoutState}>
        Navigate without State
      </button>
    </div>
  )
}

describe("useSafeLocation", () => {
  it("should return location state when present", () => {
    const testState: TestState = {
      user: { id: "123", name: "John Doe" },
      from: "/home",
    }

    render(
      <Routes>
        <Route path="/test" element={<TestComponent />} />
      </Routes>,
      {
        routerProps: {
          initialEntries: [{ pathname: "/test", state: testState }],
        },
      },
    )

    expect(screen.getByTestId("has-state")).toHaveTextContent("true")
    expect(screen.getByTestId("from")).toHaveTextContent("/home")
    expect(screen.getByTestId("user-id")).toHaveTextContent("123")
    expect(screen.getByTestId("full-state")).toHaveTextContent(JSON.stringify(testState))
  })

  it("should use default state when no state is present", () => {
    const defaultState: TestState = {
      user: { id: "default", name: "Default User" },
      from: "/default",
    }

    render(
      <Routes>
        <Route path="/test" element={<TestComponent defaultState={defaultState} />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/test"] },
      },
    )

    expect(screen.getByTestId("has-state")).toHaveTextContent("false")
    expect(screen.getByTestId("from")).toHaveTextContent("/default")
    expect(screen.getByTestId("user-id")).toHaveTextContent("default")
    expect(screen.getByTestId("full-state")).toHaveTextContent(JSON.stringify(defaultState))
  })

  it("should return default values for properties when state is missing", () => {
    render(
      <Routes>
        <Route path="/test" element={<TestComponent />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/test"] },
      },
    )

    expect(screen.getByTestId("has-state")).toHaveTextContent("false")
    expect(screen.getByTestId("from")).toHaveTextContent("/")
    expect(screen.getByTestId("user-id")).toHaveTextContent("unknown")
    expect(screen.getByTestId("full-state")).toHaveTextContent("null")
  })
})

describe("useLocationState", () => {
  it("should return location state", () => {
    const testState: TestState = {
      user: { id: "123", name: "John Doe" },
      from: "/home",
    }

    render(
      <Routes>
        <Route path="/test" element={<LocationStateTestComponent />} />
      </Routes>,
      {
        routerProps: {
          initialEntries: [{ pathname: "/test", state: testState }],
        },
      },
    )

    expect(screen.getByTestId("location-state")).toHaveTextContent(JSON.stringify(testState))
  })

  it("should return default state when no state is present", () => {
    const defaultState: TestState = {
      user: { id: "default", name: "Default User" },
      from: "/default",
    }

    render(
      <Routes>
        <Route path="/test" element={<LocationStateTestComponent defaultState={defaultState} />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/test"] },
      },
    )

    expect(screen.getByTestId("location-state")).toHaveTextContent(JSON.stringify(defaultState))
  })
})

describe("useRequiredLocationState", () => {
  it("should return location state when present", () => {
    const testState: TestState = {
      user: { id: "123", name: "John Doe" },
      from: "/home",
    }

    render(
      <Routes>
        <Route path="/test" element={<RequiredLocationStateTestComponent />} />
      </Routes>,
      {
        routerProps: {
          initialEntries: [{ pathname: "/test", state: testState }],
        },
      },
    )

    expect(screen.getByTestId("required-state")).toHaveTextContent(JSON.stringify(testState))
  })

  it("should throw error when required state is missing", () => {
    const { container } = render(
      <Routes>
        <Route path="/test" element={<RequiredLocationStateTestComponent />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/test"] },
      },
    )

    expect(container.textContent).toContain("Required location state is missing")
  })
})

describe("Navigation with state", () => {
  it("should handle navigation with state", () => {
    render(
      <Routes>
        <Route path="/" element={<NavigationComponent />} />
        <Route path="/destination" element={<TestComponent />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/"] },
      },
    )

    fireEvent.click(screen.getByTestId("navigate-with-state"))

    expect(screen.getByTestId("has-state")).toHaveTextContent("true")
    expect(screen.getByTestId("from")).toHaveTextContent("/home")
    expect(screen.getByTestId("user-id")).toHaveTextContent("123")
  })

  it("should handle navigation without state", () => {
    render(
      <Routes>
        <Route path="/" element={<NavigationComponent />} />
        <Route path="/destination" element={<TestComponent />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/"] },
      },
    )

    fireEvent.click(screen.getByTestId("navigate-without-state"))

    expect(screen.getByTestId("has-state")).toHaveTextContent("false")
    expect(screen.getByTestId("from")).toHaveTextContent("/")
    expect(screen.getByTestId("user-id")).toHaveTextContent("unknown")
  })
})
