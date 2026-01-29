"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ActionButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
    variant?: "primary" | "secondary" | "ghost" | "toolbar-item";
    size?: "sm" | "md";
    className?: string;
    type?: "button" | "submit" | "reset";
}

export function ActionButton({ onClick, icon, label, isActive, variant = "primary", size = "md", className, type = "button" }: ActionButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 font-medium rounded-lg transition-all duration-200 active:scale-95 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--brand-core))]",

                // Size Variants
                size === "sm" && "px-3 py-1.5 text-xs",
                size === "md" && "px-4 py-1.5 text-sm",

                // Primary Variant
                variant === "primary" && !isActive && "text-muted hover:text-body bg-elevated hover:bg-surface border border-border-subtle shadow-sm hover:shadow",
                variant === "primary" && isActive && "bg-[oklch(var(--brand-core)/0.1)] text-primary border border-[oklch(var(--brand-core)/0.2)] shadow-sm",

                // Secondary Variant (Teal/Accent)
                variant === "secondary" && !isActive && "text-muted hover:text-body bg-elevated hover:bg-surface border border-border-subtle shadow-sm",
                variant === "secondary" && isActive && "bg-[oklch(var(--brand-secondary)/0.1)] text-[oklch(var(--brand-secondary))] border-[oklch(var(--brand-secondary)/0.3)] border shadow-sm",

                // Toolbar Item (Borderless, Small, Uniform)
                variant === "toolbar-item" && "h-9 px-3 border-none shadow-none text-xs",
                variant === "toolbar-item" && !isActive && "bg-elevated/50 hover:bg-elevated text-muted hover:text-body",
                // Active State: Semantic High Contrast
                variant === "toolbar-item" && isActive && "bg-[oklch(var(--action-active))] text-primary-fg font-medium shadow-sm",

                // Ghost
                variant === "ghost" && "hover:bg-surface text-muted hover:text-body",

                className
            )}
        >
            {icon}
            <span className={cn("text-center", variant === "primary" ? "min-w-16" : "")}>{label}</span>
        </button>
    );
}
