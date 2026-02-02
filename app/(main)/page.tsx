import type { Metadata } from "next";
import Link from "next/link";
import type { JSX } from "react";
import { GenericPageClient } from "@/components/features/generic-page-client";
import { BenefitSection } from "@/components/ui/benefit-section";
import { EducationalSection } from "@/components/ui/educational-section";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "CorrectCase | Convert Text Between UK & US English Styles",
    description:
        "Professional British English text tools for international copywriters. Convert between UK sentence case and US title case with proper capitalisation, hyphenation, and grammar—client-side only.",
};

export default function Home(): JSX.Element {
    const graphLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "@id": "https://correctcase.co.uk/#app",
                name: "CorrectCase",
                applicationCategory: "ProductivityApplication",
                operatingSystem: "All",
                offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "GBP",
                },
                featureList: [
                    "British English Sentence Case",
                    "AP/Chicago Title Case",
                    "Smart PDF Unhyphenation",
                    "100% Privacy Floor",
                ],
            },
            {
                "@type": "WebSite",
                "@id": "https://correctcase.co.uk/#website",
                url: "https://correctcase.co.uk",
                name: "CorrectCase",
                publisher: { "@id": "https://correctcase.co.uk/#app" },
            },
        ],
    };

    return (
        <>
            {/* 1. KNOWLEDGE GRAPH */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(graphLd) }}
            />

            {/* 2. CINEMATIC CLIENT EXPERIENCE */}
            <GenericPageClient
                heroProps={{
                    showToolSelector: true,
                    badge: (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/50 border border-border-subtle/40 backdrop-blur-md shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-victory-emerald opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-victory-emerald"></span>
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                                100% Private
                            </span>
                        </div>
                    ),
                }}
                sections={[
                    // Section 2: Educational
                    {
                        id: "edu",
                        content: (
                            <div className="py-20">
                                <EducationalSection />
                            </div>
                        ),
                    },

                    // Section 3: Benefit
                    {
                        id: "benefit",
                        content: (
                            <div className="">
                                <BenefitSection />
                            </div>
                        ),
                    },

                    // Section 4: Manifesto
                    {
                        id: "manifesto",
                        content: (
                            <div className="max-w-4xl mx-auto text-center py-20">
                                <h3 className="text-3xl sm:text-5xl font-black text-body mb-8 tracking-tighter">
                                    A clinical{" "}
                                    <span className="text-glow-primary text-transparent bg-clip-text bg-gradient-to-r from-radiant-cyan to-victory-emerald">
                                        trust model
                                    </span>
                                    .
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                                    <div className="p-6 rounded-2xl bg-surface/30 border border-border-subtle/50 backdrop-blur-sm">
                                        <h4 className="font-bold text-primary mb-2 tracking-widest text-[10px] uppercase">
                                            Client-side logic
                                        </h4>
                                        <p className="text-sm text-muted">
                                            All transformations happen in your browser&apos;s memory. No text
                                            ever touches our servers. Period.
                                        </p>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-surface/30 border border-border-subtle/50 backdrop-blur-sm">
                                        <h4 className="font-bold text-primary mb-2 tracking-widest text-[10px] uppercase">
                                            Zero tracking
                                        </h4>
                                        <p className="text-sm text-muted">
                                            We don&apos;t use cookies, analytics, or tracking pixels. CorrectCase
                                            is a tool, not a data harvesting operation.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-obsidian-cobalt to-intelligence-indigo text-white flex flex-col sm:flex-row items-center justify-between gap-8 shadow-depth overflow-hidden relative text-left">
                                    <div className="relative z-10">
                                        <h4 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight">
                                            Ready to standardise?
                                        </h4>
                                        <p className="text-white/70 font-medium">
                                            Start using the S-Tier conversion suite now.
                                        </p>
                                    </div>
                                    <Link
                                        href="/capitalise-title"
                                        className="relative z-10 px-8 py-4 bg-white text-obsidian-cobalt font-bold rounded-xl hover:scale-105 transition-transform active:scale-95 shadow-lg"
                                    >
                                        Launch suite
                                    </Link>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-radiant-cyan/20 blur-[80px] -z-0"></div>
                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 blur-[60px] -z-0"></div>
                                </div>
                            </div>
                        ),
                    },
                ]}
            />
        </>
    );
}
