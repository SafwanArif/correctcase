"use client";

import { type JSX,Suspense } from "react";
import { HeroEditor } from "@/components/features/hero-editor";

/**
 * Standard US Title Case Page.
 */
export default function UsTitleCasePage(): JSX.Element {
    return (
        <Suspense>
            <HeroEditor defaultTools={["case"]} forcedStyle="us" />
        </Suspense>
    );
}
