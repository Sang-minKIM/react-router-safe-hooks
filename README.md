# React Router Safe Hooks

Type-safe hooks for React Router v6 that eliminate undefined checks and provide better developer experience.

## Installation

```bash
npm install react-router-safe-hooks
# or
yarn add react-router-safe-hooks
# or
pnpm add react-router-safe-hooks
```

## Features

-   🔒 **Type-safe**: Full TypeScript support with proper type inference
-   🛡️ **Null-safe**: No more undefined checks for route parameters
-   🎯 **Required parameters**: Enforce required parameters at runtime
-   🔧 **Utility methods**: Built-in parsers for numbers, booleans, arrays
-   📦 **Zero dependencies**: Only peer dependencies on React and React Router
-   🚀 **Tree-shakable**: Import only what you need

## Usage

### useSafeParams

```typescript
import { useSafeParams, useRequiredParams } from "react-router-safe-hooks";

// Route: /user/:id/:tab?
function UserProfile() {
    // With default values
    const params = useSafeParams<{ id: string; tab: string }>({
        defaultValues: { tab: "profile" },
    });

    // params.id might be undefined, params.tab is 'profile' by default

    // With required parameters
    const requiredParams = useRequiredParams(["id"], { tab: "profile" });
    // requiredParams.id is guaranteed to exist, throws error if missing
}
```

### useSafeSearchParams

```typescript
import { useSafeSearchParams } from "react-router-safe-hooks";

function SearchPage() {
    const { get, getRequired, getNumber, getBoolean, getArray, setMultiple, toggle } = useSafeSearchParams({
        defaultValues: { page: "1", limit: "10" },
    });

    const page = getNumber("page", 1); // Returns number or default
    const query = get("q", ""); // Returns string or default
    const isActive = getBoolean("active"); // Returns boolean or undefined
    const tags = getArray("tags"); // Returns string array

    const handleFilter = () => {
        setMultiple({
            page: 1,
            active: true,
            tags: "react,typescript",
        });
    };
}
```

### useSafeLocation

```typescript
import { useSafeLocation, useLocationState } from "react-router-safe-hooks";

interface LocationState {
    from: string;
    user: { id: string; name: string };
}

function Dashboard() {
    const { getState, hasState, getStateProperty } = useSafeLocation<LocationState>();

    const state = getState(); // LocationState | undefined
    const hasLocationState = hasState(); // boolean
    const from = getStateProperty("from", "/"); // string

    // Or use the simpler hook
    const locationState = useLocationState<LocationState>();
}
```

## API Reference

### useSafeParams(options?)

Returns route parameters with type safety and default values.

**Options:**

-   `defaultValues?: Partial<T>` - Default values for parameters
-   `required?: (keyof T)[]` - Required parameter keys

### useRequiredParams(requiredKeys, defaultValues?)

Returns route parameters with required keys guaranteed to exist.

### useSafeSearchParams(options?)

Returns enhanced URLSearchParams with utility methods.

**Methods:**

-   `get(key, defaultValue?)` - Get parameter with default
-   `getRequired(key, defaultValue?)` - Get required parameter
-   `getNumber(key, defaultValue?)` - Get parameter as number
-   `getBoolean(key, defaultValue?)` - Get parameter as boolean
-   `getArray(key, separator?, defaultValue?)` - Get parameter as array
-   `setMultiple(params)` - Set multiple parameters at once
-   `toggle(key)` - Toggle boolean parameter

### useSafeLocation(options?)

Returns enhanced location object with type-safe state access.

**Methods:**

-   `getState()` - Get typed location state
-   `getRequiredState()` - Get required location state
-   `hasState()` - Check if state exists
-   `getStateProperty(key, defaultValue?)` - Get specific state property

## Testing

This library includes comprehensive tests using Jest and React Testing Library.

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

The library maintains high test coverage for all hooks and utility functions:

-   `useSafeParams` and related hooks
-   `useSafeSearchParams` with all utility methods
-   `useSafeLocation` and state management
-   Utility functions and type guards

### Testing Your Code

When testing components that use these hooks, you can use the provided test utilities:

```typescript
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import YourComponent from "./YourComponent";

test("your component test", () => {
    render(
        <MemoryRouter initialEntries={["/user/123?tab=profile"]}>
            <YourComponent />
        </MemoryRouter>
    );

    // Your test assertions
});
```

## License

MIT
