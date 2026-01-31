"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { History } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface WorkspaceHeaderProps {
    onOpenHistory: () => void;
}

export function WorkspaceHeader({ onOpenHistory }: WorkspaceHeaderProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const style = searchParams.get('style');

    // Determine Active Tool Name
    let activeToolName: string | null = null;


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
            <div className="flex items-center gap-1 z-20">
                <Link
                    href="/"
                    className="flex items-center group outline-none"
                    aria-label="Home"
                    onClick={() => {
                        // Reset if needed
                    }}
                >
                    <Logo className="w-8 h-8 flex-shrink-0" />
                </Link>

                {/* Text Slot: Swaps between Brand Link and Tool H1 */}
                {isToolActive ? (
                    <h1 className="font-bold text-lg tracking-tight text-body whitespace-nowrap animate-in fade-in zoom-in-95 duration-200">
                        {activeToolName}
                    </h1>
                ) : (
                    <Link
                        href="/"
                        className="font-bold text-lg tracking-tight text-body whitespace-nowrap group outline-none"
                    >
                        CorrectCase
                    </Link>
                )}
            </div>

            {/* Right: History | Toggle */}
            <div className="flex items-center z-20">
                {/* History Button */}
                {/* Optical Compensation: 
                    Button is 28px (w-7). Icon is 28px (w-7).
                */}
                <button
                    type="button"
                    onClick={onOpenHistory}
                    className="flex items-center justify-center w-7 h-7 text-muted hover:text-body hover:bg-surface/50 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[oklch(var(--brand-core))]"
                    title="History"
                    aria-label="View History"
                >
                    <History className="w-7 h-7" />
                </button>

                {/* Divider */}
                {/* Optical Alignment: ml-2.5 (10px) to compensate for circular icon gap. mr-3 (12px) for box gap. */}
                <div className="h-5 w-px bg-border-subtle ml-2.5 mr-3" aria-hidden="true" />

                {/* Theme Toggle */}
                <ThemeToggle />
            </div>
        </header>
    );
}
