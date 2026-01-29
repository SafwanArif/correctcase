"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { toSentenceCase, toTitleCase, toHyphenated, countWords, countCharacters, isHyphenated, smartUnhyphenate } from "@/lib/text-utils";
import { getListPrefix, incrementListPrefix, stripFormatting } from "@/lib/smart-text";
import { Copy, Clipboard as ClipboardIcon, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScroll } from "@/components/providers/scroll-provider";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEditor } from "@/components/providers/editor-provider";
import { EditorFrame } from "@/components/ui/editor-frame";

interface HeroEditorProps {
    defaultTools?: ('case' | 'hyphenation')[];
    forcedStyle?: 'us' | 'uk';
}

export function HeroEditor({ defaultTools, forcedStyle }: HeroEditorProps) {
    const [isCopied, setIsCopied] = useState(false);
    const [preservePunctuation, setPreservePunctuation] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const cursorOffsetRef = useRef<number | null>(null); // Track cursor position
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { text, setText, undo, redo, canUndo, canRedo, addToHistory } = useEditor();

    // Scroll Context
    const { scrollTop } = useScroll();
    const isCompact = scrollTop > 10;

    // Derived Logic
    const activeStyle = forcedStyle || searchParams.get('style');
    const isTextHyphenated = isHyphenated(text);

    const adjustHeight = () => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = 'auto'; // Reset to recalculate
            const newHeight = Math.min(el.scrollHeight, 400); // Cap at ~15 lines (approx 400px)
            el.style.height = `${newHeight}px`;

            // Enable scroll if content exceeds cap
            if (el.scrollHeight > 400) {
                el.style.overflowY = 'auto';
            } else {
                el.style.overflowY = 'hidden';
            }
        }
    };

    // Effects
    useEffect(() => {
        if (textareaRef.current) adjustHeight();

        // Client-Side SEO
        if (!forcedStyle) {
            if (activeStyle === 'us') document.title = "US Title Case Converter | CorrectCase";
            else if (activeStyle === 'uk') document.title = "UK Sentence Case Converter | CorrectCase";
        }
    }, [activeStyle, forcedStyle, text]);

    // Restore cursor position after render if tracked
    useLayoutEffect(() => {
        if (cursorOffsetRef.current !== null && textareaRef.current) {
            textareaRef.current.setSelectionRange(cursorOffsetRef.current, cursorOffsetRef.current);
            cursorOffsetRef.current = null;
        }
    }, [text]);

    // Global Paste Handler (Ctrl+V anywhere)
    useEffect(() => {
        const handleGlobalPaste = (e: ClipboardEvent) => {
            // Ignore if user is focused on an input/textarea (native behavior applies)
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
                return;
            }

            // Capture pasted text
            const clipboardText = e.clipboardData?.getData('text');
            if (!clipboardText) return;

            e.preventDefault();

            // Append to end. Using functional state implicitly via closure variable 'text'
            const newText = text + clipboardText;

            setText(newText);
            addToHistory(newText, "paste");

            // Focus and Scroll
            if (textareaRef.current) {
                textareaRef.current.focus();
                // Move cursor to end
                textareaRef.current.setSelectionRange(newText.length, newText.length);
                setTimeout(adjustHeight, 0);
            }
        };

        window.addEventListener('paste', handleGlobalPaste);
        return () => window.removeEventListener('paste', handleGlobalPaste);
    }, [text, setText, addToHistory]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const cursorPosition = e.target.selectionStart;
        let val = e.target.value;
        // Text processing happening before set...
        if (activeStyle === 'uk') val = toSentenceCase(val);
        else if (activeStyle === 'us') val = toTitleCase(val);

        cursorOffsetRef.current = cursorPosition;
        setText(val);
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        addToHistory(text, "copy");
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleClear = () => {
        if (!text) return;
        const plainText = stripFormatting(text);
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

            const toggleFormat = (marker: string) => {
                e.preventDefault();
                let insertion = marker;
                let newText;
                let newCursorPos;

                if (hasSelection) {
                    const selected = val.substring(start, end);
                    // Check if already wrapped
                    const isWrapped = val.substring(start - marker.length, start) === marker &&
                        val.substring(end, end + marker.length) === marker;

                    if (isWrapped) {
                        // Unwrap
                        newText = val.substring(0, start - marker.length) + selected + val.substring(end + marker.length);
                        newCursorPos = end - marker.length;
                        // Keep selection logic simplified for now
                        newText = val.substring(0, start) + marker + selected + marker + val.substring(end);
                        newCursorPos = end + marker.length;
                    } else {
                        // Wrap
                        newText = val.substring(0, start) + marker + selected + marker + val.substring(end);
                        newCursorPos = end + marker.length;
                    }
                } else {
                    // No selection
                    newText = val.substring(0, start) + marker + marker + val.substring(end);
                    newCursorPos = start + marker.length;
                }

                setText(newText);
                addToHistory(newText, "format");
                setTimeout(() => {
                    el.focus();
                    el.setSelectionRange(newCursorPos, newCursorPos);
                    adjustHeight();
                }, 0);
            };

            if (e.key === 'b') toggleFormat('**');
            if (e.key === 'i') toggleFormat('*');
            if (e.key === 's' && e.shiftKey) toggleFormat('~~');
        }

        // Smart Lists
        if (e.key === 'Enter') {
            const start = el.selectionStart;
            const value = el.value;

            if (e.shiftKey) return;

            const lineStart = value.lastIndexOf('\n', start - 1) + 1;
            const lineEndSearch = value.indexOf('\n', start);
            const lineEnd = lineEndSearch === -1 ? value.length : lineEndSearch;
            const line = value.substring(lineStart, lineEnd);

            const prefix = getListPrefix(line);
            if (prefix) {
                e.preventDefault();
                if (line.trim() === prefix.trim()) {
                    // Remove prefix if empty line
                    const newVal = value.substring(0, start) + '\n' + value.substring(start);
                    setText(newVal);
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
                setTimeout(() => {
                    el.focus();
                    el.setSelectionRange(start + clipboardText.length, start + clipboardText.length);
                    adjustHeight();
                }, 0);
            } else {
                setText(clipboardText);
                addToHistory(clipboardText, "paste");
            }
        } catch (err) {
            console.error("Failed to read clipboard:", err);
        }
    };

    // Opacity Logic: Individual elements handle their own ghost state
    // Base: 0. Hover: 50. Focus (Editor or Buttons): 75. Self-Hover: 100.
    // Speed: 200ms fade (Faster than collapse)
    const ghost = "transition-opacity duration-200 delay-75 opacity-0 group-hover:opacity-50 group-focus-within:opacity-75 group-data-[focused=true]:opacity-75 hover:!opacity-100";
    const ghostText = "transition-opacity duration-200 delay-75 opacity-0 group-hover:opacity-50 group-focus-within:opacity-75 group-data-[focused=true]:opacity-75"; // Text stats

    return (
        <EditorFrame
            isCompact={isCompact}
            isFocused={isFocused}
            hasContent={text.length > 0}
            headerLeft={
                <>
                    <button
                        onClick={handlePaste}
                        className={cn(ghost, "flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted hover:text-body hover:bg-elevated/50 rounded-md select-none focus:outline-none focus:ring-2 focus:ring-[oklch(var(--brand-core))]")}
                        title="Paste from Clipboard"
                    >
                        <ClipboardIcon className="w-3.5 h-3.5" /> Paste
                    </button>
                    <div className={cn(ghostText, "w-px h-3 bg-border-subtle/50")} />
                    <button
                        onClick={handleClear}
                        className={cn(ghost, "flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted hover:text-body hover:bg-elevated/50 rounded-md select-none focus:outline-none focus:ring-2 focus:ring-[oklch(var(--brand-core))]")}
                        title="Clear Formatting"
                    >
                        <Eraser className="w-3.5 h-3.5" /> Clear Format
                    </button>
                </>
            }
            headerCenter={
                <>
                    <button onClick={undo} disabled={!canUndo} className={cn(ghost, "p-1.5 text-muted hover:text-body disabled:opacity-0 group-hover:disabled:opacity-30 group-focus-within:disabled:opacity-30 rounded-md focus:ring-2 focus:ring-[oklch(var(--brand-core))]")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" /></svg>
                    </button>
                    <div className={cn(ghostText, "w-px h-3 bg-border-subtle mx-1")} />
                    <button onClick={redo} disabled={!canRedo} className={cn(ghost, "p-1.5 text-muted hover:text-body disabled:opacity-0 group-hover:disabled:opacity-30 group-focus-within:disabled:opacity-30 rounded-md focus:ring-2 focus:ring-[oklch(var(--brand-core))]")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" /></svg>
                    </button>
                </>
            }
            headerRight={
                <button
                    onClick={copyToClipboard}
                    className={cn(ghost,
                        "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md select-none",
                        isCopied ? "bg-[oklch(var(--brand-core)/0.15)] text-primary" : "text-muted hover:text-body hover:bg-elevated/50"
                    )}
                >
                    {isCopied ? "Copied" : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
            }
            footerLeft={
                <>
                    <div className={cn(ghostText, "hidden sm:flex items-center gap-4 text-[10px] font-mono font-medium text-muted")}>
                        <span>{countWords(text)} WORDS</span>
                        <span className="w-px h-3 bg-border-subtle" />
                        <span>{countCharacters(text)} CHARS</span>
                    </div>
                    <div className={cn(ghostText, "flex sm:hidden items-center text-[10px] font-mono font-medium text-muted")}>
                        <span>{countWords(text)} WORDS</span>
                    </div>
                </>
            }
            footerRight={
                <>
                    <div className={cn(ghostText, "flex sm:hidden items-center text-[10px] font-mono font-medium text-muted")}>
                        <span>{countCharacters(text)} CHARS</span>
                    </div>
                    <div className={cn(ghostText, "hidden sm:flex items-center gap-2 text-[10px] text-muted font-medium opacity-70")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
                        <span>100% CLIENT-SIDE • PRIVACY FIRST</span>
                    </div>
                </>
            }
        >
            <textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Type or paste your text to analyse..."
                className={cn(
                    "w-full bg-transparent border-none outline-none resize-none text-body font-sans select-text relative z-10 transition-all duration-500 scrollbar-hide",
                    isCompact
                        ? "px-4 py-3 pt-8 text-base leading-normal h-16 whitespace-nowrap overflow-hidden"
                        : "px-6 py-4 text-lg leading-relaxed placeholder:text-muted h-auto min-h-[3rem] overflow-hidden"
                )}
                spellCheck={false}
                rows={1}
            />
        </EditorFrame>
    );
}
