"use client";

import { useRef, useState, useEffect } from "react";
import { LandingHero } from "@/components/ui/landing-hero";
import { CinematicDots } from "@/components/ui/cinematic-dots";
import { FloatingCommandBar } from "@/components/ui/floating-command-bar";
import { motion } from "framer-motion";

interface GenericPageClientProps {
    heroProps: {
        title?: React.ReactNode;
        subtitle?: React.ReactNode;
        description?: React.ReactNode;
        breadcrumbs?: React.ReactNode;
        showToolSelector?: boolean;
        defaultTools?: ("case" | "hyphenation")[];
    };
    sections: React.ReactNode[]; // Subsequent sections after the hero
}

export function GenericPageClient({ heroProps, sections }: GenericPageClientProps) {
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
            <CinematicDots total={1 + sections.length} active={activeSegment} />

            {/* ANCHOR EDITOR (FLOATING COMMAND BAR) */}
            <FloatingCommandBar isVisible={activeSegment > 0} onScrollToTop={scrollToTop} />

            {/* CINEMATIC SCROLL CONTAINER */}
            <div
                ref={containerRef}
                className="w-full sm:snap-y sm:snap-mandatory sm:h-screen sm:overflow-y-auto scroll-smooth no-scrollbar"
            >
                {/* HERO LAND */}
                <div className="sm:snap-start sm:min-h-screen block sm:flex sm:items-center sm:justify-center pt-0 pb-12 sm:py-0">
                    <LandingHero {...heroProps} />
                </div>

                {/* ADDITIONAL SECTIONS */}
                {sections.map((section, idx) => (
                    <div
                        key={idx}
                        className="sm:snap-start sm:min-h-screen flex flex-col items-center justify-center py-16 px-4 even:bg-surface/40 odd:bg-transparent transition-colors duration-700"
                    >
                        <div className="w-full max-w-5xl mx-auto">
                            {section}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
