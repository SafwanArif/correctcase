import { sentenceCaseExceptionsMap, usMinorWords } from "@/lib/dictionaries";
import type { HeuristicProcessor } from "./types";

// Capitalize 'President', 'Doctor', 'Aunt', etc. ONLY if followed by a Proper Noun.
const honorifics = new Set([
    "president",
    "vice president",
    "doctor",
    "dr",
    "mr",
    "mrs",
    "miss",
    "ms",
    "mx",
    "professor",
    "prof",
    "aunt",
    "uncle",
    "auntie",
    "sister",
    "father",
    "mother",
    "brother",
    "pope",
    "rabbi",
    "imam",
    "bishop",
    "cardinal",
    "senator",
    "governor",
    "representative",
    "congressman",
    "congresswoman",
    "mp",
    "chancellor",
    "premier",
    "prime minister",
    "minister",
    "ambassador",
    "king",
    "queen",
    "prince",
    "princess",
    "duke",
    "duchess",
    "emperor",
    "empress",
    "general",
    "captain",
    "major",
    "lieutenant",
    "colonel",
    "sergeant",
    "detective",
    "inspector",
    "constable",
]);

const riskyHonorifics = new Set(["will", "mark", "bill", "major"]);
const determiners = new Set([
    "the",
    "a",
    "an",
    "my",
    "our",
    "your",
    "his",
    "her",
    "their",
    "this",
    "that",
    "these",
    "those",
]);
const missBlacklist = new Set(["you", "me", "us", "him", "her", "it", "them", "out", "off", "on"]);
// Words that should NEVER be capitalized by Aggressive logic (prevent "Uncle Is")
const commonVerbs = new Set([
    "is",
    "are",
    "was",
    "were",
    "has",
    "have",
    "had",
    "said",
    "asked",
    "went",
    "did",
    "do",
    "does",
    "can",
    "could",
    "should",
    "would",
    "will",
    "may",
    "might",
    "must",
]);

export const processHonorifics: HeuristicProcessor = (currentWord, i, words, splitPunctuation) => {
    const p = splitPunctuation(currentWord);
    const lowerKey = p.word.toLowerCase();

    if (!honorifics.has(lowerKey) || i >= words.length - 1) {
        return null;
    }

    const nextP = splitPunctuation(words[i + 1]);
    let nextKey = nextP.word.toLowerCase();

    if (nextKey.endsWith("'s")) { nextKey = nextKey.slice(0, -2); }

    // Check Preceding Word (Lookbehind)
    let isPrecededByDeterminer = false;
    /**
     * Specific check for "General".
     */
    let isPrecededByIn = false;

    if (i > 0) {
        const prevP = splitPunctuation(words[i - 1]);
        const prevKey = prevP.word.toLowerCase();

        if (determiners.has(prevKey)) {
            isPrecededByDeterminer = true;
        }
        if (prevKey === "in") {
            isPrecededByIn = true;
        }
    }

    // A. CONSERVATIVE MATCH (Known Proper Noun)
    if (sentenceCaseExceptionsMap.has(nextKey)) {
        const capitalized = p.word.charAt(0).toUpperCase() + p.word.slice(1).toLowerCase();

        return {
            consumed: 1,
            processedWords: [`${p.prefix}${capitalized}${p.suffix}`],
        };
    }

    // B. AGGRESSIVE MATCH (Assumed Name)
    // Application: No Determiner AND Not Risky AND NextWord is not Minor
    if (!isPrecededByDeterminer && !riskyHonorifics.has(lowerKey)) {
        // SPECIAL HANDLER: "General" (in general)
        if (lowerKey === "general" && isPrecededByIn) {
            // "in general" -> lowercase
            // We consume it here to prevent default logic from re-capitalizing it if it was i=0 (unlikely for 'in general', but safe)
            return {
                consumed: 1,
                processedWords: [`${p.prefix}general${p.suffix}`],
            };
        }

        // SPECIAL HANDLER: "Miss" (Verb vs Title)
        // If followed by pronoun OR -ing verb -> It's a Verb (lowercase)
        if (lowerKey === "miss" && (missBlacklist.has(nextKey) || nextKey.endsWith("ing"))) {
            return {
                consumed: 1,
                processedWords: [`${p.prefix}miss${p.suffix}`],
            };
        }

        // SAFETY CHECK: Prevent capitalizing Verbs ("Uncle is")
        if (commonVerbs.has(nextKey)) {
            // Fallback to default (return null).
            // If i=0, default logic will Title Case it.
            // If i>0, default logic will lowercase it.
            return null;
        }
        // Check Next Word against MINOR WORDS
        if (!usMinorWords.has(nextKey) && nextKey !== "of") {
            // Capitalize Title
            const capTitle = p.word.charAt(0).toUpperCase() + p.word.slice(1).toLowerCase();
            // Capitalize Name (Next Word)
            const capNext =
                nextP.word.charAt(0).toUpperCase() + nextP.word.slice(1).toLowerCase();

            return {
                consumed: 2,
                processedWords: [
                    `${p.prefix}${capTitle}${p.suffix}`,
                    `${nextP.prefix}${capNext}${nextP.suffix}`,
                ],
            };
        }

        // Capitalize Title even if Next is Minor (e.g. "King of")
        if (usMinorWords.has(nextKey) || nextKey === "of") {
            const capTitle = p.word.charAt(0).toUpperCase() + p.word.slice(1).toLowerCase();

            return {
                consumed: 1,
                processedWords: [`${p.prefix}${capTitle}${p.suffix}`],
            };
        }

    }

    return null;
};
