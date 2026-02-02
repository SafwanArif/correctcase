import { type JSX, Suspense } from "react";
import { HeroEditor } from "@/components/features/hero-editor";
import { SeoContent } from "@/components/features/seo-content";
import { seoContent } from "@/data/seo-content";
import { titleVariants } from "@/data/variants";

interface PageParams {
    variant: string;
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
