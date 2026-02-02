"use client";

import type React from "react";
import { cn } from "@/lib/utils";

export interface ActionButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
    variant?: "primary" | "secondary" | "ghost" | "toolbar-item" | "insight";
    size?: "sm" | "md";
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export function ActionButton({
    onClick,
    icon,
    label,
    isActive,
    variant = "primary",
    size = "md",
    className,
    type = "button",
    disabled,
}: ActionButtonProps): React.JSX.Element {
    return (
        <button
            type={type}
            disabled={disabled}
            className={cn(
                "flex items-center font-medium rounded-lg transition-all duration-300 ease-out-expo active:scale-95 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary action-gravity",

                // Size Variants
                size === "sm" && "h-7 px-3 text-xs gap-1.5",
                size === "md" && "h-9 px-4 text-sm gap-2",

                // Primary Variant
                variant === "primary" &&
                !isActive &&
                "text-muted hover:text-body bg-elevated hover:bg-surface border border-border-subtle shadow-sm hover:shadow",
                variant === "primary" &&
                isActive &&
                "bg-primary/15 text-primary border border-primary/30 shadow-action",

                // Secondary Variant (Teal/Accent)
                variant === "secondary" &&
                !isActive &&
                "text-muted hover:text-body bg-elevated hover:bg-surface border border-border-subtle shadow-sm",
                variant === "secondary" &&
                isActive &&
                "bg-secondary/10 text-secondary border-secondary/30 border shadow-sm",

                // Toolbar Item (Borderless, Small, Uniform)
                // Toolbar items will respect the 'size' prop if passed, defaulting to their own h-9 if not driven by size.
                // But for consistency we should let size drive it if possible.
                // If variant is toolbar-item, we remove shadow/border.
                variant === "toolbar-item" && "border-none shadow-none",
                variant === "toolbar-item" &&
                !isActive &&
                "bg-elevated/50 hover:bg-elevated text-muted hover:text-body",
                // Active State: Semantic High Contrast
                // Insight Variant (Intelligence Indigo / AI)
                variant === "insight" &&
                !isActive &&
                "text-muted hover:text-body bg-elevated hover:bg-surface border border-border-subtle shadow-sm",
                variant === "insight" &&
                isActive &&
                "bg-insight/15 text-insight border border-insight/30 shadow-insight",

                variant === "toolbar-item" &&
                isActive &&
                "bg-active-item text-primary-fg font-medium shadow-sm",

                // Ghost
                variant === "ghost" && "hover:bg-surface text-muted hover:text-body",

                className
            )}
            onClick={onClick}
        >
            {icon}
            <span
                className={cn(
                    "text-center leading-none -mt-[2px]",
                    variant === "primary" ? "min-w-16" : ""
                )}
            >
                {label}
            </span>
        </button>
    );
}
