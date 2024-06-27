"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNutrition } from "@/hooks/useNutritionHook";
import { FeedbackDataEntry } from "@/types/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InfoIcon } from "lucide-react";
import clsx from "clsx";

export default function FactsCard() {
  const { nutritionalData } = useNutrition();

  const [nutrientFeedback, setNutrientFeedback] = useState<
    Record<string, FeedbackDataEntry>
  >({});

  useEffect(() => {
    if (nutritionalData.length > 0) {
      const newFeedback = nutritionalData.reduce((acc, nutrition) => {
        const consumptionPercentage = Math.round(
          (nutrition.value / nutrition.nutrientInfo.recommendedValue) * 100
        );

        let feedback: string;

        if (consumptionPercentage > 100) {
          feedback = "High";
        } else if (consumptionPercentage <= 100 && consumptionPercentage > 85) {
          feedback = "Medium";
        } else {
          feedback = "Low";
        }

        acc[nutrition.nutrientInfo.value] = {
          nutrientInfo: nutrition.nutrientInfo,
          feedback: feedback,
          percentage: consumptionPercentage,
        };
        return acc;
      }, {} as Record<string, FeedbackDataEntry>);

      setNutrientFeedback(newFeedback);
    }
  }, [nutritionalData]);

  return (
    <div className="text-neutral-950 bg-neutral-50 w-full rounded-md p-4 mt-4">
      <div className="flex flex-row justify-between items-start h-24">
        <h3 className="font-bold text-xl w-1/3 text-wrap">Facts Card</h3>
        <div>
          <Select>
            <SelectTrigger className="w-[120px] bg-transparent border-2 border-primary color-primary">
              <SelectValue defaultValue="feedback" placeholder="Feedback" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="feedback">Feedback</SelectItem>
              <SelectItem value="visualise">Visualise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="content mt-4">
        <Table>
          {/* <TableCaption className="text-left">RV : Recommeded Value</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-2/4">Nutrition</TableHead>
              <TableHead className="w-2/4 text-right">Risk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nutritionalData.map((nutrient) => {
              return (
                <TableRow key={nutrient.nutrientInfo.value}>
                  <TableCell className="w-2/4">
                    {nutrient.nutrientInfo.label +
                      " (" +
                      nutrient.nutrientInfo.unit +
                      ")"}
                  </TableCell>
                  <TableCell className="w-2/4 text-right">
                    <div
                      className={clsx("inline", {
                        "text-green-600":
                          nutrientFeedback[nutrient.nutrientInfo.value]
                            ?.feedback === "Low",
                        "text-yellow-500":
                          nutrientFeedback[nutrient.nutrientInfo.value]
                            ?.feedback === "Medium",
                        "text-red-600":
                          nutrientFeedback[nutrient.nutrientInfo.value]
                            ?.feedback === "High",
                      })}
                    >
                      {nutrientFeedback[nutrient.nutrientInfo.value]?.feedback}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <InfoIcon className="w-2 ml-1" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="min-w-fit p-2 text-xs text-right"
                        align="end"
                        side="top"
                        sideOffset={-4}
                      >
                        <div>
                          {nutrientFeedback[nutrient.nutrientInfo.value]
                            ?.percentage + "% of Daily Avg."}
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
            
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
