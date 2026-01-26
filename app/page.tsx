"use client";

import { HeroEditor } from "@/components/features/hero-editor";
import { WorkstationLayout } from "@/components/layout/workstation-layout";
import { Suspense } from "react";

export default function Home() {
  return (
    <WorkstationLayout activeTab="text">
      <Suspense>
        <HeroEditor />
      </Suspense>
    </WorkstationLayout>
  );
}
