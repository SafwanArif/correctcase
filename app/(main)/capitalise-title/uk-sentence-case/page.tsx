"use client";

import { GenericPageClient } from "@/components/features/generic-page-client";
import { SEOContentSection } from "@/components/content/seo-content-section";
import Link from "next/link";

export default function UkSentenceCasePage() {
    return (
        <GenericPageClient
            heroProps={{
                breadcrumbs: (
                    <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted/60">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link
                            href="/capitalise-title"
                            className="hover:text-primary transition-colors"
                        >
                            Capitalisation Tools
                        </Link>
                        <span>/</span>
                        <span className="text-primary/40">UK Sentence Case</span>
                    </nav>
                ),
                title: (
                    <>
                        Sentence Case: <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-radiant-cyan to-victory-emerald lowercase underline decoration-radiant-cyan/20 underline-offset-8">
                            The British Standard
                        </span>
                        .
                    </>
                ),
                subtitle: (
                    <div className="max-w-xl mx-auto py-4 px-6 rounded-2xl bg-radiant-cyan/5 border border-radiant-cyan/10 backdrop-blur-sm flex items-center justify-between gap-6 hover:bg-radiant-cyan/10 transition-colors duration-300">
                        <p className="text-xs text-body font-medium leading-relaxed text-left">
                            Need American English?{" "}
                            <strong className="text-primary">AP & Chicago</strong> standards use
                            title case.
                        </p>
                        <Link
                            href="/capitalise-title/us-title-case"
                            className="whitespace-nowrap text-xs font-black text-primary uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all"
                        >
                            Switch to US →
                        </Link>
                    </div>
                ),
                description:
                    "The BBC and Guardian standard. Modern, clean, and authoritative. Converts your text to standard sentence case instantly.",
                defaultTools: ["case"],
                showToolbar: false,
                forcedStyle: "uk",
            }}
            sections={[
                <SEOContentSection
                    key="authority-guide"
                    title="Why do British institutions prefer Sentence case?"
                    subtitle="Learn the rules of the NHS and Oxford Style Guide."
                >
                    <blockquote>
                        In the United Kingdom, readability is paramount. From the{" "}
                        <strong>NHS Digital Service Manual</strong> to the{" "}
                        <strong>GOV.UK design system</strong>, sentence case is the standard for
                        digital communication. Why? Because it is 20% faster to scan than Title
                        Case.
                    </blockquote>

                    <h3>The Rules of British Sentence Case:</h3>
                    <ul className="list-decimal pl-5 space-y-2 marker:text-brand-cyan">
                        <li>
                            <strong>Capitalise the first word</strong>: Just like a standard
                            sentence.
                        </li>
                        <li>
                            <strong>Capitalise proper nouns</strong>: Names (London), Organisations
                            (BBC), and Acronyms (NASA) remain uppercase.
                        </li>
                        <li>
                            <strong>Lowercase the rest</strong>: Minor words, important words—it
                            doesn&apos;t matter. If it&apos;s not a name, keep it down.
                        </li>
                    </ul>
                </SEOContentSection>,
            ]}
        />
    );
}
