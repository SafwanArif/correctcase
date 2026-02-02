export interface VariantData {
    title: string;
    description: string;
    toolMode: "us" | "uk";
    label?: string;
}

export const titleVariants: Record<string, VariantData> = {
    "us-title-case": {
        title: "US Title Case Converter | Capitalize My Title Tool",
        description:
            "Free US Title Case converter (AP, APA, Chicago style). Instantly capitalize titles for headlines, blogs, and essays. Privacy-first.",
        toolMode: "us",
        label: "US Standard",
    },
    "uk-sentence-case": {
        title: "UK Sentence Case Converter | British English Tool",
        description:
            "Free UK Sentence Case converter. Standard British English formatting for gov.uk, academic, and professional texts. Privacy-first.",
        toolMode: "uk",
        label: "UK Standard",
    },
};

export type VariantKey = keyof typeof titleVariants;
