"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Type, Link, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tool {
    id: string;
    name: string;
    icon: React.ElementType;
    path: string;
    color: string;
    description?: string;
}

const TOOLS: Tool[] = [
    {
        id: "uk-sentence-case",
        name: "UK Sentence Case",
        icon: Type,
        path: "/uk-sentence-case",
        color: "hover:bg-radiant-cyan/10 hover:text-radiant-cyan",
        description: "BBC • Guardian style"
    },
    {
        id: "us-title-case",
        name: "US Title Case",
        icon: Type,
        path: "/us-title-case",
        color: "hover:bg-obsidian-cobalt/10 hover:text-obsidian-cobalt",
        description: "AP • Chicago style"
    },
    {
        id: "hyphenate",
        name: "Hyphenate",
        icon: Link,
        path: "/hyphenate-text",
        color: "hover:bg-victory-emerald/10 hover:text-victory-emerald",
    },
];

interface ToolSelectorProps {
    text: string;
    className?: string;
}

export function ToolSelector({ text, className }: ToolSelectorProps) {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Show selector when text is entered
        setIsVisible(text.length > 5); // Require at least 5 chars to show
    }, [text]);

    const handleToolSelect = (tool: Tool) => {
        if (tool.path === "#coming-soon") {
            // TODO: Show "Coming Soon" toast
            return;
        }

        // Save text to sessionStorage for the target page to pick up
        if (text) {
            sessionStorage.setItem("pendingText", text);
        }

        // Navigate to tool page
        router.push(tool.path);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                        "w-full max-w-4xl mx-auto",
                        "bg-surface/95 backdrop-blur-2xl",
                        "border border-border-subtle/40",
                        "rounded-2xl shadow-2xl",
                        "p-4",
                        className
                    )}
                >
                    <div className="flex flex-col gap-3">
                        <p className="text-xs font-medium text-muted uppercase tracking-wider">
                            What would you like to do with this text?
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {TOOLS.map((tool) => (
                                <button
                                    key={tool.id}
                                    onClick={() => handleToolSelect(tool)}
                                    className={cn(
                                        "flex flex-col items-start gap-1",
                                        "px-4 py-3",
                                        "bg-elevated/40 backdrop-blur-sm",
                                        "border border-border-subtle/30",
                                        "rounded-lg",
                                        "transition-all duration-200 text-left",
                                        tool.color,
                                        "focus:outline-none focus:ring-2 focus:ring-primary/40",
                                        tool.path === "#coming-soon" && "opacity-60 cursor-not-allowed"
                                    )}
                                    disabled={tool.path === "#coming-soon"}
                                >
                                    <div className="flex items-center gap-2">
                                        <tool.icon className="w-4 h-4" />
                                        <span className="text-sm font-bold text-body">{tool.name}</span>
                                        {tool.path === "#coming-soon" && (
                                            <span className="text-[10px] opacity-60">Soon</span>
                                        )}
                                    </div>
                                    {tool.description && (
                                        <span className="text-[10px] opacity-70 font-medium ml-6">
                                            {tool.description}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
