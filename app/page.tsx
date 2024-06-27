"use client";
import FactsCard from "@/components/FactsCard";
import Header from "@/components/Header";
import NutritionInfoTable from "@/components/NutritionInfoTable";
import Test from "@/googleGeminiTest/Test";
import { DropDownDataProvider } from "@/hooks/useDropDownData";
import { NutritionProvider } from "@/hooks/useNutritionHook";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <NutritionProvider>
      <main className="flex min-h-screen flex-col p-8 px-4 bg-background">
        <DropDownDataProvider>
          {/* <Header/> */}
          <NutritionInfoTable open={open} setOpen={setOpen} />
          {open && <FactsCard />}
          <Test />
        </DropDownDataProvider>
      </main>
    </NutritionProvider>
  );
}
