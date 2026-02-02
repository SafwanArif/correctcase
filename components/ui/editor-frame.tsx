"use client";

import { type JSX,type ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the EditorFrame component.
 */
export interface EditorFrameProps {
    children: ReactNode;
    className?: string;
    isCompact?: boolean;
    isFocused?: boolean;
    hasContent?: boolean;
    headerLeft?: ReactNode;
    headerCenter?: ReactNode;
    headerRight?: ReactNode;
    footerLeft?: ReactNode;
    footerCenter?: ReactNode;
    footerRight?: ReactNode;
}

/**
 * A sleek, gravity-themed frame for the editor tools.
 */
export function EditorFrame({
    children,
    className,
    isCompact = false,
    isFocused = false,
    hasContent = false,
    headerLeft,
    headerCenter,
    headerRight,
    footerLeft,
    footerCenter,
    footerRight,
}: EditorFrameProps): JSX.Element {
    // Suppress warning for hydration mismatch check
    /* eslint-disable react-you-might-not-need-an-effect/no-initialize-state */
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    /* eslint-enable react-you-might-not-need-an-effect/no-initialize-state */

    if (!isMounted) {
        return (
            <div className={cn(
                "w-full max-w-5xl mx-auto min-h-[500px] border border-border-subtle/30 rounded-3xl bg-surface/30 backdrop-blur-xl shadow-2xl animate-pulse",
                className
            )} />
        );
    }

    return (
        <div
            className={cn(
                "w-full max-w-4xl mx-auto flex flex-col border border-border-subtle/30 rounded-3xl bg-surface/40 backdrop-blur-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] relative transition-all duration-700 group",
                isCompact ? "scale-95 opacity-90 shadow-none border-transparent py-2" : "py-4",
                isFocused ? "border-primary/40 shadow-primary/10" : "hover:border-primary/20",
                className
            )}
        >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-victory-emerald/5 pointer-events-none rounded-3xl" />

            {/* Header Slot */}
            {(headerLeft !== undefined || headerCenter !== undefined || headerRight !== undefined) && (
                <div className="px-6 py-3 flex items-center justify-between border-b border-border-subtle/30 relative z-20">
                    <div className="flex items-center gap-2">{headerLeft}</div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{headerCenter}</div>
                    <div className="flex items-center gap-2">{headerRight}</div>
                </div>
            )}

            <div className="relative z-10 flex flex-col flex-grow">
                {children}

                {/* Empty State Overlay */}
                {!hasContent && !isFocused && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 select-none">
                        <div className="text-center">
                            <p className="text-sm font-medium uppercase tracking-[0.2em] mb-2 text-muted">Awaiting Input</p>
                            <div className="h-px w-12 bg-primary mx-auto" />
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Slot */}
            {(footerLeft !== undefined || footerCenter !== undefined || footerRight !== undefined) && (
                <div className="px-6 py-3 mt-auto flex items-center justify-between border-t border-border-subtle/30 relative z-20">
                    <div className="flex items-center gap-2">{footerLeft}</div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{footerCenter}</div>
                    <div className="flex items-center gap-2">{footerRight}</div>
                </div>
            )}
        </div>
    );
}
