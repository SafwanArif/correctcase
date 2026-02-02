"use client";

import { motion } from "framer-motion";
import type React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for LandingHero.
 */
export interface LandingHeroProps {
    className?: string;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    description?: React.ReactNode;
    badge?: React.ReactNode;
    showToolSelector?: boolean;
}

/**
 * Landing Hero Component with refined particles and typography.
 */
export function LandingHero({
    className,
    title,
    description,
    badge
}: LandingHeroProps): React.JSX.Element {
    return (
        <section
            className={cn(
                "relative pt-32 pb-20 px-6 overflow-hidden flex flex-col items-center text-center",
                className
            )}
        >
            {/* 0. Ambient Juice (Particles) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(4)].map((unused, index) => {
                    const key = `particle-${String(index)}`;

                    return (
                        <motion.div
                            key={key}
                            className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl"
                            animate={{
                                x: [Math.random() * 100, Math.random() * -100],
                                y: [Math.random() * 100, Math.random() * -100],
                            }}
                            transition={{
                                duration: 10 + index * 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                            style={{
                                left: `${String(25 * index)}%`,
                                top: `${String(20 * index)}%`,
                            }}
                        />
                    );
                })}
            </div>

            {/* Content ... */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl"
            >
                {Boolean(badge) && <div className="mb-6">{badge}</div>}

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-body mb-6 leading-tight">
                    {title || (
                        <>
                            Text Casing with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-radiant-cyan">
                                Clinical Precision.
                            </span>
                        </>
                    )}
                </h1>

                <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
                    {description || "Convert between US Title Case (AP, Chicago) and UK Sentence Case (Gov.uk) with linguistic accuracy. Privacy-first, client-side processing."}
                </p>
            </motion.div>
        </section>
    );
}
