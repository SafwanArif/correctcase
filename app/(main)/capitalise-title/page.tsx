"use client";

import { Link as LinkIcon, Sparkles, Type } from "lucide-react";
import Link from "next/link";
import { GenericPageClient } from "@/components/features/generic-page-client";
import { ComplianceBadges } from "@/components/ui/compliance-badges";

const hubTools = [
    {
        id: "uk-sentence-case",
        title: "UK sentence case",
        desc: "Standard for British publications like the BBC and The Guardian.",
        path: "/capitalise-title/uk-sentence-case",
        icon: Type,
    },
    {
        id: "us-title-case",
        title: "US title case",
        desc: "Academic and journalistic standard for American publications.",
        path: "/capitalise-title/us-title-case",
        icon: Type,
    },
];

export default function CapitaliseTitleHub(): React.JSX.Element {
    return (
        <GenericPageClient
            heroProps={{
                breadcrumbs: (
                    <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted/60">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-primary/40">Capitalisation tools</span>
                    </nav>
                ),
                title: (
                    <>
                        British & American English <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-obsidian-cobalt via-radiant-cyan to-victory-emerald lowercase">
                            text tools
                        </span>
                        .
                    </>
                ),
                description:
                    "Professional-grade text conversion tools built for architectural authority. Standardise your copy between British and American standards with zero server data.",
            }}
            sections={[
                {
                    id: "grid",
                    content: (
                        <div className="py-20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                                {hubTools.map((tool) => {
                                    return (
                                        <Link
                                            key={tool.id}
                                            href={tool.path}
                                            className="group p-8 rounded-3xl border border-border-subtle/40 bg-surface/30 backdrop-blur-sm hover:bg-elevated/40 hover:border-border-subtle/60 transition-all duration-300 text-left flex flex-col min-h-[280px]"
                                        >
                                            <div className="flex justify-between items-start mb-6">
                                                <div
                                                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-radiant-cyan to-victory-emerald flex items-center justify-center text-white shadow-lg`}
                                                >
                                                    <tool.icon className="w-6 h-6" />
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-primary/10 text-primary rounded-full">
                                                    {tool.id === "uk-sentence-case" ? "BBC • Guardian" : "AP • Chicago • MLA"}
                                                </span>
                                            </div>
                                            <h2 className="text-2xl font-bold text-body mb-3 group-hover:text-primary transition-colors">
                                                {tool.title}
                                            </h2>
                                            <p className="text-muted text-sm leading-relaxed mb-8 flex-grow">
                                                {tool.desc}
                                            </p>
                                            <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                                Launch tool
                                                <div className="w-5 h-5 rounded-full border border-primary/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                                    <span className="text-xs">→</span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24 w-full">
                                <div className="p-6 rounded-2xl border border-border-subtle/20 bg-surface/10 opacity-60 text-center">
                                    <LinkIcon className="w-5 h-5 mb-3 mx-auto text-muted" />
                                    <h3 className="text-sm font-bold text-body mb-1">Hyphenation</h3>
                                    <p className="text-[10px] text-muted">Smart PDF cleanup</p>
                                </div>
                                <div className="p-6 rounded-2xl border border-border-subtle/20 bg-surface/10 opacity-40 text-center">
                                    <Sparkles className="w-5 h-5 mb-3 mx-auto text-muted" />
                                    <h3 className="text-sm font-bold text-body mb-1">Grammar</h3>
                                    <p className="text-[10px] text-muted text-primary/60">Coming soon</p>
                                </div>
                                <div className="p-6 rounded-2xl border border-border-subtle/20 bg-surface/10 opacity-40 text-center">
                                    <Type className="w-5 h-5 mb-3 mx-auto text-muted" />
                                    <h3 className="text-sm font-bold text-body mb-1">Style audit</h3>
                                    <p className="text-[10px] text-muted text-primary/60">Coming soon</p>
                                </div>
                            </div>

                            <div className="flex justify-center flex-col items-center gap-8">
                                <ComplianceBadges />
                            </div>
                        </div>
                    ),
                },
            ]}
        />
    );
}
