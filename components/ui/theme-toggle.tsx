"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle(): React.JSX.Element {
    const { setTheme, resolvedTheme } = useTheme();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="w-[52px] h-[28px] rounded-full bg-surface animate-pulse border border-border-subtle" />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            className="relative w-[52px] h-[28px] rounded-full transition-colors duration-500 ease-out-expo focus:outline-none focus:visible:ring-2 focus-visible:ring-primary shadow-inner overflow-hidden flex items-center bg-surface border border-border-subtle"
            aria-label="Toggle Theme"
            onClick={() => { setTheme(isDark ? "light" : "dark"); }}
        >
            {/* Background Track Status Indicator */}
            <div className="absolute inset-0 bg-gradient-to-tr from-surface to-elevated opacity-50 transition-opacity duration-300" />

            {/* The Sliding Pill */}
            <div
                className={cn(
                    "w-[24px] h-[24px] rounded-full shadow-sm flex items-center justify-center relative z-10",
                    "bg-elevated border border-border-subtle toggle-spring transform",
                    isDark ? "translate-x-[26px]" : "translate-x-0"
                )}
            >
                {isDark ? (
                    <Moon className="w-4 h-4 text-secondary relative z-10" />
                ) : (
                    <Sun className="w-4 h-4 text-victory relative z-10" />
                )}
            </div>
        </button>
    );
}
