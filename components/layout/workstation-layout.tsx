"use client";

import { Shell } from "@/components/layout/shell";
import { WorkspaceHeader } from "@/components/layout/workspace-header";
import { HistorySheet } from "@/components/features/history-sheet";
import { useState } from "react";
import { ScrollProvider, useScroll } from "@/components/providers/scroll-provider";
import { cn } from "@/lib/utils";

interface WorkstationLayoutProps {
    children: React.ReactNode;
    activeTab?: 'text' | 'seo' | 'settings';
}

function WorkstationInternal({ children, activeTab }: WorkstationLayoutProps) {
    const [historyOpen, setHistoryOpen] = useState(false);
    const { setScrollTop } = useScroll();

    return (
        <div className="flex flex-col w-full max-w-5xl h-[85vh] bg-surface rounded-3xl border border-border-subtle shadow-depth dark:shadow-none overflow-hidden">

            {/* Integrated Header */}
            <WorkspaceHeader
                onOpenHistory={() => setHistoryOpen(true)}
                activeTab={activeTab}
            />

            {/* Contextual Toolbar */}
            <EditorToolbar />

            {/* Scrollable Content Area (Editor + SEO Tail) */}
            <div
                className="flex-1 overflow-y-auto custom-scrollbar relative flex flex-col scroll-smooth"
                onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
            >
                {children}
            </div>

            {/* Slide-over History */}
            <HistorySheet isOpen={historyOpen} onClose={() => setHistoryOpen(false)} />
        </div>
    );
}

export function WorkstationLayout(props: WorkstationLayoutProps) {
    return (
        <Shell>
            <ScrollProvider>
                <WorkstationInternal {...props} />
            </ScrollProvider>
        </Shell>
    );
}

