"use client";

import { type ReactNode,useCallback } from "react";
import { type AddToHistoryOptions,editorContext } from "@/hooks/use-editor";
import { useHistory } from "@/hooks/use-history";

interface EditorProviderProps {
    children: ReactNode;
}

/**
 * Context Provider for Editor State (Text + History).
 */
export function EditorProvider({ children }: EditorProviderProps): React.JSX.Element {
    const { state, set, undo, redo, canUndo, canRedo } = useHistory("");

    const setText = useCallback((val: string) => {
        set(val);
    }, [set]);

    const addToHistory = useCallback((newText: string, { mode = "manual" }: AddToHistoryOptions = {}) => {
        set(newText);

        // Persist logic here if needed
        const logData = { mode, length: newText.length };

        return logData;
    }, [set]);

    const value = {
        text: state.present,
        setText,
        undo,
        redo,
        canUndo,
        canRedo,
        addToHistory,
    };

    return <editorContext.Provider value={value}>{children}</editorContext.Provider>;
}
