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
                // Semantic Refactor
                "row-span-1 rounded-2xl group/bento transition duration-200 p-6 flex flex-col space-y-4",
                "bg-canvas", // Default canvas bg for card items if not raised
                // If we want elevated cards: bg-elevated or bg-white (which is canvas)
                "shadow-depth dark:shadow-none",
                "border border-border-subtle",
                "dark:bg-elevated", // Often cards in dark mode are lighter than bg-canvas (void)
                className
            )}
        >
            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200 hidden">
                {icon}
                <div className="font-sans font-bold text-body mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal text-muted text-xs">
                    {description}
                </div>
            </div>
        </div>
    );
};
