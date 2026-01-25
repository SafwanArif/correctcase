import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownMenuProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: "left" | "right";
}

export function DropdownMenu({ trigger, children, align = "right" }: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>

            {isOpen && (
                <div
                    className={cn(
                        "absolute top-full mt-2 min-w-[180px] bg-elevated border border-border-subtle rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100",
                        align === "right" ? "right-0" : "left-0"
                    )}
                >
                    <div className="p-1 flex flex-col gap-0.5">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}

interface DropdownItemProps {
    onClick: () => void;
    icon?: React.ReactNode;
    label: string;
    isActive?: boolean;
}

export function DropdownItem({ onClick, icon, label, isActive }: DropdownItemProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-left transition-colors w-full",
                isActive
                    ? "bg-[oklch(var(--brand-core)/0.1)] text-primary"
                    : "text-muted hover:text-body hover:bg-surface"
            )}
        >
            {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
            <span>{label}</span>
        </button>
    );
}
