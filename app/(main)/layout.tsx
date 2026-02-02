"use client";

import { WorkstationLayout } from "@/components/layout/workstation-layout";

interface LayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: LayoutProps): React.JSX.Element {
    // Note: WorkstationLayout now acts as the persistent shell.
    // Pages inside will strictly be valid children.
    return <WorkstationLayout>{children}</WorkstationLayout>;
}
