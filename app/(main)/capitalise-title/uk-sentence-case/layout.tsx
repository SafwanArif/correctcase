import { Metadata } from "next";

export const metadata: Metadata = {
    title: "UK Sentence Case Converter | BBC & Guardian Style | CorrectCase",
    description:
        "Professional British English sentence case conversion. Adheres to BBC, Guardian, and Government (Gov.uk) standards.",
};

export default function UkSentenceCaseLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
