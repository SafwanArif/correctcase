"use client";

import { ThemeProvider } from "next-themes";
import { EditorProvider } from "@/components/providers/editor-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EditorProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </EditorProvider>
  );
}
