/**
 * Smart-text.ts
 * Utilities for "Smart Plain Text" behavior.
 * Handles auto-lists, indentation, and formatting stripping.
 */

/**
 * Detects if a line is a list item.
 */
export const getListPrefix = (line: string): string | null => {
    const bulletMatch = line.match(/^(\s*)([-*+])\s+/);

    if (bulletMatch) {
        return `${bulletMatch[1]}${bulletMatch[2]} `;
    }

    // Non-capturing groups for number match since we only use limit
    const numberMatch = line.match(/^\s*\d+[.)]\s+/);

    if (numberMatch) {
        // We return the prefix structure, but we might need to increment the number dynamically
        // checking the logic in the component is better for incrementing,
        // but here we just identify the pattern.
        return line.slice(0, Math.max(0, numberMatch[0].length));
    }

    return null;
};

/**
 * Logic to increment a number prefix: "1. " -\> "2. ".
 */
export const incrementListPrefix = (prefix: string): string => {
    const numberMatch = prefix.match(/^(\s*)(\d+)([.)])\s+$/);

    if (numberMatch) {
        const indent = numberMatch[1];
        const num = parseInt(numberMatch[2], 10);
        const separator = numberMatch[3];

        return `${indent}${String(num + 1)}${separator} `;
    }

    return prefix; // Return as is if it's a bullet
}

// Strip Markdown/Rich-Text artifacts
/**
 * 2026 Optimization: Consolidating multiple passes where possible.
 */
export const stripFormatting = (text: string): string => {
    if (!text) { return ""; }

    return (
        text
            // 1. Block cleanup (Lists & Quotes)
            .replaceAll(/^\s*(?:[-*+>]|\d+[.)])\s+/gm, "")
            // 2. Inline Formatting (Bold/Italic/Strike)
            .replaceAll(/(\*\*|__|~~|\*|_)(.*?)\1/g, "$2")
            // 3. Code & Links
            .replaceAll(/`([^`]+)`/g, "$1")
            .replaceAll(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    );
}
