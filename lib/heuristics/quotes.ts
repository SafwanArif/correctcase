import { HeuristicProcessor } from './types';
import structureData from '@/data/dictionaries/heuristics/structure.json';

// Heuristic #8: Direct Speech (Quotes)
const quoteChars = new Set(structureData.quoteChars);
const triggers = new Set(structureData.quoteTriggers);

export const processQuotes: HeuristicProcessor = (currentWord, i, words, splitPunctuation) => {
    // 1. Check if current word has a quote prefix
    const p = splitPunctuation(currentWord);

    // We need to check the raw prefix for quote marks
    // p.prefix might be `"` or `("` or `“`
    let hasQuote = false;
    for (const char of p.prefix) {
        if (quoteChars.has(char)) {
            hasQuote = true;
            break;
        }
    }

    if (!hasQuote) return null;

    // 2. Check Preceding Context
    // If i=0, it's the start of the file/line -> Capitalize (Default rule handles this usually, but we can force it).
    if (i === 0) {
        // Let default first-word rule handle it? 
        // Or consume it here to be safe and explicit.
        const capitalized = p.word.charAt(0).toUpperCase() + p.word.slice(1).toLowerCase();
        return {
            consumed: 1,
            processedWords: [`${p.prefix}${capitalized}${p.suffix}`]
        };
    }

    // Check words[i-1] for ending punctuation
    // usage: He said, "We...
    // words[i-1] is "said,"
    const prev = words[i - 1];
    const lastChar = prev.slice(-1);

    if (triggers.has(lastChar)) {
        // It is Direct Speech
        const capitalized = p.word.charAt(0).toUpperCase() + p.word.slice(1).toLowerCase();
        return {
            consumed: 1,
            processedWords: [`${p.prefix}${capitalized}${p.suffix}`]
        };
    }

    // Explicitly Lowercase inline quotes?
    // "I call it 'the end'." -> "the" should be lower.
    // If we return NULL, default logic might capitalize it if it's a Proper Noun (good).
    // If it's generic, default logic lowercases it (good).
    // So we only need to interfere if we want to FORCE CAP.

    return null;
};
