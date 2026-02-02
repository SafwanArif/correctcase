import { type RefObject,useEffect, useRef } from "react";

interface UseEventListenerOptions<T extends HTMLElement | Window = HTMLElement | Window> {
    element?: RefObject<T | null> | T | null;
    options?: boolean | AddEventListenerOptions;
}

export function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    options?: UseEventListenerOptions<Window>
): void;

export function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = HTMLDivElement>(
    eventName: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    options?: UseEventListenerOptions<T>
): void;

/**
 * Custom hook to attach event listeners.
 */
export function useEventListener(
    eventName: string,
    handler: (event: Event) => void,
    { element, options }: UseEventListenerOptions = {}
): void {
    const savedHandler = useRef(handler);

    // Update ref.current when handler changes
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    // ESLint suppression for valid-event-listener since this is a utility hook
    /* eslint-disable fsecond/valid-event-listener */
    useEffect(() => {
        let targetElement: HTMLElement | Window | undefined | null;

        if (element === undefined || element === null) {
            targetElement = typeof window === "undefined" ? undefined : window;
        } else if ("current" in element) {
            targetElement = element.current;
        } else {
            targetElement = (element as unknown) as HTMLElement | Window;
        }

        if (targetElement === undefined || targetElement === null) {
            return;
        }

        const listener = (event: Event) => {
            savedHandler.current(event);
        };

        targetElement.addEventListener(eventName, listener, options);

        return () => {
            targetElement.removeEventListener(eventName, listener, options);
        };
    }, [eventName, element, options]);
    /* eslint-enable fsecond/valid-event-listener */
}
