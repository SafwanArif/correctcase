"use client";

import React, { useState, useRef, useEffect } from "react";
import { toSentenceCase, toTitleCase, toHyphenated, countWords, countCharacters, isHyphenated, smartUnhyphenate } from "@/lib/text-utils";
import { addToHistory } from "@/lib/db";
import { Copy, Type, AlignLeft, Link, Unlink, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroEditor() {
    const [text, setText] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [preservePunctuation, setPreservePunctuation] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Derived State
    const isTextHyphenated = isHyphenated(text);

    useEffect(() => {
        // Auto-focus on load
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    const handleConversion = async (mode: string) => {
        let newText = text;
        switch (mode) {
            case "sentence":
                newText = toSentenceCase(text);
                break;
            case "title":
                newText = toTitleCase(text);
                break;
            case "hyphenate":
                if (isTextHyphenated) {
                    // Smart recovery (Unhyphenate)
                    // Note: smartUnhyphenate naturally preserves punctuation if it was left in
                    newText = smartUnhyphenate(text);
                } else {
                    // Hyphenate
                    newText = toHyphenated(text, preservePunctuation);
                }
                break;
        }

        // Determine the actual operation label for history
        let historyLabel = mode;
        if (mode === "hyphenate") {
            historyLabel = isTextHyphenated ? "unhyphenate" : "hyphenate";
        }

        setText(newText);
        await addToHistory(newText, historyLabel);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="flex flex-col h-full min-h-[500px] w-full bg-surface rounded-2xl border border-border-subtle overflow-hidden shadow-depth dark:shadow-none relative transition-colors duration-300 select-none">

            {/* Toolbar - Crisp & Professional */}
            <div className="flex flex-wrap items-center gap-2 p-3 border-b border-border-subtle bg-canvas">
                <ActionButton
                    onClick={() => handleConversion("sentence")}
                    icon={<AlignLeft className="w-4 h-4" />}
                    label="Sentence"
                />
                <ActionButton
                    onClick={() => handleConversion("title")}
                    icon={<Type className="w-4 h-4" />}
                    label="Title"
                />

                {/* Dynamic Hyphenate Toggle */}
                <ActionButton
                    onClick={() => handleConversion("hyphenate")}
                    icon={isTextHyphenated ? <Unlink className="w-4 h-4" /> : <Link className="w-4 h-4" />}
                    label={isTextHyphenated ? "Unhyphenate" : "Hyphenate"}
                    isActive={isTextHyphenated}
                />

                <div className="h-6 w-px bg-border-subtle mx-1" />

                {/* Preservation Toggle */}
                <ActionButton
                    onClick={() => setPreservePunctuation(!preservePunctuation)}
                    icon={<Quote className="w-4 h-4" />}
                    label="Keep Punctuation"
                    isActive={preservePunctuation}
                    variant="secondary"
                />

                <div className="ml-auto flex items-center gap-2">
                    <button
                        onClick={copyToClipboard}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full transition-all duration-200",
                            isCopied
                                ? "bg-[oklch(var(--brand-core)/0.1)] text-primary"
                                : "bg-surface hover:bg-elevated text-muted hover:text-body"
                        )}
                    >
                        {isCopied ? "Copied" : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                    </button>
                </div>
            </div>

            {/* Editor Area - "Paper" Feel */}
            <div className="flex-1 relative group bg-surface transition-colors duration-300">
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text to analyse..."
                    className="w-full h-full p-6 bg-transparent border-none outline-none resize-none text-body text-lg leading-relaxed placeholder:text-muted font-sans select-text"
                    spellCheck={false}
                />

                {/* Stats overlay - Subtle & Clean */}
                <div className="absolute bottom-4 left-6 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-4 text-[10px] font-mono font-medium text-muted bg-elevated px-3 py-1.5 rounded-full border border-border-subtle shadow-sm">
                        <span>{countWords(text)} WORDS</span>
                        <span className="w-px h-3 bg-border-subtle" />
                        <span>{countCharacters(text)} CHARS</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActionButton({ onClick, icon, label, isActive, variant = "primary" }: { onClick: () => void; icon: React.ReactNode; label: string; isActive?: boolean; variant?: "primary" | "secondary" }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-4 py-1.5 text-sm font-medium border rounded-lg transition-all duration-200 active:scale-95 shadow-sm hover:shadow",
                isActive
                    ? "bg-[oklch(var(--brand-core)/0.1)] text-primary border-[oklch(var(--brand-core)/0.2)]"
                    : "text-muted hover:text-body bg-elevated hover:bg-surface border-border-subtle",
                variant === "secondary" && isActive && "bg-body/5 text-body border-body/10" // Subtle style for secondary toggle
            )}
        >
            {icon}
            <span className={cn("text-center", variant === "primary" ? "min-w-[60px]" : "")}>{label}</span>
        </button>
    );
}
