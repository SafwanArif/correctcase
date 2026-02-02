/**
 * Dictionary Aggregator
 *
 * The Single Source of Truth for all lexical assets.
 * Combines modular dictionaries into logical exports for the Text Engine.
 */

import UNIVERSAL_COMPOUNDS from "@/data/dictionaries/universal/compounds.json";
import UK_COMPOUNDS from "@/data/dictionaries/en-GB/compounds.json";
import US_COMPOUNDS from "@/data/dictionaries/en-US/compounds.json";

import UNIVERSAL_ACRONYMS from "@/data/dictionaries/universal/acronyms.json";
import UNIVERSAL_BRANDS from "@/data/dictionaries/universal/brands.json";
import UNIVERSAL_LOCATIONS from "@/data/dictionaries/universal/locations.json";
import UNIVERSAL_NAMES from "@/data/dictionaries/universal/names.json";

import UNIVERSAL_MINOR_WORDS_LIST from "@/data/dictionaries/universal/function-words.json";
import UNIVERSAL_PHRASAL_VERB_ROOTS from "@/data/dictionaries/universal/phrasal-verb-roots.json";

// Re-export specific sets for targeted logic
export const US_MINOR_WORDS = new Set(UNIVERSAL_MINOR_WORDS_LIST);
export const PHRASAL_VERB_ROOTS = new Set(UNIVERSAL_PHRASAL_VERB_ROOTS);

// Case-insensitive lookup map for exceptions (lowercase -> original)
// Merges Universal + Regional lists (Regional takes precedence if conflict, though unlikely for these sets)
const ALL_EXCEPTIONS = [
    ...UNIVERSAL_ACRONYMS,
    ...UNIVERSAL_BRANDS,
    ...UNIVERSAL_LOCATIONS,
    ...UNIVERSAL_NAMES,
];
export const SENTENCE_CASE_EXCEPTIONS_MAP = new Map(
    ALL_EXCEPTIONS.map((word) => [word.toLowerCase(), word])
);

// Global Compound List (The "Antigravity" Database)
// Aggregates Universal + Regional Dictionaries
export const GLOBAL_COMPOUND_WORDS = new Set([
    ...UNIVERSAL_COMPOUNDS,
    ...UK_COMPOUNDS,
    ...US_COMPOUNDS,
]);

// Case-Insensitive Lookup for Compounds (lowercase -> original)
// This enables "smart led" input to match "Smart LED" dictionary entry.
export const COMPOUNDS_LOOKUP_MAP = new Map<string, string>();
for (const word of GLOBAL_COMPOUND_WORDS) {
    COMPOUNDS_LOOKUP_MAP.set(word.toLowerCase(), word);
}
