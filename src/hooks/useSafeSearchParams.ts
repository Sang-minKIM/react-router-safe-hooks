"use client"

import { useSearchParams } from "react-router-dom"
import type { SafeSearchParamsOptions } from "../types"

/**
 * Type-safe wrapper for useSearchParams with utility methods
 */
export function useSafeSearchParams(options: SafeSearchParamsOptions = {}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { defaultValues = {} } = options

  /**
   * Get a search parameter with default value
   */
  const get = (key: string, defaultValue?: string): string | undefined => {
    return searchParams.get(key) ?? defaultValues[key] ?? defaultValue
  }

  /**
   * Get a required search parameter
   */
  const getRequired = (key: string, defaultValue?: string): string => {
    const value = get(key, defaultValue)
    if (value === undefined || value === null) {
      throw new Error(`Required search parameter '${key}' is missing`)
    }
    return value
  }

  /**
   * Get search parameter as number
   */
  const getNumber = (key: string, defaultValue?: number): number | undefined => {
    const value = get(key)
    if (value === undefined) return defaultValue
    const num = Number(value)
    return isNaN(num) ? defaultValue : num
  }

  /**
   * Get required search parameter as number
   */
  const getRequiredNumber = (key: string, defaultValue?: number): number => {
    const value = getNumber(key, defaultValue)
    if (value === undefined) {
      throw new Error(`Required numeric search parameter '${key}' is missing or invalid`)
    }
    return value
  }

  /**
   * Get search parameter as boolean
   */
  const getBoolean = (key: string, defaultValue?: boolean): boolean | undefined => {
    const value = get(key)
    if (value === undefined) return defaultValue
    return value === "true" || value === "1"
  }

  /**
   * Get search parameter as array
   */
  const getArray = (key: string, separator = ",", defaultValue?: string[]): string[] => {
    const value = get(key)
    if (value === undefined) return defaultValue ?? []
    return value.split(separator).filter(Boolean)
  }

  /**
   * Set multiple search parameters at once
   */
  const setMultiple = (params: Record<string, string | number | boolean | null | undefined>) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          newParams.delete(key)
        } else {
          newParams.set(key, String(value))
        }
      })

      return newParams
    })
  }

  /**
   * Toggle a boolean search parameter
   */
  const toggle = (key: string) => {
    const current = getBoolean(key, false)
    setMultiple({ [key]: !current })
  }

  /**
   * Get all search parameters as an object
   */
  const getAll = (): Record<string, string> => {
    const result: Record<string, string> = { ...defaultValues }

    for (const [key, value] of searchParams.entries()) {
      result[key] = value
    }

    return result
  }

  return {
    searchParams,
    setSearchParams,
    get,
    getRequired,
    getNumber,
    getRequiredNumber,
    getBoolean,
    getArray,
    setMultiple,
    toggle,
    getAll,
  }
}
