/**
 * Dictionary Aggregator.
 *
 * The Single Source of Truth for all lexical assets.
 * Combines modular dictionaries into logical exports for the Text Engine.
 */

import ukCompounds from "@/data/dictionaries/en-GB/compounds.json";
import usCompounds from "@/data/dictionaries/en-US/compounds.json";
import universalAcronyms from "@/data/dictionaries/universal/acronyms.json";
import universalBrands from "@/data/dictionaries/universal/brands.json";
import universalCompounds from "@/data/dictionaries/universal/compounds.json";
import universalMinorWordsList from "@/data/dictionaries/universal/function-words.json";
import universalLocations from "@/data/dictionaries/universal/locations.json";
import universalNames from "@/data/dictionaries/universal/names.json";
import universalPhrasalVerbRoots from "@/data/dictionaries/universal/phrasal-verb-roots.json";

// Re-export specific sets for targeted logic
export const usMinorWords = new Set(universalMinorWordsList);
export const phrasalVerbRoots = new Set(universalPhrasalVerbRoots);

// Case-insensitive lookup map for exceptions (lowercase -> original)
// Merges Universal + Regional lists (Regional takes precedence if conflict, though unlikely for these sets)
const allExceptions = [
    ...universalAcronyms,
    ...universalBrands,
    ...universalLocations,
    ...universalNames,
];

export const sentenceCaseExceptionsMap = new Map(
    allExceptions.map((word) => [word.toLowerCase(), word])
);

// Global Compound List (The "Antigravity" Database)
// Aggregates Universal + Regional Dictionaries
export const globalCompoundWords = new Set([
    ...universalCompounds,
    ...ukCompounds,
    ...usCompounds,
]);

// Case-Insensitive Lookup for Compounds (lowercase -> original)
// This enables "smart led" input to match "Smart LED" dictionary entry.
export const compoundsLookupMap = new Map<string, string>();
for (const word of globalCompoundWords) {
    compoundsLookupMap.set(word.toLowerCase(), word);
}
