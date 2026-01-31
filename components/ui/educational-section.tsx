import { BookOpen, GraduationCap } from "lucide-react";

export function EducationalSection() {
    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        Why CorrectCase?
                    </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-body mb-6 tracking-tight">
                    The British English vs American English{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-radiant-cyan to-victory-emerald">
                        capitalisation gap
                    </span>
                </h2>
                <p className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">
                    Most text tools blindly apply American title case rules. But British publications like the{" "}
                    <strong className="text-body">BBC</strong> and <strong className="text-body">The Guardian</strong>{" "}
                    use sentence case—a fundamentally different standard.
                </p>
            </div>

            {/* Comparison Panel */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
                {/* BBC Style */}
                <div className="p-6 bg-surface/40 backdrop-blur-sm border border-border-subtle/40 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xl">🇬🇧</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-body text-sm">BBC style</h3>
                            <p className="text-xs text-muted">British English sentence case</p>
                        </div>
                    </div>
                    <div className="bg-elevated/50 p-4 rounded-lg border border-border-subtle/30">
                        <p className="text-sm text-body font-medium leading-relaxed">
                            "The prime minister announces new climate policies for the UK"
                        </p>
                    </div>
                    <p className="text-xs text-muted mt-3 italic">
                        Only the first word and proper nouns capitalised
                    </p>
                </div>

                {/* NYT Style */}
                <div className="p-6 bg-surface/40 backdrop-blur-sm border border-border-subtle/40 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-radiant-cyan/10 flex items-center justify-center">
                            <span className="text-xl">🇺🇸</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-body text-sm">New York Times style</h3>
                            <p className="text-xs text-muted">American English title case</p>
                        </div>
                    </div>
                    <div className="bg-elevated/50 p-4 rounded-lg border border-border-subtle/30">
                        <p className="text-sm text-body font-medium leading-relaxed">
                            "The Prime Minister Announces New Climate Policies for the UK"
                        </p>
                    </div>
                    <p className="text-xs text-muted mt-3 italic">
                        Major words capitalised per AP/Chicago style
                    </p>
                </div>
            </div>

            {/* The Gap */}
            <div className="p-8 bg-gradient-to-br from-obsidian-cobalt/5 via-radiant-cyan/5 to-victory-emerald/5 border border-primary/20 rounded-2xl">
                <div className="flex items-start gap-4">
                    <BookOpen className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-bold text-body text-lg mb-3">The problem</h3>
                        <p className="text-sm text-muted leading-relaxed mb-4">
                            Existing tools were built for American audiences and fail to recognise British English conventions.
                            International copywriters working with British clients need accurate sentence case conversion—not
                            approximations or manual corrections.
                        </p>
                        <p className="text-sm text-body font-medium">
                            CorrectCase is the first tool built from the ground up to handle both standards correctly,
                            with awareness of British grammar, hyphenation rules, and SI unit formatting.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
