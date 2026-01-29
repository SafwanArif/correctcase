"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface EditorFrameProps {
    children: React.ReactNode;
    headerLeft?: React.ReactNode;
    headerCenter?: React.ReactNode;
    headerRight?: React.ReactNode;
    footerLeft?: React.ReactNode;
    footerRight?: React.ReactNode;
    isCompact?: boolean;
    isFocused?: boolean;
    className?: string;
}

export function EditorFrame({
    children,
    headerLeft,
    headerCenter,
    headerRight,
    footerLeft,
    footerRight,
    isCompact = false,
    isFocused = false,
    className
}: EditorFrameProps) {
    return (
        <div
            data-pattern="editor-frame"
            data-compact={isCompact}
            data-focused={isFocused}
            className={cn(
                "flex flex-col shrink-0 relative transition-all duration-500 ease-spring sticky z-40 mx-auto left-0 right-0 w-[90%] max-w-3xl rounded-2xl border overflow-hidden group",
                // Compact Mode Styles
                isCompact
                    ? "top-2 bg-surface/90 backdrop-blur-xl border-border-subtle shadow-2xl"
                    : "top-2 bg-surface border-border-subtle/40 shadow-sm my-2",
                className
            )}
        >
            {/* --- Header Tier --- */}
            <div className={cn(
                "absolute top-0 left-0 w-full z-30 flex items-center justify-between px-3 py-1 transition-all duration-500 overflow-hidden",
                // Expansion Animation (Hidden by default, reveals on hover/focus)
                "max-h-0 group-hover:max-h-12 group-focus-within:max-h-12",
                isCompact
                    ? "bg-surface/80 backdrop-blur-xl border-b border-border-subtle/50"
                    : "bg-transparent"
            )}>
                {/* Left Slot */}
                <div className="flex-1 flex items-center justify-start gap-2">
                    {headerLeft}
                </div>

                {/* Center Slot */}
                <div className="flex items-center gap-1">
                    {headerCenter}
                </div>

                {/* Right Slot */}
                <div className="flex-1 flex justify-end">
                    {headerRight}
                </div>
            </div>

            {/* --- Editor Core --- */}
            <div className={cn(
                "relative bg-focus transition-all duration-500 ease-spring overflow-hidden",
                // Visual Expansion: We add padding to the CONTAINER, not the textarea, to avoid scroll-locking bugs.
                // Math: pt-7 (28px) + py-4 (16px) = 44px top. 
                // Matches desired balance.
                isCompact
                    ? "h-auto bg-transparent"
                    : "h-auto group-hover:pt-7 group-hover:pb-5 group-focus-within:pt-7 group-focus-within:pb-5"
            )}>
                {children}
            </div>

            {/* --- Footer Tier --- */}
            <div className={cn(
                "absolute bottom-0 left-0 w-full z-30 px-6 flex items-center justify-between select-none transition-all duration-500 overflow-hidden rounded-b-2xl",
                // Expansion: 0 -> 10 (40px)
                "max-h-0 group-hover:max-h-10 group-focus-within:max-h-10",
                isCompact
                    ? "h-0 opacity-0"
                    : "h-8 bg-transparent"
            )}>
                {/* Left Slot */}
                <div className="flex items-center">
                    {footerLeft}
                </div>

                {/* Right Slot */}
                <div className="flex items-center">
                    {footerRight}
                </div>
            </div>
        </div>
    );
}
