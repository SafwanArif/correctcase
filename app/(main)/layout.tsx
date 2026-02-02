"use client";

import { WorkstationLayout } from "@/components/layout/workstation-layout";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    // Note: WorkstationLayout now acts as the persistent shell.
    // Pages inside will strictly be valid children.
    return <WorkstationLayout>{children}</WorkstationLayout>;
}
