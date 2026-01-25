import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ShieldCheck } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full glass-premium border-b border-[oklch(var(--border))]">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* Left: Branding & Controls */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-1" />
                    <h1 className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[oklch(var(--foreground))] to-[oklch(var(--muted-foreground))]">
                        CorrectCase
                    </h1>
                </div>

                {/* Right: Badges */}
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-mono text-[oklch(var(--muted-foreground))] opacity-80">
                    <ShieldCheck className="w-3 h-3 text-[oklch(var(--primary))]" />
                    <span className="hidden sm:inline">100% Client-Side</span>
                </div>
            </div>
        </header>
    );
}
