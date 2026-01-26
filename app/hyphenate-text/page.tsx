"use client";

import { HeroEditor } from "@/components/features/hero-editor";
import { WorkstationLayout } from "@/components/layout/workstation-layout";
import { Suspense } from "react";

export default function HyphenateTextPage() {
    return (
        <WorkstationLayout activeTab="seo">
            <Suspense>
                <HeroEditor defaultTools={["hyphenation"]} />
            </Suspense>
        </WorkstationLayout>
    );
}
