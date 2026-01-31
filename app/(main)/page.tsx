import { HomeClient } from "@/components/features/home-client";
import { Metadata } from "next";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "CorrectCase | Professional British Text Tools",
  description: "Transform your text with professional British English tools. Title case, hyphenation, grammar—all client-side, zero tracking. Privacy-first text conversion.",
};

export default function Home() {
  const graphLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://correctcase.co.uk/#app",
        "name": "CorrectCase",
        "applicationCategory": "ProductivityApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "GBP"
        },
        "featureList": [
          "British English Sentence Case",
          "AP/Chicago Title Case",
          "Smart PDF Unhyphenation",
          "100% Privacy Floor"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://correctcase.co.uk/#website",
        "url": "https://correctcase.co.uk",
        "name": "CorrectCase",
        "publisher": { "@id": "https://correctcase.co.uk/#app" }
      }
    ]
  };

  return (
    <>
      {/* 1. KNOWLEDGE GRAPH */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphLd) }}
      />

      {/* 2. CINEMATIC CLIENT EXPERIENCE */}
      <HomeClient />
    </>
  );
}
