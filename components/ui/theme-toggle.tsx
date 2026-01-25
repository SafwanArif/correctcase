"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-14 h-8 rounded-full bg-surface animate-pulse border border-border-subtle" />
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-14 h-9 rounded-full p-1 m-1 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--brand-core))] shadow-inner overflow-hidden group bg-surface border border-border-subtle"
            aria-label="Toggle Theme"
        >
            {/* Background Track Status Indicator */}
            <div className="absolute inset-0 bg-gradient-to-tr from-surface to-elevated opacity-50 transition-opacity duration-300" />

            {/* The Sliding Pill */}
            <div
                className={`
            absolute top-1 left-1 w-6 h-6 rounded-full shadow-sm flex items-center justify-center
            bg-elevated
            border border-border-subtle
            toggle-spring transform
             ${isDark ? "translate-x-6" : "translate-x-0"}
        `}
            >
                {isDark ? (
                    <Moon className="w-3.5 h-3.5 text-indigo-300 relative z-10" />
                ) : (
                    <Sun className="w-3.5 h-3.5 text-amber-500 relative z-10" />
                )}
            </div>
        </button >
    );
}
