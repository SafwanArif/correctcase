"use client";

import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Type, Link, Unlink, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditor } from "@/components/providers/editor-provider";
import { toSentenceCase, toTitleCase, toHyphenated, isHyphenated, smartUnhyphenate } from "@/lib/text-utils";
import { UsTitleCaseIcon, UkSentenceCaseIcon } from "@/components/ui/custom-icons";

interface EditorToolbarProps {
    className?: string;
    defaultTools?: ('case' | 'hyphenation')[];
}

export function EditorToolbar({ className, defaultTools }: EditorToolbarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { text, setText, addToHistory } = useEditor();

    // Local State for momentary toggles
    const [preservePunctuation, setPreservePunctuation] = useState(false);

    // Determines active mode from URL
    const activeStyle = searchParams.get('style');
    const isCaseMode = pathname?.includes("/capitalise-title");
    const isHyphenateMode = pathname === "/hyphenate-text";
    const isTextHyphenated = isHyphenated(text);

    // Visibilty Logic
    const showCaseTools = !defaultTools || defaultTools.includes('case');
    const showHyphenTools = !defaultTools || defaultTools.includes('hyphenation');

    const handleConversion = async (mode: string) => {
        let newText = text;
        switch (mode) {
            case "sentence":
                // Toggle Off if already active (Go back to root)
                if (activeStyle === 'uk') {
                    router.push("/capitalise-title", { scroll: false });
                    return;
                }
                // Toggle On
                newText = toSentenceCase(text);
                router.push("/capitalise-title/uk-sentence-case", { scroll: false });
                break;
            case "title":
                // Toggle Off
                if (activeStyle === 'us') {
                    router.push("/capitalise-title", { scroll: false });
                    return;
                }
                // Toggle On
                newText = toTitleCase(text);
                router.push("/capitalise-title/us-title-case", { scroll: false });
                break;
            case "hyphenate":
                if (isTextHyphenated) {
                    newText = smartUnhyphenate(text);
                } else {
                    newText = toHyphenated(text, preservePunctuation);
                }
                router.push("/hyphenate-text", { scroll: false });
                break;
        }

        let historyLabel = mode;
        if (mode === "hyphenate") {
            historyLabel = isTextHyphenated ? "unhyphenate" : "hyphenate";
        }

        setText(newText);
        addToHistory(newText, historyLabel);
    };

    return (
        <div className={cn("flex flex-wrap items-center gap-3 px-4 py-2 border-b border-border-subtle bg-surface/50 backdrop-blur-sm z-20", className)}>

            {/* Primary Tools */}
            {showCaseTools && (
                <div className="flex items-center gap-2">
                    <ActionButton
                        onClick={() => router.push("/capitalise-title")}
                        icon={<Type className="w-4 h-4" />}
                        label="Capitalise Title"
                        isActive={isCaseMode}
                        variant="primary"
                    />
                </div>
            )}

            {showHyphenTools && (!showCaseTools || !isCaseMode) && (
                <div className="flex items-center gap-2">
                    <ActionButton
                        onClick={() => handleConversion("hyphenate")}
                        icon={isTextHyphenated ? <Unlink className="w-3.5 h-3.5" /> : <Link className="w-3.5 h-3.5" />}
                        label={isTextHyphenated ? "Unhyphenate" : "Hyphenate"}
                        isActive={isTextHyphenated}
                        variant="primary"
                    />
                </div>
            )}

            {/* Contextual Options (Right Aligned) */}
            <div className="flex items-center gap-2 ml-auto animate-in fade-in slide-in-from-left-2 duration-200">
                {isCaseMode && (
                    <>
                        <ActionButton
                            onClick={() => handleConversion("title")}
                            icon={<UsTitleCaseIcon className="w-auto h-5 rounded-[2px] shadow-sm" />}
                            label="US Title Case"
                            isActive={activeStyle === 'us'}
                            variant="toolbar-item"
                        />
                        <div className="w-px h-4 bg-border-subtle" />
                        <ActionButton
                            onClick={() => handleConversion("sentence")}
                            icon={<UkSentenceCaseIcon className="w-auto h-5 rounded-[2px] shadow-sm" />}
                            label="UK Sentence Case"
                            isActive={activeStyle === 'uk'}
                            variant="toolbar-item"
                        />
                    </>
                )}

                {(defaultTools?.includes('hyphenation') || isHyphenateMode) && (
                    <ActionButton
                        onClick={() => setPreservePunctuation(!preservePunctuation)}
                        icon={<Quote className="w-3.5 h-3.5" />}
                        label="Keep Punctuation"
                        isActive={preservePunctuation}
                        variant="toolbar-item" // Smaller variant for options
                        className="hidden sm:flex"
                    />
                )}
            </div>
        </div>
    );
}

// Reusing ActionButton (Local Definition to keep portability, or could import if made generic)
interface ActionButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
    variant?: "primary" | "secondary" | "ghost" | "toolbar-item";
    className?: string;
}

function ActionButton({ onClick, icon, label, isActive, variant = "primary", className }: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 active:scale-95 select-none focus:outline-none focus:ring-2 focus:ring-[oklch(var(--brand-core))]",

                // Primary Tab Style
                variant === "primary" && !isActive && "text-muted hover:text-body bg-elevated hover:bg-surface border border-border-subtle shadow-sm",
                variant === "primary" && isActive && "bg-[oklch(var(--brand-core)/0.1)] text-primary border border-[oklch(var(--brand-core)/0.2)] shadow-sm",

                // Toolbar Item (Smaller, more seamless)
                variant === "toolbar-item" && "h-8 px-2 border border-transparent hover:bg-elevated/50",
                variant === "toolbar-item" && isActive && "bg-[oklch(var(--action-active))] text-primary-fg shadow-sm border-transparent",

                className
            )}
        >
            {icon}
            <span className={cn(variant === "primary" ? "hidden sm:inline" : "")}>{label}</span>
        </button>
    );
}
