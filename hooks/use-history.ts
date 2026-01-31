
import { useState, useCallback, useRef } from 'react';

interface HistoryState<T> {
    past: T[];
    present: T;
    future: T[];
}

export function useHistory<T>(initialPresent: T) {
    const [state, setState] = useState<HistoryState<T>>({
        past: [],
        present: initialPresent,
        future: [],
    });

    const canUndo = state.past.length > 0;
    const canRedo = state.future.length > 0;

    const undo = useCallback(() => {
        setState((currentState) => {
            const { past, present, future } = currentState;
            if (past.length === 0) return currentState;

            const newPresent = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);

            return {
                past: newPast,
                present: newPresent,
                future: [present, ...future],
            };
        });
    }, []);

    const redo = useCallback(() => {
        setState((currentState) => {
            const { past, present, future } = currentState;
            if (future.length === 0) return currentState;

            const newPresent = future[0];
            const newFuture = future.slice(1);

            return {
                past: [...past, present],
                present: newPresent,
                future: newFuture,
            };
        });
    }, []);

    const lastPushTimeRef = useRef<number>(0);

    const set = useCallback((newPresent: T) => {
        setState((currentState) => {
            const { past, present } = currentState;
            if (newPresent === present) return currentState;

            // 2026 Optimization: Temporal History Debouncing
            const now = Date.now();
            const DEBOUNCE_MS = 2000;

            let newPast = past;
            if (now - lastPushTimeRef.current > DEBOUNCE_MS) {
                newPast = [...past, present];
                lastPushTimeRef.current = now;
            }

            const MAX_HISTORY = 50;
            // Cap the history stack
            if (newPast.length > MAX_HISTORY) {
                newPast.splice(0, newPast.length - MAX_HISTORY);
            }

            return {
                past: newPast,
                present: newPresent,
                future: [],
            };
        });
    }, []);

    // Helper to sync external state if needed, or just use this as source of truth
    const update = useCallback((newPresent: T) => {
        // Logic could effectively mimic 'set'
        set(newPresent);
    }, [set]);

    return { state, set, undo, redo, canUndo, canRedo, update };
}
