"use client";

import React, { useState, useRef, useEffect } from "react";
import { toSentenceCase, toTitleCase, toHyphenated, countWords, countCharacters, isHyphenated, smartUnhyphenate } from "@/lib/text-utils";
import { Copy, Type, Link, Unlink, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { UsTitleCaseIcon, UkSentenceCaseIcon } from "@/components/ui/custom-icons";
import { useScroll } from "@/components/providers/scroll-provider";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEditor } from "@/components/providers/editor-provider";

interface HeroEditorProps {
    defaultTools?: ('case' | 'hyphenation')[]; // controls which tools are primary
    forcedStyle?: 'us' | 'uk'; // New: Support for static routes
}

export function HeroEditor({ defaultTools, forcedStyle }: HeroEditorProps) {
    // History replaced useState
    const [isCopied, setIsCopied] = useState(false);
    const [preservePunctuation, setPreservePunctuation] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    // History Hook (Lifted to Context)
    const { text, setText, undo, redo, canUndo, canRedo, addToHistory } = useEditor();

    // Scroll Context
    // const { isCompact } = useScroll(); // Use local derived for now to ensure sensitivity match
    const { scrollTop } = useScroll();
    const isCompact = scrollTop > 10;

    const adjustHeight = () => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = 'auto'; // Reset to recalculate
            el.style.height = `${Math.min(el.scrollHeight, window.innerHeight * 0.6)}px`; // Grow up to 60vh
        }
    };

    // Live Conversion Wrapper
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let val = e.target.value;
        adjustHeight();

        // "Live Mode": Apply active transformation immediately while typing
        if (activeStyle === 'uk') {
            val = toSentenceCase(val);
        } else if (activeStyle === 'us') {
            val = toTitleCase(val);
        }

        setText(val);
    };

    // Derived State
    const isTextHyphenated = isHyphenated(text);

    // Determine visibility based on defaultTools prop (if provided)
    const showCaseTools = !defaultTools || defaultTools.includes('case');
    const showHyphenTools = !defaultTools || defaultTools.includes('hyphenation');

    const pathname = usePathname();
    const searchParams = useSearchParams();

    // URL-Driven State (Source of Truth)
    const activeStyle = forcedStyle || searchParams.get('style');

    // Derived Mode Checks
    const isCaseMode = pathname?.includes("/capitalise-title");
    const isHyphenateMode = pathname === "/hyphenate-text";

    useEffect(() => {
        // Auto-focus on load
        if (textareaRef.current) {
            textareaRef.current.focus();
            adjustHeight();
        }

        // Client-Side SEO: Update Title based on selection (for Static Export support)
        if (!forcedStyle) {
            if (activeStyle === 'us') {
                document.title = "US Title Case Converter | CorrectCase";
            } else if (activeStyle === 'uk') {
                document.title = "UK Sentence Case Converter | CorrectCase";
            }
        }
    }, [activeStyle, forcedStyle, text]); // Add text dependency to resizing on load

    const handleConversion = async (mode: string) => {
        let newText = text;
        switch (mode) {
            case "sentence":
                // Toggle Off if already active (Go back to root)
                if (activeStyle === 'uk') {
                    router.push("/capitalise-title", { scroll: false }); // Or keep active? Design choice. Let's toggle.
                    return;
                }
                // Toggle On (New Static Route)
                newText = toSentenceCase(text);
                router.push("/capitalise-title/uk-sentence-case", { scroll: false });
                break;
            case "title":
                // Toggle Off
                if (activeStyle === 'us') {
                    router.push("/capitalise-title", { scroll: false });
                    return;
                }
                // Toggle On (New Static Route)
                newText = toTitleCase(text);
                router.push("/capitalise-title/us-title-case", { scroll: false });
                break;
            case "hyphenate":
                // Hyphenate is a route, not a query param style, but logic remains similar for now
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
        // Defer height adjust to allow render update
        setTimeout(adjustHeight, 0);
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        addToHistory(text, "copy");
        setTimeout(() => setIsCopied(false), 2000);
    };

    // const isCompact = useScroll().scrollTop > 10; // REMOVED DUPLICATE

    return (
        <div className={cn(
            "flex flex-col shrink-0 relative transition-all duration-500 ease-spring sticky z-40 mx-auto left-0 right-0 w-[90%] max-w-3xl rounded-2xl border overflow-hidden",
            isCompact
                ? "top-4 bg-surface/90 backdrop-blur-xl border-border-subtle shadow-2xl"
                : "top-4 bg-surface border-border-subtle/40 shadow-sm mt-6 mb-12"
        )}>

            {/* Toolbar - Crisp & Professional */}
            <div className={cn(
                "flex flex-wrap items-center gap-3 bg-transparent transition-all duration-500",
                isCompact ? "px-3 py-2 border-b-0 min-h-[48px]" : "p-3 border-b border-border-subtle"
            )}>

                {/* Case Tools Group - Nested Logic */}
                {showCaseTools && (
                    <div className="flex items-center gap-2">
                        <ActionButton
                            onClick={() => {
                                router.push("/capitalise-title");
                            }}
                            icon={<Type className="w-4 h-4" />}
                            label="Capitalise Title"
                            isActive={isCaseMode}
                            className={cn("h-9 transition-all duration-500", isCompact && "h-8 text-xs")}
                        />

                    </div>
                )}

                {/* Hyphenation Tool (Primary) */}
                {showHyphenTools && (!showCaseTools || !isCaseMode) && (
                    <div className="flex items-center gap-2">
                        <ActionButton
                            onClick={() => {
                                handleConversion("hyphenate");
                            }}
                            icon={isTextHyphenated ? <Unlink className="w-3.5 h-3.5" /> : <Link className="w-3.5 h-3.5" />}
                            label={isTextHyphenated ? "Unhyphenate" : "Hyphenate"}
                            isActive={isTextHyphenated}
                            className={cn("h-9 transition-all duration-500", isCompact && "h-8 text-xs")}
                        />
                    </div>
                )}

                {/* Secondary Tools Area - Always Right Aligned */}
                <div className="flex items-center gap-2 ml-auto animate-in fade-in slide-in-from-left-2 duration-200">

                    {/* Case Secondary Options */}
                    {isCaseMode && (
                        <>
                            <ActionButton
                                onClick={() => handleConversion("title")}
                                icon={<UsTitleCaseIcon className={cn("w-auto rounded-[2px] shadow-sm transition-all duration-500", isCompact ? "h-4" : "h-5")} />}
                                label="US Title Case"
                                isActive={activeStyle === 'us'}
                                variant="toolbar-item"
                                className={cn("transition-all duration-500", isCompact && "h-8 px-2 text-[10px]")}
                            />
                            <div className="w-px h-4 bg-border-subtle" />
                            <ActionButton
                                onClick={() => handleConversion("sentence")}
                                icon={<UkSentenceCaseIcon className={cn("w-auto rounded-[2px] shadow-sm transition-all duration-500", isCompact ? "h-4" : "h-5")} />}
                                label="UK Sentence Case"
                                isActive={activeStyle === 'uk'}
                                variant="toolbar-item"
                                className={cn("transition-all duration-500", isCompact && "h-8 px-2 text-[10px]")}
                            />
                        </>
                    )}

                    {/* Hyphenation Secondary Options */}
                    {(defaultTools?.includes('hyphenation') || isHyphenateMode) && (
                        <ActionButton
                            onClick={() => setPreservePunctuation(!preservePunctuation)}
                            icon={<Quote className="w-3.5 h-3.5" />}
                            label="Keep Punctuation"
                            isActive={preservePunctuation}
                            variant="toolbar-item"
                            className="hidden sm:flex"
                        />
                    )}
                </div>
            </div>

            {/* Editor Area - "Paper" Feel */}
            <div className={cn(
                "relative group bg-focus transition-all duration-500 ease-spring overflow-hidden",
                isCompact ? "h-auto bg-transparent" : "h-auto"
            )}>
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Type or paste your text to analyse..."
                    className={cn(
                        "w-full bg-transparent border-none outline-none resize-none text-body font-sans select-text relative z-10 transition-all duration-500 scrollbar-hide",
                        isCompact ? "px-4 py-3 text-base leading-normal h-14 whitespace-nowrap overflow-hidden" : "p-6 text-lg leading-relaxed placeholder:text-muted h-auto min-h-[3.5rem]"
                    )}
                    spellCheck={false}
                    rows={1}
                />

                {/* Floating Copy Button - Modern Ghost Style */}
                <div className={cn(
                    "absolute right-4 z-10 transition-all duration-500",
                    isCompact ? "top-2.5" : "top-0"
                )}>
                    <button
                        onClick={copyToClipboard}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-b-md transition-all duration-200 backdrop-blur-sm opacity-50 group-hover:opacity-75 group-focus-within:opacity-75 hover:!opacity-100",
                            isCopied
                                ? "bg-[oklch(var(--brand-core)/0.15)] text-primary opacity-100"
                                : "bg-elevated/50 hover:bg-elevated text-muted hover:text-body border-b border-x border-border-subtle",
                            isCompact && "rounded-md border shadow-sm"
                        )}
                    >
                        {isCopied ? "Copied" : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                    </button>
                </div>

            </div>

            {/* Dedicated Footer - Stats & Trust (Collapsible) */}
            <div className={cn(
                "relative border-t border-border-subtle bg-focus backdrop-blur-sm px-6 flex items-center justify-between select-none transition-all duration-500 overflow-hidden",
                isCompact ? "h-0 opacity-0 border-none" : "h-10 opacity-100"
            )}>

                {/* Left Side Group */}
                <div className="flex items-center">
                    {/* Desktop Stats: Combined */}
                    <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono font-medium text-muted">
                        <span>{countWords(text)} WORDS</span>
                        <span className="w-px h-3 bg-border-subtle" />
                        <span>{countCharacters(text)} CHARS</span>
                    </div>

                    {/* Mobile Stats: Words Only (Left) */}
                    <div className="flex sm:hidden items-center text-[10px] font-mono font-medium text-muted">
                        <span>{countWords(text)} WORDS</span>
                    </div>
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

                {/* Right Side Group */}
                <div className="flex items-center">
                    {/* Mobile Stats: Chars Only (Right) */}
                    <div className="flex sm:hidden items-center text-[10px] font-mono font-medium text-muted">
                        <span>{countCharacters(text)} CHARS</span>
                    </div>

                    {/* Trust Message (Desktop Only) */}
                    <div className="hidden sm:flex items-center gap-2 text-[10px] text-muted font-medium opacity-70">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
                        <span>100% CLIENT-SIDE • PRIVACY FIRST</span>
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
    variant?: "primary" | "secondary" | "ghost" | "toolbar-item";
    className?: string;
    type?: "button" | "submit" | "reset";
}

function ActionButton({ onClick, icon, label, isActive, variant = "primary", className, type = "button" }: ActionButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 active:scale-95 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--brand-core))]",
                // Primary Variant
                variant === "primary" && !isActive && "text-muted hover:text-body bg-elevated hover:bg-surface border border-border-subtle shadow-sm hover:shadow",
                variant === "primary" && isActive && "bg-[oklch(var(--brand-core)/0.1)] text-primary border border-[oklch(var(--brand-core)/0.2)] shadow-sm",

                // Secondary Variant (Teal/Accent)
                variant === "secondary" && !isActive && "text-muted hover:text-body bg-elevated hover:bg-surface border border-border-subtle shadow-sm",
                variant === "secondary" && isActive && "bg-[oklch(var(--brand-secondary)/0.1)] text-[oklch(var(--brand-secondary))] border-[oklch(var(--brand-secondary)/0.3)] border shadow-sm",

                // Toolbar Item (Borderless, Small, Uniform)
                variant === "toolbar-item" && "h-9 text-xs px-3 border-none shadow-none",
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
