
import { HeroEditor } from "@/components/features/hero-editor";
import { WorkstationLayout } from "@/components/layout/workstation-layout";
import { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

export const dynamic = 'force-static';

// Define the valid variants and their metadata
const VARIANTS = {
    'us-title-case': {
        title: "US Title Case Converter | Capitalize My Title Tool",
        description: "Free US Title Case converter (AP, APA, Chicago style). Instantly capitalize titles for headlines, blogs, and essays. Privacy-first.",
        toolMode: 'us'
    },
    'uk-sentence-case': {
        title: "UK Sentence Case Converter | British English Tool",
        description: "Free UK Sentence Case converter. Standard British English formatting for gov.uk, academic, and professional texts. Privacy-first.",
        toolMode: 'uk'
    }
} as const;

type VariantKey = keyof typeof VARIANTS;

export async function generateStaticParams() {
    return Object.keys(VARIANTS).map((variant) => ({
        variant: variant,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }): Promise<Metadata> {
    const { variant } = await params;
    const variantKey = variant as VariantKey;
    const data = VARIANTS[variantKey];

    if (!data) return {};

    return {
        title: data.title,
        description: data.description,
        alternates: {
            canonical: `https://correctcase.co.uk/capitalise-title/${variant}`,
        }
    };
}

export default async function CapitaliseTitleVariantPage({ params }: { params: Promise<{ variant: string }> }) {
    const { variant } = await params;
    const variantKey = variant as VariantKey;
    const data = VARIANTS[variantKey];

    if (!data) {
        notFound();
    }

    return (
        <WorkstationLayout activeTab="text">
            <Suspense>
                <HeroEditor defaultTools={["case"]} forcedStyle={data.toolMode as 'us' | 'uk'} />
            </Suspense>
        </WorkstationLayout>
    );
}
