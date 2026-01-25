import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Use Geist as requested/available
import { Providers } from "@/app/providers";
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
    template: "%s | CorrectCase UK",
    default: "CorrectCase UK | Privacy-First Text Utilities",
  },
  description: "Free privacy-first text tools for British English. Convert Case, formatting, and grammar locally in your browser. No data leaves your device.",
  applicationName: "CorrectCase",
  authors: [{ name: "CorrectCase Team" }],
  keywords: ["text converter", "sentence case", "title case", "british english", "privacy first"],
  alternates: {
    canonical: "https://correctcase.co.uk",
  },
  robots: {
    index: true,
    follow: true,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "CorrectCase",
              "applicationCategory": "Utility",
              "operatingSystem": "Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "GBP"
              },
              "featureList": "Text Conversion, Smart Notepad, Local History",
              "url": "https://correctcase.co.uk"
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[oklch(var(--background))] text-[oklch(var(--foreground))] selection:bg-[oklch(var(--primary)/0.2)]`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
