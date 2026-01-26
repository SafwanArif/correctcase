"use client";

import { HeroEditor } from "@/components/features/hero-editor";
import { WorkstationLayout } from "@/components/layout/workstation-layout";

export default function HyphenateTextPage() {
    return (
        <WorkstationLayout activeTab="seo">
            <HeroEditor defaultTools={["hyphenation"]} />
        </WorkstationLayout>
    );
}
