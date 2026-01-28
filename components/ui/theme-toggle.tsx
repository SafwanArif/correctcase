"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-14 h-8 rounded-full bg-surface animate-pulse border border-border-subtle" />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-13 h-7 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--brand-core))] shadow-inner overflow-hidden group bg-surface border border-border-subtle flex items-center"
            aria-label="Toggle Theme"
        >
            {/* Background Track Status Indicator */}
            <div className="absolute inset-0 bg-gradient-to-tr from-surface to-elevated opacity-50 transition-opacity duration-300" />

            {/* The Sliding Pill */}
            <div
                className={`
            w-7 h-7 rounded-full shadow-sm flex items-center justify-center relative z-10
            bg-elevated
            border border-border-subtle
            toggle-spring transform
             ${isDark ? "translate-x-full" : "translate-x-0"}
        `}
            >
                {isDark ? (
                    <Moon className="w-4 h-4 text-indigo-300 relative z-10" />
                ) : (
                    <Sun className="w-4 h-4 text-amber-500 relative z-10" />
                )}
            </div>
        </button >
    );
}
