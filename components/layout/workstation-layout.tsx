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
        <div className="flex flex-col w-full min-h-screen relative">

            {/* Contextual Toolbar - Floating/Integrated */}
            <div className="fixed top-24 left-0 w-full z-40 px-4 sm:px-8 pointer-events-none">
                <div className="max-w-5xl mx-auto w-full pointer-events-auto">
                    <EditorToolbar
                        onOpenHistory={() => setHistoryOpen(true)}
                        className="rounded-2xl border border-border-subtle/40 shadow-lg"
                    />
                </div>
            </div>

            {/* Full-width Integrated Content Area */}
            <div
                className="flex-1 w-full relative flex flex-col scroll-smooth"
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

