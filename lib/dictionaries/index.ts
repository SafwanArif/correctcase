/**
 * Dictionary Aggregator
 * 
 * The Single Source of Truth for all lexical assets.
 * Combines modular dictionaries into logical exports for the Text Engine.
 */

import { COMPOUND_WORDS as RAW_UNIVERSAL_COMPOUNDS } from "./universal-compound-words";
import { UK_COMPOUND_WORDS as RAW_UK_COMPOUNDS } from "./uk-compound-words";
import { US_COMPOUND_WORDS as RAW_US_COMPOUNDS } from "./us-compound-words";
import { UK_ACRONYMS as RAW_UK_ACRONYMS } from "./uk-acronyms";
import { US_MINOR_WORDS as RAW_US_MINOR_WORDS } from "./us-minor-words";

// Re-export specific sets for targeted logic
export const UK_ACRONYMS = RAW_UK_ACRONYMS;
export const US_MINOR_WORDS = RAW_US_MINOR_WORDS;

// Global Compound List (The "Antigravity" Database)
// Aggregates Universal + Regional Dictionaries
export const GLOBAL_COMPOUND_WORDS = new Set([
    ...RAW_UNIVERSAL_COMPOUNDS,
    ...RAW_UK_COMPOUNDS,
    ...RAW_US_COMPOUNDS
]);
