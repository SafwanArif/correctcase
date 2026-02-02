import type { Metadata } from "next";

export const metadataContent = {
    title: "Hyphenate Text Online | Fast & Private Tool",
    description: "Instantly hyphenate your text for professional layout and typography. Clean up PDF copy-paste artifacts and optimize for justified alignment. Client-side processing.",
};

export const metadata: Metadata = {
    title: metadataContent.title,
    description: metadataContent.description,
    alternates: {
        canonical: "https://correctcase.co.uk/hyphenate-text",
    },
};
