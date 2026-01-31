"use client";

import { GenericPageClient } from "@/components/features/generic-page-client";
import { EducationalSection } from "@/components/ui/educational-section";
import { BenefitSection } from "@/components/ui/benefit-section";
import { motion } from "framer-motion";

export function HomeClient() {
    return (
        <GenericPageClient
            heroProps={{
                // Uses default title and description from LandingHero
                showToolSelector: true,
            }}
            sections={[
                // Section 2: Educational
                <div key="edu" className="py-20">
                    <EducationalSection />
                </div>,

                // Section 3: Benefit
                <div key="benefit">
                    <BenefitSection />
                </div>,

                // Section 4: Manifesto
                <div key="manifesto" className="max-w-4xl mx-auto text-center py-20">
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

                    <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-obsidian-cobalt to-intelligence-indigo text-white flex flex-col sm:flex-row items-center justify-between gap-8 shadow-depth overflow-hidden relative text-left">
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
                        <div className="absolute top-0 right-0 w-64 h-64 bg-radiant-cyan/20 blur-[80px] -z-0"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 blur-[60px] -z-0"></div>
                    </div>
                </div>
            ]}
        />
    );
}
