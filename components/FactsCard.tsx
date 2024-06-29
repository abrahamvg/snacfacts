"use client";

import React, { useEffect, useState } from "react";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InfoIcon } from "lucide-react";
import clsx from "clsx";

export default function FactsCard({
  perSize,
  serveSize,
}: {
  perSize: number;
  serveSize: number;
}) {
  const { nutritionalData = [] } = useNutrition();

  const [nutrientFeedback, setNutrientFeedback] = useState<
    Record<string, FeedbackDataEntry>
  >({});

  console.log("targetting re-renders");

  useEffect(() => {
    if (nutritionalData.length > 0) {
      const newFeedback = nutritionalData.reduce((acc, nutrition) => {
        const consumptionPercentage = Math.round(
          (nutrition.value /
            nutrition.nutrientInfo.recommendedValue /
            perSize) *
            100 *
            serveSize
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
  }, [nutritionalData, perSize, serveSize]);

  return (
    <div className="content mt-4 bg-neutral-100 rounded-md max-h-64 overflow-y-auto">
      <Table className="">
        {/* <TableCaption className="text-left">RV : Recommeded Value</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/4">Nutrition</TableHead>
            <TableHead className="w-2/4 text-right">Risk</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nutritionalData &&
            nutritionalData.map((nutrient) => {
              return (
                <TableRow key={nutrient.nutrientInfo.value}>
                  <TableCell className="w-2/4">
                    {nutrient?.nutrientInfo.label +
                      " (" +
                      nutrient?.nutrientInfo.unit +
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
  );
}
