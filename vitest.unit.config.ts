import { fileURLToPath } from "node:url";
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const dirname = typeof __dirname === "undefined" ? path.dirname(fileURLToPath(import.meta.url)) : __dirname;

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        include: ["**/*.test.{ts,tsx}"],
        exclude: ["**/node_modules/**", "**/*.stories.{ts,tsx}"],
        alias: {
            "@": path.resolve(dirname, "./"),
        },
    },
});
