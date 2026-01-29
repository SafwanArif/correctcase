"use client";

import React, { useState, useRef, useEffect } from "react";
import { toSentenceCase, toTitleCase, toHyphenated, countWords, countCharacters, isHyphenated, smartUnhyphenate } from "@/lib/text-utils";
import { getListPrefix, incrementListPrefix, stripFormatting } from "@/lib/smart-text";
import { Copy, Type, Link, Unlink, Quote, Clipboard as ClipboardIcon, Eraser } from "lucide-react";
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
        // Auto-focus on load REMOVED to support "Sleek Capsule" state
        if (textareaRef.current) {
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

    // ... (imports moved to top)

    const handleClear = () => {
        if (!text) return;
        const plainText = stripFormatting(text);
        if (plainText === text) {
            // If already plain, verify emptiness? User said "Clear Format", not "Clear All".
            // If they want to clear ALL, they can select all + delete. 
            // But if specific request was "Clear Format", this is correct.
            // If text is totally unchanged, nice to give feedback? 
            // For now, let's allow it to just set text (maybe it was just whitespace cleanup).
        }

        setText(plainText);
        addToHistory(plainText, "clear-formatting");
        if (textareaRef.current) {
            textareaRef.current.focus();
            adjustHeight();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const el = textareaRef.current;
        if (!el) return;

        // Shortcuts
        if ((e.ctrlKey || e.metaKey)) {
            const start = el.selectionStart;
            const end = el.selectionEnd;
            const hasSelection = start !== end;
            const val = el.value;

            // Helper to wrap selection
            const toggleFormat = (marker: string) => {
                e.preventDefault();
                let insertion = marker;
                // If selection selected, wrap it.
                // If not, just insert marker? Or wrap empty?
                // Standard editor: wrap empty cursor or wrap selection.

                let newText;
                let newCursorPos;

                if (hasSelection) {
                    const selected = val.substring(start, end);
                    // Check if already wrapped? (Simple toggle)
                    const isWrapped = val.substring(start - marker.length, start) === marker &&
                        val.substring(end, end + marker.length) === marker;

                    if (isWrapped) {
                        // Unwrap
                        newText = val.substring(0, start - marker.length) + selected + val.substring(end + marker.length);
                        newCursorPos = end - marker.length; // Cursor at end of selection (shifted back)
                        // Actually let's keep selection
                        // This logic gets complex for "perfect" toggle.
                        // Simple approach: Always wrap.
                        newText = val.substring(0, start) + marker + selected + marker + val.substring(end);
                        newCursorPos = end + marker.length;
                    } else {
                        // Wrap
                        newText = val.substring(0, start) + marker + selected + marker + val.substring(end);
                        newCursorPos = end + marker.length;
                    }
                } else {
                    // No selection: insert marker cursor marker
                    newText = val.substring(0, start) + marker + marker + val.substring(end);
                    newCursorPos = start + marker.length; // Cursor inside
                }

                setText(newText);
                addToHistory(newText, "format");
                setTimeout(() => {
                    el.focus();
                    if (hasSelection) {
                        // Select the wrapped text (inner)
                        // For now just set cursor
                        el.setSelectionRange(newCursorPos, newCursorPos);
                    } else {
                        el.setSelectionRange(newCursorPos, newCursorPos);
                    }
                    adjustHeight();
                }, 0);
            };

            if (e.key === 'b') toggleFormat('**');
            if (e.key === 'i') toggleFormat('*');
            if (e.key === 's' && e.shiftKey) toggleFormat('~~'); // Shift+Ctrl+S for Strike
        }

        // Smart Lists
        if (e.key === 'Enter') {
            const start = el.selectionStart;
            const value = el.value;

            if (e.shiftKey) return; // Soft return

            const lineStart = value.lastIndexOf('\n', start - 1) + 1;
            const lineEndSearch = value.indexOf('\n', start);
            const lineEnd = lineEndSearch === -1 ? value.length : lineEndSearch;
            const line = value.substring(lineStart, lineEnd);

            const prefix = getListPrefix(line);
            if (prefix) {
                e.preventDefault();
                // If line is empty prefix only, break list
                if (line.trim() === prefix.trim()) {
                    // Remove prefix
                    const newValue = value.substring(0, lineStart) + value.substring(lineEnd);
                    // Add newline? Usually yes.
                    setText(newValue + '\n');
                    // Cursor move? Logic complex.
                    // Fallback: Just insert newline without prefix if empty.
                    // Implementation: allow default behavior if empty? No, remove prefix.
                    // Simpler: Just don't add prefix.
                    const newVal = value.substring(0, start) + '\n' + value.substring(start);
                    setText(newVal);
                    // We manually inserting \n so we need to set cursor
                    setTimeout(() => {
                        el.selectionStart = el.selectionEnd = start + 1;
                        adjustHeight();
                    }, 0);
                    return;
                }

                const nextPrefix = incrementListPrefix(prefix);
                const insertion = `\n${nextPrefix}`;
                const newValue = value.substring(0, start) + insertion + value.substring(start);

                setText(newValue);
                addToHistory(newValue, "smart-list");

                setTimeout(() => {
                    el.selectionStart = el.selectionEnd = start + insertion.length;
                    el.scrollTop = el.scrollHeight;
                    adjustHeight();
                }, 0);
            }
        }
    };

    const handlePaste = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            if (!clipboardText) return;

            const el = textareaRef.current;
            if (el) {
                const start = el.selectionStart;
                const end = el.selectionEnd;
                const currentText = text;

                const newText = currentText.substring(0, start) + clipboardText + currentText.substring(end);

                setText(newText);
                addToHistory(newText, "paste");

                // Restore focus and cursor position after render
                setTimeout(() => {
                    el.focus();
                    el.setSelectionRange(start + clipboardText.length, start + clipboardText.length);
                    adjustHeight();
                }, 0);
            } else {
                // Fallback if ref missing
                setText(clipboardText);
                addToHistory(clipboardText, "paste");
            }
        } catch (err) {
            console.error("Failed to read clipboard:", err);
            // Optionally notify user about permissions
        }
    };

    // const isCompact = useScroll().scrollTop > 10; // REMOVED DUPLICATE

    return (
        <div className={cn(
            "flex flex-col shrink-0 relative transition-all duration-500 ease-spring sticky z-40 mx-auto left-0 right-0 w-[90%] max-w-3xl rounded-2xl border overflow-hidden group",
            isCompact
                ? "top-2 bg-surface/90 backdrop-blur-xl border-border-subtle shadow-2xl"
                : "top-2 bg-surface border-border-subtle/40 shadow-sm my-2"
        )}>

            {/* Internal Editor Header - Action Tier (Floating & Expanding) */}
            <div className={cn(
                "absolute top-0 left-0 w-full z-30 flex items-center justify-between px-3 py-1 transition-all duration-500 overflow-hidden",
                // Expansion Logic
                "max-h-0 group-hover:max-h-12 group-focus-within:max-h-12",
                isCompact
                    ? "bg-surface/80 backdrop-blur-xl border-b border-border-subtle/50"
                    : "bg-transparent"
            )}>
                {/* Left - Paste & Clear */}
                <div className="flex-1 flex items-center justify-start gap-2 opacity-0 group-hover:opacity-50 group-focus-within:opacity-75 transition-opacity duration-500 delay-100">
                    <button
                        onClick={handlePaste}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted hover:text-body hover:bg-elevated/50 rounded-md transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-[oklch(var(--brand-core))] hover:!opacity-100"
                        title="Paste from Clipboard"
                    >
                        <ClipboardIcon className="w-3.5 h-3.5" /> Paste
                    </button>

                    <div className="w-px h-3 bg-border-subtle/50" />

                    <button
                        onClick={handleClear}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted hover:text-body hover:bg-elevated/50 rounded-md transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-[oklch(var(--brand-core))] hover:!opacity-100"
                        title="Clear Formatting (Markdown)"
                    >
                        <Eraser className="w-3.5 h-3.5" /> Clear Format
                    </button>
                </div>

                {/* Center - Undo/Redo Controls */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-50 group-focus-within:opacity-75 transition-opacity duration-500 delay-100">
                    <button
                        onClick={undo}
                        disabled={!canUndo}
                        className="p-1.5 text-muted hover:text-body disabled:opacity-30 disabled:hover:text-muted rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[oklch(var(--brand-core))] hover:!opacity-100"
                        title="Undo"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" /></svg>
                    </button>
                    <div className="w-px h-3 bg-border-subtle mx-1" />
                    <button
                        onClick={redo}
                        disabled={!canRedo}
                        className="p-1.5 text-muted hover:text-body disabled:opacity-30 disabled:hover:text-muted rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[oklch(var(--brand-core))] hover:!opacity-100"
                        title="Redo"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" /></svg>
                    </button>
                </div>

                {/* Right - Copy Button */}
                <div className="flex-1 flex justify-end opacity-0 group-hover:opacity-50 group-focus-within:opacity-75 transition-opacity duration-500 delay-100">
                    <button
                        onClick={copyToClipboard}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 select-none hover:!opacity-100",
                            isCopied
                                ? "bg-[oklch(var(--brand-core)/0.15)] text-primary"
                                : "text-muted hover:text-body hover:bg-elevated/50"
                        )}
                        title="Copy to Clipboard"
                    >
                        {isCopied ? "Copied" : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                    </button>
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
                    onKeyDown={handleKeyDown}
                    placeholder="Type or paste your text to analyse..."
                    className={cn(
                        "w-full bg-transparent border-none outline-none resize-none text-body font-sans select-text relative z-10 transition-all duration-500 scrollbar-hide",
                        isCompact
                            ? "px-4 py-3 pt-8 text-base leading-normal h-16 whitespace-nowrap overflow-hidden"
                            : "px-6 py-4 group-hover:pt-9 group-hover:pb-9 group-focus-within:pt-9 group-focus-within:pb-9 text-lg leading-relaxed placeholder:text-muted h-auto min-h-[3rem] group-hover:min-h-[6.5rem] group-focus-within:min-h-[6.5rem] overflow-hidden"
                    )}
                    spellCheck={false}
                    rows={1}
                />
            </div>

            {/* Dedicated Footer - Stats & Trust (Collapsible Floating & Expanding) */}
            <div className={cn(
                "absolute bottom-0 left-0 w-full z-30 px-6 flex items-center justify-between select-none transition-all duration-500 overflow-hidden rounded-b-2xl",
                // Expansion Logic
                "max-h-0 group-hover:max-h-10 group-focus-within:max-h-10",
                isCompact
                    ? "h-0 opacity-0"
                    : "h-8 bg-transparent"
            )}>

                {/* Left Side Group */}
                <div className="flex items-center opacity-0 group-hover:opacity-50 group-focus-within:opacity-75 transition-opacity duration-500 delay-100">
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

                {/* Right Side Group */}
                <div className="flex items-center opacity-0 group-hover:opacity-50 group-focus-within:opacity-75 transition-opacity duration-500 delay-100">
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


