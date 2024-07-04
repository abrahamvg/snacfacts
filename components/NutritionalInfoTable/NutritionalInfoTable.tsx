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
import clsx from "clsx";

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
  const changeTableData = (label: string, newValue: number) => {
    setNutritionalData((prevTableData) =>
      prevTableData.map((data) =>
        data.nutrientInfo.label === label ? { ...data, value: newValue } : data
      )
    );
  };

  return (
    <div className="content mt-4 text-xs">
      <div className="max-h-44 overflow-y-auto bg-white rounded-md">
          <Table>
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
                        type="text"
                        value={nutrient.value}
                        placeholder="Enter weight"
                        className={clsx(
                          "border-0 text-neutral-600  placeholder:text-neutral-950 px-2 h-fit text-xs text-right",
                          Number.isNaN(Number(nutrient.value))
                            ? "border-red-500"
                            : "border-primary"
                        )}
                        onChange={(e) => {
                          if (!Number.isNaN(Number(e.target.value)))
                            changeTableData(
                              nutrient.nutrientInfo.label,
                              Number(e.target.value)
                            );
                        }}
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
          type="text"
          placeholder="100g"
          className={clsx(
            "w-16 px-2 h-fit text-right ",
            perSize === 0 ? "border-red-500 border-2" : ""
          )}
          value={perSize}
          onChange={(e) => {
            if (!Number.isNaN(Number(e.target.value)))
              setPerSize(Number(e.target.value));
          }}
        />
      </div>
      <div className="flex flex-row w-full items-center mt-4 gap-2 justify-end">
        <Label htmlFor="serveSize"> Serve size (g): </Label>
        <Input
          id="serveSize"
          type="text"
          placeholder="200g"
          className={cn(
            "w-16 px-2 h-fit text-right ",
            serveSize === 0 ? "border-red-500 border-2" : ""
          )}
          value={serveSize}
          onChange={(e) => {
            if (!Number.isNaN(Number(e.target.value)))
              setServeSize(Number(e.target.value));
          }}
        />
      </div>
    </div>
  );
}
