import type { JSX } from "react";
import type { Thing, WithContext } from "schema-dts";

interface StructuredDataProps<T extends Thing> {
    data: WithContext<T>;
}

/**
 * Structured Data component for JSON-LD.
 */
export default function StructuredData<T extends Thing>({ data }: StructuredDataProps<T>): JSX.Element {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
