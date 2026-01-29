import { SENTENCE_CASE_EXCEPTIONS_MAP } from '@/lib/dictionaries';
import { HeuristicProcessor } from './types';

// Lookahead logic for Multi-word phrases, Possessives, and Dictionary matches
export const processExceptions: HeuristicProcessor = (currentWord, i, words, splitPunctuation) => {
    // --- Lookahead for 3 words ---
    if (i < words.length - 2) {
        const p1 = splitPunctuation(words[i]);
        const p2 = splitPunctuation(words[i + 1]);
        const p3 = splitPunctuation(words[i + 2]);

        const rawKey = `${p1.word} ${p2.word} ${p3.word}`;
        const key3 = rawKey.toLowerCase();

        if (SENTENCE_CASE_EXCEPTIONS_MAP.has(key3)) {
            const correct = SENTENCE_CASE_EXCEPTIONS_MAP.get(key3)!;
            return {
                consumed: 3,
                processedWords: [`${p1.prefix}${correct}${p3.suffix}`]
            };
        }

        // Try removing 's from last word (Possessive check)
        if (p3.word.toLowerCase().endsWith("'s")) {
            const base3 = p3.word.slice(0, -2);
            const key3Possessive = `${p1.word} ${p2.word} ${base3}`.toLowerCase();
            if (SENTENCE_CASE_EXCEPTIONS_MAP.has(key3Possessive)) {
                const correct = SENTENCE_CASE_EXCEPTIONS_MAP.get(key3Possessive)!;
                return {
                    consumed: 3,
                    processedWords: [`${p1.prefix}${correct}'s${p3.suffix}`]
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

        if (SENTENCE_CASE_EXCEPTIONS_MAP.has(key2)) {
            const correct = SENTENCE_CASE_EXCEPTIONS_MAP.get(key2)!;
            return {
                consumed: 2,
                processedWords: [`${p1.prefix}${correct}${p2.suffix}`]
            };
        }

        // Possessive Check
        if (p2.word.toLowerCase().endsWith("'s")) {
            const base2 = p2.word.slice(0, -2);
            const key2Possessive = `${p1.word} ${base2}`.toLowerCase();
            if (SENTENCE_CASE_EXCEPTIONS_MAP.has(key2Possessive)) {
                const correct = SENTENCE_CASE_EXCEPTIONS_MAP.get(key2Possessive)!;
                return {
                    consumed: 2,
                    processedWords: [`${p1.prefix}${correct}'s${p2.suffix}`]
                };
            }
        }
    }

    // --- Single Word ---
    const p = splitPunctuation(currentWord);
    const lowerKey = p.word.toLowerCase();

    // 1. Direct Match
    if (SENTENCE_CASE_EXCEPTIONS_MAP.has(lowerKey)) {
        const correct = SENTENCE_CASE_EXCEPTIONS_MAP.get(lowerKey)!;
        return {
            consumed: 1,
            processedWords: [`${p.prefix}${correct}${p.suffix}`]
        };
    }

    // 2. Possessive Match (word's -> word)
    if (lowerKey.endsWith("'s")) {
        const baseKey = lowerKey.slice(0, -2);
        if (SENTENCE_CASE_EXCEPTIONS_MAP.has(baseKey)) {
            const correct = SENTENCE_CASE_EXCEPTIONS_MAP.get(baseKey)!;
            return {
                consumed: 1,
                processedWords: [`${p.prefix}${correct}'s${p.suffix}`]
            };
        }
    }

    // 3. Hyphenated Part Check
    if (lowerKey.includes('-')) {
        const parts = lowerKey.split('-');
        let wasModified = false;

        const partsRecovered = parts.map(part => {
            if (SENTENCE_CASE_EXCEPTIONS_MAP.has(part)) {
                wasModified = true;
                return SENTENCE_CASE_EXCEPTIONS_MAP.get(part)!;
            }
            return part;
        });

        if (wasModified || i === 0) {
            const reconstructed = partsRecovered.join('-');
            let final = reconstructed;
            // First word rule logic handled by orchestrator/start-check usually?
            // Actually, if we return it here, we consumed it.
            // If i=0, we should ensure First Letter is capped even if no dict match.
            // But this heuristic is "Exceptions".
            // If we match an exception (e.g. "post-Covid"), we return it.
            // "post-Covid" -> "post-Covid".
            // If i=0 -> "Post-Covid".
            // We should let the orchestrator handle i=0 capitalization if we return lowercase starts?

            // IF we matched a dictionary word, we return that Casing.
            // IF i=0, we must force cap?
            if (i === 0) {
                final = final.charAt(0).toUpperCase() + final.slice(1);
            }

            return {
                consumed: 1,
                processedWords: [`${p.prefix}${final}${p.suffix}`]
            };
        }
    }

    return null;
};
