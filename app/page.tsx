import { BentoGrid } from "@/components/layout/bento-grid";
import { HeroEditor } from "@/components/features/hero-editor";
import { HistorySidebar } from "@/components/features/history-sidebar";
import { Header } from "@/components/layout/header";

export default function Home() {
  return (
    <main className="min-h-screen bg-[oklch(var(--background))] relative overflow-hidden flex flex-col items-center">

      <Header />

      {/* Ambient Gradients - Subtle & Medical/Clean */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-[oklch(var(--primary)/0.03)] filter blur-3xl pointer-events-none opacity-50"></div>

      <div className="z-10 w-full max-w-7xl px-4 pt-8 md:pt-12 pb-8">

        {/* Main Application Interface */}
        <BentoGrid className="h-[calc(100vh-140px)] min-h-[600px]">
          {/* Editor Area - Spans 2 columns */}
          <div className="md:col-span-2 row-span-1 h-full">
            <HeroEditor />
          </div>

          {/* Sidebar Area - Spans 1 column */}
          <div className="md:col-span-1 row-span-1 h-full">
            <HistorySidebar />
          </div>
        </BentoGrid>

        <footer className="text-center text-[10px] text-[oklch(var(--muted-foreground))] mt-8 font-mono">
          <p>&copy; {new Date().getFullYear()} CorrectCase UK. Built with Next.js 15 & Cloudflare Pages.</p>
        </footer>

      </div>
    </main>
  );
}
