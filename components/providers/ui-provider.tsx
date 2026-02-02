"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
    isHistoryOpen: boolean;
    setHistoryOpen: (open: boolean) => void;
    openHistory: () => void;
    closeHistory: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const openHistory = () => setIsHistoryOpen(true);
    const closeHistory = () => setIsHistoryOpen(false);

    return (
        <UIContext.Provider
            value={{
                isHistoryOpen,
                setHistoryOpen: setIsHistoryOpen,
                openHistory,
                closeHistory,
            }}
        >
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error("useUI must be used within a UIProvider");
    }
    return context;
}
