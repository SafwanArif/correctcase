import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ShieldCheck } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full glass-premium border-b border-border-subtle">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* Left: Branding & Controls */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <div className="h-6 w-px bg-border-subtle mx-1" />
                    <h1 className="text-lg font-bold tracking-tight text-body">
                        CorrectCase
                    </h1>
                </div>

                {/* Right: Badges */}
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-mono text-muted opacity-80">
                    <ShieldCheck className="w-3 h-3 text-primary" />
                    <span className="hidden sm:inline">100% Client-Side</span>
                </div>
            </div>
        </header>
    );
}
