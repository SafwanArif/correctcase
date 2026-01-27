import { HeroEditor } from "@/components/features/hero-editor";
import { WorkstationLayout } from "@/components/layout/workstation-layout";
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

export default function Home() {
  const jsonLd = {
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
    "featureList": "Sentence Case, Title Case, Hyphenation Removal, Grammar Check",
    "screenshot": "https://correctcase.co.uk/screenshot.png"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkstationLayout activeTab="text">
        <Suspense>
          <HeroEditor />
        </Suspense>
      </WorkstationLayout>
    </>
  );
}
