import { BrandLogo } from "@/components/ui/brand-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ToolsMenu } from "@/components/ui/tools-menu";
import { History } from "lucide-react";
import Link from "next/link";

interface ShellProps {
    children: React.ReactNode;
    onOpenHistory?: () => void;
}

export function Shell({ children, onOpenHistory }: ShellProps) {
    return (
        <main className="min-h-screen bg-canvas relative flex flex-col items-center">
            {/* 1. BRAND LANDMARK (0ms LCP) - Floating for Synergy */}
            {/* 1. BRAND LANDMARK (0ms LCP) - Floating for Synergy */}
            <header className="fixed top-0 left-0 w-full z-50 flex items-center px-4 sm:px-8 py-6 pointer-events-none">
                {/* Left: Logo */}
                <div className="flex-1 flex items-center">
                    <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group pointer-events-auto hover:opacity-80 transition-opacity">
                        <BrandLogo className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-500 group-hover:rotate-12" />
                        <div className="flex flex-col">
                            <h6 className="text-lg sm:text-xl font-bold tracking-tighter text-body leading-none mb-0 sm:mb-1">
                                CorrectCase
                            </h6>
                            <span className="hidden sm:block text-[9px] font-mono font-medium text-muted uppercase tracking-widest opacity-80 leading-tight">
                                British English and American Standards
                            </span>
                            {/* SEO AUTHORITY (Visually Hidden) */}
                            <span className="sr-only">
                                British English and American Standards • Professional Case Converter Suite
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Center: Privacy Badge & Tools */}
                <div className="flex-1 flex justify-center gap-3 pointer-events-auto">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-surface/70 backdrop-blur-2xl rounded-full border border-border-subtle/30 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-victory-emerald animate-pulse" />
                        <span className="text-[10px] font-mono font-medium text-muted uppercase tracking-wider">100% PRIVATE</span>
                    </div>
                    <ToolsMenu />
                    {onOpenHistory && (
                        <button
                            onClick={onOpenHistory}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/60 backdrop-blur-md border border-border-subtle/40 text-[11px] font-medium text-body hover:bg-surface/80 hover:border-border-subtle/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                            aria-label="View history"
                        >
                            <History className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">History</span>
                        </button>
                    )}
                </div>

                {/* Right: Toggle */}
                <div className="flex-1 flex justify-end pointer-events-auto">
                    <ThemeToggle />
                </div>
            </header>

            {/* 2. CORE UTILITY LANDMARK */}
            <div className="z-10 w-full flex-1">
                {children}
            </div>

            {/* 3. AUTHORITY FOOTER LANDMARK */}
            <footer className="w-full max-w-5xl mx-auto text-center py-12 text-[10px] text-muted font-mono opacity-60 border-t border-border-subtle/20 mt-12 px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>&copy; {new Date().getFullYear()} CorrectCase. British English Standards.</p>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-body cursor-help transition-colors">SECURITY MANIFESTO</span>
                        <span className="hover:text-body cursor-help transition-colors">SCHEMA GRAPH v24.0</span>
                    </div>
                </div>
            </footer>

            {/* Ambient Ambient Layers (Controlled for Emission) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-primary/3 filter blur-[120px] pointer-events-none opacity-40"></div>
        </main>
    );
}
