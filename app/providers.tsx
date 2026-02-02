"use client";

import { ThemeProvider } from "next-themes";
import { EditorProvider } from "@/components/providers/editor-provider";
import { UiProvider } from "@/components/providers/ui-provider";

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps): React.JSX.Element {
    return (
        <EditorProvider>
            <UiProvider>
                <ThemeProvider enableSystem attribute="class" defaultTheme="system">
                    {children}
                </ThemeProvider>
            </UiProvider>
        </EditorProvider>
    );
}
