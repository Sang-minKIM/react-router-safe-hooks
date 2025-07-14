/**
 * Type guard to check if a parameter exists and is not empty
 */
export function isValidParam(param: string | undefined): param is string {
  return param !== undefined && param !== null && param.trim() !== ""
}

/**
 * Type guard to check if all required parameters exist
 */
export function hasRequiredParams<T extends Record<string, string>>(
  params: Partial<T>,
  required: (keyof T)[],
): params is T {
  return required.every((key) => isValidParam(params[key] as string))
}

/**
 * Validate and transform parameter to number
 */
export function parseParamAsNumber(param: string | undefined): number | undefined {
  if (!isValidParam(param)) return undefined
  const num = Number(param)
  return isNaN(num) ? undefined : num
}

/**
 * Validate and transform parameter to boolean
 */
export function parseParamAsBoolean(param: string | undefined): boolean | undefined {
  if (!isValidParam(param)) return undefined
  return param === "true" || param === "1"
}
