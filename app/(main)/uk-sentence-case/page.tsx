import { HeroEditor } from "@/components/features/hero-editor";
import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { SeoContent } from "@/components/features/seo-content";
import { SEO_CONTENT } from "@/data/seo-content";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "UK Sentence Case Converter | BBC & Guardian Style | CorrectCase",
    description: "Professional British English sentence case conversion. Adheres to BBC, The Guardian, and Gov.uk standards for UK publications.",
};

export default function UkSentenceCasePage() {
    return (
        <div className="flex flex-col gap-12 pt-8">
            {/* Breadcrumbs */}
            <nav className="max-w-5xl mx-auto px-4 w-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted/60">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <Link href="/capitalise-title" className="hover:text-primary transition-colors">Capitalisation Tools</Link>
                <span>/</span>
                <span className="text-primary/40">UK Sentence Case</span>
            </nav>

            <Suspense>
                <HeroEditor defaultTools={["case"]} />
            </Suspense>

            {/* Comparison Link */}
            <div className="max-w-5xl mx-auto px-4 w-full">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between gap-4">
                    <p className="text-sm text-body">
                        Need American English? <strong className="font-bold">AP & Chicago</strong> standards use title case.
                    </p>
                    <Link href="/us-title-case" className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">
                        Switch to US Title Case →
                    </Link>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 w-full pb-24">
                <SeoContent data={SEO_CONTENT['uk-sentence-case']} />
            </div>
        </div>
    );
}
