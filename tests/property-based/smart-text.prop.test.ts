import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { stripFormatting } from '../../lib/smart-text';

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
                expect(() => stripFormatting(text)).not.toThrow();
            })
        );
    });

    it('should result in shorter or equal length string', () => {
        fc.assert(
            fc.property(fc.string(), (text) => {
                const result = stripFormatting(text);
                expect(result.length).toBeLessThanOrEqual(text.length);
            })
        );
    });
});
