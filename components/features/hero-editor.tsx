"use client";

import React, { useState, useRef, useEffect } from "react";
import { toSentenceCase, toTitleCase, toHyphenated, countWords, countCharacters, isHyphenated, smartUnhyphenate } from "@/lib/text-utils";
import { Copy, Type, Link, Unlink, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEditor } from "@/components/providers/editor-provider";

interface HeroEditorProps {
    defaultTools?: ('case' | 'hyphenation')[]; // controls which tools are primary
}

export function HeroEditor({ defaultTools }: HeroEditorProps) {
    // History replaced useState
    const [isCopied, setIsCopied] = useState(false);
    const [preservePunctuation, setPreservePunctuation] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    // History Hook (Lifted to Context)
    const { text, setText, undo, redo, canUndo, canRedo, addToHistory } = useEditor();

    // Live Conversion Wrapper
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let val = e.target.value;

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
    const activeStyle = searchParams.get('style');
    const isCaseMode = pathname === "/capitalise-title";
    const isHyphenateMode = pathname === "/hyphenate-text";

    useEffect(() => {
        // Auto-focus on load
        if (textareaRef.current) {
            textareaRef.current.focus();
        }

        // Client-Side SEO: Update Title based on selection (for Static Export support)
        if (activeStyle === 'us') {
            document.title = "US Title Case Converter | CorrectCase";
        } else if (activeStyle === 'uk') {
            document.title = "UK Sentence Case Converter | CorrectCase";
        }
    }, [activeStyle]);

    const handleConversion = async (mode: string) => {
        let newText = text;
        switch (mode) {
            case "sentence":
                // Toggle Off if already active
                if (activeStyle === 'uk') {
                    router.push("/capitalise-title", { scroll: false });
                    return;
                }
                // Toggle On
                newText = toSentenceCase(text);
                router.push("/capitalise-title?style=uk", { scroll: false });
                break;
            case "title":
                // Toggle Off if already active
                if (activeStyle === 'us') {
                    router.push("/capitalise-title", { scroll: false });
                    return;
                }
                // Toggle On
                newText = toTitleCase(text);
                router.push("/capitalise-title?style=us", { scroll: false });
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
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        addToHistory(text, "copy");
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
                                router.push("/capitalise-title");
                            }}
                            icon={<Type className="w-4 h-4" />}
                            label="Capitalise Title"
                            isActive={isCaseMode}
                            className="h-9"
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
                            className="h-9"
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
                                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 5 36 26" className="h-5 w-auto rounded-[2px] shadow-sm"><path fill="#B22334" d="M35.445 7C34.752 5.809 33.477 5 32 5H18v2h17.445zM0 25h36v2H0zm18-8h18v2H18zm0-4h18v2H18zM0 21h36v2H0zm4 10h28c1.477 0 2.752-.809 3.445-2H.555c.693 1.191 1.968 2 3.445 2zM18 9h18v2H18z" /><path fill="#EEE" d="M.068 27.679c.017.093.036.186.059.277.026.101.058.198.092.296.089.259.197.509.333.743L.555 29h34.89l.002-.004c.135-.233.243-.483.332-.741.034-.099.067-.198.093-.301.023-.09.042-.182.059-.275.041-.22.069-.446.069-.679H0c0 .233.028.458.068.679zM0 23h36v2H0zm0-4v2h36v-2H18zm18-4h18v2H18zm0-4h18v2H18zM0 9c0-.233.03-.457.068-.679C.028 8.542 0 8.767 0 9zm.555-2l-.003.005L.555 7zM.128 8.044c.025-.102.06-.199.092-.297-.034.098-.066.196-.092.297zM18 9h18c0-.233-.028-.459-.069-.68-.017-.092-.035-.184-.059-.274-.027-.103-.059-.203-.094-.302-.089-.258-.197-.507-.332-.74.001-.001 0-.003-.001-.004H18v2z" /><path fill="#3C3B6E" d="M18 5H4C1.791 5 0 6.791 0 9v10h18V5z" /><path fill="#FFF" d="M2.001 7.726l.618.449-.236.725L3 8.452l.618.448-.236-.725L4 7.726h-.764L3 7l-.235.726zm2 2l.618.449-.236.725.617-.448.618.448-.236-.725L6 9.726h-.764L5 9l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L9 9l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L13 9l-.235.726zm-8 4l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L5 13l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L9 13l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L13 13l-.235.726zm-6-6l.618.449-.236.725L7 8.452l.618.448-.236-.725L8 7.726h-.764L7 7l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L11 7l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L15 7l-.235.726zm-12 4l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L3 11l-.235.726zM6.383 12.9L7 12.452l.618.448-.236-.725.618-.449h-.764L7 11l-.235.726h-.764l.618.449zm3.618-1.174l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L11 11l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L15 11l-.235.726zm-12 4l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L3 15l-.235.726zM6.383 16.9L7 16.452l.618.448-.236-.725.618-.449h-.764L7 15l-.235.726h-.764l.618.449zm3.618-1.174l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L11 15l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L15 15l-.235.726z" /></svg>}
                                label="US Title Case"
                                isActive={activeStyle === 'us'}
                                variant="toolbar-item"
                            />
                            <div className="w-px h-4 bg-border-subtle" />
                            <ActionButton
                                onClick={() => handleConversion("sentence")}
                                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 5 36 26" className="h-5 w-auto rounded-[2px] shadow-sm"><path fill="#00247D" d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z" /><path fill="#CF1B2B" d="M25.14 23l9.712 6.801c.471-.479.808-1.082.99-1.749L28.627 23H25.14zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943V23zm10-10h2.141l9.711-6.8c-.521-.53-1.188-.909-1.937-1.085L23 12.057V13zm-12.141 0L1.148 6.2C.677 6.68.34 7.282.157 7.949L7.372 13h3.487z" /><path fill="#EEE" d="M36 21H21v10h2v-5.836L31.335 31H32c1.117 0 2.126-.461 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36v-2zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21H0zM36 9c0-1.091-.439-2.078-1.148-2.8L25.141 13H23v-.943l9.915-6.942C32.62 5.046 32.316 5 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059V9zM13 5v5.837L4.664 5H4c-1.118 0-2.126.461-2.852 1.2l9.711 6.8H7.372L.157 7.949C.065 8.286 0 8.634 0 9v.059L5.628 13H0v2h15V5h-2z" /><path fill="#CF1B2B" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z" /></svg>}
                                label="UK Sentence Case"
                                isActive={activeStyle === 'uk'}
                                variant="toolbar-item"
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
            <div className="flex-1 relative group bg-surface transition-colors duration-300">
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Type or paste your text to analyse..."
                    className="w-full h-full p-6 bg-surface border-none outline-none resize-none text-body text-lg leading-relaxed placeholder:text-muted font-sans select-text relative z-10"
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
                "flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 active:scale-95 select-none",
                // Primary Variant
                variant === "primary" && !isActive && "text-muted hover:text-body bg-elevated hover:bg-surface border border-border-subtle shadow-sm hover:shadow",
                variant === "primary" && isActive && "bg-[oklch(var(--brand-core)/0.1)] text-primary border border-[oklch(var(--brand-core)/0.2)] shadow-sm",

                // Secondary Variant (Teal/Accent)
                variant === "secondary" && !isActive && "text-muted hover:text-body bg-elevated hover:bg-surface border border-border-subtle shadow-sm",
                variant === "secondary" && isActive && "bg-teal-500/10 text-teal-400 border border-teal-500/30 shadow-sm",

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
            <span className={cn("text-center", variant === "primary" ? "min-w-[60px]" : "")}>{label}</span>
        </button>
    );
}
