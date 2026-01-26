"use client";

import { HeroEditor } from "@/components/features/hero-editor";
import { WorkstationLayout } from "@/components/layout/workstation-layout";

export default function CapitaliseTitlePage() {
    return (
        <WorkstationLayout activeTab="text">
            <HeroEditor defaultTools={["case"]} />
        </WorkstationLayout>
    );
}
