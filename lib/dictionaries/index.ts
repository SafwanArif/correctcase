/**
 * Dictionary Aggregator
 * 
 * The Single Source of Truth for all lexical assets.
 * Combines modular dictionaries into logical exports for the Text Engine.
 */

import { COMPOUND_WORDS as RAW_GLOBAL_COMPOUNDS } from "./global-compound-words";
import { UK_ACRONYMS as RAW_UK_ACRONYMS } from "./uk-acronyms";
import { US_MINOR_WORDS as RAW_US_MINOR_WORDS } from "./us-minor-words";

// Re-export specific sets for targeted logic
export const UK_ACRONYMS = RAW_UK_ACRONYMS;
export const US_MINOR_WORDS = RAW_US_MINOR_WORDS;

// Global Compound List (The "Antigravity" Database)
// Future: Import US_COMPOUNDS and spread into this Set if disjoint, or keep separate.
export const GLOBAL_COMPOUND_WORDS = RAW_GLOBAL_COMPOUNDS;
