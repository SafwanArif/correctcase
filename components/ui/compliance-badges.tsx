import { Shield, FileCheck, Lock, Globe } from "lucide-react";

export function ComplianceBadges() {
    const badges = [
        {
            icon: Lock,
            label: "GDPR+ Compliant",
            description: "Full UK data protection",
        },
        {
            icon: FileCheck,
            label: "ISO 80000",
            description: "International standards",
        },
        {
            icon: Shield,
            label: "SI Standards",
            description: "British regulations",
        },
        {
            icon: Globe,
            label: "100% Client-Side",
            description: "Zero server processing",
        },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto px-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {badges.map((badge) => (
                    <div
                        key={badge.label}
                        className="flex flex-col items-center gap-3 p-4 sm:p-6 bg-surface/30 backdrop-blur-sm border border-border-subtle/40 rounded-2xl hover:bg-elevated/40 hover:border-border-subtle/60 transition-all duration-200 min-h-[120px] justify-center"
                    >
                        <badge.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        <div className="text-center">
                            <p className="text-xs sm:text-sm font-bold text-body tracking-tight leading-tight">
                                {badge.label}
                            </p>
                            <p className="text-[10px] sm:text-xs text-muted mt-1">
                                {badge.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
