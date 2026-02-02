/* eslint-disable react-refresh/only-export-components */
import { type JSX,Suspense } from "react";
import { HeroEditor } from "@/components/features/hero-editor";
import { SeoContent } from "@/components/features/seo-content";
import { seoContent } from "@/data/seo-content";

export { metadata } from "./metadata";
export const dynamic = "force-static";

/**
 * Hyphenate Text Page.
 */
function HyphenateTextPage(): JSX.Element {
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

export default HyphenateTextPage;
