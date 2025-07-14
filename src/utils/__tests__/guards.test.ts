import { isValidParam, hasRequiredParams, parseParamAsNumber, parseParamAsBoolean } from "../guards";

describe("isValidParam", () => {
    it("should return true for valid parameters", () => {
        expect(isValidParam("hello")).toBe(true);
        expect(isValidParam("123")).toBe(true);
        expect(isValidParam("0")).toBe(true);
        expect(isValidParam(" valid ")).toBe(true);
    });

    it("should return false for invalid parameters", () => {
        expect(isValidParam(undefined)).toBe(false);
        expect(isValidParam(null as any)).toBe(false);
        expect(isValidParam("")).toBe(false);
        expect(isValidParam("   ")).toBe(false);
    });
});

describe("hasRequiredParams", () => {
    it("should return true when all required parameters are present", () => {
        const params = { id: "123", name: "John", tab: "profile" };
        expect(hasRequiredParams(params, ["id", "tab"])).toBe(true);
    });

    it("should return false when required parameters are missing", () => {
        const params = { id: "123", tab: "profile" };
        expect(hasRequiredParams(params, ["id", "name"] as (keyof typeof params)[])).toBe(false);
    });

    it("should return false when required parameters are empty strings", () => {
        const params = { id: "123", name: "", tab: "profile" };
        expect(hasRequiredParams(params, ["id", "name"] as (keyof typeof params)[])).toBe(false);
    });

    it("should return false when required parameters are whitespace only", () => {
        const params = { id: "123", name: "   ", tab: "profile" };
        expect(hasRequiredParams(params, ["id", "name"] as (keyof typeof params)[])).toBe(false);
    });

    it("should return true for empty required array", () => {
        const params = { id: "123" };
        expect(hasRequiredParams(params, [])).toBe(true);
    });
});

describe("parseParamAsNumber", () => {
    it("should parse valid number strings", () => {
        expect(parseParamAsNumber("123")).toBe(123);
        expect(parseParamAsNumber("0")).toBe(0);
        expect(parseParamAsNumber("-456")).toBe(-456);
        expect(parseParamAsNumber("3.14")).toBe(3.14);
    });

    it("should return undefined for invalid number strings", () => {
        expect(parseParamAsNumber("abc")).toBeUndefined();
        expect(parseParamAsNumber("123abc")).toBeUndefined();
        expect(parseParamAsNumber("")).toBeUndefined();
        expect(parseParamAsNumber("   ")).toBeUndefined();
    });

    it("should return undefined for undefined input", () => {
        expect(parseParamAsNumber(undefined)).toBeUndefined();
    });

    it("should handle edge cases", () => {
        expect(parseParamAsNumber("Infinity")).toBe(Number.POSITIVE_INFINITY);
        expect(parseParamAsNumber("-Infinity")).toBe(Number.NEGATIVE_INFINITY);
        expect(parseParamAsNumber("NaN")).toBeUndefined();
    });
});

describe("parseParamAsBoolean", () => {
    it("should parse true values", () => {
        expect(parseParamAsBoolean("true")).toBe(true);
        expect(parseParamAsBoolean("1")).toBe(true);
    });

    it("should parse false values", () => {
        expect(parseParamAsBoolean("false")).toBe(false);
        expect(parseParamAsBoolean("0")).toBe(false);
        expect(parseParamAsBoolean("anything")).toBe(false);
        expect(parseParamAsBoolean("")).toBeUndefined();
    });

    it("should return undefined for invalid input", () => {
        expect(parseParamAsBoolean(undefined)).toBeUndefined();
        expect(parseParamAsBoolean("")).toBeUndefined();
        expect(parseParamAsBoolean("   ")).toBeUndefined();
    });
});
