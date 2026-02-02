/**
 * Heuristics Interface
 * Defines the standard contract for any text processing rule.
 */

// Helper Type for Punctuation Splitter logic
export interface PunctuationPart { prefix: string; word: string; suffix: string }
export type SplitPunctuationFn = (str: string) => PunctuationPart;

export type HeuristicResult = {
    /**
     * The output words (e.g. ["Ms", "Smith"]).
     */
    processedWords: string[]; 
    /**
     * How many input words were consumed (e.g. 2).
     */
    consumed: number; 
} | null;

export type HeuristicProcessor = (
    currentWord: string,
    index: number,
    words: string[],
    splitPunctuation: SplitPunctuationFn
) => HeuristicResult;
