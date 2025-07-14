// Hooks
export {
  useSafeParams,
  useRequiredParams,
  useSafeParam,
  useRequiredParam,
} from "./hooks/useSafeParams"

export { useSafeSearchParams } from "./hooks/useSafeSearchParams"

export {
  useSafeLocation,
  useLocationState,
  useRequiredLocationState,
} from "./hooks/useSafeLocation"

// Types
export type {
  SafeParamsOptions,
  SafeSearchParamsOptions,
  SafeLocationState,
  RequiredParams,
} from "./types"

// Utils
export {
  isValidParam,
  hasRequiredParams,
  parseParamAsNumber,
  parseParamAsBoolean,
} from "./utils/guards"
