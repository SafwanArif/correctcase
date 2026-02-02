"use client";

import { createContext, type ReactNode,useContext, useState } from "react";

interface ScrollContextType {
    scrollTop: number;
    isCompact: boolean;
    setScrollTop: (val: number) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

interface ScrollProviderProps {
    children: ReactNode;
}

export function ScrollProvider({ children }: ScrollProviderProps): React.JSX.Element {
    const [scrollTop, setScrollTop] = useState(0);

    // Threshold for "Compact Mode" (e.g. 40px)
    const isCompact = scrollTop > 30;

    return (
        <ScrollContext.Provider value={{ scrollTop, isCompact, setScrollTop }}>
            {children}
        </ScrollContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useScroll(): ScrollContextType {
    const context = useContext(ScrollContext);

    if (!context) {
        throw new Error("useScroll must be used within a ScrollProvider");
    }

    return context;
}
