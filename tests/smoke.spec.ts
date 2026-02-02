import { test, expect } from "@playwright/test";

test.describe("Critical Path: Hero Editor", () => {
    test("should transform text to sentence case", async ({ page }) => {
        // 1. Visit Home
        await page.goto("/");

        // 2. Check Title
        await expect(page).toHaveTitle(/British & American/);

        // 3. Type text into Editor
        const editor = page.locator('textarea[placeholder*="Type or paste"]');
        await editor.fill("HELLO WORLD FROM 2026");

        // 4. Verify initial state (should remain as typed unless auto-convert is on)
        // By default, no tool interaction happens unless clicked.
        await expect(editor).toHaveValue("HELLO WORLD FROM 2026");

        // 5. Navigate to "UK Sentence Case" tool via Hub (or direct URL)
        await page.goto("/capitalise-title/uk-sentence-case");

        // 6. Verify Transformation Logic
        // The previous text 'HELLO WORLD FROM 2026' might be in session storage if we navigated via UI,
        // but here we did a direct nav, so let's re-type to be safe or check session logic.
        // Let's just type fresh for this atomic test.
        const toolEditor = page.locator('textarea[placeholder*="Type or paste"]');
        await toolEditor.fill("THIS SHOULD BE SENTENCE CASE");

        // In "UK Sentence Case" mode, typing triggers conversion?
        // Usually it's instant or on-blur depending on implementation.
        // Based on 'use-hero-editor.ts':
        // if (activeStyle === 'uk') val = toSentenceCase(val);

        await expect(toolEditor).toHaveValue("This should be sentence case");
    });
});
