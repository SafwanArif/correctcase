import { type JSX,Suspense } from "react";
import { HeroEditor } from "@/components/features/hero-editor";
import { SeoContent } from "@/components/features/seo-content";
import { seoContent } from "@/data/seo-content";

/**
 * Hyphenate Text Page.
 */
export default function HyphenateTextPage(): JSX.Element {
    const data = seoContent.hyphenate;

    return (
        <>
            <Suspense>
                <HeroEditor defaultTools={["hyphenation"]} />
            </Suspense>
            <SeoContent data={data} />
        </>
    );
}
