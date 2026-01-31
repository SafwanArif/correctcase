import { HeroEditor } from "@/components/features/hero-editor";

import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "CorrectCase | British English Text Converter & Grammar Tool",
  description: "Free local text tool. Convert Sentence Case, Title Case, and fix grammar instantly in your browser. Privacy-first, no servers attached.",
  alternates: {
    canonical: "https://correctcase.co.uk",
  }
};

import { SeoContent } from "@/components/features/seo-content";
import { SEO_CONTENT } from "@/data/seo-content";

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
        "@type": "HowTo",
        "name": "How to Convert Case in British English",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Paste your text into the CorrectCase S-Tier editor."
          },
          {
            "@type": "HowToStep",
            "text": "Select 'British Sentence Case' for local Gov.uk standards."
          },
          {
            "@type": "HowToStep",
            "text": "Copy the result with 0ms latency - 100% private."
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://correctcase.co.uk/#webpage",
        "url": "https://correctcase.co.uk",
        "name": "CorrectCase | Supreme Text Utilities",
        "about": { "@id": "https://correctcase.co.uk/#app" }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphLd) }}
      />
      <Suspense>
        <HeroEditor />
      </Suspense>
      <SeoContent data={SEO_CONTENT['us-title-case']} />
    </>
  );
}
