import sheriff from "eslint-config-sheriff";
import { defineFlatConfig } from "eslint-define-config"; // Recommended by Sheriff for TS support in JS

export default defineFlatConfig([
    ...sheriff({
        react: true,
        next: true,
        lodash: false,
        playwright: false,
        jest: false,
        vitest: true,
    }),
    {
        files: ["**/*.{ts,tsx}"],
        rules: {
            "react/no-unescaped-entities": "error",
            "react-hooks/exhaustive-deps": "warn",
            "@next/next/no-page-custom-font": "off",
            "func-style": ["error", "declaration", { "allowArrowFunctions": true }],
        },
    },
    {
        files: ["app/**/{page,layout,metadata}.{ts,tsx}"],
        rules: {
            "react-refresh/only-export-components": "off",
        },
    },
    // Next.js specific ignores often needed
    {
        ignores: [".next/*", "out/*", "public/*", "node_modules/*"],
    },
    // Storybook overrides
    {
        files: ["stories/**/*"],
        rules: {
            "jsdoc/require-description-complete-sentence": "off",
            "react/no-unknown-property": "off",
            "@typescript-eslint/naming-convention": "off",
        },
    },
]);
