import { HeroEditor } from "@/components/features/hero-editor";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Capitalise Title Tool - Free Title Case Converter | CorrectCase",
    description: "Convert text to Title Case or Sentence Case automatically. Perfect for headlines, essays, and blog posts. Free, instant, and secure.",
};

export default function CapitaliseTitlePage() {
    return (
        <HeroEditor defaultTools={["case"]} />
    );
}
