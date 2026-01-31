"use client";

import { useRef, useState, useEffect } from "react";
import { LandingHero } from "@/components/ui/landing-hero";
import { BenefitSection } from "@/components/ui/benefit-section";
import { EducationalSection } from "@/components/ui/educational-section";
import { CinematicDots } from "@/components/ui/cinematic-dots";
import { FloatingCommandBar } from "@/components/ui/floating-command-bar";
import { motion } from "framer-motion";

export function HomeClient() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeSegment, setActiveSegment] = useState(0);

    const scrollToTop = () => {
        containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            const index = Math.round(el.scrollTop / (window.innerHeight || 800));
            if (index !== activeSegment) {
                setActiveSegment(index);
            }
        };

        el.addEventListener('scroll', handleScroll, { passive: true });
        return () => el.removeEventListener('scroll', handleScroll);
    }, [activeSegment]);

    return (
        <div className="w-full h-full sm:h-auto sm:overflow-visible">
            {/* CINEMATIC NAV (DOTS) */}
            <CinematicDots total={4} active={activeSegment} />

            {/* ANCHOR EDITOR (FLOATING COMMAND BAR) */}
            <FloatingCommandBar isVisible={activeSegment > 0} onScrollToTop={scrollToTop} />

            {/* CINEMATIC SCROLL CONTAINER */}
            <div
                ref={containerRef}
                className="w-full sm:snap-y sm:snap-mandatory sm:h-screen sm:overflow-y-auto scroll-smooth no-scrollbar"
            >
                {/* HERO LAND */}
                <div className="sm:snap-start sm:min-h-screen flex items-center justify-center pt-20 pb-12 sm:py-0">
                    <LandingHero />
                </div>

                {/* COMPLIANCE & EDUCATIONAL LAND */}
                <div className="sm:snap-start sm:min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-surface/30">
                    <EducationalSection />
                </div>

                {/* BENEFIT LAND */}
                <div className="sm:snap-start sm:min-h-screen flex items-start justify-center">
                    <BenefitSection />
                </div>

                {/* MANIFESTO LAND (The "Clinical Proof") */}
                <div className="sm:snap-start sm:min-h-screen flex items-center justify-center px-4 bg-obsidian-cobalt/5">
                    <div className="max-w-4xl text-center">
                        <h3 className="text-3xl sm:text-5xl font-black text-body mb-8 tracking-tighter">
                            A clinical <span className="text-glow-primary text-transparent bg-clip-text bg-gradient-to-r from-radiant-cyan to-victory-emerald">trust model</span>.
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                            <div className="p-6 rounded-2xl bg-surface/30 border border-border-subtle/50 backdrop-blur-sm">
                                <h4 className="font-bold text-primary mb-2 tracking-widest text-[10px] uppercase">Client-side logic</h4>
                                <p className="text-sm text-muted">All transformations happen in your browser's memory. No text ever touches our servers. Period.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-surface/30 border border-border-subtle/50 backdrop-blur-sm">
                                <h4 className="font-bold text-primary mb-2 tracking-widest text-[10px] uppercase">Zero tracking</h4>
                                <p className="text-sm text-muted">We don't use cookies, analytics, or tracking pixels. CorrectCase is a tool, not a data harvesting operation.</p>
                            </div>
                        </div>

                        {/* CTA - Ready to Standardise */}
                        <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-obsidian-cobalt to-intelligence-indigo text-white flex flex-col sm:flex-row items-center justify-between gap-8 shadow-depth overflow-hidden relative">
                            <div className="relative z-10">
                                <h4 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight">Ready to standardise?</h4>
                                <p className="text-white/70 font-medium">Start using the S-Tier conversion suite now.</p>
                            </div>
                            <a
                                href="/capitalise-title"
                                className="relative z-10 px-8 py-4 bg-white text-obsidian-cobalt font-bold rounded-xl hover:scale-105 transition-transform active:scale-95 shadow-lg"
                            >
                                Launch suite
                            </a>

                            {/* Decorative Background Glows */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-radiant-cyan/20 blur-[80px] -z-0"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 blur-[60px] -z-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
