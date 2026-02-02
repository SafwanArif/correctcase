/**
 * CorrectCase Text Utilities.
 *
 * Contains pure functions for text manipulation.
 * Strict British English conventions used in code comments and implementation.
 */

import {
    globalCompoundWords,
    phrasalVerbRoots,
    sentenceCaseExceptionsMap,
    usMinorWords,
} from "@/lib/dictionaries";
import { processCompounds } from "./heuristics/compounds";
import { processDirectionals } from "./heuristics/directionals";
import { processExceptions } from "./heuristics/exceptions";
import { processHonorifics } from "./heuristics/honorifics";
import { processHyphens } from "./heuristics/hyphens";
import { processPronouns } from "./heuristics/pronouns";
import { processQuotes } from "./heuristics/quotes";
import { processStructure } from "./heuristics/structure";
import { processUnits } from "./heuristics/units";

// --- CONSTANTS & REGEX (Hoisted for Performance) ---
const punctuationRegex =
    /^([^\w&+-]*)([\w&+-].*[\w&+-]|[\w&+-])([^\w&+-]*)$/;
// Actually lint said SENTENCE_SPLIT_REGEX must be camelCase.
const sentenceSplitRegex = /([.!?]+\s+)/;

const splitPunctuation = (str: string) => {
    const match = str.match(punctuationRegex);

    if (!match) { return { prefix: str, word: "", suffix: "" }; }

    return { prefix: match[1], word: match[2], suffix: match[3] };
};

/**
 * Helper: Process text line-by-line.
 */
const processByLine = (text: string, processor: (line: string) => string): string => {
    if (!text) { return ""; }
    // 2026 Security: Cap input processing to prevent ReDoS on massive payloads
    if (text.length > 500000) { return `${text.slice(0, 500000)}... (Truncated)`; }

    return text
        .split("\n")
        .map((line) => {
            if (!line.trim()) { return line; }

            return processor(line);
        })
        .join("\n");
}

/**
 * Converts text to Sentence case using Modular Heuristics.
 *
 * @param text - The input text to normalise.
 * @returns The text in Sentence case.
 */
export const toSentenceCase = (text: string): string => {
    return processByLine(text, (line) => {
        const sentences = line.split(sentenceSplitRegex);

        return sentences
            .map((part) => {
                if (/^[.!?]+\s+$/.test(part)) { return part; }
                if (!part.trim()) { return part; }

                const words = part.split(/\s+/);
                const processedWords: string[] = [];

                let i = 0;

                while (i < words.length) {
                    const current = words[i];
                    const p = splitPunctuation(current);
                    const lowerKey = p.word.toLowerCase();

                    // --- 0. COMPOUNDS & LOOKAHEAD (Smart LED, North-East) ---
                    // Must run first to "eat" multi-word tokens before other rules break them.
                    const compoundResult = processCompounds(current, i, words, splitPunctuation);

                    if (compoundResult) {
                        processedWords.push(...compoundResult.processedWords);
                        i = i + compoundResult.consumed;
                        continue;
                    }

                    // --- 1. HONORIFICS HEURISTICS (Priority: High - affects Structure) ---
                    // "Aunt Sarah" -> Must run before Exceptions/FirstWord consumes "Aunt".
                    const honorificResult = processHonorifics(current, i, words, splitPunctuation);

                    if (honorificResult) {
                        processedWords.push(...honorificResult.processedWords);
                        i = i + honorificResult.consumed;
                        continue;
                    }

                    // --- 2. EXCEPTIONS & LOOKAHEAD (Dictionary Matches) ---
                    const exceptionResult = processExceptions(current, i, words, splitPunctuation);

                    if (exceptionResult) {
                        processedWords.push(...exceptionResult.processedWords);
                        i = i + exceptionResult.consumed;
                        continue;
                    }

                    // --- 2.5. SCIENTIFIC UNITS (pH, MHz) ---
                    const unitsResult = processUnits(current, i, words, splitPunctuation);

                    if (unitsResult) {
                        processedWords.push(...unitsResult.processedWords);
                        i = i + unitsResult.consumed;
                        continue;
                    }

                    // --- 2.7. HYPHENS (Partial Match) ---
                    const hyphenResult = processHyphens(current, i, words, splitPunctuation);

                    if (hyphenResult) {
                        processedWords.push(...hyphenResult.processedWords);
                        i = i + hyphenResult.consumed;
                        continue;
                    }

                    // --- 3. QUOTES (Direct Speech) ---
                    const quoteResult = processQuotes(current, i, words, splitPunctuation);

                    if (quoteResult) {
                        processedWords.push(...quoteResult.processedWords);
                        i = i + quoteResult.consumed;
                        continue;
                    }

                    // --- 4. STRUCTURE (Bullets & Labels) ---
                    const structureResult = processStructure(current, i, words, splitPunctuation);

                    if (structureResult) {
                        processedWords.push(...structureResult.processedWords);
                        i = i + structureResult.consumed;
                        continue;
                    }

                    // --- 5. FIRST WORD RULE ---
                    if (i === 0) {
                        const capitalized =
                            p.word.charAt(0).toUpperCase() + p.word.slice(1).toLowerCase();

                        processedWords.push(`${p.prefix}${capitalized}${p.suffix}`);
                        i = i + 1;
                        continue;
                    }

                    // --- 6. PRONOUNS (I) ---
                    const pronounResult = processPronouns(current, i, words, splitPunctuation);

                    if (pronounResult) {
                        processedWords.push(...pronounResult.processedWords);
                        i = i + pronounResult.consumed;
                        continue;
                    }

                    // --- 5. DIRECTIONALS HEURISTIC ---
                    const directionalResult = processDirectionals(
                        current,
                        i,
                        words,
                        splitPunctuation
                    );

                    if (directionalResult) {
                        processedWords.push(...directionalResult.processedWords);
                        i = i + directionalResult.consumed;
                        continue;
                    }

                    // --- DEFAULT FALLBACK ---
                    processedWords.push(`${p.prefix}${lowerKey}${p.suffix}`);
                    i = i + 1;
                }

                return processedWords.join(" ");
            })
            .join("");
    });
}

