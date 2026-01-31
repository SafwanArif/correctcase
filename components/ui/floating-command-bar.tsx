"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEditor } from "@/components/providers/editor-provider";
import { BrandLogo } from "@/components/ui/brand-logo";
import { ChevronUp } from "lucide-react";

interface FloatingCommandBarProps {
    isVisible: boolean;
    onScrollToTop: () => void;
}

export function FloatingCommandBar({ isVisible, onScrollToTop }: FloatingCommandBarProps) {
    const { text, setText } = useEditor();

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-2xl"
                >
                    <div className="bg-surface/60 backdrop-blur-2xl border border-border-subtle/40 rounded-full p-2 shadow-2xl flex items-center gap-3 specular-border group">
                        {/* Scroll to Top Trigger / Logo */}
                        <button
                            onClick={onScrollToTop}
                            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-all group-hover:scale-110 active:scale-95"
                            title="Back to Top"
                        >
                            <BrandLogo className="w-6 h-6" />
                        </button>

                        {/* Instant Input Area */}
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Type or paste to analyse instantly..."
                                className="w-full bg-transparent border-none outline-none text-sm text-body placeholder:text-muted/60 py-2"
                            />
                        </div>

                        {/* Action Hint */}
                        <div className="pr-4 flex items-center gap-2">
                            <span className="text-[10px] font-bold text-muted uppercase tracking-widest hidden sm:inline">Clinical Mode</span>
                            <ChevronUp className="w-4 h-4 text-muted animate-bounce" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
