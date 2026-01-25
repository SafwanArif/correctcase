/**
 * CorrectCase Text Utilities
 * 
 * Contains pure functions for text manipulation.
 * Strict British English conventions used in code comments and implementation.
 */

const UK_PROPER_NOUNS: Set<string> = new Set([
    'NHS', 'BBC', 'UK', 'USA', 'EU', 'NATO', 'GP', 'A&E', 'TV', 'PC', 'MP', 'PM', 'HR', 'VAT', 'NI', 'ID', 'CEO', 'CTO', 'CFO', 'PhD', 'MBA'
]);

/**
 * Converts text to Sentence case, preserving common UK acronyms.
 * @param text The input text to normalise.
 * @returns The text in Sentence case.
 */
export function toSentenceCase(text: string): string {
    if (!text) return '';

    const sentences = text.split(/([.!?]+[\s\n]+)/);

    return sentences.map(part => {
        // If it's just punctuation/whitespace, return as is
        if (/^[.!?]+[\s\n]+$/.test(part)) return part;
        if (!part.trim()) return part;

        // Process the sentence
        const words = part.split(/\s+/);

        return words.map((word, index) => {
            // Clean word for checking (remove punctuation)
            const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
            const upperWord = cleanWord.toUpperCase();

            // Check for UK Proper Nouns
            if (UK_PROPER_NOUNS.has(upperWord)) {
                return word;
            }

            // First word of sentence
            if (index === 0) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }

            // Check if it's "I" (conceptually a proper noun in English)
            if (word.toLowerCase() === 'i') return 'I';

            // Default: lowercase
            return word.toLowerCase();
        }).join(' ');
    }).join('');
}

/**
 * Converts text to Title Case.
 * @param text The text to convert.
 * @returns The text in Title Case.
 */
export function toTitleCase(text: string): string {
    if (!text) return '';

    // Simple Title Case logic
    return text.toLowerCase().split(' ').map(word => {
        if (UK_PROPER_NOUNS.has(word.toUpperCase())) return word.toUpperCase();
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

import { COMPOUND_WORDS } from './hyphen-dictionary';

/**
 * Converts text to a URL-friendly hyphenated format (formerly "Slug").
 * @param text The text to format.
 * @returns The hyphenated string.
 */
export function toHyphenated(text: string): string {
    if (!text) return '';
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove non-word chars
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, ''); // Trim start/end hyphens
}

export function countWords(text: string): number {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
}

export function countCharacters(text: string): number {
    return text.length;
}

export function isHyphenated(text: string): boolean {
    if (!text.trim()) return false;
    // Check if it has hyphens and NO spaces
    return text.includes('-') && !/\s/.test(text.trim());
}

/**
 * Smartly recovers text from a hyphenated string, preserving known compound words.
 * @param text The hyphenated text (e.g. "well-being-check").
 * @returns The recovered sentence (e.g. "Well-being check").
 */
export function smartUnhyphenate(text: string): string {
    if (!text) return '';

    const parts = text.split('-');
    const recoveredParts: string[] = [];

    for (let i = 0; i < parts.length; i++) {
        const current = parts[i].toLowerCase();

        // Peek ahead
        if (i < parts.length - 1) {
            const next = parts[i + 1].toLowerCase();
            const compoundCandidate = `${current}-${next}`;

            if (COMPOUND_WORDS.has(compoundCandidate)) {
                // It's a compound word! Keep the hyphen.
                recoveredParts.push(compoundCandidate);
                i++; // Skip the next part since we consumed it
                continue;
            }
        }

        // Not a compound, just add the word
        recoveredParts.push(current);
    }

    // Join with spaces and apply Sentence Case
    const rawSentence = recoveredParts.join(' ');
    // Handle special case where user might want to re-hyphenate a sentence that was just unhyphenated?
    // No, unhyphenate is strictly Slug -> Sentence with compounds.
    return toSentenceCase(rawSentence);
}

// Re-export recovering function aliases if needed
// Re-export recovering function aliases if needed
export const toSlug = toHyphenated; // Alias for backward compat
export const fromSlug = smartUnhyphenate;
export const isSlug = isHyphenated;
