import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEditor } from "@/components/providers/editor-provider";
import { useScroll } from "@/components/providers/scroll-provider";
import { toSentenceCase, toTitleCase, toHyphenated, countWords, countCharacters, isHyphenated, smartUnhyphenate } from "@/lib/text-utils";
import { getListPrefix, incrementListPrefix, stripFormatting } from "@/lib/smart-text";
import { cn } from "@/lib/utils";

export interface UseHeroEditorProps {
    defaultTools?: ('case' | 'hyphenation')[];
    forcedStyle?: 'us' | 'uk';
}

export function useHeroEditor({ defaultTools, forcedStyle }: UseHeroEditorProps) {
    const [isCopied, setIsCopied] = useState(false);
    const [preservePunctuation, setPreservePunctuation] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const cursorOffsetRef = useRef<number | null>(null); // Track cursor position
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { text, setText, undo, redo, canUndo, canRedo, addToHistory } = useEditor();

    // Scroll Context (Used for UI compaction, but we can return it)
    const { scrollTop } = useScroll();
    const isCompact = scrollTop > 10;

    // Derived Logic
    const activeStyle = forcedStyle || searchParams.get('style');
    // const isTextHyphenated = isHyphenated(text); // Unused in main logic, but maybe useful for UI?

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

    return {
        // Refs & State
        textareaRef,
        text,
        isCopied,
        isFocused,
        isCompact,

        // Actions
        setIsFocused,
        handleTextChange,
        handleKeyDown,
        handlePaste,
        handleClear,
        copyToClipboard,

        // History Actions
        undo,
        redo,
        canUndo,
        canRedo
    };
}
