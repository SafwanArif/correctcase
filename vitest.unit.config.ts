import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "node:url";

const dirname =
    typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

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
