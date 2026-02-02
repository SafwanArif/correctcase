"use client";

import { SeoData } from "@/data/seo-content";
import { cn } from "@/lib/utils";

interface SeoContentProps {
    data: SeoData;
    className?: string;
}

export function SeoContent({ data, className }: SeoContentProps) {
    if (!data) return null;

    return (
        <article className={cn("px-8 py-12 max-w-3xl mx-auto group select-text", className)}>
            {/* H2: The "Tail" Head */}
            <header className="mb-8 border-b border-border-subtle pb-4">
                <h2 className="text-2xl font-bold tracking-tight text-body group-hover:text-[oklch(var(--brand-core))] transition-colors duration-300">
                    {data.h2}
                </h2>
                <p className="mt-4 text-base text-muted leading-relaxed">{data.intro}</p>
            </header>

            {/* H3 Sections */}
            <div className="space-y-10">
                {data.sections.map((section, idx) => (
                    <section key={idx} className="space-y-3">
                        <h3 className="text-lg font-semibold text-body flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(var(--brand-secondary))]" />
                            {section.h3}
                        </h3>
                        <p className="text-muted leading-relaxed text-sm">{section.content}</p>
                    </section>
                ))}
            </div>

            {/* FAQ / H4-H5 */}
            {data.faq && data.faq.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border-subtle/50">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted mb-6">
                        Frequently Asked Questions
                    </h4>
                    <div className="grid gap-6">
                        {data.faq.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-elevated/30 rounded-lg p-5 border border-border-subtle/50"
                            >
                                <h5 className="font-medium text-body mb-2 text-sm">
                                    {item.question}
                                </h5>
                                <p className="text-xs text-muted leading-relaxed">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
}
