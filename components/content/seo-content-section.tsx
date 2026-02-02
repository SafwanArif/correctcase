"use client";

import { motion } from "framer-motion";

interface SEOContentSectionProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export function SEOContentSection({ title, subtitle, children }: SEOContentSectionProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-4xl mx-auto mt-24 px-6 md:px-0"
        >
            <div className="bg-glass-panel border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden">
                {/* Subtle Gradient Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl -z-10" />

                <header className="mb-8 border-b border-white/5 pb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-brand-grey-300 text-lg font-medium leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </header>

                <div className="prose prose-invert prose-lg max-w-none text-brand-grey-200 leading-relaxed space-y-6">
                    {children}
                </div>
            </div>
        </motion.article>
    );
}
