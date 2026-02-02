const config = {
    plugins: {
        "@tailwindcss/postcss": {},
        "postcss-preset-env": {
            stage: 2,
            features: {
                "nesting-rules": true,
                "custom-media-queries": true,
                "custom-properties": true,
            },
        },
        ...(process.env.NODE_ENV === "production"
            ? {
                "@fullhuman/postcss-purgecss": {
                    content: [
                        "./app/**/*.{js,jsx,ts,tsx}",
                        "./components/**/*.{js,jsx,ts,tsx}",
                        "./stories/**/*.{js,jsx,ts,tsx}",
                    ],
                    safelist: {
                        standard: [/^sr-only$/, /^opacity-/, /^scale-/, /^translate-/],
                        deep: [/motion/, /framer/],
                        greedy: [/animate-/],
                    },
                },
            }
            : {}),
    },
};

export default config;
