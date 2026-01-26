"use client";

import { HeroEditor } from "@/components/features/hero-editor";
import { WorkstationLayout } from "@/components/layout/workstation-layout";

export default function Home() {
  return (
    <WorkstationLayout activeTab="text">
      <HeroEditor />
    </WorkstationLayout>
  );
}
