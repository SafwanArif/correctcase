"use client";

import { History, Link, Quote, Type, Unlink } from "lucide-react";
import { useSearchParams } from "next/navigation";
import type { JSX } from "react";
import { ActionButton } from "@/components/ui/action-button";
import { titleVariants } from "@/data/variants";

interface EditorToolbarProps {
    className?: string;
    onClear?: () => void;
    onCopy?: () => void;
    isCopied?: boolean;
    onPaste?: () => void;
    onUndo?: () => void;
    onRedo?: () => void;
    canUndo?: boolean;
    canRedo?: boolean;
    activeTools?: ("case" | "hyphenation")[];
    forcedStyle?: string;
}

interface ActionGroup {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    action: () => void;
    disabled?: boolean;
    primary?: boolean;
    shortcut?: string;
}

const noop = (): void => {
    // Silence eslint
};

/**
 * Toolbar for the hero editor.
 */
export function EditorToolbar({
    onClear = noop,
    onCopy = noop,
    isCopied = false,
    onPaste = noop,
    onUndo = noop,
    onRedo = noop,
    canUndo = false,
    canRedo = false,
    forcedStyle,
}: EditorToolbarProps): JSX.Element {
    const searchParams = useSearchParams();
    const currentStyle = forcedStyle ?? searchParams.get("style");

    const variantLabel =
        currentStyle !== null && currentStyle in titleVariants
            ? titleVariants[currentStyle].label
            : "Generic Case";

    const historyActions: ActionGroup[] = [
        {
            id: "undo",
            label: "Undo",
            icon: History,
            action: onUndo,
            disabled: !canUndo,
        },
        {
            id: "redo",
            label: "Redo",
            icon: History,
            action: onRedo,
            disabled: !canRedo,
        },
    ];

    const editActions: ActionGroup[] = [
        {
            id: "clear",
            label: "Clear",
            icon: Unlink,
            action: onClear,
        },
        {
            id: "paste",
            label: "Paste",
            icon: Link,
            action: onPaste,
            shortcut: "V",
        },
        {
            id: "copy",
            label: isCopied ? "Copied!" : "Copy",
            icon: Quote,
            action: onCopy,
            primary: true,
            shortcut: "C",
        },
    ];

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border-b border-border-subtle/30 bg-surface/50 backdrop-blur-md">
            <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-xs font-bold text-primary flex items-center gap-2 uppercase tracking-tight">
                        <Type className="w-3 h-3" />
                        {variantLabel}
                    </span>
                </div>
                <div className="h-4 w-px bg-border-subtle/30 mx-2 hidden md:block" />
                <div className="flex items-center gap-1">
                    {historyActions.map((action) => {
                        return (
                            <ActionButton
                                key={action.id}
                                icon={<action.icon className="w-4 h-4" />}
                                disabled={action.disabled}
                                label={action.label}
                                onClick={action.action}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center gap-2">
                {editActions.map((action) => {
                    return (
                        <ActionButton
                            key={action.id}
                            icon={<action.icon className="w-4 h-4" />}
                            label={action.label}
                            variant={action.primary ? "primary" : "ghost"}
                            onClick={action.action}
                        />
                    );
                })}
            </div>
        </div>
    );
}
