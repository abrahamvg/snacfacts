"use client";
import { useNutrition } from "@/hooks/useNutritionHook";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import clsx from "clsx";
import { comparisonData } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { InfoIcon } from "lucide-react";

export default function VisualiseCard({
  perSize,
  serveSize,
}: {
  perSize: number;
  serveSize: number;
}) {
  const { nutritionalData } = useNutrition();
  const [selectedNutrient, setSelectedNutrient] = useState<string>();
  // nutritionalData[0].nutrientInfo.value

  const handleComparisonData = () => {
    const data = nutritionalData.filter((data) => {
      return data.nutrientInfo.value === selectedNutrient;
    })[0];

    return Math.round(
      data.value / comparisonData[data.nutrientInfo.value].weight / perSize * serveSize
    );
  };

  return (
    <div className="mt-4 bg-neutral-100 rounded-md max-h-64 overflow-hidden py-4 px-2">
      <div className="w-full flex flex-row justify-end">
        <Select
          defaultValue={selectedNutrient}
          onValueChange={(value) => {
            setSelectedNutrient(value);
          }}
        >
          <SelectTrigger className="px-3 h-fit rounded-full w-[120px] bg-secondary border-[0.5px] border-primary color-primary text-xs">
            <SelectValue placeholder="Select Nutrition" />
          </SelectTrigger>
          <SelectContent align="end" className="max-h-[200px] px-1 py-2">
            {nutritionalData.map((nutrient) => {
              return (
                <SelectItem
                  className="py-2 text-xs"
                  key={nutrient.nutrientInfo.value}
                  value={nutrient.nutrientInfo.value}
                >
                  {nutrient.nutrientInfo.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="content mt-4">
        {selectedNutrient && (
          <div>
            <div>
              <Image
                src={`/images/nutrientSVGs/${comparisonData[selectedNutrient].value}.svg`}
                alt={comparisonData[selectedNutrient].value}
                height={300}
                width={300}
                className="w-28 h-28 mx-auto"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-primary font-semibold text-2xl block">
                {handleComparisonData()}
              </span>
              <div>
                {comparisonData[selectedNutrient].name}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <InfoIcon className="w-2 ml-1" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="min-w-fit max-w-48 p-2 text-xs text-center"
                    align="center"
                    side="top"
                    sideOffset={-4}
                  >
                    <div>{comparisonData[selectedNutrient].label}</div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
