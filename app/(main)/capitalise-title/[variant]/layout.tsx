import type { Metadata } from "next";
import { titleVariants } from "@/data/variants";

export const dynamic = "force-static";

interface PageParams {
    variant: string;
}

/**
 * Generate Static Params for the variant page.
 */
export function generateStaticParams(): PageParams[] {
    return Object.keys(titleVariants).map((variant) => { return {
        variant,
    } });
}

interface GenerateMetadataProps {
    params: Promise<PageParams>;
}

/**
 * Generate Metadata for the variant page.
 */
export async function generateMetadata({
    params,
}: GenerateMetadataProps): Promise<Metadata> {
    const { variant } = await params;
    const variantKey = variant;
    const data = titleVariants[variantKey];

    return {
        title: data.title,
        description: data.description,
        alternates: {
            canonical: `https://correctcase.co.uk/capitalise-title/${variant}`,
        },
    };
}

interface LayoutProps {
    children: React.ReactNode;
}

/**
 * Variant Layout.
 */
export default function VariantLayout({ children }: LayoutProps): React.JSX.Element {
    return <>{children}</>;
}
