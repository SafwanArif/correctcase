import { SENTENCE_CASE_EXCEPTIONS_MAP } from "@/lib/dictionaries";
import { HeuristicProcessor } from "./types";

// Heuristic #3: Hyphen Handshake
// Logic: If a word is hyphenated, check each part against the dictionary.
// e.g. "post-covid" -> "post-Covid" (matches "Covid").
// e.g. "un-american" -> "un-American".

export const processHyphens: HeuristicProcessor = (currentWord, i, words, splitPunctuation) => {
    const p = splitPunctuation(currentWord);
    const lowerKey = p.word.toLowerCase();

    if (!lowerKey.includes("-")) {
        return null;
    }

    const parts = lowerKey.split("-");
    let wasModified = false;

    // Check each part against the Exception Map
    const partsRecovered = parts.map((part) => {
        if (SENTENCE_CASE_EXCEPTIONS_MAP.has(part)) {
            wasModified = true;
            return SENTENCE_CASE_EXCEPTIONS_MAP.get(part)!;
        }
        return part;
    });

    if (wasModified || i === 0) {
        // Reconstruct
        const reconstructed = partsRecovered.join("-");
        let final = reconstructed;

        // If it's the start of the sentence (i=0), we MUST capitalize the first letter
        // even if the dictionary match was for the second part (e.g. "post-Covid" -> "Post-Covid").
        if (i === 0) {
            final = final.charAt(0).toUpperCase() + final.slice(1);
        }

        return {
            consumed: 1,
            processedWords: [`${p.prefix}${final}${p.suffix}`],
        };
    }

    return null;
};
