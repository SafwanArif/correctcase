"use client";

import { Shell } from "@/components/layout/shell";
import { HistorySheet } from "@/components/features/history-sheet";
import { useState } from "react";
import { ScrollProvider, useScroll } from "@/components/providers/scroll-provider";
import { EditorToolbar } from "@/components/features/editor-toolbar";

interface WorkstationLayoutProps {
    children: React.ReactNode;
}

function WorkstationInternal({ children }: WorkstationLayoutProps) {
    const [historyOpen, setHistoryOpen] = useState(false);
    const { setScrollTop } = useScroll();

    return (
        <div className="flex flex-col w-full max-w-5xl h-[85vh] bg-surface/80 backdrop-blur-3xl rounded-3xl border border-border-subtle shadow-depth dark:shadow-none overflow-hidden mt-20">

            {/* Contextual Toolbar with History Trigger */}
            <EditorToolbar onOpenHistory={() => setHistoryOpen(true)} />

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

