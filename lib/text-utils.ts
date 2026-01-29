/**
 * CorrectCase Text Utilities
 * 
 * Contains pure functions for text manipulation.
 * Strict British English conventions used in code comments and implementation.
 */

import { GLOBAL_COMPOUND_WORDS, SENTENCE_CASE_EXCEPTIONS_MAP, US_MINOR_WORDS, PHRASAL_VERB_ROOTS } from '@/lib/dictionaries';
import { processHonorifics } from './heuristics/honorifics';
import { processDirectionals } from './heuristics/directionals';
import { processExceptions } from './heuristics/exceptions';
import { processQuotes } from './heuristics/quotes';
import { processStructure } from './heuristics/structure';
import { processUnits } from './heuristics/units';
import { processHyphens } from './heuristics/hyphens';
import { processPronouns } from './heuristics/pronouns';

// Helper: Process text line-by-line
function processByLine(text: string, processor: (line: string) => string): string {
    if (!text) return '';
    return text.split('\n').map(line => {
        if (!line.trim()) return line;
        return processor(line);
    }).join('\n');
}

/**
 * Converts text to Sentence case using Modular Heuristics.
 * @param text The input text to normalise.
 * @returns The text in Sentence case.
 */
export function toSentenceCase(text: string): string {
    return processByLine(text, (line) => {
        const sentences = line.split(/([.!?]+[\s]+)/);

        return sentences.map(part => {
            if (/^[.!?]+[\s]+$/.test(part)) return part;
            if (!part.trim()) return part;

            const words = part.split(/\s+/);
            const processedWords: string[] = [];

            const splitPunctuation = (str: string) => {
                const match = str.match(/^([^a-zA-Z0-9&+\-_]*)([a-zA-Z0-9&+\-_].*[a-zA-Z0-9&+\-_]|[a-zA-Z0-9&+\-_])([^a-zA-Z0-9&+\-_]*)$/);
                if (!match) return { prefix: str, word: '', suffix: '' };
                return { prefix: match[1], word: match[2], suffix: match[3] };
            };

            let i = 0;
            while (i < words.length) {
                const current = words[i];
                const p = splitPunctuation(current);
                const lowerKey = p.word.toLowerCase();

                // --- 1. HONORIFICS HEURISTICS (Priority: High - affects Structure) ---
                // "Aunt Sarah" -> Must run before Exceptions/FirstWord consumes "Aunt".
                const honorificResult = processHonorifics(current, i, words, splitPunctuation);
                if (honorificResult) {
                    processedWords.push(...honorificResult.processedWords);
                    i += honorificResult.consumed;
                    continue;
                }

                // --- 2. EXCEPTIONS & LOOKAHEAD (Dictionary Matches) ---
                const exceptionResult = processExceptions(current, i, words, splitPunctuation);
                if (exceptionResult) {
                    processedWords.push(...exceptionResult.processedWords);
                    i += exceptionResult.consumed;
                    continue;
                }

                // --- 2.5. SCIENTIFIC UNITS (pH, MHz) ---
                const unitsResult = processUnits(current, i, words, splitPunctuation);
                if (unitsResult) {
                    processedWords.push(...unitsResult.processedWords);
                    i += unitsResult.consumed;
                    continue;
                }

                // --- 2.7. HYPHENS (Partial Match) ---
                const hyphenResult = processHyphens(current, i, words, splitPunctuation);
                if (hyphenResult) {
                    processedWords.push(...hyphenResult.processedWords);
                    i += hyphenResult.consumed;
                    continue;
                }

                // --- 3. QUOTES (Direct Speech) ---
                const quoteResult = processQuotes(current, i, words, splitPunctuation);
                if (quoteResult) {
                    processedWords.push(...quoteResult.processedWords);
                    i += quoteResult.consumed;
                    continue;
                }

                // --- 4. STRUCTURE (Bullets & Labels) ---
                const structureResult = processStructure(current, i, words, splitPunctuation);
                if (structureResult) {
                    processedWords.push(...structureResult.processedWords);
                    i += structureResult.consumed;
                    continue;
                }

                // --- 5. FIRST WORD RULE ---
                if (i === 0) {
                    const capitalized = p.word.charAt(0).toUpperCase() + p.word.slice(1).toLowerCase();
                    processedWords.push(`${p.prefix}${capitalized}${p.suffix}`);
                    i++;
                    continue;
                }

                // --- 6. PRONOUNS (I) ---
                const pronounResult = processPronouns(current, i, words, splitPunctuation);
                if (pronounResult) {
                    processedWords.push(...pronounResult.processedWords);
                    i += pronounResult.consumed;
                    continue;
                }

                // --- 5. DIRECTIONALS HEURISTIC ---
                const directionalResult = processDirectionals(current, i, words, splitPunctuation);
                if (directionalResult) {
                    processedWords.push(...directionalResult.processedWords);
                    i += directionalResult.consumed;
                    continue;
                }

                // --- DEFAULT FALLBACK ---
                processedWords.push(`${p.prefix}${lowerKey}${p.suffix}`);
                i++;
            }

            return processedWords.join(' ');

        }).join('');
    });
}

