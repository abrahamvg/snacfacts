"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Nutrient } from "@/types/types";
import { useDropDownData } from "@/hooks/useDropDownData";
import { useNutrition } from "@/hooks/useNutritionHook";
import { ScanEyeIcon, ScanLineIcon, ScanTextIcon, Upload } from "lucide-react";
import { nutrientsData } from "@/lib/constants";
import { ingredientFromImage, nutirentFromImage } from "@/lib/geminiAPI";
import Image from "next/image";

export default function ScanImageButton({ dataType, setDataFunction, setFetchingDataFunction }: { dataType: string, setDataFunction: React.Dispatch<React.SetStateAction<any>>, setFetchingDataFunction: React.Dispatch<React.SetStateAction<any>> }) {
  const { dropDownData, setDropDownData } = useDropDownData();
  const { setNutritionalData } = useNutrition();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: {
    target: { files: any };
    preventDefault: () => void;
  }) => {
    const file = e.target.files[0];
    e.preventDefault();
    if (file) {
      setFetchingDataFunction(true);
      try {
        // Read the selected file and prepare for API consumption
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
          if (reader.result && typeof reader.result === "string") {
            const image = {
              inlineData: {
                data: reader.result.split(",")[1], // Extract base64 data
                mimeType: file.type,
              },
            };

            if (dataType === "nutrient") {
              const result = await nutirentFromImage(image);
              const data = await JSON.parse(result);

              handleValues(data);
            } 

            if (dataType === "ingredient") {
              const result = await ingredientFromImage(image);
              const data = await JSON.parse(result);
              setDataFunction(data);
              setFetchingDataFunction(false);
            } 

          }
        };

        reader.onerror = (error) => {
          console.error("Error reading the file: ", error);
        };
      } catch (error) {
        console.error("Error processing the file: ", error);
      }
    } else {
      console.log("No file selected");
    }
  };
  const handleValues = (data: { label: string; value: number }[]) => {
    setFetchingDataFunction(false);
    setDataFunction([]);

    let updatedDropDownData = [...nutrientsData.nutrients];

    data.forEach((dataValue) => {
      const selectedDataIndex = updatedDropDownData.findIndex(
        (nutrient) => nutrient.label === dataValue.label
      );

      if (selectedDataIndex !== -1) {
        const selectedData = updatedDropDownData[selectedDataIndex];
        setDataFunction((prevData: Nutrient[]) => [
          ...prevData,
          { nutrientInfo: selectedData, value: dataValue.value },
        ]);

        updatedDropDownData.splice(selectedDataIndex, 1);
      } else {
        console.error("Selected data is undefined");
      }
    });

    setDropDownData(updatedDropDownData);
  };

  return (
    <div>
      <Label
        htmlFor="picture"
        className="bg-background-200 text-foreground rounded-full h-10 w-10 flex justify-center items-center p-[6px] active:bg-background-250"
      >
        <ScanTextIcon />
      </Label>
      {open && (
        <div className="fixed top-0 left-0 h-full w-full">
          <div className="h-full w-full bg-green-900 opacity-40 absolute top-0 left-0"></div>
          <div className="h-full w-full flex items-center justify-center absolute top-0 left-0">
            <span className="loader"></span>
          </div>
        </div>
      )}

      <Input
        id="picture"
        type="file"
        onChange={handleSubmit}
        className="hidden"
      />
    </div>
  );
}
