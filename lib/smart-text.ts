/**
 * smart-text.ts
 * Utilities for "Smart Plain Text" behavior.
 * Handles auto-lists, indentation, and formatting stripping.
 */

// Detects if a line is a list item
export function getListPrefix(line: string): string | null {
    const bulletMatch = line.match(/^(\s*)([-*+])\s+/);
    if (bulletMatch) {
        return `${bulletMatch[1]}${bulletMatch[2]} `;
    }

    const numberMatch = line.match(/^(\s*)(\d+)([.)])\s+/);
    if (numberMatch) {
        // We return the prefix structure, but we might need to increment the number dynamically
        // checking the logic in the component is better for incrementing, 
        // but here we just identify the pattern.
        return line.substring(0, numberMatch[0].length);
    }

    return null;
}

// Logic to increment a number prefix: "1. " -> "2. "
export function incrementListPrefix(prefix: string): string {
    const numberMatch = prefix.match(/^(\s*)(\d+)([.)])\s+$/);
    if (numberMatch) {
        const indent = numberMatch[1];
        const num = parseInt(numberMatch[2], 10);
        const separator = numberMatch[3];
        return `${indent}${num + 1}${separator} `;
    }
    return prefix; // Return as is if it's a bullet
}

// Strip Markdown/Rich-Text artifacts
export function stripFormatting(text: string): string {
    let clean = text;

    // Remove List Markers (Bullets/Numbers) at start of lines
    clean = clean.replace(/^[\s]*[-*+][\s]+/gm, ""); // Bullets
    clean = clean.replace(/^[\s]*\d+[.)][\s]+/gm, ""); // Numbers

    // Remove Blockquotes
    clean = clean.replace(/^[\s]*>[\s]*/gm, "");

    // Remove Bold/Italic markers (*, **, _, __)
    // Basic regex, might be too aggressive with single chars but valid for "Utility" clear
    clean = clean.replace(/(\*\*|__)(.*?)\1/g, "$2"); // Bold
    clean = clean.replace(/(\*|_)(.*?)\1/g, "$2");   // Italic

    // Remove Code Backticks
    clean = clean.replace(/`([^`]+)`/g, "$1");

    // Remove Links [text](url) -> text
    clean = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

    return clean;
}
