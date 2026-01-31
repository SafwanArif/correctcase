import { LandingHero } from "@/components/features/landing-hero";
import { BenefitSection } from "@/components/features/benefit-section";
import { Metadata } from "next";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "CorrectCase | Supreme British English Text Authority",
  description: "Elite text conversion for professionals. Sentence Case, Title Case, and Smart Hyphenation. 100% Client-side. Privacy as a Standard.",
  alternates: {
    canonical: "https://correctcase.co.uk",
  }
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
    <div className="w-full h-full sm:h-auto sm:overflow-visible">
      {/* 1. KNOWLEDGE GRAPH */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphLd) }}
      />

      {/* 2. CINEMATIC SCROLL CONTAINER */}
      <div className="w-full sm:snap-y sm:snap-mandatory sm:h-screen sm:overflow-y-auto scroll-smooth no-scrollbar">
        {/* HERO LAND */}
        <div className="sm:snap-start sm:min-h-screen flex items-center justify-center pt-20 pb-12 sm:py-0">
          <LandingHero />
        </div>

        {/* BENEFIT LAND */}
        <div className="sm:snap-start sm:min-h-screen flex items-start justify-center">
          <BenefitSection />
        </div>
      </div>
    </div>
  );
}
