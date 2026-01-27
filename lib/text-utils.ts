/**
 * CorrectCase Text Utilities
 * 
 * Contains pure functions for text manipulation.
 * Strict British English conventions used in code comments and implementation.
 */

import { GLOBAL_COMPOUND_WORDS, SENTENCE_CASE_EXCEPTIONS_MAP, US_MINOR_WORDS, PHRASAL_VERB_ROOTS } from '@/lib/dictionaries';

// Helper: Process text line-by-line
function processByLine(text: string, processor: (line: string) => string): string {
    if (!text) return '';
    // Split by newlines, process each line, join back
    return text.split('\n').map(line => {
        // If line is empty or just whitespace, preserve it
        if (!line.trim()) return line;
        return processor(line);
    }).join('\n');
}

/**
 * Converts text to Sentence case, preserving common UK acronyms.
 * @param text The input text to normalise.
 * @returns The text in Sentence case.
 */
export function toSentenceCase(text: string): string {
    // Helper to escape regex special characters
    const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Pre-compute multi-word exceptions if possible, or iterate map efficiently.
    // For performance, we might want to cache this list, but doing it inside the function for safety now.
    // Filter map keys for ones containing spaces.
    const multiWordExceptions: string[] = [];
    SENTENCE_CASE_EXCEPTIONS_MAP.forEach((_, key) => {
        if (key.includes(' ')) {
            multiWordExceptions.push(key);
        }
    });

    // Sort by length (descending) to match longest phrases first ("New York City" before "New York")
    multiWordExceptions.sort((a, b) => b.length - a.length);

    return processByLine(text, (line) => {
        const sentences = line.split(/([.!?]+[\s]+)/);

        return sentences.map(part => {
            // If it's just punctuation/whitespace, return as is
            if (/^[.!?]+[\s]+$/.test(part)) return part;
            if (!part.trim()) return part;

            // --- STEP 0: Multi-Word Replacement Strategy ---
            // We can't rely on word-by-word tokenization for "New York".
            // We will identify these phrases in the raw string and temporarily "protect" them
            // OR, just replace them with their Correct Case version now, and verify they aren't clobbered later?
            // If we replace "new york" -> "New York", the later word split might re-lowercase them?
            // "New" -> index 0? -> TitleCase.
            // "York" -> index 1? -> lowercase?
            // Yes, the word loop logic `.toLowerCase()` default will clobber it unless we handle it.

            // Protected Tokens Strategy:
            // 1. Find matches, replace with a placeholder OR standard format?
            // 2. Tokenize.
            // 3. If token matches a known Proper Compound, preserve it.

            // SIMPLER: Use the existing logic but check `SENTENCE_CASE_EXCEPTIONS_MAP` against *combined words*?
            // No, standard split destroys context.

            // BEST: Pre-process the sentence to apply correct casing for multi-words,
            // then when splitting, check if the word looks "Already Capitalized" and trust it?
            // But valid sentence case SHOULD lowercase things that are mistakenly capitalized.

            // Let's use a "Placeholder" approach for Multi-words.
            // OR: A robust "Tokenize with Compounds" approach.

            // Let's try to match multi-word exceptions in the `part` string
            // and replace them with their Correct Cased versions, 
            // BUT we need to ensure the subsequent loop respects them.

            // Actually, let's keep the split logic but LOOK AHEAD.
            // Similar to 'smartUnhyphenate'.

            const words = part.split(/\s+/);
            const processedWords: string[] = [];

            // Helper to separate punctuation from word
            const splitPunctuation = (str: string) => {
                const match = str.match(/^([^a-zA-Z0-9]*)(.*?)([^a-zA-Z0-9]*)$/);
                if (!match) return { prefix: '', word: str, suffix: '' };
                return { prefix: match[1], word: match[2], suffix: match[3] };
            };

            let i = 0;
            while (i < words.length) {
                const current = words[i];

                // --- Lookahead for 3 words ---
                if (i < words.length - 2) {
                    const p1 = splitPunctuation(words[i]);
                    const p2 = splitPunctuation(words[i + 1]);
                    const p3 = splitPunctuation(words[i + 2]);

                    const key3 = `${p1.word} ${p2.word} ${p3.word}`.toLowerCase();

                    if (SENTENCE_CASE_EXCEPTIONS_MAP.has(key3)) {
                        const correct = SENTENCE_CASE_EXCEPTIONS_MAP.get(key3)!;
                        // Re-attach punctuation: prefix of first, suffix of last
                        processedWords.push(`${p1.prefix}${correct}${p3.suffix}`);
                        i += 3;
                        continue;
                    }
                }

                // --- Lookahead for 2 words ---
                if (i < words.length - 1) {
                    const p1 = splitPunctuation(words[i]);
                    const p2 = splitPunctuation(words[i + 1]);

                    const key2 = `${p1.word} ${p2.word}`.toLowerCase();

                    if (SENTENCE_CASE_EXCEPTIONS_MAP.has(key2)) {
                        const correct = SENTENCE_CASE_EXCEPTIONS_MAP.get(key2)!;
                        processedWords.push(`${p1.prefix}${correct}${p2.suffix}`);
                        i += 2;
                        continue;
                    }
                }

                // --- Single Word ---
                const p = splitPunctuation(current);
                const lowerKey = p.word.toLowerCase();

                if (SENTENCE_CASE_EXCEPTIONS_MAP.has(lowerKey)) {
                    const correct = SENTENCE_CASE_EXCEPTIONS_MAP.get(lowerKey)!;
                    processedWords.push(`${p.prefix}${correct}${p.suffix}`);
                    i++;
                    continue;
                }

                // Capitalize First Word (ignore punctuation for check, but capitalize the word part)
                if (i === 0) {
                    const capitalized = p.word.charAt(0).toUpperCase() + p.word.slice(1).toLowerCase();
                    processedWords.push(`${p.prefix}${capitalized}${p.suffix}`);
                    i++;
                    continue;
                }

                // "I" Check
                if (lowerKey === 'i') {
                    processedWords.push(`${p.prefix}I${p.suffix}`);
                    i++;
                    continue;
                }

                // Default Lowercase
                processedWords.push(`${p.prefix}${p.word.toLowerCase()}${p.suffix}`);
                i++;
            }

            return processedWords.join(' ');

        }).join('');
    });
}

