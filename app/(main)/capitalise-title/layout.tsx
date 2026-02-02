import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Capitalisation Text Tools | British & American English | CorrectCase",
    description:
        "Professional British and American English text tools. Choose between UK sentence case (BBC/Guardian) and US title case (AP/Chicago) standards.",
};

interface LayoutProps {
    children: React.ReactNode;
}

export default function CapitaliseTitleLayout({ children }: LayoutProps): React.JSX.Element {
    return <>{children}</>;
}
