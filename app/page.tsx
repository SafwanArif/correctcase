"use client";

import { HeroEditor } from "@/components/features/hero-editor";
import { Shell } from "@/components/layout/shell";
import { WorkspaceHeader } from "@/components/layout/workspace-header";
import { HistorySheet } from "@/components/features/history-sheet";
import { useState } from "react";

export default function Home() {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <Shell>
      {/* The Unified Workstation Box */}
      <div className="flex flex-col w-full h-full min-h-[600px] bg-surface rounded-3xl border border-border-subtle shadow-depth dark:shadow-none overflow-hidden">

        {/* Integrated Header */}
        <WorkspaceHeader onOpenHistory={() => setHistoryOpen(true)} />

        {/* Editor Area (Chromeless) */}
        <HeroEditor />

      </div>

      {/* History Sheet moves here since Shell no longer passes open handler */}
      <HistorySheet isOpen={historyOpen} onClose={() => setHistoryOpen(false)} />
    </Shell>
  );
}
