import { useLocation } from "react-router-dom"
import type { SafeLocationState } from "../types"

/**
 * Type-safe wrapper for useLocation with state type safety
 */
export function useSafeLocation<T = any>(options: SafeLocationState<T> = {}) {
  const location = useLocation()
  const { defaultState } = options

  /**
   * Get location state with type safety
   */
  const getState = (): T | undefined => {
    return (location.state as T) ?? defaultState
  }

  /**
   * Get required location state
   */
  const getRequiredState = (): T => {
    const state = getState()
    if (state === undefined) {
      throw new Error("Required location state is missing")
    }
    return state
  }

  /**
   * Check if location state exists
   */
  const hasState = (): boolean => {
    return location.state !== null && location.state !== undefined
  }

  /**
   * Get a specific property from location state
   */
  const getStateProperty = <K extends keyof T>(key: K, defaultValue?: T[K]): T[K] | undefined => {
    const state = getState()
    if (!state || typeof state !== "object") return defaultValue
    return (state as any)[key] ?? defaultValue
  }

  return {
    ...location,
    getState,
    getRequiredState,
    hasState,
    getStateProperty,
  }
}

/**
 * Hook to get typed location state
 */
export function useLocationState<T = any>(defaultState?: T): T | undefined {
  const { getState } = useSafeLocation({ defaultState })
  return getState()
}

/**
 * Hook to get required typed location state
 */
export function useRequiredLocationState<T = any>(): T {
  const { getRequiredState } = useSafeLocation<T>()
  return getRequiredState()
}
