"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { History, Moon, Sun, Monitor } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

interface WorkspaceHeaderProps {
    onOpenHistory: () => void;
    activeTab?: 'text' | 'seo' | 'settings';
}

export function WorkspaceHeader({ onOpenHistory, activeTab = 'text' }: WorkspaceHeaderProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const style = searchParams.get('style');

    // Determine Active Tool Name
    let activeToolName: string | null = null;
    let isHome = pathname === "/" && !style; // Pure home

    // Logic mirroring HeroEditor state
    if (pathname?.includes("/capitalise-title")) {
        // Check for specific static SEO routes first
        if (pathname.includes("us-title-case")) activeToolName = "US Title Case Converter";
        else if (pathname.includes("uk-sentence-case")) activeToolName = "UK Sentence Case Converter";
        // Fallback to query params or default
        else if (style === 'us') activeToolName = "US Title Case Converter";
        else if (style === 'uk') activeToolName = "UK Sentence Case Converter";
        else activeToolName = "Title Case Converter";
    } else if (pathname === "/hyphenate-text") {
        activeToolName = "Smart Hyphenator & Grammar Tool";
    }

    // If style param is present on root (legacy support or initial load redirects)
    if (pathname === "/" && style === 'uk') activeToolName = "UK Sentence Case Converter";
    if (pathname === "/" && style === 'us') activeToolName = "US Title Case Converter";

    const isToolActive = !!activeToolName;

    return (
        <header className="relative flex items-center justify-between px-4 py-3.5 border-b border-border-subtle bg-transparent h-[60px] overflow-hidden">

            {/* Left: Theme Toggle (Static) */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30">
                <ThemeToggle />
            </div>

            {/* Left/Center: Dynamic Logo Area */}
            {/* 
                Animation Logic:
                - Default (Home): left-1/2 -translate-x-1/2
                - Active (Tool): left-16 translate-x-0 (Shifted to clear Toggle)
            */}
            <div
                className={cn(
                    "absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center gap-2 z-20",
                    isToolActive ? "left-16 translate-x-0" : "left-1/2 -translate-x-1/2"
                )}
            >
                <Link href="/" className="flex items-center gap-2 group outline-none" onClick={() => {
                    // Optional: Reset URL if needed, handled by Link href="/"
                }}>
                    <Logo className="w-8 h-8 flex-shrink-0" />

                    {/* Brand Text: Fades out when Tool is active */}
                    <span
                        aria-hidden={isToolActive}
                        className={cn(
                            "font-bold text-lg tracking-tight text-body whitespace-nowrap transition-all duration-300 origin-left",
                            isToolActive ? "opacity-0 w-0 scale-90 overflow-hidden" : "opacity-100 w-auto scale-100"
                        )}
                    >
                        CorrectCase
                    </span>
                </Link>
            </div>

            {/* Center: Tool H1 Title */}
            {/* 
                Animation Logic:
                - Default: Opacity 0, Scale 95
                - Active: Opacity 100, Scale 100
            */}
            <div className={cn(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 delay-100 flex items-center justify-center w-full max-w-[60%] pointer-events-none z-10",
                isToolActive ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm translate-y-2"
            )}>
                {activeToolName && (
                    <h1 className="font-bold text-lg tracking-tight text-body text-center truncate px-4">
                        {activeToolName}
                    </h1>
                )}
            </div>

            {/* Right: System Actions (History Only) */}
            <div className="flex items-center ml-auto relative z-20">
                <button
                    type="button"
                    onClick={onOpenHistory}
                    className="flex items-center justify-center w-10 h-10 text-muted hover:text-body hover:bg-surface/50 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--brand-core))]"
                    title="History"
                    aria-label="View History"
                >
                    <History className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
}
