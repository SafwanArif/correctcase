
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../lib/hyphen-dictionary.ts');
const rawContent = fs.readFileSync(filePath, 'utf8');

// Regex to capture words and comments
// This is a line-by-line parser to try and preserve context
const lines = rawContent.split('\n');
const wordMap = new Map(); // word -> comment (or null)

console.log(`Scanning ${lines.length} lines...`);

let wordCount = 0;

for (const line of lines) {
    if (line.trim().startsWith('//') || line.trim().startsWith('export') || line.trim().startsWith('*/') || line.trim().startsWith('/**')) {
        continue; // Skip headers/comments-only lines logic handled separately? 
        // Actually we want to ignore section headers for the map, we will regenerate them.
    }

    // specific check for the start of the set
    if (line.includes('export const COMPOUND_WORDS')) continue;
    if (line.includes(']);')) continue;

    // Extract comment
    let comment = null;
    let contentToParse = line;
    const commentMatch = line.match(/\/\/ (.*)$/);
    if (commentMatch) {
        comment = commentMatch[1].trim();
        contentToParse = line.substring(0, commentMatch.index);
    }

    // Extract words
    const wordRegex = /'([\w-]+)'/g;
    let match;
    const wordsOnLine = [];
    while ((match = wordRegex.exec(contentToParse)) !== null) {
        wordsOnLine.push(match[1]);
    }

    if (wordsOnLine.length > 0) {
        wordCount += wordsOnLine.length;
        wordsOnLine.forEach((word, index) => {
            // Logic: If there is a comment, attach it to the LAST word on the line? 
            // Or if it's a single word line.
            // If strictly 1 word, definitely attach.
            // If > 1 word, attach to last?
            let wordComment = null;
            if (comment && index === wordsOnLine.length - 1) {
                wordComment = comment;
            }

            // Deduplicate: If word exists, we keep the one with a comment if the new one has a comment? 
            // Or prioritize the first instance?
            // User put huge lists at the end. The old list had comments. 
            // The NEW list usually didn't have comments except for specific lines.
            // Let's keep existing comment if present.
            if (!wordMap.has(word)) {
                wordMap.set(word, wordComment);
            } else {
                // If the existing entry has no comment, but this one does, update it.
                if (!wordMap.get(word) && wordComment) {
                    wordMap.set(word, wordComment);
                }
            }
        });
    }
}

console.log(`Found ${wordCount} words total (including duplicates).`);
console.log(`Unique words: ${wordMap.size}`);
console.log(`Duplicates removed: ${wordCount - wordMap.size}`);

// Sorting
const sortedWords = Array.from(wordMap.keys()).sort();

// Grouping
const groups = {};
for (const word of sortedWords) {
    const letter = word[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(word);
}

// Generate Output
let output = `/**
 * CorrectCase Hyphen Dictionary
 *
 * A curated set of common British English compound words.
 * Consolidated list for maximum coverage (~${wordMap.size} words).
 */
export const COMPOUND_WORDS = new Set<string>([
`;

const letters = Object.keys(groups).sort();
for (const letter of letters) {
    output += `\n    // ${letter}\n`;
    const words = groups[letter];

    // We can pack them slightly to save vertical space, 
    // BUT user likes comments. 
    // Compelling hybrid strategy:
    // If a word has a comment -> put on its own line.
    // If words have NO comments -> pack them (e.g. 5 per line).

    let currentLine = [];

    for (const word of words) {
        const comment = wordMap.get(word);

        if (comment) {
            // Flush current packed line if any
            if (currentLine.length > 0) {
                output += `    ${currentLine.map(w => `'${w}'`).join(', ')},\n`;
                currentLine = [];
            }
            // Output comment line
            output += `    '${word}', // ${comment}\n`;
        } else {
            currentLine.push(word);
            if (currentLine.length >= 6) { // Pack 6 words per line
                output += `    ${currentLine.map(w => `'${w}'`).join(', ')},\n`;
                currentLine = [];
            }
        }
    }
    // Flush remaining
    if (currentLine.length > 0) {
        output += `    ${currentLine.map(w => `'${w}'`).join(', ')},\n`;
    }
}

output += `]);\n`;

fs.writeFileSync(filePath, output, 'utf8');
console.log('Dictionary cleaned and rewritten.');
