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
        <div className="flex flex-col h-full bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden shadow-depth dark:shadow-none">
            <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-transparent flex items-center gap-2">
                <History className="w-4 h-4 text-slate-400" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">History</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                {!history && (
                    <div className="text-center p-4 text-xs text-slate-400 animate-pulse">Loading...</div>
                )}

                {history?.length === 0 && (
                    <div className="text-center p-8 text-slate-400 text-sm">
                        Recent conversions will appear here.
                    </div>
                )}

                {history?.map((item) => (
                    <div
                        key={item.id}
                        className="group relative p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition duration-150 border border-transparent hover:border-slate-100 dark:hover:border-white/5 cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[oklch(var(--primary))] bg-[oklch(var(--primary)/0.1)] px-1.5 py-0.5 rounded">
                                {item.mode}
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 font-mono break-all leading-relaxed">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
