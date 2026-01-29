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
import { EditorFrame } from "@/components/ui/editor-frame";

interface HeroEditorProps {
    defaultTools?: ('case' | 'hyphenation')[];
    forcedStyle?: 'us' | 'uk';
}

export function HeroEditor({ defaultTools, forcedStyle }: HeroEditorProps) {
    const [isCopied, setIsCopied] = useState(false);
    const [preservePunctuation, setPreservePunctuation] = useState(false);
    const [isFocused, setIsFocused] = useState(false); // Track focus state

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();
    const { text, setText, undo, redo, canUndo, canRedo, addToHistory } = useEditor();
    const { scrollTop } = useScroll();
    const isCompact = scrollTop > 10;

    // ... (Keep existing Helper Functions: adjustHeight, handleTextChange, etc.)
    // For brevity in this tool call, I will include them if I replace the whole file. 
    // But to minimize risk, I will focus on replacing the RETURN statement and inserting the import/state.
    
    // I need access to the helper functions reference.
    // I will use `replace_file_content` for the Render Block + State.

    const adjustHeight = () => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = 'auto'; // Reset
            el.style.height = `${Math.min(el.scrollHeight, window.innerHeight * 0.6)}px`;
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let val = e.target.value;
        adjustHeight();
        if (activeStyle === 'uk') val = toSentenceCase(val);
        else if (activeStyle === 'us') val = toTitleCase(val);
        setText(val);
    };

    // ... (rest of logic assumed unchanged for now) ...
    // Wait, I need to know where to cut.
    // I'll assume lines 1-32 are imports/setup.
    // I'll replace the entire file content with the cleaned version. Use `write_to_file`? No, `write_to_file` overwrites.
    // `overwrite: true` is an option!
    // Yes, this is the safest way to ensure "Cleanest 2026 CSS" is to rewrite the file cleanly.
    // I will read the file one more time to copy the logic functions? 
    // I have them in the context from `view_file` (Step 8339).
    // I will re-assemble `HeroEditor.tsx` using the `EditorFrame`.

    // Logic to preserve:
    // - adjustHeight, handleTextChange, handleConversion, copyToClipboard, handleClear, handleKeyDown, handlePaste.
    // - useEffects.
    
    // Let's do it.

    return (
        <EditorFrame
            isCompact={isCompact}
            isFocused={isFocused}
            headerLeft={
                <>
                    <button
                        onClick={handlePaste}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted hover:text-body hover:bg-elevated/50 rounded-md transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-[oklch(var(--brand-core))]"
                        title="Paste from Clipboard"
                    >
                        <ClipboardIcon className="w-3.5 h-3.5" /> Paste
                    </button>
                    <div className="w-px h-3 bg-border-subtle/50" />
                    <button
                        onClick={handleClear}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted hover:text-body hover:bg-elevated/50 rounded-md transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-[oklch(var(--brand-core))]"
                        title="Clear Formatting"
                    >
                        <Eraser className="w-3.5 h-3.5" /> Clear Format
                    </button>
                </>
            }
            headerCenter={
                <>
                    <button onClick={undo} disabled={!canUndo} className="p-1.5 text-muted hover:text-body disabled:opacity-30 rounded-md transition-colors focus:ring-2 focus:ring-[oklch(var(--brand-core))]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" /></svg>
                    </button>
                    <div className="w-px h-3 bg-border-subtle mx-1" />
                    <button onClick={redo} disabled={!canRedo} className="p-1.5 text-muted hover:text-body disabled:opacity-30 rounded-md transition-colors focus:ring-2 focus:ring-[oklch(var(--brand-core))]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" /></svg>
                    </button>
                </>
            }
            headerRight={
                <button
                    onClick={copyToClipboard}
                    className={cn(
                        "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 select-none",
                        isCopied ? "bg-[oklch(var(--brand-core)/0.15)] text-primary" : "text-muted hover:text-body hover:bg-elevated/50"
                    )}
                >
                    {isCopied ? "Copied" : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
            }
            footerLeft={
                <>
                    <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono font-medium text-muted">
                        <span>{countWords(text)} WORDS</span>
                        <span className="w-px h-3 bg-border-subtle" />
                        <span>{countCharacters(text)} CHARS</span>
                    </div>
                    <div className="flex sm:hidden items-center text-[10px] font-mono font-medium text-muted">
                        <span>{countWords(text)} WORDS</span>
                    </div>
                </>
            }
            footerRight={
                <>
                    <div className="flex sm:hidden items-center text-[10px] font-mono font-medium text-muted">
                        <span>{countCharacters(text)} CHARS</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-[10px] text-muted font-medium opacity-70">
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

    // I will write the FULL file to be safe.
    
    // Reconstructing the logic block...
    // I need to be careful not to lose `activeStyle`, `pathname` etc.
    // I'll grab them from the viewed file.
    
    // Logic dump:
    // ...
    // activeStyle = forcedStyle || searchParams.get('style');
    // ...
    
    // Okay, I'll generate the full file content locally in the tool.



