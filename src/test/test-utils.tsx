import type React from "react"
import type { ReactElement } from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { MemoryRouter, type MemoryRouterProps } from "react-router-dom"

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  routerProps?: MemoryRouterProps
}

const AllTheProviders = ({
  children,
  routerProps = {},
}: { children: React.ReactNode; routerProps?: MemoryRouterProps }) => {
  return <MemoryRouter {...routerProps}>{children}</MemoryRouter>
}

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const { routerProps, ...renderOptions } = options

  return render(ui, {
    wrapper: ({ children }) => <AllTheProviders routerProps={routerProps}>{children}</AllTheProviders>,
    ...renderOptions,
  })
}

export * from "@testing-library/react"
export { customRender as render }
