"use client";

import { GenericPageClient } from "@/components/features/generic-page-client";
import { SeoContent } from "@/components/features/seo-content";
import { SEO_CONTENT } from "@/data/seo-content";
import Link from "next/link";

export default function UkSentenceCasePage() {
    return (
        <GenericPageClient
            heroProps={{
                breadcrumbs: (
                    <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted/60">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/capitalise-title" className="hover:text-primary transition-colors">Capitalisation Tools</Link>
                        <span>/</span>
                        <span className="text-primary/40">UK Sentence Case</span>
                    </nav>
                ),
                title: (
                    <>
                        Professional UK <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-radiant-cyan to-victory-emerald lowercase underline decoration-radiant-cyan/20 underline-offset-8">
                            sentence case
                        </span>.
                    </>
                ),
                subtitle: (
                    <div className="max-w-xl mx-auto py-4 px-6 rounded-2xl bg-radiant-cyan/5 border border-radiant-cyan/10 backdrop-blur-sm flex items-center justify-between gap-6 hover:bg-radiant-cyan/10 transition-colors duration-300">
                        <p className="text-xs text-body font-medium leading-relaxed text-left">
                            Need American English? <strong className="text-primary">AP & Chicago</strong> standards use title case.
                        </p>
                        <Link href="/capitalise-title/us-title-case" className="whitespace-nowrap text-xs font-black text-primary uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all">
                            Switch to US →
                        </Link>
                    </div>
                ),
                description: "The British standard for government (Gov.uk), BBC, and Oxford academic writing. Automatically converts any text to pristine British sentence case.",
                defaultTools: ["case"]
            }}
            sections={[
                <div key="seo" className="py-20">
                    <SeoContent data={SEO_CONTENT['uk-sentence-case']} />
                </div>
            ]}
        />
    );
}
