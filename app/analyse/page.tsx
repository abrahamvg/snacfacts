"use client";

import AddNutritionDropDown from "@/components/AddNutritionDropDown";
import NutritionalInfoTable from "@/components/NutritionalInfoTable/NutritionalInfoTable";
import ScanImageButton from "@/components/ScanImageButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNutrition } from "@/hooks/useNutritionHook";
import { nutrientsData } from "@/lib/constants";
import { SmileIcon } from "lucide-react";
import { Literata } from "next/font/google";
import { useState } from "react";

const literata = Literata({ subsets: ["latin"] });

export default function Page() {
  const { nutritionalData = [], setNutritionalData } = useNutrition();
  const [ingredients, setIngredients] = useState<string>("");

  console.log();

  return (
    <div className="px-[10%] bg-background-250">
      <h1
        className={`text-3xl font-bold text-foreground p-2 ${literata.className}`}
      >
        Analyse your Facts
      </h1>
      <div>
        <Tabs defaultValue="nutritional-info" className="p-0 w-[100%]">
          <TabsList className="grid w-full grid-cols-2 p-0 m-0">
            <TabsTrigger
              value="nutritional-info"
              className="data-[state=active]:bg-white data-[state=active]:text-primary bg-neutral-100 rounded-none rounded-tl-md h-full"
            >
              Nutritional Info
            </TabsTrigger>
            <TabsTrigger
              value="ingredients-info"
              className="data-[state=active]:bg-white data-[state=active]:text-primary bg-neutral-100 rounded-none rounded-tr-md h-full"
            >
              Ingredients Info
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="nutritional-info"
            className="w-full bg-white m-0 p-4 rounded-b-md"
          >
            <div className="text-neutral-950 bg-background-50 w-full rounded-md p-4">
              <div className="flex flex-row justify-end gap-3 items-start">
                <div>
                  <ScanImageButton
                    dataType="nutrient"
                    setDataFunction={setNutritionalData}
                  />
                </div>
                <div>
                  <AddNutritionDropDown data={nutrientsData.nutrients} />
                </div>
              </div>
              {nutritionalData.length > 0 ? (
                <NutritionalInfoTable />
              ) : (
                <div className="max-h-48 overflow-y-auto bg-white rounded-md mt-4 text-background-100 py-4">
                  <h3 className="text-sxl font-bold p-2 text-center text-wrap">
                    Nothing to dispay{" "}
                    <SmileIcon className="mx-auto w-16 h-16 mt-2 " />
                  </h3>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent
            value="ingredients-info"
            className="w-full bg-white m-0 p-4 rounded-b-md"
          >
            <div className="text-neutral-950 bg-background-50 w-full rounded-md p-4">
              <div className="flex flex-row justify-end gap-3 items-center">
                <div>
                  <ScanImageButton
                    dataType="ingredient"
                    setDataFunction={setIngredients}
                  />
                </div>
              </div>
              <div>
                <Textarea
                  className="bg-white mt-4 text-xs"
                  placeholder="Enter Ingredients in comma sperated format"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  rows={8}
                />
              </div>
              <div className="mt-4">
                <div className="max-h-[120px] overflow-y-auto flex flex-wrap text-[10px] gap-x-1 gap-y-2">
                  {ingredients.length > 0 ? (
                    ingredients.split(/,\s*(?![^()]*\))/).map(
                      (ingredient, index) =>
                        ingredient.trim().length > 0 && (
                          <div
                            key={index}
                            className="px-2 py-1 bg-muted/25 border-primary border rounded-full"
                          >
                            {ingredient}
                          </div>
                        )
                    )
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-full flex justify-end">
        <Button className="bg-background-250 mt-2">Analyse</Button>
      </div>
    </div>
  );
}
