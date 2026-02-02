import directionalsData from "@/data/dictionaries/heuristics/directionals.json";
import { sentenceCaseExceptionsMap } from "@/lib/dictionaries";
import type { HeuristicProcessor } from "./types";

// Capitalize 'North', 'West', 'River', etc. if followed immediately by a Proper Noun.
const classifiers = new Set(directionalsData.classifiers);

export const processDirectionals: HeuristicProcessor = (
    currentWord,
    i,
    words,
    splitPunctuation
) => {
    const p = splitPunctuation(currentWord);
    const lowerKey = p.word.toLowerCase();

    if (!classifiers.has(lowerKey)) {
        return null;
    }

    let shouldCapitalize = false;

    // A. Direct Neighbor Check (e.g. "West London")
    if (i < words.length - 1) {
        const nextP = splitPunctuation(words[i + 1]);
        let nextKey = nextP.word.toLowerCase();

        if (nextKey.endsWith("'s")) { nextKey = nextKey.slice(0, -2); }

        if (sentenceCaseExceptionsMap.has(nextKey)) {
            shouldCapitalize = true;
        }
    }

    // B. "Of" Check (e.g. "South of France", "North of the Thames")
    // Capitalize direction if it refers to a specific Proper Noun region.
    if (!shouldCapitalize && i < words.length - 2) {
        const nextP = splitPunctuation(words[i + 1]);

        if (nextP.word.toLowerCase() === "of") {
            const targetP = splitPunctuation(words[i + 2]);
            const targetKey = targetP.word.toLowerCase();

            // Check "Direction of Proper"
            if (sentenceCaseExceptionsMap.has(targetKey)) {
                shouldCapitalize = true;
            }
            // Check "Direction of the Proper"
            else if (targetKey === "the" && i < words.length - 3) {
                const deepTargetP = splitPunctuation(words[i + 3]);
                const deepKey = deepTargetP.word.toLowerCase();

                if (sentenceCaseExceptionsMap.has(deepKey)) {
                    shouldCapitalize = true;
                }
            }
        }
    }

    if (shouldCapitalize) {
        const capitalized = p.word.charAt(0).toUpperCase() + p.word.slice(1).toLowerCase();

        return {
            consumed: 1,
            processedWords: [`${p.prefix}${capitalized}${p.suffix}`],
        };
    }

    return null;
};
