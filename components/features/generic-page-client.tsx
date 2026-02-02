"use client";

import { useRef, useEffect, Suspense } from "react";
import { LandingHero } from "@/components/ui/landing-hero";
import { useScroll } from "@/components/providers/scroll-provider";
import { motion } from "framer-motion";

interface GenericPageClientProps {
    heroProps: {
        title?: React.ReactNode;
        subtitle?: React.ReactNode;
        description?: React.ReactNode;
        breadcrumbs?: React.ReactNode;
        badge?: React.ReactNode;
        showToolSelector?: boolean;
        defaultTools?: ("case" | "hyphenation")[];
    };
    sections: React.ReactNode[]; // Subsequent sections after the hero
}

export function GenericPageClient({ heroProps, sections }: GenericPageClientProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { setScrollTop } = useScroll();

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            setScrollTop(el.scrollTop);
        };

        el.addEventListener('scroll', handleScroll, { passive: true });
        return () => el.removeEventListener('scroll', handleScroll);
    }, [setScrollTop]);

    return (
        <div className="w-full min-h-screen sm:h-auto sm:overflow-visible">
            {/* CINEMATIC SCROLL CONTAINER */}
            <Suspense fallback={null}>
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
                            className="sm:snap-start sm:min-h-screen flex flex-col items-center justify-center py-16 px-4 even:bg-surface/5 odd:bg-transparent transition-colors duration-700"
                        >
                            <div className="w-full max-w-5xl mx-auto">
                                {section}
                            </div>
                        </div>
                    ))}
                </div>
            </Suspense>
        </div>
    );
}
