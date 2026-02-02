import type { Metadata } from "next";
import { type JSX, Suspense } from "react";
import { HeroEditor } from "@/components/features/hero-editor";
import { SeoContent } from "@/components/features/seo-content";
import { seoContent } from "@/data/seo-content";
import { titleVariants } from "@/data/variants";

interface PageParams {
    variant: string;
}

interface GenerateMetadataProps {
    params: Promise<PageParams>;
}

/**
 * Generate Metadata for the variant page.
 */
export async function generateMetadata({
    params,
}: GenerateMetadataProps): Promise<Metadata> {
    const { variant } = await params;
    const variantKey = variant;
    const data = titleVariants[variantKey];

    return {
        title: data.title,
        description: data.description,
        alternates: {
            canonical: `https://correctcase.co.uk/capitalise-title/${variant}`,
        },
    };
}

interface CapitaliseTitleVariantPageProps {
    params: Promise<PageParams>;
}

/**
 * Capitalise Title Variant Page.
 */
export default async function CapitaliseTitleVariantPage({
    params,
}: CapitaliseTitleVariantPageProps): Promise<JSX.Element> {
    const { variant } = await params;
    const variantKey = variant;
    const data = titleVariants[variantKey];
    const seoData = seoContent[variantKey];

    return (
        <>
            <Suspense>
                <HeroEditor defaultTools={["case"]} forcedStyle={data.toolMode} />
            </Suspense>
            <SeoContent data={seoData} />
        </>
    );
}
