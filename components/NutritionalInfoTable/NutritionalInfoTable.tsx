"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNutrition } from "@/hooks/useNutritionHook";
import { cn } from "@/lib/utils";

export default function NutritionalInfoTable({
  perSize,
  serveSize,
  setPerSize,
  setServeSize,
}: {
  perSize: number;
  serveSize: number;
  setPerSize: React.Dispatch<React.SetStateAction<number>>;
  setServeSize: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { nutritionalData = [], setNutritionalData } = useNutrition();
  const [factCard, setFactCard] = useState("feedback");
  const [showValidationErrorForPerSize, setShowValidationErrorForPerSize] = useState(false);
  const [showValidationErrorForServeSize, setShowValidationErrorForServeSize] = useState(false);

  const changeTableData = (label: string, newValue: number) => {
    setNutritionalData((prevTableData) =>
      prevTableData.map((data) =>
        data.nutrientInfo.label === label ? { ...data, value: newValue } : data
      )
    );
  };

  const handleInputChangeServeSize = (value: string) => {
    const newValue = Number(value);
    if (newValue > 0) {
      setServeSize(newValue);
      setShowValidationErrorForServeSize(false);
    } else {
      setServeSize(1);
    }
  };
  const handleInputChangeperServe = (value: string) => {
    const newValue = Number(value);
    if (newValue > 0) {
      setPerSize(newValue);
      setShowValidationErrorForPerSize(false);
    } else {
      setPerSize(1);
    }
  };

  const handleOpen = () => {
    if (perSize > 0 && serveSize > 0 && nutritionalData.length > 0) {
      setShowValidationErrorForPerSize(false);
      setShowValidationErrorForServeSize(false);
    } else {
      if (perSize === 0) {
        setShowValidationErrorForPerSize(true);
      }
      if (serveSize === 0) {
        setShowValidationErrorForServeSize(true);
      }
    }
  };
  return (
    <div className="content mt-4 text-xs">
      <div className="max-h-48 overflow-y-auto bg-white rounded-md">
        <Table className="masked-overflow ">
          <TableHeader>
            <TableRow>
              <TableHead className="w-3/4 h-fit py-2 font-black">
                Nutrition
              </TableHead>
              <TableHead className="w-1/4 text-right h-fit py-2 font-black">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nutritionalData.map((nutrient) => {
              return (
                <TableRow key={nutrient.nutrientInfo.value} className="h-fit">
                  <TableCell className="w-3/4 py-1 text-xs font-medium">
                    {nutrient.nutrientInfo.label +
                      " (" +
                      nutrient.nutrientInfo.unit +
                      ")"}
                  </TableCell>
                  <TableCell className="w-1/4 text-right py-1 text-xs">
                    <Input
                      type="number"
                      value={nutrient.value}
                      placeholder="Enter weight"
                      className="border-0 text-neutral-600  placeholder:text-neutral-950 px-2 h-fit text-xs text-right"
                      onChange={(e) =>
                        changeTableData(
                          nutrient.nutrientInfo.label,
                          Number(e.target.value)
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-row w-full items-center mt-4 gap-2 justify-end">
        <Label htmlFor="perSize"> per (g): </Label>
        <Input
          id="perSize"
          type="number"
          placeholder="100g"
          className={cn(
            "w-16 px-2 h-fit text-right ",
            showValidationErrorForPerSize && "border-red-500"
          )}
          value={perSize}
          onChange={(e) => handleInputChangeperServe(e.target.value)}
        />
      </div>
      <div className="flex flex-row w-full items-center mt-4 gap-2 justify-end">
        <Label htmlFor="serveSize"> Serve size (g): </Label>
        <Input
          id="serveSize"
          type="number"
          placeholder="200g"
          className={cn(
            "w-16 px-2 h-fit text-right ",
            showValidationErrorForServeSize && "border-red-500"
          )}
          value={serveSize}
          onChange={(e) => handleInputChangeServeSize(e.target.value)}
        />
      </div>
    </div>
  );
}
