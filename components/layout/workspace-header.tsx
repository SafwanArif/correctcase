"use client";

import Link from "next/link";
import { History, Moon, Sun, Monitor, Settings, Type } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

interface WorkspaceHeaderProps {
    onOpenHistory: () => void;
    activeTab?: 'text' | 'seo' | 'settings';
}

export function WorkspaceHeader({ onOpenHistory, activeTab = 'text' }: WorkspaceHeaderProps) {
    return (
        <div className="flex items-center justify-between p-4 border-b border-border-subtle bg-canvas/50">
            {/* Left: Identity */}
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2 group outline-none">
                    <Logo className="w-8 h-8" />
                    <span className="font-bold text-lg tracking-tight text-body">CorrectCase</span>
                </Link>

                {/* Vertical Divider */}
                <div className="h-6 w-px bg-border-subtle/50 mx-1" />

                {/* Navigation Tabs - Segmented Feel */}
                <nav className="flex items-center gap-1 bg-elevated/50 p-1 rounded-lg border border-border-subtle/50">
                    <NavTab active={activeTab === 'text'} icon={<Type className="w-3.5 h-3.5" />} label="Text Tools" />
                    {/* Placeholder for future expansion */}
                    <NavTab active={false} icon={<Settings className="w-3.5 h-3.5" />} label="Settings" />
                    <button
                        type="button"
                        onClick={onOpenHistory}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 text-muted hover:text-body hover:bg-surface/50"
                        )}
                    >
                        <History className="w-3.5 h-3.5" />
                        <span>History</span>
                    </button>
                </nav>
            </div>

            {/* Right: System Actions */}
            <div className="flex items-center gap-2">
                <ThemeToggle />
            </div>
        </div>
    );
}

function NavTab({ active, icon, label }: { active: boolean; icon: React.ReactNode; label: string }) {
    return (
        <button
            type="button"
            className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
                active
                    ? "bg-surface text-primary shadow-sm ring-1 ring-border-subtle"
                    : "text-muted hover:text-body hover:bg-surface/50"
            )}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}
