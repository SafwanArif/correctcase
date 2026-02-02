"use client";

import type { JSX } from "react";
import type { SeoData } from "@/data/seo-content";
import { cn } from "@/lib/utils";

interface SeoContentProps {
    data: SeoData;
    className?: string;
}

export function SeoContent({ data, className }: SeoContentProps): JSX.Element {
    return (
        <section className={cn("max-w-4xl mx-auto py-12 px-6", className)}>
            <div className="prose prose-invert prose-emerald max-w-none">
                <h2 className="text-3xl font-bold text-body mb-6">{data.h2}</h2>
                <p className="text-muted leading-relaxed mb-8">{data.intro}</p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {data.sections.map((section) => {
                        return (
                            <div key={section.h3} className="p-6 rounded-2xl bg-surface/30 border border-border-subtle/50">
                                <h3 className="text-xl font-bold text-body mb-3">{section.h3}</h3>
                                <p className="text-sm text-muted">{section.content}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-body">Common Questions</h3>
                    {data.faq.map((item) => {
                        return (
                            <div key={item.question} className="p-6 rounded-2xl bg-surface/10 border border-border-subtle/20">
                                <h4 className="font-bold text-body mb-2">{item.question}</h4>
                                <p className="text-sm text-muted italic">&quot;{item.answer}&quot;</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
