"use client";

import { type JSX,Suspense } from "react";
import { HeroEditor } from "@/components/features/hero-editor";

/**
 * Standard UK Sentence Case Page.
 */
export default function UkSentenceCasePage(): JSX.Element {
    return (
        <Suspense>
            <HeroEditor defaultTools={["case"]} forcedStyle="uk" />
        </Suspense>
    );
}
