'use client';
import { dataProvider } from "@/providers/dataProvider";
import { Nutrient, TableDataEntry } from "@/types/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface NutritionProviderProps {
  children: ReactNode;
}

type NutritionContextType = {
  nutritionalData: TableDataEntry[];
  setNutritionalData: React.Dispatch<React.SetStateAction<TableDataEntry[]>>;
};

// Create a context
const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

// Create a provider component
export const NutritionProvider = ({ children }: NutritionProviderProps) => {
  const [nutritionalData, setNutritionalData] = useState<TableDataEntry[]>([]);

  return (
    <NutritionContext.Provider value={{ nutritionalData, setNutritionalData }}>
      {children}
    </NutritionContext.Provider>
  );
};

// Custom hook to use the NutritionContext
export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (context === undefined) {
    throw new Error("useNutrition must be used within a NutritionProvider");
  }
  return context;
};
