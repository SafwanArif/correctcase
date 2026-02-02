import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Use Geist as requested/available
import { Providers } from "@/app/providers";
import { StructuredData } from "@/components/seo/structured-data";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        template: "%s | CorrectCase",
        default: "CorrectCase | Supreme British English Text Utilities",
    },
    description:
        "Elite, privacy-first text tools for British English. 100% Client-Side. Convert Case, Clean Hyphenation, and Fix Grammar locally. No data leaves your hardware.",
    applicationName: "CorrectCase",
    authors: [{ name: "Safwan", url: "https://correctcase.co.uk" }],
    keywords: [
        "british english converter",
        "sentence case gov uk",
        "title case capitalization",
        "privacy secure text tool",
        "offline text editor",
        "clean hyphenation",
    ],
    metadataBase: new URL("https://correctcase.co.uk"),
    alternates: {
        canonical: "/",
        languages: {
            "en-GB": "/",
            "en-US": "/us",
        },
    },
    openGraph: {
        title: "CorrectCase | Supreme Privacy Text Utilities",
        description: "Instant text conversion tool. 100% Local. Zero tracking. Zero servers.",
        url: "https://correctcase.co.uk",
        siteName: "CorrectCase",
        locale: "en_GB",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "CorrectCase Supreme Presence",
        description: "Elite British English text tools. 100% Privacy Floor.",
        creator: "@SafwanArif",
    },
    category: "productivity",
    other: {
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "black-translucent",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en-GB" suppressHydrationWarning>
            <head>
                <StructuredData
                    data={{
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        name: "CorrectCase",
                        applicationCategory: "Utility",
                        operatingSystem: "Browser",
                        offers: {
                            "@type": "Offer",
                            price: "0",
                            priceCurrency: "GBP",
                        },
                        featureList: "Text Conversion, Smart Notepad, Local History",
                        url: "https://correctcase.co.uk",
                    }}
                />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} selection:bg-[oklch(var(--primary)/0.2)]`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
