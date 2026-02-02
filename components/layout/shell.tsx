import { BrandLogo } from "@/components/ui/brand-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

export function Shell({ children }: { children: React.ReactNode }) {
    return (
        <main className="sm:min-h-screen relative flex flex-col items-center">
            {/* 1. BRAND LANDMARK (0ms LCP) - Floating for Synergy */}
            <header className="fixed top-0 left-0 w-full z-[var(--z-sticky)] flex items-center px-4 sm:px-8 py-1 sm:py-6 pointer-events-none bg-surface/80 backdrop-blur-xl border-b border-border-subtle/20 sm:bg-transparent sm:backdrop-blur-none sm:border-none">
                {/* Left: Logo */}
                <div className="flex-1 flex items-center">
                    <Link
                        href="/"
                        className="flex items-center gap-0.5 sm:gap-2 group pointer-events-auto hover:opacity-80 transition-opacity"
                    >
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
                                British English and American Standards • Professional Case Converter
                                Suite
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Center: Privacy Badge */}
                <div className="flex-1 flex justify-center gap-3 pointer-events-auto">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-surface/70 backdrop-blur-xl rounded-full border border-border-subtle/30 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-victory-emerald animate-pulse" />
                        <span className="text-[10px] font-mono font-medium text-muted uppercase tracking-wider">
                            100% PRIVATE
                        </span>
                    </div>
                </div>
                {/* Right: Toggle */}
                <div className="flex-1 flex justify-end pointer-events-auto">
                    <ThemeToggle />
                </div>
            </header>

            {/* 2. CORE UTILITY LANDMARK */}
            <div className="z-10 w-full flex-1 flex flex-col justify-start">{children}</div>

            {/* 3. AUTHORITY FOOTER LANDMARK */}
            <footer className="w-full max-w-5xl mx-auto text-center py-12 text-[10px] text-muted font-mono opacity-60 border-t border-border-subtle/20 mt-12 px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>&copy; {new Date().getFullYear()} CorrectCase. British English Standards.</p>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-body cursor-help transition-colors">
                            SECURITY MANIFESTO
                        </span>
                        <span className="hover:text-body cursor-help transition-colors">
                            SCHEMA GRAPH v24.0
                        </span>
                    </div>
                </div>
            </footer>

            {/* Ambient Ambient Layers (Controlled for Emission) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-[radial-gradient(circle_at_center,var(--color-primary),transparent_70%)] pointer-events-none opacity-5"></div>
        </main>
    );
}
