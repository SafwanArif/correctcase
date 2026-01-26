/**
 * Dictionary Aggregator
 * 
 * The Single Source of Truth for all lexical assets.
 * Combines modular dictionaries into logical exports for the Text Engine.
 */

import UNIVERSAL_COMPOUNDS from '@/data/dictionaries/universal/compounds.json';
import UK_COMPOUNDS from '@/data/dictionaries/en-GB/compounds.json';
import US_COMPOUNDS from '@/data/dictionaries/en-US/compounds.json';
import UK_ACRONYMS_LIST from '@/data/dictionaries/en-GB/acronyms.json';
import US_MINOR_WORDS_LIST from '@/data/dictionaries/en-US/minor.json';

// Re-export specific sets for targeted logic
export const UK_ACRONYMS = new Set(UK_ACRONYMS_LIST);
export const US_MINOR_WORDS = new Set(US_MINOR_WORDS_LIST);

// Global Compound List (The "Antigravity" Database)
// Aggregates Universal + Regional Dictionaries
export const GLOBAL_COMPOUND_WORDS = new Set([
    ...UNIVERSAL_COMPOUNDS,
    ...UK_COMPOUNDS,
    ...US_COMPOUNDS
]);
