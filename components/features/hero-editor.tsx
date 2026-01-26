"use client";

import React, { useState, useRef, useEffect } from "react";
import { toSentenceCase, toTitleCase, toHyphenated, countWords, countCharacters, isHyphenated, smartUnhyphenate } from "@/lib/text-utils";
import { addToHistory } from "@/lib/db";
import { Copy, Type, Link, Unlink, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useHistory } from "@/lib/use-history";

interface HeroEditorProps {
    defaultTools?: ('case' | 'hyphenation')[]; // controls which tools are primary
}

export function HeroEditor({ defaultTools }: HeroEditorProps) {
    // History replaced useState
    const [isCopied, setIsCopied] = useState(false);
    const [preservePunctuation, setPreservePunctuation] = useState(false);
    const [activeMode, setActiveMode] = useState<'case' | 'hyphenate' | null>(
        defaultTools?.includes('case') && defaultTools.length === 1 ? 'case' : null
    );
    const [activeCase, setActiveCase] = useState<'title' | 'sentence' | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    // History Hook
    const { state: historyState, set: setHistoryText, undo, redo, canUndo, canRedo } = useHistory("");
    const text = historyState.present;

    // Wrapper to update text (and history)
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHistoryText(e.target.value);
    };

    // Derived State
    const isTextHyphenated = isHyphenated(text);

    // Determine visibility based on defaultTools prop (if provided)
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
                setActiveCase("sentence");
                router.push("/capitalise-title", { scroll: false });
                break;
            case "title":
                newText = toTitleCase(text);
                setActiveCase("title");
                router.push("/capitalise-title", { scroll: false });
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



        setHistoryText(newText);
        await addToHistory(newText, historyLabel);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="flex flex-col flex-1 w-full bg-transparent relative transition-colors duration-300 select-none">

            {/* Toolbar - Crisp & Professional */}
            <div className="flex flex-wrap items-center gap-3 p-3 border-b border-border-subtle bg-canvas">

                {/* Case Tools Group - Nested Logic */}
                {showCaseTools && (
                    <div className="flex items-center gap-2">
                        <ActionButton
                            onClick={() => {
                                const newMode = 'case';
                                setActiveMode(newMode);
                                router.push("/capitalise-title");
                            }}
                            icon={<Type className="w-4 h-4" />}
                            label="Capitalise Title"
                            isActive={activeMode === 'case'}
                            className="h-9"
                        />

                    </div>
                )}

                {/* Case Tools Secondary Options - Permanent when active */}
                {activeMode === 'case' && (
                    <div className="flex items-center gap-2 ml-auto animate-in fade-in slide-in-from-left-2 duration-200">
                        <ActionButton
                            onClick={() => handleConversion("title")}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 32" className="w-5 h-auto rounded-[1px] shadow-sm"><rect width="60" height="32" fill="#B22234" /><path d="M0 0h24v18H0z" fill="#3C3B6E" /><g fill="#FFF"><rect y="3" width="60" height="3" /><rect y="9" width="60" height="3" /><rect y="15" width="60" height="3" /><rect y="21" width="60" height="3" /><rect y="27" width="60" height="3" /></g><g fill="#FFF"><path d="M2 2h2v2H2zM8 2h2v2H8zM14 2h2v2H14zM20 2h2v2H20zM5 5h2v2H5zM11 5h2v2H11zM17 5h2v2H17zM2 8h2v2H2zM8 8h2v2H8zM14 8h2v2H14zM20 8h2v2H20zM5 11h2v2H5zM11 11h2v2H11zM17 11h2v2H17zM2 14h2v2H2zM8 14h2v2H8zM14 14h2v2H14zM20 14h2v2H20z" /></g></svg>}
                            label="US Title Case"
                            isActive={activeCase === 'title'}
                            variant="secondary"
                            className="h-9 text-xs px-3 border-none shadow-none bg-elevated/50 hover:bg-elevated"
                        />
                        <div className="w-px h-4 bg-border-subtle" />
                        <ActionButton
                            onClick={() => handleConversion("sentence")}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-auto rounded-[1px] shadow-sm"><path fill="#012169" d="M0 0h60v30H0z" /><path fill="#FFF" d="M0 0l60 30m0-30L0 30" strokeWidth="6" /><path fill="none" stroke="#C8102E" strokeWidth="4" d="M0 0l60 30m0-30L0 30" /><path fill="#FFF" d="M30 0v30M0 15h60" strokeWidth="10" /><path fill="none" stroke="#C8102E" strokeWidth="6" d="M30 0v30M0 15h60" /></svg>}
                            label="UK Sentence Case"
                            isActive={activeCase === 'sentence'}
                            variant="secondary"
                            className="h-9 text-xs px-3 border-none shadow-none bg-elevated/50 hover:bg-elevated"
                        />
                    </div>
                )}

                {showHyphenTools && (
                    <div className="flex items-center gap-2">
                        {(!showCaseTools || activeMode !== 'case') && (
                            <ActionButton
                                onClick={() => {
                                    handleConversion("hyphenate");
                                    setActiveMode('hyphenate');
                                }}
                                icon={isTextHyphenated ? <Unlink className="w-3.5 h-3.5" /> : <Link className="w-3.5 h-3.5" />}
                                label={isTextHyphenated ? "Unhyphenate" : "Hyphenate"}
                                isActive={isTextHyphenated}
                                className="h-9"
                            />
                        )}

                        {/* Toggle appears alongside when relevant */}
                        {(defaultTools?.includes('hyphenation') || activeMode === 'hyphenate') && (
                            <div className="ml-auto flex">
                                <ActionButton
                                    onClick={() => setPreservePunctuation(!preservePunctuation)}
                                    icon={<Quote className="w-3.5 h-3.5" />}
                                    label="Keep Punctuation"
                                    isActive={preservePunctuation}
                                    variant="secondary"
                                    className="h-9 text-xs px-4 hidden sm:flex"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Editor Area - "Paper" Feel */}
            <div className="flex-1 relative group bg-surface transition-colors duration-300">
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Type or paste your text to analyse..."
                    className="w-full h-full p-6 bg-transparent border-none outline-none resize-none text-body text-lg leading-relaxed placeholder:text-muted font-sans select-text"
                    spellCheck={false}
                />

                {/* Floating Copy Button - Modern Ghost Style */}
                <div className="absolute top-0 right-6 z-10">
                    <button
                        onClick={copyToClipboard}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-b-md transition-all duration-200 backdrop-blur-sm opacity-35 hover:opacity-100",
                            isCopied
                                ? "bg-[oklch(var(--brand-core)/0.15)] text-primary"
                                : "bg-elevated/50 hover:bg-elevated text-muted hover:text-body border-b border-x border-border-subtle"
                        )}
                    >
                        {isCopied ? "Copied" : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                    </button>
                </div>

            </div>

            {/* Dedicated Footer - Stats & Trust */}
            <div className="relative h-10 border-t border-border-subtle bg-canvas/30 backdrop-blur-sm px-6 flex items-center justify-between select-none">

                {/* Stats Logic (Left) */}
                <div className="flex items-center gap-4 text-[10px] font-mono font-medium text-muted">
                    <span>{countWords(text)} WORDS</span>
                    <span className="w-px h-3 bg-border-subtle" />
                    <span>{countCharacters(text)} CHARS</span>
                </div>


                {/* Center - Undo/Redo Controls */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                        onClick={undo}
                        disabled={!canUndo}
                        className="p-1.5 text-muted hover:text-body disabled:opacity-30 disabled:hover:text-muted rounded-md transition-colors"
                        title="Undo"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" /></svg>
                    </button>
                    <div className="w-px h-3 bg-border-subtle mx-1" />
                    <button
                        onClick={redo}
                        disabled={!canRedo}
                        className="p-1.5 text-muted hover:text-body disabled:opacity-30 disabled:hover:text-muted rounded-md transition-colors"
                        title="Redo"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" /></svg>
                    </button>
                </div>

                {/* Trust Message (Right) */}
                <div className="flex items-center gap-2 text-[10px] text-muted font-medium opacity-70">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
                    <span>100% CLIENT-SIDE • PRIVACY FIRST</span>
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
    variant?: "primary" | "secondary" | "ghost";
    className?: string;
}

function ActionButton({ onClick, icon, label, isActive, variant = "primary", className }: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 active:scale-95 select-none",
                variant !== "ghost" && "border shadow-sm hover:shadow",
                variant === "primary" && (isActive
                    ? "bg-[oklch(var(--brand-core)/0.1)] text-primary border-[oklch(var(--brand-core)/0.2)]"
                    : "text-muted hover:text-body bg-elevated hover:bg-surface border-border-subtle"),
                variant === "secondary" && isActive && "bg-teal-500/10 text-teal-400 border-teal-500/30",
                variant === "secondary" && !isActive && "text-muted hover:text-body bg-elevated hover:bg-surface border-border-subtle",
                variant === "ghost" && "hover:bg-surface text-muted hover:text-body",
                className
            )}
        >
            {icon}
            <span className={cn("text-center", variant === "primary" ? "min-w-[60px]" : "")}>{label}</span>
        </button>
    );
}
