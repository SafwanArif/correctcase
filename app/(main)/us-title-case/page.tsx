"use client";

import { GenericPageClient } from "@/components/features/generic-page-client";
import { SeoContent } from "@/components/features/seo-content";
import { SEO_CONTENT } from "@/data/seo-content";
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
                        Professional US <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-obsidian-cobalt to-intelligence-indigo lowercase underline decoration-obsidian-cobalt/20 underline-offset-8">
                            title case
                        </span>.
                    </>
                ),
                subtitle: (
                    <div className="max-w-xl mx-auto py-4 px-6 rounded-2xl bg-obsidian-cobalt/5 border border-obsidian-cobalt/10 backdrop-blur-sm flex items-center justify-between gap-6 hover:bg-obsidian-cobalt/10 transition-colors duration-300">
                        <p className="text-xs text-body font-medium leading-relaxed text-left">
                            Need British English? <strong className="text-primary">BBC & Guardian</strong> standards use sentence case.
                        </p>
                        <Link href="/uk-sentence-case" className="whitespace-nowrap text-xs font-black text-primary uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all">
                            Switch to UK →
                        </Link>
                    </div>
                ),
                description: "The American industry standard for AP, APA, Chicago, and MLA styles. Adheres to strict capitalisation rules for journalistic and academic excellence.",
                defaultTools: ["case"]
            }}
            sections={[
                <div key="seo" className="py-20">
                    <SeoContent data={SEO_CONTENT['us-title-case']} />
                </div>
            ]}
        />
    );
}
