"use client";

import { AnimatePresence, motion } from "framer-motion";
import { History, Link, Type } from "lucide-react";
import { useRouter } from "next/navigation";
import { type JSX, useEffect, useState } from "react";
import { useUi } from "@/components/providers/ui-provider";
import { useEventListener } from "@/hooks/use-event-listener";
import { cn } from "@/lib/utils";

interface Tool {
    id: string;
    name: string;
    icon: React.ElementType;
    path?: string;
    onClick?: () => void;
    color: string;
    description?: string;
}

const tools: Tool[] = [
    {
        id: "uk-sentence-case",
        name: "UK Sentence Case",
        icon: Type,
        path: "/capitalise-title/uk-sentence-case",
        color: "hover:bg-radiant-cyan/10 hover:text-radiant-cyan",
        description: "BBC • Guardian style",
    },
    {
        id: "us-title-case",
        name: "US Title Case",
        icon: Type,
        path: "/capitalise-title/us-title-case",
        color: "hover:bg-obsidian-cobalt/10 hover:text-obsidian-cobalt",
        description: "AP • Chicago style",
    },
    {
        id: "hyphenate",
        name: "Hyphenate",
        icon: Link,
        path: "/hyphenate-text",
        color: "hover:bg-victory-emerald/10 hover:text-victory-emerald",
    },
    {
        id: "history",
        name: "History",
        icon: History,
        color: "hover:bg-intelligence-indigo/10 hover:text-intelligence-indigo",
        description: "View recent activity",
    },
];

interface ToolSelectorProps {
    text: string;
    className?: string;
}

export function ToolSelector({ text, className }: ToolSelectorProps): JSX.Element {
    const { openHistory } = useUi();
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    const checkMobile = () => {
        setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    useEffect(() => {
        checkMobile();
    }, []);

    useEventListener("resize", checkMobile);

    // Derived state (no need for effect)
    const isVisible = text.length > 5 || isMobile;

    const handleToolSelect = (tool: Tool) => {
        if (tool.id === "history") {
            openHistory();

            return;
        }

        if (tool.path === "#coming-soon") { return; }

        // Save text to sessionStorage for the target page to pick up
        if (text) {
            sessionStorage.setItem("pendingText", text);
        }

        if (tool.path) {
            router.push(tool.path);
        }
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
                        "bg-surface/95 backdrop-blur-xl",
                        "border border-border-subtle/40",
                        "rounded-2xl shadow-2xl",
                        "p-4 will-change-transform",
                        className
                    )}
                >
                    <div className="flex flex-col gap-3">
                        <p className="text-xs font-medium text-muted uppercase tracking-wider">
                            What would you like to do with this text?
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {tools.map((tool) => {
                                return <button
                                    key={tool.id}
                                    disabled={tool.path === "#coming-soon"}
                                    className={cn(
                                        "flex flex-col items-start gap-1",
                                        "px-4 py-3",
                                        "bg-elevated/40 backdrop-blur-sm",
                                        "border border-border-subtle/30",
                                        "rounded-lg",
                                        "transition-all duration-200 text-left",
                                        tool.color,
                                        "focus:outline-none focus:ring-2 focus:ring-primary/40",
                                        tool.path === "#coming-soon" &&
                                        "opacity-60 cursor-not-allowed"
                                    )}
                                    onClick={() => { handleToolSelect(tool); }}
                                >
                                    <div className="flex items-center gap-2">
                                        <tool.icon className="w-4 h-4" />
                                        <span className="text-sm font-bold text-body">
                                            {tool.name}
                                        </span>
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
                            }
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
