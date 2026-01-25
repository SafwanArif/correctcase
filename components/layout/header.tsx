import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ShieldCheck } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full glass-premium border-b border-border-subtle">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">

                {/* Left: Branding */}
                <div className="flex items-center gap-2">
                    <Logo className="w-8 h-8" />
                    <h1 className="text-lg font-bold tracking-tight text-body">
                        CorrectCase
                    </h1>
                </div>

                {/* Center: Badges (Absolute Center) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 text-[10px] uppercase tracking-widest font-mono text-muted opacity-80">
                    <ShieldCheck className="w-3 h-3 text-primary" />
                    <span>100% Client-Side</span>
                </div>

                {/* Right: Controls */}
                <div>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
