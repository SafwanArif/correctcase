import { HeroEditor } from "@/components/features/hero-editor";
import { WorkstationLayout } from "@/components/layout/workstation-layout";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "Remove Hyphens from Text | Smart Unhyphenator Code & Tool",
    description: "Intelligently remove line-break hyphens while keeping grammatical ones (e.g. 'co-operate'). Perfect for pasting PDF text. Privacy-first.",
    alternates: {
        canonical: "https://correctcase.co.uk/hyphenate-text",
    }
};

export default function HyphenateTextPage() {
    return (
        <WorkstationLayout activeTab="seo">
            <Suspense>
                <HeroEditor defaultTools={["hyphenation"]} />
            </Suspense>
        </WorkstationLayout>
    );
}
