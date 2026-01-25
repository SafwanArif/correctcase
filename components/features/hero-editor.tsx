"use client";

import React, { useState, useRef, useEffect } from "react";
import { toSentenceCase, toTitleCase, toHyphenated, countWords, countCharacters, isHyphenated, smartUnhyphenate } from "@/lib/text-utils";
import { addToHistory } from "@/lib/db";
import { Copy, Type, AlignLeft, Link, Unlink, Quote, MoreHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownItem } from "@/components/ui/dropdown-menu";

interface HeroEditorProps {
    defaultTools?: ('case' | 'hyphenation')[]; // controls which tools are primary
}

export function HeroEditor({ defaultTools }: HeroEditorProps) {
    const [text, setText] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [preservePunctuation, setPreservePunctuation] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Derived State
    const isTextHyphenated = isHyphenated(text);

    // Determine visibility based on defaultTools prop (if provided)
    // If no prop, show all (Dashboard mode)
    const showCaseTools = !defaultTools || defaultTools.includes('case');
    const showHyphenTools = !defaultTools || defaultTools.includes('hyphenation');

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
                // SEO: Update URL if needed
                window.history.replaceState(null, "", "/capitalise-title");
                break;
            case "title":
                newText = toTitleCase(text);
                window.history.replaceState(null, "", "/capitalise-title");
                break;
            case "hyphenate":
                if (isTextHyphenated) {
                    newText = smartUnhyphenate(text);
                } else {
                    newText = toHyphenated(text, preservePunctuation);
                }
                window.history.replaceState(null, "", "/hyphenate-text");
                break;
        }

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

                {showCaseTools && (
                    <div className="relative z-20">
                        <DropdownMenu
                            align="left"
                            trigger={
                                <div className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-muted hover:text-body bg-elevated hover:bg-surface border border-border-subtle rounded-lg transition-all shadow-sm hover:shadow cursor-pointer select-none">
                                    <Type className="w-4 h-4" />
                                    <span>Capitalise Title</span>
                                    <ChevronDown className="w-3 h-3 opacity-50" />
                                </div>
                            }
                        >
                            <DropdownItem
                                onClick={() => handleConversion("title")}
                                icon={<span className="text-lg">🇺🇸</span>}
                                label="US Style (Title Case)"
                                description="Capitalize major words. Standard for NYT, Time, etc."
                            />
                            <DropdownItem
                                onClick={() => handleConversion("sentence")}
                                icon={<span className="text-lg">🇬🇧</span>}
                                label="UK Style (Sentence Case)"
                                description="First word only. Standard for BBC, The Guardian."
                            />
                        </DropdownMenu>
                    </div>
                )}

                {showHyphenTools && (
                    <ActionButton
                        onClick={() => handleConversion("hyphenate")}
                        icon={isTextHyphenated ? <Unlink className="w-4 h-4" /> : <Link className="w-4 h-4" />}
                        label={isTextHyphenated ? "Unhyphenate" : "Hyphenate"}
                        isActive={isTextHyphenated}
                    />
                )}

                <div className="h-6 w-px bg-border-subtle mx-1" />

                {/* Preservation Toggle - Context aware */}
                {!isTextHyphenated && showHyphenTools && (
                    <ActionButton
                        onClick={() => setPreservePunctuation(!preservePunctuation)}
                        icon={<Quote className="w-4 h-4" />}
                        label="Keep Punctuation"
                        isActive={preservePunctuation}
                        variant="secondary"
                        className="hidden sm:flex" // Hide on mobile, move to dropdown potentially
                    />
                )}

                {/* More Tools Dropdown - For tools NOT in the primary view */}
                <div className="ml-1">
                    <DropdownMenu
                        trigger={
                            <button className="p-2 text-muted hover:text-body bg-elevated hover:bg-surface border border-border-subtle rounded-lg transition-all shadow-sm hover:shadow">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        }
                    >
                        {!showCaseTools && (
                            <>
                                <DropdownItem onClick={() => handleConversion("sentence")} icon={<AlignLeft className="w-4 h-4" />} label="Sentence Case" />
                                <DropdownItem onClick={() => handleConversion("title")} icon={<Type className="w-4 h-4" />} label="Title Case" />
                            </>
                        )}
                        {!showHyphenTools && (
                            <DropdownItem
                                onClick={() => handleConversion("hyphenate")}
                                icon={<Link className="w-4 h-4" />}
                                label="Hyphenate Text"
                            />
                        )}
                        {/* Always accessible extra tools could go here */}
                        <DropdownItem
                            onClick={() => setPreservePunctuation(!preservePunctuation)}
                            icon={<Quote className="w-4 h-4" />}
                            label="Keep Punctuation"
                            isActive={preservePunctuation}
                        />
                    </DropdownMenu>
                </div>

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

interface ActionButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
    variant?: "primary" | "secondary";
    className?: string;
}

function ActionButton({ onClick, icon, label, isActive, variant = "primary", className }: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-4 py-1.5 text-sm font-medium border rounded-lg transition-all duration-200 active:scale-95 shadow-sm hover:shadow",
                isActive
                    ? "bg-[oklch(var(--brand-core)/0.1)] text-primary border-[oklch(var(--brand-core)/0.2)]"
                    : "text-muted hover:text-body bg-elevated hover:bg-surface border-border-subtle",
                variant === "secondary" && isActive && "bg-teal-500/10 text-teal-400 border-teal-500/30",
                className
            )}
        >
            {icon}
            <span className={cn("text-center", variant === "primary" ? "min-w-[60px]" : "")}>{label}</span>
        </button>
    );
}
