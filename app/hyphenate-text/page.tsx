import { HeroEditor } from "@/components/features/hero-editor";
import { Metadata } from "next";
import { Shell } from "@/components/layout/shell";

export const metadata: Metadata = {
    title: "Hyphenate Text Tool - SEO Slug Generator | CorrectCase",
    description: "Instantly hyphenate text for SEO-friendly URLs or unhyphenate slugs back to readable text. The smart tool for web developers and writers.",
};

export default function HyphenateTextPage() {
    return (
        <Shell>
            <HeroEditor defaultTools={["hyphenation"]} />
        </Shell>
    );
}
