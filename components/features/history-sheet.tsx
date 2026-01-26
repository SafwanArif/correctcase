"use client";

import React, { useEffect, useRef } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { History, Clock, X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HistorySheetProps {
    isOpen: boolean;
    onClose: () => void;
}

export function HistorySheet({ isOpen, onClose }: HistorySheetProps) {
    const sheetRef = useRef<HTMLDivElement>(null);

    const history = useLiveQuery(() =>
        db.history.orderBy('timestamp').reverse().limit(50).toArray()
    );

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sheetRef.current && !sheetRef.current.contains(event.target as Node) && isOpen) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    // Close on Escape key
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                aria-hidden="true"
            />

            {/* Sheet Panel */}
            <div
                ref={sheetRef}
                className={cn(
                    "fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-surface border-l border-border-subtle shadow-2xl transition-transform duration-300 ease-in-out transform flex flex-col",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border-subtle bg-elevated">
                    <div className="flex items-center gap-2">
                        <History className="w-4 h-4 text-primary" />
                        <h2 className="text-sm font-bold uppercase tracking-wider text-body">History</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-muted hover:text-body transition-colors rounded-full hover:bg-surface"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {!history && (
                        <div className="text-center p-8 text-muted animate-pulse text-sm">Loading history...</div>
                    )}

                    {history?.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-48 text-muted text-sm text-center">
                            <History className="w-8 h-8 mb-3 opacity-20" />
                            <p>No recent conversions</p>
                        </div>
                    )}

                    {history?.map((item) => (
                        <div
                            key={item.id}
                            className="group relative p-3 bg-canvas border border-border-subtle rounded-xl hover:border-[oklch(var(--brand-core)/0.3)] hover:shadow-sm transition-all duration-200 cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className={cn(
                                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                                    item.mode === "hyphenate" ? "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900" :
                                        item.mode === "title" ? "bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-900" :
                                            "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900"
                                )}>
                                    {item.mode}
                                </span>
                                <span className="text-[10px] text-muted font-mono flex items-center gap-1">
                                    {item.timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <p className="text-sm text-body font-mono break-all leading-relaxed line-clamp-3">
                                {item.text}
                            </p>
                        </div>
                    ))}

                    {history && history.length > 0 && (
                        <div className="pt-4 text-center">
                            <span className="text-[10px] text-muted uppercase tracking-widest">Last 50 Items</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
