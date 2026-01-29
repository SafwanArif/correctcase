import { HeuristicProcessor } from './types';
import structureData from '@/data/dictionaries/heuristics/structure.json';

// Heuristic #9: Structure (Colons & Bullets)
const bullets = new Set(structureData.bullets);
// Convert string regex to RegExp object
// But wait, JSON contains string. We need new RegExp(str).
// However, the JSON regex was simple logic.
// Original: /^(\d+|[a-zA-Z])(\.|-|\))$/
// Let's just hardcode the Regex construction or store just the string pattern.
// JSON has: "bulletRegex": ["^(\\d+|[a-zA-Z])(\\.|-|\\))$"]
// We can iterate.
const bulletPatterns = structureData.bulletRegex.map(p => new RegExp(p));

export const processStructure: HeuristicProcessor = (currentWord, i, words, splitPunctuation) => {
    if (i === 0) return null; // First word is handled by default rule

    const prev = words[i - 1];

    // 1. Bullet Check
    // If previous word is a bullet marker
    if (bullets.has(prev) || bulletPatterns.some(regex => regex.test(prev))) {
        const p = splitPunctuation(currentWord);
        const capitalized = p.word.charAt(0).toUpperCase() + p.word.slice(1).toLowerCase();
        return {
            consumed: 1,
            processedWords: [`${p.prefix}${capitalized}${p.suffix}`]
        };
    }

    // 2. Label Colon Check
    // e.g. "Name: Safwan"
    // Trigger: Previous word ends in ':' AND (i === 1 OR prev word was capitalized?)
    // To be safe, we only enforce this at the START of a line (Label pattern).
    // i=1 means words[0] was the label.
    if (i === 1 && prev.endsWith(':')) {
        const p = splitPunctuation(currentWord);
        const capitalized = p.word.charAt(0).toUpperCase() + p.word.slice(1).toLowerCase();
        return {
            consumed: 1,
            processedWords: [`${p.prefix}${capitalized}${p.suffix}`]
        };
    }

    return null;
};
