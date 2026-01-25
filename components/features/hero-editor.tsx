"use client";

import React, { useState, useRef, useEffect } from "react";
import { toSentenceCase, toTitleCase, toSlug, countWords, countCharacters } from "@/lib/text-utils";
import { addToHistory } from "@/lib/db";
import { Copy, Type, AlignLeft, Link } from "lucide-react";
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
        <div className="flex flex-col h-full min-h-[500px] w-full bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden shadow-depth dark:shadow-none relative transition-colors duration-300">

            {/* Toolbar - Crisp & Professional */}
            <div className="flex flex-wrap items-center gap-2 p-3 border-b border-slate-100 dark:border-white/5 bg-white dark:bg-transparent">
                <ActionButton
                    onClick={() => handleConversion("sentence")}
                    icon={<AlignLeft className="w-4 h-4" />}
                    label="Sentence"
                />
                <ActionButton
                    onClick={() => handleConversion("title")}
                    icon={<Type className="w-4 h-4" />}
                    label="Title"
                />
                <ActionButton
                    onClick={() => handleConversion("slug")}
                    icon={<Link className="w-4 h-4" />}
                    label="Slug"
                />
                <div className="ml-auto flex items-center gap-2">
                    <button
                        onClick={copyToClipboard}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full transition-all duration-200",
                            isCopied
                                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : "bg-slate-50 hover:bg-slate-100 text-slate-600 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300"
                        )}
                    >
                        {isCopied ? "Copied" : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                    </button>
                </div>
            </div>

            {/* Editor Area - "Paper" Feel */}
            <div className="flex-1 relative group bg-[oklch(var(--muted))] dark:bg-transparent transition-colors duration-300">
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text to analyse..."
                    className="w-full h-full p-6 bg-transparent border-none outline-none resize-none text-[oklch(var(--foreground))] text-lg leading-relaxed placeholder:text-slate-400 dark:placeholder:text-slate-600 font-sans"
                    spellCheck={false}
                />

                {/* Stats overlay - Subtle & Clean */}
                <div className="absolute bottom-4 right-6 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-4 text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 bg-white dark:bg-black/80 px-3 py-1.5 rounded-full border border-slate-100 dark:border-white/10 shadow-sm">
                        <span>{countWords(text)} WORDS</span>
                        <span className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                        <span>{countCharacters(text)} CHARS</span>
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
            className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 rounded-lg transition-all duration-200 active:scale-95 shadow-sm hover:shadow"
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}
