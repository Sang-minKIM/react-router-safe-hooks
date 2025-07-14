import "@testing-library/jest-dom"
import jest from "jest"

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
}
