"use client";
import NutritionInfoTable from "@/components/NutritionInfoTable";
import Test from "@/googleGeminiTest/Test";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <NutritionInfoTable open={open} setOpen={setOpen} />
      <Test />
    </div>
  );
}
