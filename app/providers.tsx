"use client";

import { ThemeProvider } from "next-themes";
import { EditorProvider } from "@/components/providers/editor-provider";
import { UIProvider } from "@/components/providers/ui-provider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <EditorProvider>
            <UIProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
            </UIProvider>
        </EditorProvider>
    );
}
