"use client";

import { useState } from "react";
import { ChevronDown, Type, Link, History } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function ToolsMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const tools = [
        {
            name: "Capitalise Title",
            icon: Type,
            path: "/capitalise-title",
            active: pathname?.includes("/capitalise-title"),
        },
        {
            name: "Hyphenate Text",
            icon: Link,
            path: "/hyphenate-text",
            active: pathname === "/hyphenate-text",
        },
    ];

    const handleToolClick = (path: string) => {
        router.push(path);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full",
                    "bg-surface/60 backdrop-blur-md border border-border-subtle/40",
                    "text-[11px] font-medium text-body",
                    "hover:bg-surface/80 hover:border-border-subtle/60",
                    "transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-primary/40"
                )}
                aria-label="Tools menu"
                aria-expanded={isOpen}
            >
                <span>Tools</span>
                <ChevronDown
                    className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute top-full mt-2 left-0 z-50 min-w-[200px] animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="bg-surface/95 backdrop-blur-2xl rounded-lg border border-border-subtle/50 shadow-2xl overflow-hidden">
                            {tools.map((tool) => (
                                <button
                                    key={tool.path}
                                    onClick={() => handleToolClick(tool.path)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3",
                                        "text-sm font-medium text-left",
                                        "hover:bg-primary/10 transition-colors duration-150",
                                        tool.active
                                            ? "text-primary bg-primary/5"
                                            : "text-body"
                                    )}
                                >
                                    <tool.icon className="w-4 h-4" />
                                    <span>{tool.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
