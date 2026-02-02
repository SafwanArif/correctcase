"use client";

import { createContext, useContext } from "react";

/**
 * Options for adding a new entry to history.
 */
export interface AddToHistoryOptions {
    /**
     * The source of the change (e.g., 'manual', 'paste', 'clear').
     */
    mode?: string;
}

/**
 * Editor Context Type.
 */
export interface EditorContextType {
    text: string;
    setText: (text: string) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    /**
     * Adds the current text to the history stack.
     * 
     * @param newText - The text to add.
     * @param options - History entry options.
     */
    addToHistory: (newText: string, options: AddToHistoryOptions) => void;
}

// Rename to CamelCase to satisfy naming-convention for non-component objects
export const editorContext = createContext<EditorContextType | undefined>(undefined);

/**
 * Hook to access the editor context.
 */
export function useEditor(): EditorContextType {
    const context = useContext(editorContext);

    if (context === undefined) {
        throw new Error("useEditor must be used within an EditorProvider");
    }

    return context;
}
