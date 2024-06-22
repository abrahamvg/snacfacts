"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { Nutrient } from "@/types/types";
import { useNutrition } from "@/providers/dataProvider";

export default function AddNutritionDropDown({ data }: { data: Nutrient[] }) {
  const [open, setOpen] = useState(false);
  const [nutrientQuantity, setNutrientQuantity] = useState<number>(0);
  const [selectedNutrient, setSelectedNutrient] = useState<string>(
    data[0].value
  );
  const [dropDownData, setDropDownData] = useState<Nutrient[]>(data);
  const { nutritionalData, setNutritionalData } = useNutrition();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    // Post the data

    const selectedData: Nutrient | undefined = dropDownData.find(
      (nutrient) => nutrient.value === selectedNutrient
    );

    if (selectedData) {
      setNutritionalData((prevData) => [
        ...prevData,
        { nutrientInfo: selectedData, value: nutrientQuantity },
      ]);
    } else {
      console.error("Selected data is undefined");
    }

    // Filter out the selected nutrient
    const updatedDropDownData = dropDownData.filter(
      (nutrient) => nutrient.value !== selectedNutrient
    );

    setDropDownData(updatedDropDownData);
    if (updatedDropDownData.length > 0) {
      setSelectedNutrient(updatedDropDownData[0].value);
    }

    // Close the dropdown
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} modal={false}>
      <DropdownMenuTrigger
        className="text-sm bg-primary text-neutral-50 p-2 rounded-md"
        onClick={handleOpen}
      >
        Add
      </DropdownMenuTrigger>
      {dropDownData.length > 0 ? (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Select Nutrition</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={selectedNutrient}
            onValueChange={setSelectedNutrient}
            className="grid grid-cols-2 gap-2 text-left"
          >
            {dropDownData.map((nutrient) => (
              <DropdownMenuRadioItem
                value={nutrient.value}
                key={nutrient.value}
                className={clsx("text-sm py-4 px-3 rounded-md", {
                  "bg-secondary font-semibold":
                    nutrient.value === selectedNutrient,
                })}
              >
                {nutrient.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>

          <DropdownMenuItem>
            <Input
              type="number"
              placeholder="Enter weight"
              value={nutrientQuantity}
              onChange={(e) => {
                setNutrientQuantity(Number(e.target.value));
              }}
              className="w-full placeholder:text-neutral-950 mt-2"
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button className="w-full" onClick={handleClose}>
              Add
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent align="end" className="p-4 w-40 text-right">
          {" "}
          You just had all the available nutrients !!{" "}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
