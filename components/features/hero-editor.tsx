"use client";

import React, { useState, useRef, useEffect } from "react";
import { toSentenceCase, toTitleCase, toHyphenated, countWords, countCharacters, isHyphenated, smartUnhyphenate } from "@/lib/text-utils";
import { addToHistory } from "@/lib/db";
import { Copy, Type, Link, Unlink, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface HeroEditorProps {
    defaultTools?: ('case' | 'hyphenation')[]; // controls which tools are primary
}

export function HeroEditor({ defaultTools }: HeroEditorProps) {
    const [text, setText] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [preservePunctuation, setPreservePunctuation] = useState(false);
    const [activeMode, setActiveMode] = useState<'case' | 'hyphenate' | null>(
        defaultTools?.includes('case') && defaultTools.length === 1 ? 'case' : null
    );
    const [activeCase, setActiveCase] = useState<'title' | 'sentence' | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

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

        setText(newText);
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
                            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1235 650" className="w-5 h-3.5 rounded-[1px] shadow-sm"><path fill="#B22234" d="M0 0h1235v650H0z" /><path stroke="#FFF" strokeWidth="50" d="M0 55h1235M0 125h1235M0 195h1235M0 265h1235M0 335h1235M0 405h1235M0 475h1235M0 545h1235M0 615h1235" /><path fill="#3C3B6E" d="M0 0h494v350H0z" /><g fill="#FFF"><g id="s18"><g id="s9"><g id="s5"><g id="s4"><path id="s" d="M24.7 9.8L16.2 38l25.8-19h-31.9l26.2 19z" /><use xlinkHref="#s" x="42" /></g><use xlinkHref="#s" x="84" /></g><use xlinkHref="#s5" x="168" /></g><use xlinkHref="#s9" x="252" /><use xlinkHref="#s" x="336" /></g><use xlinkHref="#s18" y="70" /><use xlinkHref="#s18" y="140" /><use xlinkHref="#s18" y="210" /><use xlinkHref="#s18" y="280" /><use xlinkHref="#s9" y="35" x="21" /><use xlinkHref="#s9" y="105" x="21" /><use xlinkHref="#s9" y="175" x="21" /><use xlinkHref="#s9" y="245" x="21" /></g></svg>}
                            label="US Title Case"
                            isActive={activeCase === 'title'}
                            variant="secondary"
                            className="h-9 text-xs px-3 border-none shadow-none bg-elevated/50 hover:bg-elevated"
                        />
                        <div className="w-px h-4 bg-border-subtle" />
                        <ActionButton
                            onClick={() => handleConversion("sentence")}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-3.5 rounded-[1px] shadow-sm"><path fill="#012169" d="M0 0h60v30H0z" /><path fill="#FFF" d="M0 0l60 30m0-30L0 30" strokeWidth="6" /><path fill="none" stroke="#C8102E" strokeWidth="4" d="M0 0l60 30m0-30L0 30" /><path fill="#FFF" d="M30 0v30M0 15h60" strokeWidth="10" /><path fill="none" stroke="#C8102E" strokeWidth="6" d="M30 0v30M0 15h60" /></svg>}
                            label="UK Sentence Case"
                            isActive={activeCase === 'sentence'}
                            variant="secondary"
                            className="h-9 text-xs px-3 border-none shadow-none bg-elevated/50 hover:bg-elevated"
                        />
                    </div>
                )}

                {showHyphenTools && (
                    <div className="flex items-center gap-2 w-full">
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
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text to analyse..."
                    className="w-full h-full p-6 pb-20 bg-transparent border-none outline-none resize-none text-body text-lg leading-relaxed placeholder:text-muted font-sans select-text"
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

                {/* Stats overlay - Bottom Left Tabs */}
                <div className="absolute bottom-0 left-6 z-10">
                    <div className="flex items-center gap-4 text-[10px] font-mono font-medium text-muted bg-elevated/50 backdrop-blur-sm px-3 py-1.5 rounded-t-lg border-t border-x border-border-subtle shadow-sm opacity-60 hover:opacity-100 transition-opacity duration-300 select-none">
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
