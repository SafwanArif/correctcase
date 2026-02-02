import { Metadata } from "next";
import { GenericPageClient } from "@/components/features/generic-page-client";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "Remove Hyphens from Text | Smart Unhyphenator Code & Tool",
    description: "Intelligently remove line-break hyphens while keeping grammatical ones (e.g. 'co-operate'). Perfect for pasting PDF text. Privacy-first.",
    alternates: {
        canonical: "https://correctcase.co.uk/hyphenate-text",
    }
};

import { SeoContent } from "@/components/features/seo-content";
import { SEO_CONTENT } from "@/data/seo-content";

export default function HyphenateTextPage() {
    return (
        <GenericPageClient
            heroProps={{
                title: "Smart Hyphenation Removal Tool",
                description: "Intelligently remove line-break hyphens from PDF text while preserving grammatical compounds.",
                defaultTools: ["hyphenation"],
                badge: <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-primary/10 text-primary rounded-full">PDF Cleanup</span>
            }}
            sections={[
                <SeoContent key="content" data={SEO_CONTENT['hyphenate']} />
            ]}
        />
    );
}
