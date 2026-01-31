import { HeroEditor } from "@/components/features/hero-editor";
import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { SeoContent } from "@/components/features/seo-content";
import { SEO_CONTENT } from "@/data/seo-content";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "US Title Case Converter | AP, APA, Chicago & MLA | CorrectCase",
    description: "Professional American English title case conversion. Adheres to AP, APA, Chicago, and MLA standards for US publications.",
};

export default function UsTitleCasePage() {
    return (
        <div className="flex flex-col gap-12 pt-8">
            {/* Breadcrumbs */}
            <nav className="max-w-5xl mx-auto px-4 w-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted/60">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <Link href="/capitalise-title" className="hover:text-primary transition-colors">Capitalisation Tools</Link>
                <span>/</span>
                <span className="text-primary/40">US Title Case</span>
            </nav>

            <Suspense>
                <HeroEditor defaultTools={["case"]} />
            </Suspense>

            {/* Comparison Link */}
            <div className="max-w-5xl mx-auto px-4 w-full">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between gap-4">
                    <p className="text-sm text-body">
                        Need British English? <strong className="font-bold">BBC & Guardian</strong> standards use sentence case.
                    </p>
                    <Link href="/uk-sentence-case" className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">
                        Switch to UK Sentence Case →
                    </Link>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 w-full pb-24">
                <SeoContent data={SEO_CONTENT['us-title-case']} />
            </div>
        </div>
    );
}
