"use client";

import { GenericPageClient } from "@/components/features/generic-page-client";
import { SEOContentSection } from "@/components/content/seo-content-section";
import Link from "next/link";

export default function UsTitleCasePage() {
    return (
        <GenericPageClient
            heroProps={{
                breadcrumbs: (
                    <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted/60">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/capitalise-title" className="hover:text-primary transition-colors">Capitalisation Tools</Link>
                        <span>/</span>
                        <span className="text-primary/40">US Title Case</span>
                    </nav>
                ),
                title: (
                    <>
                        Title Case Converter <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-obsidian-cobalt to-intelligence-indigo lowercase underline decoration-obsidian-cobalt/20 underline-offset-8">
                            (AP & Chicago Style)
                        </span>
                    </>
                ),
                subtitle: (
                    <div className="max-w-xl mx-auto py-4 px-6 rounded-2xl bg-obsidian-cobalt/5 border border-obsidian-cobalt/10 backdrop-blur-sm flex items-center justify-between gap-6 hover:bg-obsidian-cobalt/10 transition-colors duration-300">
                        <p className="text-xs text-body font-medium leading-relaxed text-left">
                            Need British English? <strong className="text-primary">BBC & Guardian</strong> standards use sentence case.
                        </p>
                        <Link href="/capitalise-title/uk-sentence-case" className="whitespace-nowrap text-xs font-black text-primary uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all">
                            Switch to UK →
                        </Link>
                    </div>
                ),
                description: "The American industry standard for AP, APA, Chicago, and MLA styles. Adheres to strict capitalisation rules for journalistic and academic excellence.",
                defaultTools: ["case"]
            }}
            sections={[
                <SEOContentSection
                    key="utility-guide"
                    title="Stop guessing which words to capitalise."
                    subtitle="Adhere to the AP Stylebook and Chicago Manual of Style."
                >
                    <blockquote>
                        Title capitalisation is complex. Does "is" get capitalised? (Yes, it's a verb). What about "after"? (It depends). Our <strong>smart converter</strong> follows the strict rules of the major American style guides so you don't have to memorise them.
                    </blockquote>

                    <h3>Supported Standards:</h3>
                    <ul className="list-disc pl-5 space-y-2 marker:text-obsidian-cobalt">
                        <li>
                            <strong>AP Style</strong>: The gold standard for journalism and news.
                        </li>
                        <li>
                            <strong>Chicago Manual</strong>: Perfect for book titles and long-form essays.
                        </li>
                        <li>
                            <strong>APA Style</strong>: The requirement for academic papers and science journals.
                        </li>
                        <li>
                            <strong>NYT Style</strong>: The classic, prestige headline format.
                        </li>
                    </ul>
                </SEOContentSection>
            ]}
        />
    );
}
