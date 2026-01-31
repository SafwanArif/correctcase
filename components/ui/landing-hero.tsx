"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { HeroEditor } from "@/components/features/hero-editor";
import { Suspense, useRef } from "react";
import { ShieldCheck, Zap, Globe } from "lucide-react";

export function LandingHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -120]);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
            {/* 0. Ambient Juice (Particles) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.sin(i) * 30, 0],
                            opacity: [0, 0.2, 0]
                        }}
                        transition={{
                            duration: 15 + i * 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute w-px h-40 bg-gradient-to-b from-primary/10 to-transparent"
                        style={{
                            left: `${10 + i * 12}%`,
                            top: `${10 + (i % 4) * 20}%`
                        }}
                    />
                ))}
            </div>

            {/* 1. Cinematic Entry Text */}
            <motion.div
                style={{ opacity, y: yParallax }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-16 max-w-5xl z-20 relative pointer-events-none"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 backdrop-blur-md border border-border-subtle/50 text-[10px] font-bold tracking-widest text-primary uppercase mb-8 shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    2026 S-Tier Authority
                </div>

                <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-body mb-8 leading-[0.85] text-glow-primary">
                    The Clinical <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-obsidian-cobalt via-radiant-cyan to-victory-emerald">Standard</span> for Text.
                </h2>

                <p className="text-lg sm:text-2xl text-muted max-w-3xl mx-auto leading-relaxed font-medium opacity-80">
                    Privacy-first casing, grammar, and hyphenation conversion.
                    100% Client-side. Zero server data. Absolute authority.
                </p>
            </motion.div>

            {/* 2. The Hero Editor (Product Showcase) */}
            <motion.div
                style={{ scale }}
                initial={{ opacity: 0, scale: 0.98, y: 60 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-5xl relative z-10"
            >
                <div className="absolute inset-x-0 -top-20 -bottom-20 bg-primary/5 blur-[160px] -z-10 rounded-full opacity-30"></div>
                <Suspense>
                    <HeroEditor />
                </Suspense>
            </motion.div>

            {/* Hint for Scroll */}
            <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40"
            >
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Scroll to Explore</span>
                <div className="w-px h-12 bg-gradient-to-b from-primary/40 to-transparent"></div>
            </motion.div>
        </section>
    );
}
