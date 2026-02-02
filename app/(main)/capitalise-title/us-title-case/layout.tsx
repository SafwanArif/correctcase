import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "US Title Case Converter | AP, APA, Chicago & MLA | CorrectCase",
    description:
        "Professional American English title case conversion. Adheres to AP, APA, Chicago, and MLA standards for US publications.",
};

interface LayoutProps {
    children: React.ReactNode;
}

export default function UsTitleCasePage({ children }: LayoutProps): React.JSX.Element {
    return <>{children}</>;
}
