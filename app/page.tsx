"use client";
import FactsCard from "@/components/FactsCard";
import Header from "@/components/Header";
import NutritionInfoTable from "@/components/NutritionInfoTable";
import { NutritionProvider} from "@/hooks/useNutritionHook";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <NutritionProvider>
      <main className="flex min-h-screen flex-col p-8 px-4 bg-background">
        {/* <Header/> */}
        <NutritionInfoTable open={open} setOpen={setOpen} />
        {open && <FactsCard/>}
        
      </main>
    </NutritionProvider>
  );
}
