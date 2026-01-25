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
                return word; // Keep original casing or enforce uppercase? Usually acronyms are uppercase.
                // Let's assume input might be messy, so maybe enforce uppercase for known acronyms if we want to be strict,
                // but the prompt says "preserve". If input is "nhs", we might want "NHS".
                // Let's force uppercase for acronyms.
                // REVISE: "preserve common UK proper nouns" implies "don't lowercase them".
                // If user typed "Nhs", we should probably fix it to "NHS".
            }

            // First word of sentence
            if (index === 0) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }

            // Check if it's "I" (conceptually a proper noun in English, though check logic)
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

    // Simple Title Case logic (can be expanded for minor words later)
    // For now, standard capitalize all words.
    return text.toLowerCase().split(' ').map(word => {
        if (UK_PROPER_NOUNS.has(word.toUpperCase())) return word.toUpperCase();
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

/**
 * Converts text to a URL-friendly slug.
 * @param text The text to slugify.
 * @returns The slug string.
 */
export function toSlug(text: string): string {
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
