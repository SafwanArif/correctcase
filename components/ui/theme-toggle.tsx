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
            <div className="w-14 h-8 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse border border-slate-300 dark:border-white/10" />
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 glass-premium shadow-inner overflow-hidden group"
            aria-label="Toggle Theme"
        >
            {/* Background Track Status Indicator */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 opacity-50 transition-opacity duration-300" />

            {/* The Sliding Pill */}
            <div
                className={`
            absolute top-1 left-1 w-6 h-6 rounded-full shadow-sm flex items-center justify-center
            bg-white dark:bg-slate-700
            border border-slate-200 dark:border-white/10
            toggle-spring transform
             ${isDark ? "translate-x-6" : "translate-x-0"}
        `}
            >
                <span className="relative z-10">
                    {isDark ? (
                        <Moon className="w-3.5 h-3.5 text-indigo-300" />
                    ) : (
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                    )}
                </span>
            </div>
        </button>
    );
}
