interface ShellProps {
    children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
    return (
        <main className="min-h-screen bg-[oklch(var(--background))] relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-8">

            {/* Ambient Gradients - Subtle & Medical/Clean */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-[oklch(var(--primary)/0.03)] filter blur-3xl pointer-events-none opacity-50"></div>

            <div className="z-10 w-full max-w-5xl flex-1 flex flex-col items-center justify-center">

                {children}

                <footer className="text-center text-[10px] text-[oklch(var(--muted-foreground))] mt-8 font-mono opacity-60">
                    <p>&copy; {new Date().getFullYear()} CorrectCase. 100% Client-Side Secure.</p>
                </footer>

            </div>
        </main>
    );
}
