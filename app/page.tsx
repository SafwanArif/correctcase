import { BentoGrid } from "@/components/layout/bento-grid";
import { HeroEditor } from "@/components/features/hero-editor";
import { HistorySidebar } from "@/components/features/history-sidebar";
import { Sparkles, History as HistoryIcon, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center p-4 selection:bg-indigo-500/30">

      {/* Background Gradients - Local-First / Privacy Theme */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="z-10 w-full max-w-7xl relative">

        {/* Header */}
        <div className="mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 mb-2">
              CorrectCase UK
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 font-medium">
              The privacy-first text utility used exactly where you need it.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>100% Client-Side</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>v1.0.0</span>
            </div>
          </div>
        </div>

        {/* Main Application Interface */}
        <BentoGrid className="h-[calc(100vh-200px)] min-h-[600px] mb-8">
          {/* Editor Area - Spans 2 columns */}
          <div className="md:col-span-2 row-span-1 h-full">
            <HeroEditor />
          </div>

          {/* Sidebar Area - Spans 1 column */}
          <div className="md:col-span-1 row-span-1 h-full">
            <HistorySidebar />
          </div>
        </BentoGrid>

        <footer className="text-center text-xs text-neutral-400 pb-8">
          <p>&copy; {new Date().getFullYear()} CorrectCase UK. Built with Next.js 15 & Cloudflare Pages.</p>
        </footer>

      </div>
    </main>
  );
}
