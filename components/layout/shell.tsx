import { BrandLogo } from "@/components/ui/brand-logo";

interface ShellProps {
    children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
    return (
        <main className="min-h-screen bg-canvas relative flex flex-col items-center">
            {/* 1. BRAND LANDMARK (0ms LCP) - Floating for Synergy */}
            <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl flex items-center justify-between px-4 sm:px-8 py-6 pointer-events-none">
                <div className="flex items-center gap-3 group pointer-events-auto">
                    <BrandLogo className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-500 group-hover:rotate-12" />
                    <div className="flex flex-col">
                        <h1 className="text-lg sm:text-xl font-bold tracking-tighter text-body leading-none">
                            CorrectCase
                        </h1>
                        <span className="text-[9px] font-mono font-bold text-muted uppercase tracking-widest opacity-60">
                            Supreme Authority • 2026
                        </span>
                    </div>
                </div>

                <div className="hidden sm:flex items-center gap-4 pointer-events-auto">
                    <div className="flex items-center gap-2 px-3 py-1 bg-surface/50 backdrop-blur-md rounded-full border border-border-subtle/40 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-victory-emerald animate-pulse" />
                        <span className="text-[10px] font-mono font-medium text-muted">100% PRIVATE</span>
                    </div>
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
