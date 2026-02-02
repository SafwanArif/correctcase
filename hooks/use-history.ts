"use client";

import { useCallback, useReducer, useRef } from "react";


// --- Types ---
interface HistoryState<T> {
    past: T[];
    present: T;
    future: T[];
}

export interface UseHistoryReturn<T> {
    state: HistoryState<T>;
    set: (newPresent: T) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    update: (newPresent: T) => void;
}

type Action<T> =
    | { type: "UNDO" }
    | { type: "REDO" }
    | { type: "SET"; newPresent: T; timestamp: number }
    | { type: "UPDATE"; newPresent: T }; // Sync without pushing history

/**
 * --- Reducer (Pure Logic) ---.
 */
const historyReducer = <T>(state: HistoryState<T>, action: Action<T>): HistoryState<T> => {
    const { past, present, future } = state;

    switch (action.type) {
        case "UNDO": {
            if (past.length === 0) { return state; }
            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);

            return {
                past: newPast,
                present: previous,
                future: [present, ...future],
            };
        }

        case "REDO": {
            if (future.length === 0) { return state; }
            const next = future[0];
            const newFuture = future.slice(1);

            return {
                past: [...past, present],
                present: next,
                future: newFuture,
            };
        }

        case "SET": {
            if (action.newPresent === present) { return state; }

            return {
                past: [...past, present],
                present: action.newPresent,
                future: [],
            };
        }

        case "UPDATE": {
            return { ...state, present: action.newPresent };
        }

        default: {
            return state;
        }
    }
}

/**
 * --- Hook ---.
 */
export const useHistory = <T>(initialPresent: T): UseHistoryReturn<T> => {
    const [state, dispatch] = useReducer(historyReducer<T>, {
        past: [],
        present: initialPresent,
        future: [],
    });

    const canUndo = state.past.length > 0;
    const canRedo = state.future.length > 0;

    const undo = useCallback(() => { dispatch({ type: "UNDO" }); }, []);
    const redo = useCallback(() => { dispatch({ type: "REDO" }); }, []);

    // 2026 Optimization: Temporal Debouncing
    const lastPushTimeRef = useRef<number>(0);
    const DEBOUNCE_MS = 2000;

    const set = useCallback((newPresent: T) => {
        const now = Date.now();

        if (now - lastPushTimeRef.current > DEBOUNCE_MS) {
            dispatch({ type: "SET", newPresent, timestamp: now });
            lastPushTimeRef.current = now;
        } else {
            // Just update the current state if within debounce window (merging typings)
            dispatch({ type: "UPDATE", newPresent });
        }
    }, []);

    // Force explicit update/push if needed (bypassing debounce)
    const update = useCallback((newPresent: T) => {
        dispatch({ type: "SET", newPresent, timestamp: Date.now() });
    }, []);

    return { state, set, undo, redo, canUndo, canRedo, update };
}