/**
 * Converts text to Title Case (US Smart Style).
 * - Capitalizes principal words.
 * - Lowercases minor words (articles, conjunctions, prepositions) unless first/last.
 * - Preserves Acronyms.
 * @param text The text to convert.
 * @returns The text in Title Case.
 */
export function toTitleCase(text: string): string {
    return processByLine(text, (line) => {
        const words = line.split(/\s+/);

        return words.map((word, index) => {
            const lowerVal = word.toLowerCase();

            // 0. Pronoun 'I' Check (Always Capitalize)
            if (lowerVal === 'i') return 'I';

            // 1. Acronym/Exception Check (Priority)
            if (SENTENCE_CASE_EXCEPTIONS_MAP.has(lowerVal)) {
                return SENTENCE_CASE_EXCEPTIONS_MAP.get(lowerVal)!;
            }

            // 2. First or Last Word Check -> Always Capitalize
            if (index === 0 || index === words.length - 1) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }

            // 3. Phrasal Verb Heuristic (Grammar Check)
            // If this is a minor word, BUT the previous word was an "Action Verb",
            // treated it as a Particle (Capitalize).
            // E.g. "Logging [On]" -> "Log" implies "On" is active.
            if (index > 0) {
                // Get stem of previous word (remove 'ing', 'ed', 's')?
                // For simplicity/speed, we check if the previous word starts with a Root.
                // "Logging" starts with "Log". "Stepped" starts with "Step".
                const prevWord = words[index - 1].toLowerCase();
                // Simple heuristic: Does prevWord START with any of our roots?
                // This covers: Log, Logging, Logged, Logs.
                // We iterate our set (fast for small set, or we can optimize).
                // Optimization: Just strip common suffixes.
                let stem = prevWord;
                if (stem.endsWith('ing')) stem = stem.slice(0, -3);
                else if (stem.endsWith('ed')) stem = stem.slice(0, -2);
                else if (stem.endsWith('s') && !stem.endsWith('ss')) stem = stem.slice(0, -1);

                // Double letter handling (Logg-ing -> Log) is hard statically.
                // Instead, let's just use strict includes or a rough check.
                // Actually, simpler: "Is the previous word an Action Verb?"
                // Let's rely on the Set.

                // Better approach for stability:
                // Check exact matches or simple "starts with" for known irregularities is risky.
                // Let's just strip 'ing' and check.
                if (prevWord.endsWith('ing')) {
                    const rawStem = prevWord.slice(0, -3); // logg
                    // Handle 'logging' -> 'log'
                    if (PHRASAL_VERB_ROOTS.has(rawStem)) stem = rawStem;
                    else if (PHRASAL_VERB_ROOTS.has(rawStem.slice(0, -1))) stem = rawStem.slice(0, -1);
                }

                if (PHRASAL_VERB_ROOTS.has(stem) || PHRASAL_VERB_ROOTS.has(prevWord)) {
                    // Check if current word is a likely particle (up, down, in, on, off, out, over, to, with)
                    // Most minor words ARE particles.
                    // So we capitalize.
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }
            }

            // 4. Minor Word Check -> Lowercase
            if (US_MINOR_WORDS.has(lowerVal)) {
                return lowerVal;
            }

            // 5. Default -> Title Case
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    });
}

/**
 * Converts text to a URL-friendly hyphenated format (formerly "Slug").
 * @param text The text to format.
 * @param preservePunctuation If true, retains punctuation like ?, !, ., etc.
 * @returns The hyphenated string.
 */
export function toHyphenated(text: string, preservePunctuation: boolean = false): string {
    if (!text) return '';

    let processed = text.toLowerCase().trim();

    if (preservePunctuation) {
        // Allow word chars, spaces, hyphens AND common punctuation
        processed = processed
            .replace(/[^\w\s\-!?,.:;'"()]/g, '') // Keep basic punctuation
            .replace(/[\s_]+/g, '-')              // Replace spaces/underscores with hyphens
            .replace(/^-+|-+$/g, '');             // Trim start/end hyphens
    } else {
        // Strict URL safe (Standard)
        processed = processed
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
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
    // Check if it has hyphens and NO spaces
    return text.includes('-') && !/\s/.test(text.trim());
}

/**
 * Smartly recovers text from a hyphenated string, preserving known compound words.
 * Uses a greedy approach to find longest matches first (up to 3 words).
 * @param text The hyphenated text (e.g. "mother-in-law-visits").
 * @returns The recovered sentence (e.g. "Mother-in-law visits").
 */
export function smartUnhyphenate(text: string): string {
    if (!text) return '';

    const parts = text.split('-');
    const recoveredParts: string[] = [];

    let i = 0;
    while (i < parts.length) {
        const current = parts[i].toLowerCase();

        // 1. Try 4-word compound (e.g. state-of-the-art)
        if (i < parts.length - 3) {
            const next1 = parts[i + 1].toLowerCase();
            const next2 = parts[i + 2].toLowerCase();
            const next3 = parts[i + 3].toLowerCase();
            const quadCandidate = `${current}-${next1}-${next2}-${next3}`;

            if (GLOBAL_COMPOUND_WORDS.has(quadCandidate)) {
                recoveredParts.push(quadCandidate);
                i += 4;
                continue;
            }
        }

        // 2. Try 3-word compound (e.g. father-in-law)
        if (i < parts.length - 2) {
            const next1 = parts[i + 1].toLowerCase();
            const next2 = parts[i + 2].toLowerCase();
            const tripleCandidate = `${current}-${next1}-${next2}`;

            if (GLOBAL_COMPOUND_WORDS.has(tripleCandidate)) {
                recoveredParts.push(tripleCandidate);
                i += 3;
                continue;
            }
        }

        // 2. Try 2-word compound (e.g. well-being)
        if (i < parts.length - 1) {
            const next = parts[i + 1].toLowerCase();
            const doubleCandidate = `${current}-${next}`;

            if (GLOBAL_COMPOUND_WORDS.has(doubleCandidate)) {
                recoveredParts.push(doubleCandidate);
                i += 2;
                continue;
            }
        }

        // 3. No compound match, just use the word
        recoveredParts.push(current);
        i++;
    }



    // Join with spaces and apply Sentence Case
    const rawSentence = recoveredParts.join(' ');
    // Handle special case where user might want to re-hyphenate a sentence that was just unhyphenated?
    // No, unhyphenate is strictly Slug -> Sentence with compounds.
    return toSentenceCase(rawSentence);
}
