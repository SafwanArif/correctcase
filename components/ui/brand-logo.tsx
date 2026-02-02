import React from "react";

export function BrandLogo({ className }: { className?: string }) {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="CorrectCase: British English and American Standards. Professional Text Converter Suite."
        >
            <title>CorrectCase Logo</title>
            <desc>
                British English and American Standards Text Converter. 100% Client-Side
                Privacy-First Tool.
            </desc>
            <defs>
                <linearGradient id="logo-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="oklch(var(--obsidian-cobalt))" />
                    <stop offset="100%" stopColor="oklch(var(--radiant-cyan))" />
                </linearGradient>
            </defs>
            <g transform="rotate(-90 50 50)">
                <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="url(#logo-gradient)"
                    strokeWidth="10"
                    strokeDasharray="165 220"
                    transform="rotate(135 50 50)"
                    strokeLinecap="round"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="17"
                    stroke="url(#logo-gradient)"
                    strokeWidth="10"
                    strokeDasharray="80 107"
                    transform="rotate(135 50 50)"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
}
