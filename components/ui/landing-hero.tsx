"use client";

import { useState, Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroEditor } from "@/components/features/hero-editor";
import { ToolSelector } from "@/components/ui/tool-selector";
import { ComplianceBadges } from "@/components/ui/compliance-badges";
import { EducationalSection } from "@/components/ui/educational-section";
import { ShieldCheck, Zap, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LandingHeroProps {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    description?: React.ReactNode;
    breadcrumbs?: React.ReactNode;
    showToolSelector?: boolean;
    defaultTools?: ("case" | "hyphenation")[];
    onEditorTextChange?: (text: string) => void;
}

export function LandingHero({
    title,
    subtitle,
    description,
    breadcrumbs,
    showToolSelector = true,
    defaultTools,
    onEditorTextChange
}: LandingHeroProps) {
    const [editorText, setEditorText] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -120]);

    const handleTextChange = (text: string) => {
        setEditorText(text);
        onEditorTextChange?.(text);
    };

    return (
        <section ref={containerRef} className="relative w-full min-h-screen flex flex-col items-center sm:justify-center justify-start px-4 overflow-hidden pt-20">
            {/* 0. Ambient Juice (Particles) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(4)].map((_, i) => (
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
                className="text-center mb-16 max-w-5xl z-20 relative w-full will-change-transform"
            >
                {/* Optional Breadcrumbs */}
                {breadcrumbs && (
                    <div className="mb-6 flex justify-center">
                        {breadcrumbs}
                    </div>
                )}

                <h1 className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-body mb-12 leading-[0.85]">
                    {title || (
                        <>
                            Convert text between <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-obsidian-cobalt via-radiant-cyan to-victory-emerald">British & American</span> standards
                        </>
                    )}
                </h1>

                {/* 2. The Hero Editor (Product Showcase) - IMMEDIATE CTA */}
                <motion.div
                    style={{ scale }}
                    initial={{ opacity: 0, scale: 0.98, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-4xl mx-auto relative z-10 mb-6 will-change-transform"
                >
                    <div className="absolute inset-x-0 -top-20 -bottom-20 bg-primary/5 blur-[120px] -z-10 rounded-full opacity-30"></div>
                    <Suspense>
                        <HeroEditor
                            onTextChange={handleTextChange}
                            defaultTools={defaultTools}
                        />
                    </Suspense>
                </motion.div>

                {/* 3. Subtitle / Description (Moved below editor) */}
                <div className="min-h-[140px]">
                    {subtitle && (
                        <div className="mb-6">
                            {subtitle}
                        </div>
                    )}

                    {/* 4. Contextual Tool Selector (Optional) */}
                    {showToolSelector && <ToolSelector text={editorText} className="mb-10" />}

                    <div className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed font-medium opacity-90 mb-12">
                        {description || (
                            <>
                                Professional British English text tools for international copywriters.<br className="hidden sm:block" />
                                Sentence case, title case, hyphenation—all client-side, zero tracking.
                            </>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Hint for Scroll */}
            <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40"
            >
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Scroll to explore</span>
                <div className="w-px h-12 bg-gradient-to-b from-primary/40 to-transparent"></div>
            </motion.div>
        </section>
    );
}
