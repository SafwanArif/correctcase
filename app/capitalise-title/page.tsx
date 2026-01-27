import { HeroEditor } from "@/components/features/hero-editor";
import { WorkstationLayout } from "@/components/layout/workstation-layout";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "Capitalise Title Tool | US & UK Converters",
    description: "Convert text to US Title Case or UK Sentence Case instantly. Free, privacy-first tool.",
};

export default function CapitaliseTitlePage() {
    return (
        <WorkstationLayout activeTab="text">
            <Suspense>
                <HeroEditor defaultTools={["case"]} />
            </Suspense>
        </WorkstationLayout>
    );
}
