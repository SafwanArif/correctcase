"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CinematicDotsProps {
    total: number;
    active: number;
    className?: string;
}

export function CinematicDots({ total, active, className }: CinematicDotsProps) {
    return (
        <div className={cn("fixed right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-50", className)}>
            {[...Array(total)].map((_, i) => (
                <div key={i} className="relative flex items-center justify-center">
                    <motion.div
                        animate={{
                            scale: active === i ? 1.6 : 1,
                            backgroundColor: active === i ? "oklch(var(--radiant-cyan))" : "oklch(var(--text-muted) / 0.4)",
                            boxShadow: active === i ? "0 0 20px oklch(var(--radiant-cyan) / 0.5)" : "none"
                        }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-2 h-2 rounded-full border border-border-subtle/20"
                    />
                    {active === i && (
                        <motion.div
                            layoutId="dot-ring"
                            className="absolute w-4 h-4 rounded-full border border-primary/20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
