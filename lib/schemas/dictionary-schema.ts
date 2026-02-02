import { z } from 'zod';

// -----------------------------------------------------------------------------
// CORRECTCASE ELITE DICTIONARY SCHEMA (2026 STANDARD)
// -----------------------------------------------------------------------------

// 1. SIMPLE ENTRY (Legacy/Lightweight)
// Just the raw string. Used for acronyms, names, etc.
export const simpleEntrySchema = z.string().min(1).trim();

// 2. ELITE ENTRY (Premium/Monetizable)
// Rich metadata for our engine.
export const eliteEntrySchema = z.object({
    term: z.string().min(1).describe("The word or phrase as it should appear"),
    key: z.string().min(1).describe("Normalized key for O(1) lookups"),
    tags: z.array(z.string()).default([]).describe("POS tags: Noun, Verb, Adjective, etc."),
    region: z.enum(['GB', 'US', 'Universal']).default('Universal'),
    casing: z.enum(['lowercase', 'Sentence case', 'Title Case', 'UPPERCASE', 'mixedCase']).optional(),
    metadata: z.object({
        priority: z.number().min(0).max(10).default(5),
        isCompound: z.boolean().default(false),
        isHyphenated: z.boolean().default(false),
        complexity: z.number().optional()
    }).optional()
});

export type SimpleEntry = z.infer<typeof simpleEntrySchema>;
export type EliteEntry = z.infer<typeof eliteEntrySchema>;

// 3. LEGACY WRAPPER (Heuristics)
// Objects wrapping arrays like { "classifiers": ["north", "south"] }
// or { "units": [["ph", "pH"], ...] }
export const legacyWrapperSchema = z.record(z.string(), z.any());

// 4. DATASET SCHEMA (Polymorphic)
// Can be a list of strings, a list of objects, or a wrapper object.
export const dictionaryDatasetSchema = z.union([
    z.array(simpleEntrySchema),
    z.array(eliteEntrySchema),
    legacyWrapperSchema
]);

export type DictionaryDataset = z.infer<typeof dictionaryDatasetSchema>;
