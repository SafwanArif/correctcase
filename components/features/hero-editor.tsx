"use client";

import React from "react";
import { Copy, Clipboard as ClipboardIcon, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";
import { EditorFrame } from "@/components/ui/editor-frame";
import { countWords, countCharacters } from "@/lib/text-utils";
import { useHeroEditor, UseHeroEditorProps } from "@/hooks/use-hero-editor";

// Retain export for compatibility if needed, or rely on import from hook file.
// Ideally, we move the props interface to a shared location, but for now we import it.
// Actually, let's keep it here if it was simpler, but the hook needs it.
// We'll use the one from the hook.

export function HeroEditor(props: UseHeroEditorProps) {
    const {
        textareaRef,
        text,
        isCopied,
        isFocused,
        isCompact,
        setIsFocused,
        handleTextChange,
        handleKeyDown,
        handlePaste,
        handleClear,
        copyToClipboard,
        undo,
        redo,
        canUndo,
        canRedo
    } = useHeroEditor(props);

    // 2026 Metric Memoization (Prevents O(N) thrashing on every re-render)
    const metrics = React.useMemo(() => ({
        words: countWords(text),
        chars: countCharacters(text)
    }), [text]);


    return (
        <EditorFrame
            isCompact={isCompact}
            isFocused={isFocused}
            hasContent={text.length > 0}
            headerLeft={
                <>
                    <button
                        onClick={handlePaste}
                        className="ghost-expansion flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted hover:text-body hover:bg-elevated/50 rounded-md select-none focus:outline-none focus:ring-2 focus:ring-primary"
                        title="Paste from Clipboard"
                    >
                        <ClipboardIcon className="w-3.5 h-3.5" /> Paste
                    </button>
                    <div className="ghost-expansion w-px h-3 bg-border-subtle/50" />
                    <button
                        onClick={handleClear}
                        className="ghost-expansion flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted hover:text-body hover:bg-elevated/50 rounded-md select-none focus:outline-none focus:ring-2 focus:ring-primary"
                        title="Clear Formatting"
                    >
                        <Eraser className="w-3.5 h-3.5" /> Clear Format
                    </button>
                </>
            }
            headerCenter={
                <>
                    <button onClick={undo} disabled={!canUndo} className="ghost-expansion p-1.5 text-muted hover:text-body disabled:opacity-0 group-hover:disabled:opacity-30 group-focus-within:disabled:opacity-30 rounded-md focus:ring-2 focus:ring-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" /></svg>
                    </button>
                    <div className="ghost-expansion w-px h-3 bg-border-subtle mx-1" />
                    <button onClick={redo} disabled={!canRedo} className="ghost-expansion p-1.5 text-muted hover:text-body disabled:opacity-0 group-hover:disabled:opacity-30 group-focus-within:disabled:opacity-30 rounded-md focus:ring-2 focus:ring-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" /></svg>
                    </button>
                </>
            }
            headerRight={
                <button
                    onClick={copyToClipboard}
                    className={cn("ghost-expansion flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md select-none transition-all duration-300 action-gravity",
                        isCopied ? "bg-victory/20 text-victory shadow-success scale-105" : "text-muted hover:text-body hover:bg-elevated/50"
                    )}
                    aria-label={isCopied ? "Text copied to clipboard" : "Copy text to clipboard"}
                >
                    <div role="status" aria-live="polite" className="flex items-center gap-2">
                        {isCopied ? "Copied" : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                    </div>
                </button>
            }
            footerLeft={
                <>
                    <div className="ghost-expansion hidden sm:flex items-center gap-4 text-[10px] font-mono font-medium text-muted">
                        <span>{metrics.words} WORDS</span>
                        <span className="w-px h-3 bg-border-subtle" />
                        <span>{metrics.chars} CHARS</span>
                    </div>
                    <div className="ghost-expansion flex sm:hidden items-center text-[10px] font-mono font-medium text-muted">
                        <span>{metrics.words} WORDS</span>
                    </div>
                </>
            }
            footerRight={
                <>
                    <div className="ghost-expansion flex sm:hidden items-center text-[10px] font-mono font-medium text-muted">
                        <span>{metrics.chars} CHARS</span>
                    </div>
                    <div className="ghost-expansion hidden sm:flex items-center gap-2 text-[10px] text-muted font-medium opacity-70">
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
                aria-label="Text editor for case conversion and hyphenation"
                aria-multiline="true"
                className={cn(
                    "w-full bg-transparent border-none outline-none resize-none text-body font-sans select-text relative z-10 transition-all duration-500 scrollbar-hide auto-grow",
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
