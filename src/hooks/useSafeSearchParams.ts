import { useSearchParams } from "react-router-dom";
/**
 * Hook for safe search params with defaults and type conversion
 */

export interface SafeSearchParamsOptions {
    defaultValues?: Record<string, string>;
}

export function useSafeSearchParams(options: SafeSearchParamsOptions = {}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { defaultValues = {} } = options;

    /**
     * Get a search parameter with optional default value
     */
    const get = (key: string, defaultValue?: string): string | undefined => {
        const value = searchParams.get(key);
        return value ?? defaultValue ?? defaultValues[key];
    };

    /**
     * Get a required search parameter (throws if missing and no default)
     */
    const getRequired = (key: string, defaultValue?: string): string => {
        const value = get(key, defaultValue);
        if (value === undefined) {
            throw new Error(`Required search parameter "${key}" is missing`);
        }
        return value;
    };

    /**
     * Get a search parameter as number
     */
    const getNumber = (key: string, defaultValue?: number): number | undefined => {
        const value = get(key);
        if (value === undefined) return defaultValue;
        const num = parseInt(value, 10);
        return isNaN(num) ? defaultValue : num;
    };

    /**
     * Get a required search parameter as number
     */
    const getRequiredNumber = (key: string, defaultValue?: number): number => {
        const value = getNumber(key, defaultValue);
        if (value === undefined) {
            throw new Error(`Required search parameter "${key}" is missing or invalid number`);
        }
        return value;
    };

    /**
     * Get a search parameter as boolean
     */
    const getBoolean = (key: string, defaultValue?: boolean): boolean | undefined => {
        const value = get(key);
        if (value === undefined) return defaultValue;
        return value.toLowerCase() === "true";
    };

    /**
     * Get a search parameter as array
     */
    const getArray = (key: string, separator = ",", defaultValue?: string[]): string[] => {
        const value = get(key);
        if (value === undefined) return defaultValue ?? [];
        return value.split(separator).filter(Boolean);
    };

    /**
     * Set multiple search parameters at once
     */
    const setMultiple = (params: Record<string, string | number | boolean | null | undefined>) => {
        const newParams = new URLSearchParams(searchParams);

        Object.entries(params).forEach(([key, value]) => {
            if (value === null || value === undefined) {
                newParams.delete(key);
            } else {
                newParams.set(key, String(value));
            }
        });

        setSearchParams(newParams);
    };

    /**
     * Set a single search parameter
     */
    const set = (key: string, value: string | number | boolean | null | undefined) => {
        setMultiple({ [key]: value });
    };

    /**
     * Toggle a boolean search parameter
     */
    const toggle = (key: string) => {
        const current = getBoolean(key, false);
        set(key, !current);
    };

    /**
     * Get all search parameters as object
     */
    const getAll = (): Record<string, string> => {
        const result: Record<string, string> = { ...defaultValues };

        // Iterate through all keys and get their values
        searchParams.forEach((value, key) => {
            result[key] = value;
        });

        return result;
    };

    return {
        get,
        getRequired,
        getNumber,
        getRequiredNumber,
        getBoolean,
        getArray,
        set,
        setMultiple,
        toggle,
        getAll,
    };
}
