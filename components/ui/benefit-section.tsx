"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Target, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ComplianceBadges } from "@/components/ui/compliance-badges";

const PILLARS = [
    {
        icon: <Shield className="w-6 h-6 text-obsidian-cobalt" />,
        title: "Clinical Privacy",
        desc: "Military-grade data protection. Your text never leaves your device's hardware.",
        color: "bg-obsidian-cobalt/5"
    },
    {
        icon: <Zap className="w-6 h-6 text-radiant-cyan" />,
        title: "Zero Latency",
        desc: "Instant local processing. No round-trips to servers. 0ms execution on all conversions.",
        color: "bg-radiant-cyan/5"
    },
    {
        icon: <Target className="w-6 h-6 text-victory-emerald" />,
        title: "British Standards",
        desc: "Optimized for Gov.uk, BBC, and Oxford standards. True British English heuristics.",
        color: "bg-victory-emerald/5"
    }
];

export function BenefitSection() {
    return (
        <section className="w-full py-24 sm:py-32 px-4 flex flex-col items-center bg-transparent">
            <div className="max-w-5xl w-full">
                <header className="mb-12 text-center sm:text-left">
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-body mb-6 leading-tight relative">
                        Engineered for <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-obsidian-cobalt to-intelligence-indigo inline-block relative z-10">Architectural Authority</span><span className="relative z-0">.</span>
                    </h2>
                    <p className="text-muted text-lg max-w-xl mb-8">
                        We don't just format text. We ensure your presence is authoritative,
                        consistent, and professional across all platforms.
                    </p>
                </header>

                {/* Compliance Badges */}
                <div className="mb-16">
                    <ComplianceBadges />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PILLARS.map((pillar, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -8 }}
                            className="p-6 sm:p-8 rounded-2xl border border-border-subtle/40 bg-surface/30 backdrop-blur-sm hover:bg-elevated/40 hover:border-border-subtle/60 transition-all duration-200 group min-h-[240px] flex flex-col"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${pillar.color} border border-white/10`}>
                                {pillar.icon}
                            </div>
                            <h3 className="text-xl font-bold text-body mb-3">{pillar.title}</h3>
                            <p className="text-sm text-muted leading-relaxed mb-6 flex-grow">
                                {pillar.desc}
                            </p>
                            <Link href="/capitalise-title" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                Explore Tool <ArrowRight className="w-3 h-3" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
