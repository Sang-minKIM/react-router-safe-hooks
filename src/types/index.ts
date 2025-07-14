export interface SafeParamsOptions<T extends Record<string, string>> {
  defaultValues?: Partial<T>
  required?: (keyof T)[]
}

export interface SafeSearchParamsOptions {
  defaultValues?: Record<string, string>
}

export interface SafeLocationState<T = any> {
  defaultState?: T
}

export type RequiredParams<T extends Record<string, string>, K extends keyof T> = T & Required<Pick<T, K>>
