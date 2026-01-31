"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-[52px] h-[28px] rounded-full bg-surface animate-pulse border border-border-subtle" />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-[52px] h-[28px] rounded-full transition-colors duration-500 ease-out-expo focus:outline-none focus:visible:ring-2 focus-visible:ring-primary shadow-inner overflow-hidden flex items-center bg-surface border border-border-subtle"
            aria-label="Toggle Theme"
        >
            {/* Background Track Status Indicator */}
            <div className="absolute inset-0 bg-gradient-to-tr from-surface to-elevated opacity-50 transition-opacity duration-300" />

            {/* The Sliding Pill */}
            <div
                className={cn(
                    "w-[24px] h-[24px] rounded-full shadow-sm flex items-center justify-center relative z-10",
                    "bg-elevated border border-border-subtle toggle-spring transform",
                    isDark ? "translate-x-[26px]" : "translate-x-[2px]"
                )}
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
