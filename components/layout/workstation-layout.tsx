"use client";

import { Shell } from "@/components/layout/shell";
import { HistorySheet } from "@/components/features/history-sheet";
import { useState } from "react";
import { ScrollProvider, useScroll } from "@/components/providers/scroll-provider";

interface WorkstationLayoutProps {
    children: React.ReactNode;
}

function WorkstationInternal({ children }: WorkstationLayoutProps) {
    const [historyOpen, setHistoryOpen] = useState(false);
    const { setScrollTop } = useScroll();

    return (
        <div className="flex flex-col w-full min-h-screen relative">
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
    const [historyOpen, setHistoryOpen] = useState(false);

    return (
        <Shell onOpenHistory={() => setHistoryOpen(true)}>
            <ScrollProvider>
                <WorkstationInternal {...props} />
            </ScrollProvider>
            <HistorySheet isOpen={historyOpen} onClose={() => setHistoryOpen(false)} />
        </Shell>
    );
}

