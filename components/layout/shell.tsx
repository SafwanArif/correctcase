"use client";

import { HistorySheet } from "@/components/features/history-sheet";
import { Header } from "@/components/layout/header";
import { useState } from "react";

interface ShellProps {
    children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
    const [historyOpen, setHistoryOpen] = useState(false);

    return (
        <main className="min-h-screen bg-[oklch(var(--background))] relative overflow-hidden flex flex-col items-center">

            <Header onOpenHistory={() => setHistoryOpen(true)} />

            {/* Ambient Gradients - Subtle & Medical/Clean */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-[oklch(var(--primary)/0.03)] filter blur-3xl pointer-events-none opacity-50"></div>

            <div className="z-10 w-full max-w-5xl px-4 pt-8 md:pt-16 pb-12 flex-1 flex flex-col">

                {/* Main Content - Centered & Focused (No Sidebar) */}
                <div className="w-full h-full min-h-[600px]">
                    {children}
                </div>

                <footer className="text-center text-[10px] text-[oklch(var(--muted-foreground))] mt-12 font-mono opacity-60">
                    <p>&copy; {new Date().getFullYear()} CorrectCase UK. Built with Next.js 15 & Cloudflare Pages.</p>
                </footer>

            </div>

            {/* Slide-over History */}
            <HistorySheet isOpen={historyOpen} onClose={() => setHistoryOpen(false)} />
        </main>
    );
}
