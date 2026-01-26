/**
 * US Minor Words Dictionary (Chicago Style Approximation)
 * 
 * Words that should generally be lowercase in Title Case, unless they are the first or last word.
 * Articles, conjunctions, and short prepositions.
 */

export const US_MINOR_WORDS = new Set([
    // Articles
    'a', 'an', 'the',

    // Conjunctions
    'and', 'but', 'or', 'for', 'nor', 'net', 'so', 'yet',

    // Prepositions (Short, < 5 letters usually, but strictly defined lists are better)
    'at', 'by', 'for', 'in', 'of', 'on', 'to', 'up', 'as',
    'with', 'from', 'into', 'like', 'over', 'after', 'upon', 'out', 'off', 'near'
]);
