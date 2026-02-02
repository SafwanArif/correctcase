"use client";

/* eslint-disable react/no-multi-comp */
import type { JSX } from "react";
import { HistorySheet } from "@/components/features/history-sheet";
import { Shell } from "@/components/layout/shell";
import { ScrollProvider, useScroll } from "@/components/providers/scroll-provider";
import { useUi } from "@/components/providers/ui-provider";

interface WorkstationLayoutProps {
    children: React.ReactNode;
}

function WorkstationInternal({ children }: WorkstationLayoutProps): JSX.Element {
    const { isHistoryOpen, closeHistory } = useUi();
    const { setScrollTop } = useScroll();

    return (
        <div className="flex flex-col w-full sm:min-h-screen relative">
            {/* Full-width Integrated Content Area */}
            <div
                className="flex-1 w-full relative block sm:flex sm:flex-col scroll-smooth"
                onScroll={(e) => { setScrollTop(e.currentTarget.scrollTop); }}
            >
                {children}
            </div>

            {/* Slide-over History */}
            <HistorySheet isOpen={isHistoryOpen} onClose={closeHistory} />
        </div>
    );
}

export function WorkstationLayout(props: WorkstationLayoutProps): JSX.Element {
    return (
        <Shell>
            <ScrollProvider>
                <WorkstationInternal {...props} />
            </ScrollProvider>
        </Shell>
    );
};
