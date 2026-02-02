"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useScroll } from "@/components/providers/scroll-provider";
import { useEditor } from "@/hooks/use-editor";
import { useEventListener } from "@/hooks/use-event-listener";
import { getListPrefix, incrementListPrefix, stripFormatting } from "@/lib/smart-text";
import { toSentenceCase, toTitleCase } from "@/lib/text-utils";

export interface UseHeroEditorProps {
    defaultTools?: ("case" | "hyphenation")[];
    forcedStyle?: "us" | "uk";
    onTextChange?: (text: string) => void;
}

export interface UseHeroEditorReturn {
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
    /**
     * The hook uses text from context.
     */
    text: string;
    isCopied: boolean;
    isFocused: boolean;
    isCompact: boolean;
    setIsFocused: (isFocused: boolean) => void;
    handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    handlePaste: () => void;
    handleClear: () => void;
    copyToClipboard: () => Promise<void>;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

export const useHeroEditor = ({ forcedStyle, onTextChange }: UseHeroEditorProps): UseHeroEditorReturn => {
    const [isCopied, setIsCopied] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    /**
     * Track cursor position.
     */
    const cursorOffsetRef = useRef<number | null>(null);
    const searchParams = useSearchParams();

    const { text, setText, undo, redo, canUndo, canRedo, addToHistory } = useEditor();

    // Scroll Context (Used for UI compaction, but we can return it)
    const { scrollTop } = useScroll();
    const isCompact = scrollTop > 10;

    // Derived Logic
    const activeStyle = forcedStyle || searchParams.get("style");

    // Load pending text from sessionStorage (homepage → tool navigation)
    useEffect(() => {
        const pendingText = sessionStorage.getItem("pendingText");

        if (pendingText) {
            setText(pendingText);
            sessionStorage.removeItem("pendingText");
        }
    }, [setText]); // Only run on mount + setText reference (stable)

    interface InsertTextParams {
        insertedText: string;
        label?: string;
    }

    // --- Actions ---
    const insertTextAtCursor = useCallback(
        ({ insertedText, label = "paste" }: InsertTextParams): void => {
            const el = textareaRef.current;

            if (!el) {
                const combined = text + insertedText;

                setText(combined);
                if (onTextChange) { onTextChange(combined); }
                addToHistory(combined, { mode: label });

                return;
            }

            const start = el.selectionStart;
            const end = el.selectionEnd;
            const newText = text.slice(0, Math.max(0, start)) + insertedText + text.slice(Math.max(0, end));

            setText(newText);
            if (onTextChange) { onTextChange(newText); }
            addToHistory(newText, { mode: label });

            // Queue focus and selection
            setTimeout(() => {
                el.focus();
                const newPos = start + insertedText.length;

                el.setSelectionRange(newPos, newPos);
            }, 0);
        },
        [text, setText, onTextChange, addToHistory]
    );


    // Restore cursor position after render if tracked
    useLayoutEffect(() => {
        if (cursorOffsetRef.current === null || !textareaRef.current) {
            return;
        }

        textareaRef.current.setSelectionRange(cursorOffsetRef.current, cursorOffsetRef.current);
        cursorOffsetRef.current = null;
    }, [text]);

    // Global Paste Handler (Ctrl+V anywhere)
    const handleGlobalPaste = useCallback((e: ClipboardEvent) => {
        const target = e.target as HTMLElement;

        if (
            target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable
        ) { return; }

        const clipboardText = e.clipboardData?.getData("text");

        if (!clipboardText) { return; }

        e.preventDefault();
        insertTextAtCursor({ insertedText: clipboardText, label: "global-paste" });
    }, [insertTextAtCursor]);

    useEventListener("paste", handleGlobalPaste);

    const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const cursorPosition = e.target.selectionStart;
        let val = e.target.value;

        if (activeStyle === "uk") { val = toSentenceCase(val); }
        else if (activeStyle === "us") { val = toTitleCase(val); }

        cursorOffsetRef.current = cursorPosition;
        setText(val);
        if (onTextChange) { onTextChange(val); }
    }, [activeStyle, setText, onTextChange]);

    const copyToClipboard = useCallback(async (): Promise<void> => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        addToHistory(text, { mode: "copy" });
        setTimeout(() => { setIsCopied(false); }, 2000);
    }, [text, addToHistory]);

    const handleClear = useCallback((): void => {
        if (!text) { return; }
        const plainText = stripFormatting(text);

        setText(plainText);
        if (onTextChange) { onTextChange(plainText); }
        addToHistory(plainText, { mode: "clear-formatting" });
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [text, setText, onTextChange, addToHistory]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const el = textareaRef.current;

        if (!el) { return; }

        // Shortcuts
        if (e.ctrlKey || e.metaKey) {
            const start = el.selectionStart;
            const end = el.selectionEnd;
            const hasSelection = start !== end;
            const val = el.value;

            const toggleFormat = (marker: string) => {
                e.preventDefault();
                let newText;
                let newCursorPos;

                if (hasSelection) {
                    const selected = val.slice(start, end);

                    // Wrap with marker
                    newText =
                        val.slice(0, Math.max(0, start)) + marker + selected + marker + val.slice(Math.max(0, end));
                    newCursorPos = end + marker.length;
                } else {
                    // No selection
                    newText = val.slice(0, Math.max(0, start)) + marker + marker + val.slice(Math.max(0, end));
                    newCursorPos = start + marker.length;
                }

                setText(newText);
                addToHistory(newText, { mode: "format" });
                setTimeout(() => {
                    el.focus();
                    el.setSelectionRange(newCursorPos, newCursorPos);
                }, 0);
            };

            if (e.key === "b") { toggleFormat("**"); }
            if (e.key === "i") { toggleFormat("*"); }
            if (e.key === "s" && e.shiftKey) { toggleFormat("~~"); }
        }

        // Smart Lists
        if (e.key === "Enter") {
            const start = el.selectionStart;
            const { value } = el;

            if (e.shiftKey) { return; }

            const lineStart = value.lastIndexOf("\n", start - 1) + 1;
            const lineEndSearch = value.indexOf("\n", start);
            const lineEnd = lineEndSearch === -1 ? value.length : lineEndSearch;
            const line = value.slice(lineStart, lineEnd);

            const prefix = getListPrefix(line);

            if (prefix) {
                e.preventDefault();
                if (line.trim() === prefix.trim()) {
                    // Remove prefix if empty line
                    const newVal = `${value.slice(0, Math.max(0, start))}\n${value.slice(Math.max(0, start))}`;

                    setText(newVal);
                    setTimeout(() => {
                        el.selectionStart = start + 1;
                        el.selectionEnd = start + 1;
                    }, 0);

                    return;
                }

                const nextPrefix = incrementListPrefix(prefix);
                const insertion = `\n${nextPrefix}`;
                const newValue = value.slice(0, Math.max(0, start)) + insertion + value.slice(Math.max(0, start));

                setText(newValue);
                if (onTextChange) { onTextChange(newValue); }
                addToHistory(newValue, { mode: "smart-list" });

                setTimeout(() => {
                    const newPos = start + insertion.length;
                    const { scrollHeight } = el;

                    el.selectionStart = newPos;
                    el.selectionEnd = newPos;
                    el.scrollTop = scrollHeight;
                }, 0);
            }
        }
    }, [setText, addToHistory, onTextChange]);

    const handlePaste = useCallback((): void => {
        navigator.clipboard.readText()
            .then((clipboardText) => {
                if (clipboardText) {
                    insertTextAtCursor({ insertedText: clipboardText, label: "paste-button" });
                }
            })
            .catch((error: unknown) => {
                console.error("Failed to read clipboard:", error);
            });
    }, [insertTextAtCursor]);

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
        canRedo,
    };
}
