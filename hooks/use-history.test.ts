import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHistory } from './use-history';

describe('Logic Core: History Reducer (useHistory)', () => {

    it('should initialize with default state', () => {
        const { result } = renderHook(() => useHistory('Initial'));
        expect(result.current.state.present).toBe('Initial');
        expect(result.current.canUndo).toBe(false);
    });

    it('should push new state to history', () => {
        const { result } = renderHook(() => useHistory('First'));

        act(() => {
            // Wait for debounce or update reference
            result.current.update('Second');
        });

        expect(result.current.state.present).toBe('Second');
        expect(result.current.canUndo).toBe(true);
        expect(result.current.state.past).toEqual(['First']);
    });

    it('should undo and redo correctly', () => {
        const { result } = renderHook(() => useHistory('A'));

        act(() => result.current.update('B'));
        act(() => result.current.update('C'));

        expect(result.current.state.present).toBe('C');

        // UNDO -> B
        act(() => result.current.undo());
        expect(result.current.state.present).toBe('B');

        // UNDO -> A
        act(() => result.current.undo());
        expect(result.current.state.present).toBe('A');

        // REDO -> B
        act(() => result.current.redo());
        expect(result.current.state.present).toBe('B');
    });
});
