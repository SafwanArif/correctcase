import structureData from "@/data/dictionaries/heuristics/structure.json";
import type { HeuristicProcessor } from "./types";

/**
 * "i".
 */
const pronouns = new Set(structureData.pronouns); 

export const processPronouns: HeuristicProcessor = (currentWord, i, words, splitPunctuation) => {
    const p = splitPunctuation(currentWord);
    const lowerKey = p.word.toLowerCase();

    if (pronouns.has(lowerKey)) {
        return {
            consumed: 1,
            processedWords: [`${p.prefix}I${p.suffix}`],
        };
    }

    return null;
};
