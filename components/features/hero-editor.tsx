"use client";

import React, { useState, useRef, useEffect } from "react";
import { toSentenceCase, toTitleCase, toSlug, countWords, countCharacters } from "@/lib/text-utils";
import { addToHistory } from "@/lib/db";
import { Copy, RefreshCw, Type, AlignLeft, Link } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroEditor() {
    const [text, setText] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        // Auto-focus on load
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
        // Load last state from localStorage? Or just empty. 
        // User requested "Hero Section: A large, prominent textarea that auto-focuses on load."
        // We'll stick to empty or maybe a placeholder.
    }, []);

    const handleConversion = async (mode: string) => {
        let newText = text;
        switch (mode) {
            case "sentence":
                newText = toSentenceCase(text);
                break;
            case "title":
                newText = toTitleCase(text);
                break;
            case "slug":
                newText = toSlug(text);
                break;
        }

        setText(newText);
        await addToHistory(newText, mode);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="flex flex-col h-full min-h-[500px] w-full bg-white dark:bg-black/20 backdrop-blur-md rounded-xl border border-neutral-200 dark:border-white/10 overflow-hidden shadow-2xl relative">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 p-4 border-b border-neutral-200 dark:border-white/10 bg-neutral-50/50 dark:bg-black/40">
                <ActionButton
                    onClick={() => handleConversion("sentence")}
                    icon={<AlignLeft className="w-4 h-4" />}
                    label="Sentence Case"
                />
                <ActionButton
                    onClick={() => handleConversion("title")}
                    icon={<Type className="w-4 h-4" />}
                    label="Title Case"
                />
                <ActionButton
                    onClick={() => handleConversion("slug")}
                    icon={<Link className="w-4 h-4" />}
                    label="Slugify"
                />
                <div className="ml-auto flex items-center gap-2">
                    <button
                        onClick={copyToClipboard}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                            isCopied
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                : "bg-white/5 hover:bg-white/10 text-neutral-600 dark:text-neutral-300"
                        )}
                    >
                        {isCopied ? "Copied" : <><Copy className="w-4 h-4" /> Copy</>}
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 relative group">
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here to initialise analysis..."
                    className="w-full h-full p-6 bg-transparent border-none outline-none resize-none text-neutral-800 dark:text-neutral-200 text-lg leading-relaxed placeholder:text-neutral-400 dark:placeholder:text-neutral-600 font-sans"
                    spellCheck={false}
                />

                {/* Stats overlay */}
                <div className="absolute bottom-4 right-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-white/80 dark:bg-black/80 backdrop-blur px-3 py-1.5 rounded-full border border-neutral-200 dark:border-white/10 shadow-sm">
                        <span>{countWords(text)} words</span>
                        <span className="w-px h-3 bg-neutral-300 dark:bg-neutral-600" />
                        <span>{countCharacters(text)} chars</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActionButton({ onClick, icon, label }: { onClick: () => void; icon: React.ReactNode; label: string }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-300 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 border border-neutral-200 dark:border-white/5 rounded-md transition-all duration-200 active:scale-95"
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}
