"use client";

import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Type, Link, Unlink, Quote, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditor } from "@/components/providers/editor-provider";
import {
    toSentenceCase,
    toTitleCase,
    toHyphenated,
    isHyphenated,
    smartUnhyphenate,
} from "@/lib/text-utils";
import { UsTitleCaseIcon, UkSentenceCaseIcon } from "@/components/ui/custom-icons";
import { ActionButton } from "@/components/ui/action-button";

interface EditorToolbarProps {
    className?: string;
    defaultTools?: ("case" | "hyphenation")[];
    onOpenHistory?: () => void;
}

export function EditorToolbar({ className, defaultTools, onOpenHistory }: EditorToolbarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { text, setText, addToHistory } = useEditor();

    // Local State for momentary toggles
    const [preservePunctuation, setPreservePunctuation] = useState(false);

    // Determines active mode from URL
    // Determines active mode from URL (Query or Path)
    const activeStyle =
        searchParams.get("style") ||
        (pathname?.includes("us-title-case")
            ? "us"
            : pathname?.includes("uk-sentence-case")
              ? "uk"
              : null);
    const isCaseMode = pathname?.includes("/capitalise-title");
    const isHyphenateMode = pathname === "/hyphenate-text";
    const isTextHyphenated = isHyphenated(text);

    // Visibilty Logic
    const showCaseTools = !defaultTools || defaultTools.includes("case");
    const showHyphenTools = !defaultTools || defaultTools.includes("hyphenation");

    const handleConversion = async (mode: string) => {
        let newText = text;
        switch (mode) {
            case "sentence":
                // Toggle Off if already active (Go back to root)
                if (activeStyle === "uk") {
                    router.push("/capitalise-title", { scroll: false });
                    return;
                }
                // Toggle On
                newText = toSentenceCase(text);
                router.push("/capitalise-title/uk-sentence-case", { scroll: false });
                break;
            case "title":
                // Toggle Off
                if (activeStyle === "us") {
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
        <div
            className={cn(
                "toolbar-layout px-4 border-b border-border-subtle/20 bg-surface/30 backdrop-blur-md z-[var(--z-toolbar)] relative specular-border @container",
                className
            )}
        >
            {/* Primary Tools */}
            {showCaseTools && (
                <div className="flex items-center gap-2">
                    <ActionButton
                        onClick={() => router.push("/capitalise-title")}
                        icon={<Type className="w-3.5 h-3.5" />}
                        label="Capitalise Title"
                        isActive={isCaseMode}
                        variant="primary"
                        size="sm"
                    />
                </div>
            )}

            {showHyphenTools && (!showCaseTools || !isCaseMode) && (
                <div className="flex items-center gap-2">
                    <ActionButton
                        onClick={() => handleConversion("hyphenate")}
                        icon={
                            isTextHyphenated ? (
                                <Unlink className="w-3.5 h-3.5" />
                            ) : (
                                <Link className="w-3.5 h-3.5" />
                            )
                        }
                        label={isTextHyphenated ? "Unhyphenate" : "Hyphenate"}
                        isActive={isTextHyphenated}
                        variant="primary"
                        size="sm"
                    />
                </div>
            )}

            {/* Contextual Options (Right Aligned) */}
            <div className="flex items-center gap-2 ml-auto animate-in fade-in slide-in-from-left-2 duration-200">
                {isCaseMode && (
                    <>
                        <ActionButton
                            onClick={() => handleConversion("title")}
                            icon={
                                <UsTitleCaseIcon className="w-auto h-5 rounded-[2px] shadow-sm" />
                            }
                            label="US Title Case"
                            isActive={activeStyle === "us"}
                            variant="toolbar-item"
                        />
                        <div className="w-px h-4 bg-border-subtle" />
                        <ActionButton
                            onClick={() => handleConversion("sentence")}
                            icon={
                                <UkSentenceCaseIcon className="w-auto h-5 rounded-[2px] shadow-sm" />
                            }
                            label="UK Sentence Case"
                            isActive={activeStyle === "uk"}
                            variant="toolbar-item"
                        />
                    </>
                )}

                {(defaultTools?.includes("hyphenation") || isHyphenateMode) && (
                    <ActionButton
                        onClick={() => setPreservePunctuation(!preservePunctuation)}
                        icon={<Quote className="w-3.5 h-3.5" />}
                        label="Keep Punctuation"
                        isActive={preservePunctuation}
                        variant="insight" // High-value contextual toggle
                        className="hidden sm:flex"
                    />
                )}

                <div className="w-px h-4 bg-border-subtle mx-1" />

                <ActionButton
                    onClick={() => onOpenHistory?.()}
                    icon={<History className="w-3.5 h-3.5" />}
                    label="History"
                    variant="toolbar-item"
                />
            </div>
        </div>
    );
}

// Local ActionButton removed. Using shared component.
