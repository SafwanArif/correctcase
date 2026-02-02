"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useHistory } from "@/hooks/use-history";

interface EditorContextType {
    text: string;
    setText: (text: string) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    addToHistory: (text: string, label: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

import { addToHistory } from "@/lib/db";

export function EditorProvider({ children }: { children: ReactNode }) {
    // 2026 Standard: Centralized Logic Source
    // The "Brain" of the editor lives here, persisting across page navigation.
    const { state, set, undo, redo, canUndo, canRedo } = useHistory("");

    const addToHistoryWrapper = React.useCallback(async (text: string, label: string) => {
        await addToHistory(text, label);
    }, []);

    const value = {
        text: state.present,
        setText: set,
        undo,
        redo,
        canUndo,
        canRedo,
        addToHistory: addToHistoryWrapper,
    };

    return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}

export function useEditor() {
    const context = useContext(EditorContext);
    if (context === undefined) {
        throw new Error("useEditor must be used within an EditorProvider");
    }
    return context;
}
