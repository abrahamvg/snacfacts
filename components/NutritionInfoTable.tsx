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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AddNutritionDropDown from "./AddNutritionDropDown";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useNutrition } from "@/hooks/useNutritionHook";
import { nutrientsData } from "@/providers/constants";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import FactsCard from "./FactsCard";
import VisualiseCard from "./VisualiseCard";

export default function NutritionInfoTable({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { nutritionalData, setNutritionalData } = useNutrition();
  const [perSize, setPerSize] = useState(0);
  const [serveSize, setServeSize] = useState(0);
  const [factCard, setFactCard] = useState("feedback");

  const changeTableData = (label: string, newValue: number) => {
    setNutritionalData((prevTableData) =>
      prevTableData.map((data) =>
        data.nutrientInfo.label === label ? { ...data, value: newValue } : data
      )
    );
  };

  return (
    <div>
      <div className="text-neutral-950 bg-neutral-50 w-full rounded-md p-4">
        <div className="flex flex-row justify-between items-start h-24">
          <h3 className="font-bold text-xl w-1/3 text-wrap">Nutrition Info</h3>
          <div>
            <AddNutritionDropDown data={nutrientsData.nutrients} />
          </div>
        </div>
        <div className="content mt-4">
          <div className="max-h-64 overflow-y-auto bg-neutral-100 rounded-md">
            <Table className="masked-overflow">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-3/4">Nutrition</TableHead>
                  <TableHead className="w-1/4 text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nutritionalData.map((nutrient) => {
                  return (
                    <TableRow key={nutrient.nutrientInfo.value}>
                      <TableCell className="w-3/4">
                        {nutrient.nutrientInfo.label +
                          " (" +
                          nutrient.nutrientInfo.unit +
                          ")"}
                      </TableCell>
                      <TableCell className="w-1/4 text-right">
                        <Input
                          type="number"
                          value={nutrient.value}
                          placeholder="Enter weight"
                          className="placeholder:text-neutral-950 px-2 text-right"
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
              className="w-20 text-right"
              value={perSize}
              onChange={(e) => setPerSize(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-row w-full items-center mt-4 gap-2 justify-end">
            <Label htmlFor="serveSize"> Serve size (g): </Label>
            <Input
              id="serveSize"
              type="number"
              placeholder="200g"
              className="w-20 text-right"
              value={serveSize}
              onChange={(e) => setServeSize(Number(e.target.value))}
            />
          </div>
          <Button
            className="w-full mt-4 bg-transparent text-primary border-primary border-2 hover:bg-primary hover:text-neutral-50"
            onClick={() => setOpen(true)}
          >
            Track
          </Button>
        </div>
      </div>
      <div className="text-neutral-950 bg-neutral-50 w-full rounded-md p-4 mt-4">
        <div className="flex flex-row justify-between items-start h-24">
          <h3 className="font-bold text-xl w-1/3 text-wrap">Facts Card</h3>
          <div>
            <Select defaultValue={factCard} onValueChange={(value) => setFactCard(value)}>
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
        {
          factCard === "feedback" ? (
            <FactsCard
              // perSize={perSize}
              // serveSize={serveSize}
              // data={nutritionalData}
            />
          ) : (
            <VisualiseCard
              // perSize={perSize}
              // serveSize={serveSize}
              // data={nutritionalData}
            />
          )
        }
      </div>
    </div>
  );
}
