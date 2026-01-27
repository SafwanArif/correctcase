"use client";

import Link from "next/link";
import { History, Moon, Sun, Monitor } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

interface WorkspaceHeaderProps {
    onOpenHistory: () => void;
    activeTab?: 'text' | 'seo' | 'settings';
}

export function WorkspaceHeader({ onOpenHistory, activeTab = 'text' }: WorkspaceHeaderProps) {
    return (
        <header className="flex items-center justify-between p-4 border-b border-border-subtle bg-transparent">
            {/* Left: Identity */}
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2 group outline-none">
                    <Logo className="w-8 h-8" />
                    <h1 className="font-bold text-lg tracking-tight text-body">CorrectCase</h1>
                </Link>
            </div>

            {/* Right: System Actions */}
            <div className="flex items-center">
                <button
                    type="button"
                    onClick={onOpenHistory}
                    className="flex items-center justify-center w-10 h-10 text-muted hover:text-body hover:bg-surface/50 rounded-full transition-all duration-200"
                    title="History"
                    aria-label="View History"
                >
                    <History className="w-5 h-5" />
                </button>
                <div className="w-px h-4 bg-border-subtle/50 ml-0.5 mr-3" />
                <ThemeToggle />
            </div>
        </header>
    );
}
