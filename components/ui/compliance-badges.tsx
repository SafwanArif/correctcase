import { Shield, FileCheck, Lock, Globe } from "lucide-react";

export function ComplianceBadges() {
    const badges = [
        {
            icon: Lock,
            label: "GDPR+ Compliant",
            description: "Full UK data protection"
        },
        {
            icon: FileCheck,
            label: "ISO 80000",
            description: "International standards"
        },
        {
            icon: Shield,
            label: "SI Standards",
            description: "British regulations"
        },
        {
            icon: Globe,
            label: "100% Client-Side",
            description: "Zero server processing"
        }
    ];

    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge) => (
                    <div
                        key={badge.label}
                        className="flex flex-col items-center gap-2 p-4 bg-surface/30 backdrop-blur-sm border border-border-subtle/40 rounded-xl hover:border-border-subtle/60 transition-all duration-200"
                    >
                        <badge.icon className="w-5 h-5 text-primary" />
                        <div className="text-center">
                            <p className="text-xs font-bold text-body tracking-tight">
                                {badge.label}
                            </p>
                            <p className="text-[10px] text-muted mt-0.5">
                                {badge.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
