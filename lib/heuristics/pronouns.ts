import { HeuristicProcessor } from "./types";
import structureData from "@/data/dictionaries/heuristics/structure.json";

const pronouns = new Set(structureData.pronouns); // "i"

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
