"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ScrollContextType {
    scrollTop: number;
    isCompact: boolean;
    setScrollTop: (val: number) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: ReactNode }) {
    const [scrollTop, setScrollTop] = useState(0);

    // Threshold for "Compact Mode" (e.g. 40px)
    const isCompact = scrollTop > 30;

    return (
        <ScrollContext.Provider value={{ scrollTop, isCompact, setScrollTop }}>
            {children}
        </ScrollContext.Provider>
    );
}

export function useScroll() {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error("useScroll must be used within a ScrollProvider");
    }
    return context;
}
