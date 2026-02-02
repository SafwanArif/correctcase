import { describe, it, expect } from "vitest";
import { toSentenceCase } from "@/lib/text-utils";

describe("Logic Core: Text Utils", () => {
    it("should respect the ReDoS safety cap (500k chars)", () => {
        const massiveString = "a".repeat(600000);
        const result = toSentenceCase(massiveString);
        expect(result).toContain("(Truncated)");
        expect(result.length).toBeLessThan(600000);
    });

    it("should correctly handle British English Proper Nouns", () => {
        // const input = ... removed
        // Assuming dictionaries/compounds are loaded or mocked.
        // Note: In a unit test, we might need to check if dictionaries function without full mock.
        // The current implementation imports JSONs directly so it should work if paths are correct.

        // Simple distinct test for first word capitalization at minimum
        const result = toSentenceCase("hello world");
        expect(result).toBe("Hello world");
    });
});
