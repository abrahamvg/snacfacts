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
import { nutrientsData } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import FactsCard from "./FactsCard";
import VisualiseCard from "./VisualiseCard";
import { cn } from "@/lib/utils";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export default function NutritionInfoTable({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { nutritionalData = [], setNutritionalData } = useNutrition();
  const [perSize, setPerSize] = useState(100);
  const [serveSize, setServeSize] = useState(20);
  const [factCard, setFactCard] = useState("feedback");
  const [showValidationErrorForPerSize, setShowValidationErrorForPerSize] =
    useState(false);
  const [showValidationErrorForServeSize, setShowValidationErrorForServeSize] =
    useState(false);

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
      setOpen(true);
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
              className={cn(
                "w-20 text-right",
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
                "w-20 text-right",
                showValidationErrorForServeSize && "border-red-500"
              )}
              value={serveSize}
              onChange={(e) => handleInputChangeServeSize(e.target.value)}
            />
          </div>
          <Button
            className="w-full mt-4 bg-transparent text-primary border-primary border-2 hover:bg-primary hover:text-neutral-50"
            onClick={handleOpen}
          >
            Track
          </Button>
        </div>
      </div>
      {open && (
        <div className="text-neutral-950 bg-neutral-50 w-full rounded-md p-4 mt-4">
          <div className="flex flex-row justify-between items-start h-24">
            <h3 className="font-bold text-xl w-1/3 text-wrap">Facts Card</h3>
            <div>
              <ErrorBoundary
                errorComponent={() => (
                  <div>An error occurred. Please try again later.</div>
                )}
              >
                <Select
                  defaultValue={factCard}
                  onValueChange={(value) => setFactCard(value)}
                >
                  <SelectTrigger className="w-[120px] bg-transparent border-2 border-primary color-primary">
                    <SelectValue
                      defaultValue="feedback"
                      placeholder="Feedback"
                    />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="visualise">Visualise</SelectItem>
                  </SelectContent>
                </Select>
              </ErrorBoundary>
            </div>
          </div>
          {factCard === "feedback" ? (
            <FactsCard perSize={perSize} serveSize={serveSize} />
          ) : (
            <VisualiseCard perSize={perSize} serveSize={serveSize} />
          )}
        </div>
      )}
    </div>
  );
}
