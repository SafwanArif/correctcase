import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Capitalisation Text Tools | British & American English | CorrectCase",
    description: "Professional British and American English text tools. Choose between UK sentence case (BBC/Guardian) and US title case (AP/Chicago) standards.",
};

export default function CapitaliseTitleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
