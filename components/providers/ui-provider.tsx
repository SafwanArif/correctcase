"use client";

import { createContext, type ReactNode,useContext, useState } from "react";

interface UiContextType {
    isHistoryOpen: boolean;
    setHistoryOpen: (open: boolean) => void;
    openHistory: () => void;
    closeHistory: () => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

interface UiProviderProps {
    children: ReactNode;
}

export function UiProvider({ children }: UiProviderProps): React.JSX.Element {
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const openHistory = () => { setIsHistoryOpen(true); };
    const closeHistory = () => { setIsHistoryOpen(false); };

    return (
        <UiContext.Provider
            value={{
                isHistoryOpen,
                setHistoryOpen: setIsHistoryOpen,
                openHistory,
                closeHistory,
            }}
        >
            {children}
        </UiContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUi(): UiContextType {
    const context = useContext(UiContext);

    if (context === undefined) {
        throw new Error("useUi must be used within a UiProvider");
    }

    return context;
}
