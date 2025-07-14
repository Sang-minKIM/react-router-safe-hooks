"use client"

import { useParams } from "react-router-dom"
import type { SafeParamsOptions, RequiredParams } from "../types"

/**
 * Type-safe wrapper for useParams that provides default values and required parameter validation
 */
export function useSafeParams<T extends Record<string, string>>(options: SafeParamsOptions<T> = {}): T {
  const params = useParams() as Partial<T>
  const { defaultValues = {}, required = [] } = options

  // Check for required parameters
  for (const key of required) {
    if (!params[key]) {
      throw new Error(`Required parameter '${String(key)}' is missing`)
    }
  }

  // Merge with default values
  const result = { ...defaultValues, ...params } as T

  return result
}

/**
 * Type-safe wrapper for useParams with required parameters
 */
export function useRequiredParams<T extends Record<string, string>, K extends keyof T>(
  requiredKeys: K[],
  defaultValues?: Partial<T>,
): RequiredParams<T, K> {
  return useSafeParams({
    defaultValues,
    required: requiredKeys,
  }) as RequiredParams<T, K>
}

/**
 * Get a single parameter with type safety
 */
export function useSafeParam<T extends string = string>(key: string, defaultValue?: T): T | undefined {
  const params = useParams()
  const value = params[key] as T | undefined

  return value ?? defaultValue
}

/**
 * Get a required single parameter
 */
export function useRequiredParam<T extends string = string>(key: string, defaultValue?: T): T {
  const value = useSafeParam(key, defaultValue)

  if (value === undefined) {
    throw new Error(`Required parameter '${key}' is missing`)
  }

  return value
}
