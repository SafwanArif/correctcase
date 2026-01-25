import React from "react";

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            className={className}
            aria-label="CorrectCase Logo"
        >
            {/* Outer Capital C */}
            {/* Arcs from 45deg to 315deg (approx) */}
            <path
                d="M 85 25 A 40 40 0 1 0 85 75"
                className="text-[oklch(var(--brand-core))]"
            />
            {/* Inner Lowercase c */}
            <path
                d="M 65 42 A 18 18 0 1 0 65 65"
                className="text-[oklch(var(--brand-core))]"
                strokeWidth="10"
            />
        </svg>
    );
}
