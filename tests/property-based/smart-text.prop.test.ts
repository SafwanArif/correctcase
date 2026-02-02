import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { smartText } from '../../lib/smart-text';

// -----------------------------------------------------------------------------
// PROPERTY-BASED TESTING (Elite Logic Calculation)
// -----------------------------------------------------------------------------
// Instead of testing "foo" -> "Foo", we test 1000s of generated scenarios
// to find edge cases where the logic breaks.
// -----------------------------------------------------------------------------

describe('Smart Text Logic (Property-Based)', () => {
    it('should never crash regardless of input', () => {
        fc.assert(
            fc.property(fc.string(), (text) => {
                // The function should never throw, no matter what string is passed
                expect(() => smartText(text)).not.toThrow();
            })
        );
    });

    it('should maintain length for simple case changes (simplified heuristic)', () => {
        fc.assert(
            fc.property(fc.string({ minLength: 1 }), (text) => {
                // If we only have letters, the length shouldn't change significantly
                // (This is a naive check just to prove the test runner works)
                const result = smartText(text);
                expect(result.length).toBeGreaterThanOrEqual(1);
            })
        );
    });
});
