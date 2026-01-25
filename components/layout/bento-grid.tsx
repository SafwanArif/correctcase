import { cn } from "@/lib/utils";
import React from "react";

interface BentoGridProps {
    className?: string;
    children?: React.ReactNode;
}

export const BentoGrid = ({ className, children }: BentoGridProps) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                // 2026 Standards:
                // - solid bg in light mode (bg-white)
                // - shadow-depth instead of simple shadow
                // - rounded-2xl
                // - Dark mode fallback to glass/darker tones
                "row-span-1 rounded-2xl group/bento transition duration-200 p-6 flex flex-col space-y-4",
                "bg-white dark:bg-slate-900/50",
                "shadow-depth dark:shadow-none",
                "border border-slate-100 dark:border-white/5",
                "dark:backdrop-blur-md", // Glassmorphism only for specific dark aesthetic
                className
            )}
        >
            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200 hidden">
                {/* Hidden for now unless we add specific card content later. 
            The current usage wraps Editor which handles its own content. 
            Keeping structure for future scalability. 
        */}
                {icon}
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    {description}
                </div>
            </div>
        </div>
    );
};
