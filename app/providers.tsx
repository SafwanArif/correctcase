"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch by rendering nothing (or a fallback) until mounted
    // This ensures that the server-rendered HTML matches what the client expects
    // initially, avoiding the "Prop `class` did not match" warning.
    return <>{children}</>; 
    // NOTE: Returning children directly might still cause a flash if the theme is dark.
    // However, for SSG/Static Export, we usually accept a small paint shift or 
    // set a blocking script. next-themes handles the script injection.
    // To be perfectly safe against FOUC/Mismatch, next-themes suggests just wrapping.
    // But if we want to AVOID the mismatch warning specifically:
    // return <div style={{ visibility: 'hidden' }}>{children}</div>; 
    // But that hides content.
    // Standard next-themes usage for 'class' attribute usually just works, 
    // but the pure 'hydration safety' pattern is waiting for mount.
    // Let's stick to the simplest valid wrapper.
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
