import { COMPOUNDS_LOOKUP_MAP } from "@/lib/dictionaries";
import { HeuristicProcessor } from "./types";

// Heuristic #0: Compound Words & Lookahead
// Checks if current + next words form a known compound (e.g., "Smart LED", "North-East").
// If matched, returns the dictionary-defined capitalization.

export const processCompounds: HeuristicProcessor = (currentWord, i, words, splitPunctuation) => {
    // We only look ahead up to 3 words for performance/sanity
    // Most compounds are 2 words (bigrams)
    const MAX_LOOKAHEAD = 3;

    // Fast fail: if current word isn't the start of ANY compound (optimization todo)
    // For now, we build the candidates on the fly.

    let bestMatch: { consumed: number; text: string } | null = null;

    // Try largest matches first (greedy)
    for (let len = 0; len < MAX_LOOKAHEAD; len++) {
        if (i + len >= words.length) break;

        const slice = words.slice(i, i + len + 1);

        // We need to strip punctuation from the *edges* of the compound,
        // but preserve internal punctuation if the compound has it?
        // Actually, our dictionary usually keys "pure" words or hyphenated words.
        // "Smart LED." -> "Smart LED" + "."

        // Let's assume the dictionary contains "Smart LED".
        // Use splitPunctuation on the first and last word to isolate the core phrase.
        const firstP = splitPunctuation(slice[0]);
        const lastP = splitPunctuation(slice[len]);

        // Construct the candidate core string
        let core = firstP.word;
        if (len > 0) {
            // Middle words are taken as-is (assuming no internal punctuation besides hyphens/spaces)
            // But we should probably use the raw words for the middle?
            // "Smart LED" -> ["Smart", "LED"]

            const middle = slice.slice(1, len).map((w) => w);
            // The last word also needs stripped punctuation
            core += " " + middle.join(" ") + (middle.length > 0 ? " " : "") + lastP.word;
        }

        const lowerKey = core.toLowerCase();

        if (COMPOUNDS_LOOKUP_MAP.has(lowerKey)) {
            const definedCasing = COMPOUNDS_LOOKUP_MAP.get(lowerKey)!;

            // Re-assemble with punctuation
            // Note: If the dictionary entry is "North-East", we accept "north-east" or "North East" or "north east"
            // Wait, if the input is "north east" (2 words), we form "north east".
            // If the dictionary has "North-East" (hyphenated), "north east" (space) WON'T MATCH unless we handle variations.
            // Our dictionary has "North-East" and likely "North East" if we want both.
            // For now, strict matching on the separator (space vs hyphen) is safer.

            bestMatch = {
                consumed: len + 1, // Consumed N words
                text: `${firstP.prefix}${definedCasing}${lastP.suffix}`,
            };
            // Keep searching for longer matches?
            // "New York" vs "New York City". "New York City" is longer and should win.
            // So we don't break, we update bestMatch and continue.
        }
    }

    if (bestMatch) {
        return {
            consumed: bestMatch.consumed,
            processedWords: [bestMatch.text],
        };
    }

    return null;
};