/**
 * Converts text to Title Case (US Smart Style).
 */
export function toTitleCase(text: string): string {
    return processByLine(text, (line) => {
        const words = line.split(/\s+/);

        return words.map((word, index) => {
            const lowerVal = word.toLowerCase();
            if (lowerVal === 'i') return 'I';
            if (SENTENCE_CASE_EXCEPTIONS_MAP.has(lowerVal)) return SENTENCE_CASE_EXCEPTIONS_MAP.get(lowerVal)!;

            if (index === 0 || index === words.length - 1) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }

            if (index > 0) {
                const prevWord = words[index - 1].toLowerCase();
                let stem = prevWord;
                // Simple stripping for phrasal verb check
                if (stem.endsWith('ing')) {
                    const rawStem = prevWord.slice(0, -3);
                    if (PHRASAL_VERB_ROOTS.has(rawStem)) stem = rawStem;
                    else if (PHRASAL_VERB_ROOTS.has(rawStem.slice(0, -1))) stem = rawStem.slice(0, -1);
                }

                if (PHRASAL_VERB_ROOTS.has(stem) || PHRASAL_VERB_ROOTS.has(prevWord)) {
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }
            }

            if (US_MINOR_WORDS.has(lowerVal)) return lowerVal;

            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    });
}

/**
 * Converts text to a URL-friendly hyphenated format (formerly "Slug").
 */
export function toHyphenated(text: string, preservePunctuation: boolean = false): string {
    if (!text) return '';
    let processed = text.toLowerCase().trim();
    if (preservePunctuation) {
        processed = processed.replace(/[^\w\s\-!?,.:;'"()]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');
    } else {
        processed = processed.replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    }
    return processed;
}

export function countWords(text: string): number {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
}

export function countCharacters(text: string): number {
    return text.length;
}

export function isHyphenated(text: string): boolean {
    if (!text.trim()) return false;
    return text.includes('-') && !/\s/.test(text.trim());
}

/**
 * Smartly recovers text from a hyphenated string, preserving known compound words.
 */
export function smartUnhyphenate(text: string): string {
    if (!text) return '';
    const parts = text.split('-');
    const recoveredParts: string[] = [];
    let i = 0;
    while (i < parts.length) {
        const current = parts[i].toLowerCase();

        // 4-word
        if (i < parts.length - 3) {
            const candidate = `${current}-${parts[i + 1]}-${parts[i + 2]}-${parts[i + 3]}`.toLowerCase();
            if (GLOBAL_COMPOUND_WORDS.has(candidate)) { recoveredParts.push(candidate); i += 4; continue; }
        }
        // 3-word
        if (i < parts.length - 2) {
            const candidate = `${current}-${parts[i + 1]}-${parts[i + 2]}`.toLowerCase();
            if (GLOBAL_COMPOUND_WORDS.has(candidate)) { recoveredParts.push(candidate); i += 3; continue; }
        }
        // 2-word
        if (i < parts.length - 1) {
            const candidate = `${current}-${parts[i + 1]}`.toLowerCase();
            if (GLOBAL_COMPOUND_WORDS.has(candidate)) { recoveredParts.push(candidate); i += 2; continue; }
        }
        recoveredParts.push(current);
        i++;
    }
    return toSentenceCase(recoveredParts.join(' '));
}
