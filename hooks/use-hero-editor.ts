import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useEditor } from "@/components/providers/editor-provider";
import { useScroll } from "@/components/providers/scroll-provider";
import { toSentenceCase, toTitleCase } from "@/lib/text-utils";
import { getListPrefix, incrementListPrefix, stripFormatting } from "@/lib/smart-text";

export interface UseHeroEditorProps {
    defaultTools?: ('case' | 'hyphenation')[];
    forcedStyle?: 'us' | 'uk';
    onTextChange?: (text: string) => void;
}

export function useHeroEditor({ forcedStyle, onTextChange }: UseHeroEditorProps) {
    const [isCopied, setIsCopied] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const cursorOffsetRef = useRef<number | null>(null); // Track cursor position
    const searchParams = useSearchParams();

    const { text, setText, undo, redo, canUndo, canRedo, addToHistory } = useEditor();

    // Scroll Context (Used for UI compaction, but we can return it)
    const { scrollTop } = useScroll();
    const isCompact = scrollTop > 10;

    // Derived Logic
    const activeStyle = forcedStyle || searchParams.get('style');

    // Notify parent of text changes
    useEffect(() => {
        if (onTextChange) {
            onTextChange(text);
        }
    }, [text, onTextChange]);

    // Load pending text from sessionStorage (homepage → tool navigation)
    useEffect(() => {
        const pendingText = sessionStorage.getItem("pendingText");
        if (pendingText) {
            setText(pendingText);
            sessionStorage.removeItem("pendingText");
        }
    }, []); // Only run on mount

    // --- Actions ---
    const insertTextAtCursor = useCallback((insertedText: string, label: string = "paste") => {
        const el = textareaRef.current;
        if (!el) {
            const combined = text + insertedText;
            setText(combined);
            addToHistory(combined, label);
            return;
        }

        const start = el.selectionStart;
        const end = el.selectionEnd;
        const newText = text.substring(0, start) + insertedText + text.substring(end);

        setText(newText);
        addToHistory(newText, label);

        // Queue focus and selection
        setTimeout(() => {
            el.focus();
            const newPos = start + insertedText.length;
            el.setSelectionRange(newPos, newPos);
        }, 0);
    }, [text, setText, addToHistory]);

    // Effects
    useEffect(() => {
        // Handlers no longer need to call adjustHeight manually due to CSS field-sizing
    }, []);

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
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

            const clipboardText = e.clipboardData?.getData('text');
            if (!clipboardText) return;

            e.preventDefault();
            insertTextAtCursor(clipboardText, "global-paste");
        };

        window.addEventListener('paste', handleGlobalPaste);
        return () => window.removeEventListener('paste', handleGlobalPaste);
    }, [insertTextAtCursor]); // Much more stable: insertTextAtCursor is memoized

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const cursorPosition = e.target.selectionStart;
        let val = e.target.value;
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
                let newText;
                let newCursorPos;

                if (hasSelection) {
                    const selected = val.substring(start, end);
                    // Wrap with marker
                    newText = val.substring(0, start) + marker + selected + marker + val.substring(end);
                    newCursorPos = end + marker.length;
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
                }, 0);
            }
        }
    };

    const handlePaste = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            if (clipboardText) insertTextAtCursor(clipboardText, "paste-button");
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
