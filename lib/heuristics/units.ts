import { HeuristicProcessor } from "./types";
import unitsData from "@/data/dictionaries/heuristics/units.json";

// Heuristic #10: Scientific Units
// We map lowercase keys to their Enforced Case.
const unitsMap = new Map<string, string>(unitsData.units as [string, string][]);

export const processUnits: HeuristicProcessor = (currentWord, i, words, splitPunctuation) => {
    const p = splitPunctuation(currentWord);
    const lowerKey = p.word.toLowerCase();

    // 1. Direct Match (Space already exists)
    if (unitsMap.has(lowerKey)) {
        const correct = unitsMap.get(lowerKey)!;
        return {
            consumed: 1,
            processedWords: [`${p.prefix}${correct}${p.suffix}`],
        };
    }

    // 2. Attached Unit Check (e.g. "100kg" -> "100 kg")
    // Regex matches: Numbers (int/float) + Letters/Slashes
    const match = lowerKey.match(/^(\d+(?:\.\d+)?)([a-z/]+)$/);
    if (match) {
        const numberPart = match[1];
        const unitPart = match[2];

        if (unitsMap.has(unitPart)) {
            const correctUnit = unitsMap.get(unitPart)!;
            // Return as TWO tokens. Text-utils joins with space.
            // Attach prefix to number, suffix to unit.
            return {
                consumed: 1,
                processedWords: [`${p.prefix}${numberPart}`, `${correctUnit}${p.suffix}`],
            };
        }
    }

    // 3. Special Case: Amps ("13a" -> "13 A")
    // We do NOT put "a" in the dictionary because "A" is the article "A" in titles,
    // but here we deal with *attached* units or numeric context.
    const attachedAmpsMatch = lowerKey.match(/^(\d+(?:\.\d+)?)(a)$/);
    if (attachedAmpsMatch) {
        const val = attachedAmpsMatch[1];
        return {
            consumed: 1,
            processedWords: [`${p.prefix}${val}`, `A${p.suffix}`],
        };
    }

    // Standalone "a" (13 a -> 13 A)
    // Only if previous word was a number
    if (lowerKey === "a" && i > 0) {
        const prevP = splitPunctuation(words[i - 1]);
        if (/^\d+(?:\.\d+)?$/.test(prevP.word)) {
            return {
                consumed: 1,
                processedWords: [`${p.prefix}A${p.suffix}`],
            };
        }
    }

    return null;
};
