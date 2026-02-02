import type { Metadata } from "next";
import { metadata as seoMetadata } from "./metadata";

export const metadata: Metadata = seoMetadata;
export const dynamic = "force-static";

interface LayoutProps {
    children: React.ReactNode;
}

/**
 * Hyphenate Layout.
 */
export default function HyphenateLayout({ children }: LayoutProps): React.JSX.Element {
    return <>{children}</>;
}
