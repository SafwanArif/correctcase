"use client";

import { Shell } from "@/components/layout/shell";
import { WorkspaceHeader } from "@/components/layout/workspace-header";
import { HistorySheet } from "@/components/features/history-sheet";
import { useState } from "react";

interface WorkstationLayoutProps {
    children: React.ReactNode;
    activeTab?: 'text' | 'seo' | 'settings';
}

export function WorkstationLayout({ children, activeTab = 'text' }: WorkstationLayoutProps) {
    const [historyOpen, setHistoryOpen] = useState(false);

    return (
        <Shell>
            {/* The Unified Workstation Box */}
            <div className="flex flex-col w-full max-w-5xl min-h-[80vh] bg-surface rounded-3xl border border-border-subtle shadow-depth dark:shadow-none overflow-hidden">

                {/* Integrated Header */}
                <WorkspaceHeader
                    onOpenHistory={() => setHistoryOpen(true)}
                    activeTab={activeTab}
                />

                {/* Content Area (Editor) */}
                {children}

            </div>

            {/* Slide-over History */}
            <HistorySheet isOpen={historyOpen} onClose={() => setHistoryOpen(false)} />
        </Shell>
    );
}
