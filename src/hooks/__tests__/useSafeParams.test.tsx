import { Routes, Route } from "react-router-dom"
import { render, screen } from "../../test/test-utils"
import { useSafeParams, useRequiredParams, useSafeParam, useRequiredParam } from "../useSafeParams"

// Test components
const TestComponent = ({ options }: { options?: any }) => {
  const params = useSafeParams(options)
  return (
    <div>
      <div data-testid="id">{params.id || "undefined"}</div>
      <div data-testid="tab">{params.tab || "undefined"}</div>
    </div>
  )
}

const RequiredParamsTestComponent = ({
  requiredKeys,
  defaultValues,
}: { requiredKeys: string[]; defaultValues?: any }) => {
  const params = useRequiredParams(requiredKeys, defaultValues)
  return (
    <div>
      <div data-testid="id">{params.id}</div>
      <div data-testid="tab">{params.tab || "undefined"}</div>
    </div>
  )
}

const SingleParamTestComponent = ({
  paramKey,
  defaultValue,
  required = false,
}: { paramKey: string; defaultValue?: string; required?: boolean }) => {
  try {
    const value = required ? useRequiredParam(paramKey, defaultValue) : useSafeParam(paramKey, defaultValue)
    return <div data-testid="param-value">{value || "undefined"}</div>
  } catch (error) {
    return <div data-testid="error">{(error as Error).message}</div>
  }
}

describe("useSafeParams", () => {
  it("should return parameters with default values", () => {
    render(
      <Routes>
        <Route path="/user/:id" element={<TestComponent options={{ defaultValues: { tab: "profile" } }} />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/user/123"] },
      },
    )

    expect(screen.getByTestId("id")).toHaveTextContent("123")
    expect(screen.getByTestId("tab")).toHaveTextContent("profile")
  })

  it("should return undefined for missing parameters without defaults", () => {
    render(
      <Routes>
        <Route path="/user/:id" element={<TestComponent />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/user/123"] },
      },
    )

    expect(screen.getByTestId("id")).toHaveTextContent("123")
    expect(screen.getByTestId("tab")).toHaveTextContent("undefined")
  })

  it("should override default values with actual parameters", () => {
    render(
      <Routes>
        <Route path="/user/:id/:tab" element={<TestComponent options={{ defaultValues: { tab: "profile" } }} />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/user/123/settings"] },
      },
    )

    expect(screen.getByTestId("id")).toHaveTextContent("123")
    expect(screen.getByTestId("tab")).toHaveTextContent("settings")
  })
})

describe("useRequiredParams", () => {
  it("should return parameters when required ones are present", () => {
    render(
      <Routes>
        <Route
          path="/user/:id/:tab"
          element={<RequiredParamsTestComponent requiredKeys={["id"]} defaultValues={{ tab: "profile" }} />}
        />
      </Routes>,
      {
        routerProps: { initialEntries: ["/user/123/settings"] },
      },
    )

    expect(screen.getByTestId("id")).toHaveTextContent("123")
    expect(screen.getByTestId("tab")).toHaveTextContent("settings")
  })

  it("should throw error when required parameter is missing", () => {
    render(
      <Routes>
        <Route path="/user" element={<RequiredParamsTestComponent requiredKeys={["id"]} />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/user"] },
      },
    )

    expect(screen.getByTestId("error")).toHaveTextContent("Required parameter 'id' is missing")
  })
})

describe("useSafeParam", () => {
  it("should return single parameter value", () => {
    render(
      <Routes>
        <Route path="/user/:id" element={<SingleParamTestComponent paramKey="id" />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/user/123"] },
      },
    )

    expect(screen.getByTestId("param-value")).toHaveTextContent("123")
  })

  it("should return default value when parameter is missing", () => {
    render(
      <Routes>
        <Route path="/user" element={<SingleParamTestComponent paramKey="id" defaultValue="default-id" />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/user"] },
      },
    )

    expect(screen.getByTestId("param-value")).toHaveTextContent("default-id")
  })
})

describe("useRequiredParam", () => {
  it("should return parameter value when present", () => {
    render(
      <Routes>
        <Route path="/user/:id" element={<SingleParamTestComponent paramKey="id" required />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/user/123"] },
      },
    )

    expect(screen.getByTestId("param-value")).toHaveTextContent("123")
  })

  it("should throw error when required parameter is missing", () => {
    render(
      <Routes>
        <Route path="/user" element={<SingleParamTestComponent paramKey="id" required />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/user"] },
      },
    )

    expect(screen.getByTestId("error")).toHaveTextContent("Required parameter 'id' is missing")
  })
})
