import { Metadata } from "next";
import { Type, Link as LinkIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { ComplianceBadges } from "@/components/ui/compliance-badges";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "Capitalisation Text Tools | British & American English | CorrectCase",
    description: "Professional British and American English text tools. Choose between UK sentence case (BBC/Guardian) and US title case (AP/Chicago) standards.",
};

const HUB_TOOLS = [
    {
        id: "uk-sentence-case",
        name: "UK Sentence Case",
        description: "Standard for British publications like the BBC and The Guardian.",
        path: "/uk-sentence-case",
        icon: Type,
        badge: "BBC • Guardian",
        color: "from-radiant-cyan to-victory-emerald"
    },
    {
        id: "us-title-case",
        name: "US Title Case",
        description: "Academic and journalistic standard for American publications.",
        path: "/us-title-case",
        icon: Type,
        badge: "AP • Chicago • MLA",
        color: "from-obsidian-cobalt to-intelligence-indigo"
    }
];

export default function CapitaliseTitleHub() {
    return (
        <div className="flex flex-col items-center pt-8">
            {/* Breadcrumbs */}
            <nav className="w-full max-w-5xl px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted/60 mb-8">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <span className="text-primary/40">Capitalisation tools</span>
            </nav>

            {/* Hero Section */}
            <header className="w-full max-w-5xl px-4 pb-12 text-center">
                <h1 className="text-4xl sm:text-6xl font-black text-body mb-6 tracking-tight">
                    British & American English <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-obsidian-cobalt via-radiant-cyan to-victory-emerald lowercase">
                        text tools
                    </span>.
                </h1>
                <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed mb-12">
                    Professional-grade text conversion tools built for architectural authority.
                    Standardise your copy between British and American standards with zero server data.
                </p>

                {/* Grid Tools */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {HUB_TOOLS.map((tool) => (
                        <Link
                            key={tool.id}
                            href={tool.path}
                            className="group p-8 rounded-3xl border border-border-subtle/40 bg-surface/30 backdrop-blur-sm hover:bg-elevated/40 hover:border-border-subtle/60 transition-all duration-300 text-left flex flex-col min-h-[280px]"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shadow-lg`}>
                                    <tool.icon className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-primary/10 text-primary rounded-full">
                                    {tool.badge}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-body mb-3 group-hover:text-primary transition-colors">
                                {tool.name}
                            </h2>
                            <p className="text-muted text-sm leading-relaxed mb-8 flex-grow">
                                {tool.description}
                            </p>
                            <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                Launch tool
                                <div className="w-5 h-5 rounded-full border border-primary/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <span className="text-xs">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Sub-tools (Small Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24 w-full">
                    <div className="p-6 rounded-2xl border border-border-subtle/20 bg-surface/10 opacity-60">
                        <LinkIcon className="w-5 h-5 mb-3 mx-auto text-muted" />
                        <h3 className="text-sm font-bold text-body mb-1">Hyphenation</h3>
                        <p className="text-[10px] text-muted">Smart PDF cleanup</p>
                    </div>
                    <div className="p-6 rounded-2xl border border-border-subtle/20 bg-surface/10 opacity-40">
                        <Sparkles className="w-5 h-5 mb-3 mx-auto text-muted" />
                        <h3 className="text-sm font-bold text-body mb-1">Grammar</h3>
                        <p className="text-[10px] text-muted text-primary/60">Coming soon</p>
                    </div>
                    <div className="p-6 rounded-2xl border border-border-subtle/20 bg-surface/10 opacity-40">
                        <Type className="w-5 h-5 mb-3 mx-auto text-muted" />
                        <h3 className="text-sm font-bold text-body mb-1">Style audit</h3>
                        <p className="text-[10px] text-muted text-primary/60">Coming soon</p>
                    </div>
                </div>

                <ComplianceBadges />
            </header>
        </div>
    );
}
