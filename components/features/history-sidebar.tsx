"use client";

import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { History, Clock } from "lucide-react";

export function HistorySidebar() {
    const history = useLiveQuery(() =>
        db.history.orderBy('timestamp').reverse().limit(20).toArray()
    );

    return (
        <div className="flex flex-col h-full bg-white dark:bg-black/20 backdrop-blur-md rounded-xl border border-neutral-200 dark:border-white/10 overflow-hidden">
            <div className="p-4 border-b border-neutral-200 dark:border-white/10 bg-neutral-50/50 dark:bg-black/40 flex items-center gap-2">
                <History className="w-4 h-4 text-neutral-500" />
                <h2 className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">Local History</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                {!history && (
                    <div className="text-center p-4 text-xs text-neutral-500">Loading history...</div>
                )}

                {history?.length === 0 && (
                    <div className="text-center p-8 text-neutral-500 text-sm">
                        No history yet. Start typing to build your local archive.
                    </div>
                )}

                {history?.map((item) => (
                    <div
                        key={item.id}
                        className="group relative p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/5 transition duration-150 border border-transparent hover:border-neutral-200 dark:hover:border-white/5 cursor-default"
                    >
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 bg-neutral-100 dark:bg-white/5 px-1.5 py-0.5 rounded">
                                {item.mode}
                            </span>
                            <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-2 font-mono break-all leading-relaxed">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
