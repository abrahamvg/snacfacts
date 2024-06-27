"use client";
import { nutrientsData } from "@/providers/constants";
import { Nutrient, TableDataEntry } from "@/types/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface NutritionProviderProps {
  children: ReactNode;
}

type DropDownDataContextType = {
  dropDownData: Nutrient[];
  setDropDownData: React.Dispatch<React.SetStateAction<Nutrient[]>>;
};

// Create a context
const DropDownDataContext = createContext<DropDownDataContextType | undefined>(
  undefined
);

// Create a provider component
export const DropDownDataProvider = ({ children }: NutritionProviderProps) => {
  const [dropDownData, setDropDownData] = useState<Nutrient[]>(nutrientsData.nutrients);

  return (
    <DropDownDataContext.Provider value={{ dropDownData, setDropDownData }}>
      {children}
    </DropDownDataContext.Provider>
  );
};

// Custom hook to use the DropDownDataContext
export const useDropDownData = () => {
  const context = useContext(DropDownDataContext);
  if (context === undefined) {
    throw new Error(
      "useDropDownData must be used within a DropDownDataProvider"
    );
  }
  return context;
};
