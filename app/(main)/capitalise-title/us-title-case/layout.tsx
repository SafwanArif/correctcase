import { Metadata } from "next";

export const metadata: Metadata = {
    title: "US Title Case Converter | AP, APA, Chicago & MLA | CorrectCase",
    description:
        "Professional American English title case conversion. Adheres to AP, APA, Chicago, and MLA standards for US publications.",
};

export default function UsTitleCaseLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
