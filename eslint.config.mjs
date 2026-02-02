import storybook from "eslint-plugin-storybook";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
    {
        ignores: [
            "**/.next/**",
            "**/out/**",
            "**/dist/**",
            "**/node_modules/**",
            "**/coverage/**",
            "**/public/**",
            "**/*.min.js",
            "**/*.d.ts",
            "**/scripts/**",
            "lint-log.txt",
            "lint.txt"
        ],
    },
    ...nextVitals,
    ...nextTs,
    ...storybook.configs["flat/recommended"],
]);

export default eslintConfig;
