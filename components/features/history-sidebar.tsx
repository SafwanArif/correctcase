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
        <div className="flex flex-col h-full bg-surface rounded-2xl border border-border-subtle overflow-hidden shadow-depth dark:shadow-none">
            <div className="p-4 border-b border-border-subtle bg-elevated flex items-center gap-2">
                <History className="w-4 h-4 text-muted" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-muted">History</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                {!history && (
                    <div className="text-center p-4 text-xs text-muted animate-pulse">Loading...</div>
                )}

                {history?.length === 0 && (
                    <div className="text-center p-8 text-muted text-sm">
                        Recent conversions will appear here.
                    </div>
                )}

                {history?.map((item) => (
                    <div
                        key={item.id}
                        className="group relative p-3 rounded-lg hover:bg-elevated transition duration-150 border border-transparent hover:border-border-subtle cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-[oklch(var(--brand-core)/0.1)] px-1.5 py-0.5 rounded">
                                {item.mode}
                            </span>
                            <span className="text-[10px] text-muted flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                        <p className="text-sm text-body line-clamp-2 font-mono break-all leading-relaxed">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
