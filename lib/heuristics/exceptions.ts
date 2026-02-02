import { sentenceCaseExceptionsMap } from "@/lib/dictionaries";
import type { HeuristicProcessor } from "./types";

/**
 * Lookahead logic for Multi-word phrases, Possessives, and Dictionary matches.
 */
export const processExceptions: HeuristicProcessor = (currentWord, i, words, splitPunctuation) => {
    // --- Lookahead for 3 words ---
    if (i < words.length - 2) {
        const p1 = splitPunctuation(words[i]);
        const p2 = splitPunctuation(words[i + 1]);
        const p3 = splitPunctuation(words[i + 2]);

        const rawKey = `${p1.word} ${p2.word} ${p3.word}`;
        const key3 = rawKey.toLowerCase();

        if (sentenceCaseExceptionsMap.has(key3)) {
            const correct = sentenceCaseExceptionsMap.get(key3) ?? "";

            return {
                consumed: 3,
                processedWords: [`${p1.prefix}${correct}${p3.suffix}`],
            };
        }

        // Try removing 's from last word (Possessive check)
        if (p3.word.toLowerCase().endsWith("'s")) {
            const base3 = p3.word.slice(0, -2);
            const key3Possessive = `${p1.word} ${p2.word} ${base3}`.toLowerCase();

            if (sentenceCaseExceptionsMap.has(key3Possessive)) {
                const correct = sentenceCaseExceptionsMap.get(key3Possessive) ?? "";

                return {
                    consumed: 3,
                    processedWords: [`${p1.prefix}${correct}'s${p3.suffix}`],
                };
            }
        }
    }

    // --- Lookahead for 2 words ---
    if (i < words.length - 1) {
        const p1 = splitPunctuation(words[i]);
        const p2 = splitPunctuation(words[i + 1]);

        const rawKey = `${p1.word} ${p2.word}`;
        const key2 = rawKey.toLowerCase();

        if (sentenceCaseExceptionsMap.has(key2)) {
            const correct = sentenceCaseExceptionsMap.get(key2) ?? "";

            return {
                consumed: 2,
                processedWords: [`${p1.prefix}${correct}${p2.suffix}`],
            };
        }

        // Possessive Check
        if (p2.word.toLowerCase().endsWith("'s")) {
            const base2 = p2.word.slice(0, -2);
            const key2Possessive = `${p1.word} ${base2}`.toLowerCase();

            if (sentenceCaseExceptionsMap.has(key2Possessive)) {
                const correct = sentenceCaseExceptionsMap.get(key2Possessive) ?? "";

                return {
                    consumed: 2,
                    processedWords: [`${p1.prefix}${correct}'s${p2.suffix}`],
                };
            }
        }
    }

    // --- Single Word ---
    const p = splitPunctuation(currentWord);
    const lowerKey = p.word.toLowerCase();

    // 1. Direct Match
    if (sentenceCaseExceptionsMap.has(lowerKey)) {
        const correct = sentenceCaseExceptionsMap.get(lowerKey) ?? "";

        return {
            consumed: 1,
            processedWords: [`${p.prefix}${correct}${p.suffix}`],
        };
    }

    // 2. Possessive Match (word's -> word)
    if (lowerKey.endsWith("'s")) {
        const baseKey = lowerKey.slice(0, -2);

        if (sentenceCaseExceptionsMap.has(baseKey)) {
            const correct = sentenceCaseExceptionsMap.get(baseKey) ?? "";

            return {
                consumed: 1,
                processedWords: [`${p.prefix}${correct}'s${p.suffix}`],
            };
        }
    }

    // 3. Hyphenated Part Check
    if (lowerKey.includes("-")) {
        const parts = lowerKey.split("-");
        let isModified = false;

        const partsRecovered = [];

        for (const part of parts) {
            if (sentenceCaseExceptionsMap.has(part)) {
                isModified = true;
                partsRecovered.push(sentenceCaseExceptionsMap.get(part) ?? part);
            } else {
                partsRecovered.push(part);
            }
        }

        const isStart = i === 0;

        if (isModified || isStart) {
            const reconstructed = partsRecovered.join("-");
            let final = reconstructed;

            if (isStart) {
                final = final.charAt(0).toUpperCase() + final.slice(1);
            }

            return {
                consumed: 1,
                processedWords: [`${p.prefix}${final}${p.suffix}`],
            };
        }
    }

    return null;
};
