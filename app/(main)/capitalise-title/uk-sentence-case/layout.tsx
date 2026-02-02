import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "UK Sentence Case Converter | BBC & Guardian Style | CorrectCase",
    description:
        "Professional British English sentence case conversion. Adheres to BBC, Guardian, and Government (Gov.uk) standards.",
};

interface LayoutProps {
    children: React.ReactNode;
}

export default function UkSentenceCasePage({ children }: LayoutProps): React.JSX.Element {
    return <>{children}</>;
}
