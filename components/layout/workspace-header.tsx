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

            {/* Left: Logo & Wordmark */}
            <div className="flex items-center z-20">
                <Link
                    href="/"
                    className="flex items-center gap-1 group outline-none"
                    onClick={() => {
                        // Reset if needed
                    }}
                >
                    <Logo className="w-8 h-8 flex-shrink-0" />
                    <span className={cn(
                        "font-bold text-lg tracking-tight text-body whitespace-nowrap transition-opacity duration-300",
                        // Mobile: Hide text if Tool is active (to make room for H1)
                        // Desktop: Always show
                        isToolActive ? "opacity-0 invisible w-0 md:visible md:opacity-100 md:w-auto" : "opacity-100"
                    )}>
                        CorrectCase
                    </span>
                </Link>
            </div>

            {/* Center: Tool H1 Title (Absolute) */}
            <div className={cn(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full max-w-[60%] pointer-events-none z-10",
                isToolActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}>
                {activeToolName && (
                    <h1 className="font-bold text-lg tracking-tight text-body text-center truncate px-2">
                        {activeToolName}
                    </h1>
                )}
            </div>

            {/* Right: History | Toggle */}
            <div className="flex items-center z-20">
                {/* History Button */}
                {/* Optical Compensation: 
                    Button is 36px (w-9), Icon is 24px (w-6). 
                    Internal padding is 6px.
                    To achieve 12px optical gap: 12 - 6 = 6px margin (mr-1.5).
                */}
                <button
                    type="button"
                    onClick={onOpenHistory}
                    className="flex items-center justify-center w-10 h-10 text-muted hover:text-body hover:bg-surface/50 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[oklch(var(--brand-core))] mr-1"
                    title="History"
                    aria-label="View History"
                >
                    <History className="w-6 h-6" />
                </button>

                {/* Divider */}
                <div className="h-5 w-px bg-border-subtle" aria-hidden="true" />

                {/* Theme Toggle */}
                {/* Wrapper for margin since component doesn't accept props yet */}
                <div className="ml-3">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