/**
 * Converts text to Title Case (US Smart Style).
 */
export const toTitleCase = (text: string): string => {
    return processByLine(text, (line) => {
        const words = line.split(/\s+/);

        return words
            .map((word, index) => {
                const lowerVal = word.toLowerCase();

                if (lowerVal === "i") { return "I"; }
                const exceptionMatch = sentenceCaseExceptionsMap.get(lowerVal);

                if (exceptionMatch) { return exceptionMatch; }

                if (index === 0 || index === words.length - 1) {
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }

                if (index > 0) {
                    const prevWord = words[index - 1].toLowerCase();
                    let stem = prevWord;

                    // Simple stripping for phrasal verb check
                    if (stem.endsWith("ing")) {
                        const rawStem = prevWord.slice(0, -3);

                        if (phrasalVerbRoots.has(rawStem)) { stem = rawStem; }
                        else if (phrasalVerbRoots.has(rawStem.slice(0, -1))) { stem = rawStem.slice(0, -1); }
                    }

                    if (phrasalVerbRoots.has(stem) || phrasalVerbRoots.has(prevWord)) {
                        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                    }
                }

                if (usMinorWords.has(lowerVal)) { return lowerVal; }

                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(" ");
    });
}

interface HyphenatedOptions {
    preservePunctuation?: boolean;
}

/**
 * Converts text to a URL-friendly hyphenated format (formerly "Slug").
 */
export const toHyphenated = (text: string, { preservePunctuation = false }: HyphenatedOptions = {}): string => {
    if (!text) { return ""; }
    let processed = text.toLowerCase().trim();

    if (preservePunctuation) {
        processed = processed
            .replaceAll(/[^\w\s!?,.:;'"()-]/g, "")
            .replaceAll(/[\s_]+/g, "-")
            .replaceAll(/^-+|-+$/g, "");
    } else {
        processed = processed
            .replaceAll(/[^\w\s-]/g, "")
            .replaceAll(/[\s_-]+/g, "-")
            .replaceAll(/^-+|-+$/g, "");
    }

    return processed;
}

export const isHyphenated = (text: string): boolean => {
    if (!text.trim()) { return false; }

    return text.includes("-") && !/\s/.test(text.trim());
}

export const countWords = (text: string): number => {
    if (!text.trim()) { return 0; }

    return text.trim().split(/\s+/).length;
}

export const countCharacters = (text: string): number =>
    text.length


/**
 * Smartly recovers text from a hyphenated string, preserving known compound words.
 */
export const smartUnhyphenate = (text: string): string => {
    if (!text) { return ""; }
    const parts = text.split("-");
    const recoveredParts: string[] = [];
    let i = 0;

    while (i < parts.length) {
        const current = parts[i].toLowerCase();

        // 4-word
        if (i < parts.length - 3) {
            const candidate =
                `${current}-${parts[i + 1]}-${parts[i + 2]}-${parts[i + 3]}`.toLowerCase();

            if (globalCompoundWords.has(candidate)) {
                recoveredParts.push(candidate);
                i = i + 4;
                continue;
            }
        }
        // 3-word
        if (i < parts.length - 2) {
            const candidate = `${current}-${parts[i + 1]}-${parts[i + 2]}`.toLowerCase();

            if (globalCompoundWords.has(candidate)) {
                recoveredParts.push(candidate);
                i = i + 3;
                continue;
            }
        }
        // 2-word
        if (i < parts.length - 1) {
            const candidate = `${current}-${parts[i + 1]}`.toLowerCase();

            if (globalCompoundWords.has(candidate)) {
                recoveredParts.push(candidate);
                i = i + 2;
                continue;
            }
        }
        recoveredParts.push(current);
        i = i + 1;
    }

    return toSentenceCase(recoveredParts.join(" "));
}
