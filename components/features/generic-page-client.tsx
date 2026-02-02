"use client";

import { type JSX,Suspense, useRef } from "react";
import { useScroll } from "@/components/providers/scroll-provider";
import { LandingHero } from "@/components/ui/landing-hero";
import { useEventListener } from "@/hooks/use-event-listener";

interface GenericPageClientProps {
    heroProps: {
        title?: React.ReactNode;
        subtitle?: React.ReactNode;
        description?: React.ReactNode;
        breadcrumbs?: React.ReactNode;
        badge?: React.ReactNode;
        showToolSelector?: boolean;
        showToolbar?: boolean;
        defaultTools?: ("case" | "hyphenation")[];
        forcedStyle?: "us" | "uk";
    };
    /**
     * Subsequent sections after the hero.
     */
    sections: { id: string; content: React.ReactNode }[];
}

export function GenericPageClient({ heroProps, sections }: GenericPageClientProps): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);
    const { setScrollTop } = useScroll();

    useEventListener(
        "scroll",
        () => {
            if (containerRef.current) {
                setScrollTop(containerRef.current.scrollTop);
            }
        },
        { element: containerRef, options: { passive: true } }
    );

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
                    {sections.map(({ id, content }) => {
                        return <div
                            key={id}
                            className="sm:snap-start sm:min-h-screen flex flex-col items-center justify-center py-16 px-4 even:bg-surface/5 odd:bg-transparent transition-colors duration-700"
                        >
                            <div className="w-full max-w-5xl mx-auto">{content}</div>
                        </div>
                    }
                    )}
                </div>
            </Suspense>
        </div>
    );
};
