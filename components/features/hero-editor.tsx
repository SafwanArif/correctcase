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
                            icon={<svg viewBox="0 0 640 480" className="w-4 h-4 rounded-[1px] shadow-sm"><path fill="#bd3d44" d="M0 0h640v480H0" /><path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 202.8h640M0 276.5h640M0 350.2h640M0 423.9h640" /><path fill="#192f5d" d="M0 0h259.8v193.5H0z" /><path fill="#fff" d="M12.7 0h36.6v34.4h37.5v34.4h-37.5v34.3H12.7V68.8H-24.8V34.4h37.5zm50.8 193.5h36.6v-34.4h37.5v-34.4h-37.5v-34.3H63.5v34.3h-37.5v34.4h37.5z" /><path fill="#fff" d="M12.7 159.1h15.2v34.4H12.7zm208.6-159.1h15.2v34.4h-15.2z" /><path fill="#fff" d="M149.2 86h24.8v21.5h-24.8zm-82.6 0H91.4v21.5H66.6z" /><path fill="#fff" d="M149.2 150.5h24.8V172h-24.8zm-82.6 0H91.4V172H66.6z" /></svg>}
                            label="US Title Case"
                            isActive={activeCase === 'title'}
                            variant="secondary"
                            className="h-9 text-xs px-3 border-none shadow-none bg-elevated/50 hover:bg-elevated"
                        />
                        <div className="w-px h-4 bg-border-subtle" />
                        <ActionButton
                            onClick={() => handleConversion("sentence")}
                            icon={<svg viewBox="0 0 640 480" className="w-4 h-4 rounded-[1px] shadow-sm"><path fill="#012169" d="M0 0h640v480H0z" /><path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 80 480H0v-60l240-179L0 60V0h75z" /><path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 5L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176-6-5L0 0z" /><path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" /><path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" /></svg>}
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
