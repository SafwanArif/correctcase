import { HeroEditor } from "@/components/features/hero-editor";

import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "Capitalise Title Tool | US & UK Converters",
    description: "Convert text to US Title Case or UK Sentence Case instantly. Free, privacy-first tool.",
};

import { SeoContent } from "@/components/features/seo-content";
import { SEO_CONTENT } from "@/data/seo-content";

export default function CapitaliseTitlePage() {
    return (
        <>
            <Suspense>
                <HeroEditor defaultTools={["case"]} />
            </Suspense>
            <SeoContent data={SEO_CONTENT['us-title-case']} />
        </>
    );
}
