"use client";
import React, { useEffect, useState } from "react";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Nutrient } from "@/types/types";
import { useDropDownData } from "@/hooks/useDropDownData";
import { useNutrition } from "@/hooks/useNutritionHook";
import { Upload } from "lucide-react";
import {nutrientsData} from "@/providers/constants"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export default function Test() {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const { dropDownData, setDropDownData } =
    useDropDownData();
  const { setNutritionalData } = useNutrition();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: {
    target: { files: any };
    preventDefault: () => void;
  }) => {
    const file = e.target.files[0];
    e.preventDefault();
    if (file) {
      setOpen(true);
      try {
        const prompt = `Return me a list of objects with values {label : <nutrient>, value : <quantity>} 
        if you see nutrients and its quantity in the picture.
        labels should be captialised and values should be a integer or a float which ever is appropriate.
        Ignore all the other information including the units for each nutrition.
        If you can\'t see any nutrition data, please return []`;

        // Read the selected file and prepare for API consumption
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
          const image = {
            inlineData: {
              data: reader.result.split(",")[1], // Extract base64 data
              mimeType: file.type,
            },
          };

          // Use Google Generative AI to generate content
          const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: { responseMimeType: "application/json" },
          });

          const result = await model.generateContent([prompt, image]);
          const data = await JSON.parse(result.response.text());

          handleValues(data);
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
    setOpen(false);
    setNutritionalData([]);

    let updatedDropDownData = [...nutrientsData.nutrients];

    data.forEach((dataValue) => {
      const selectedDataIndex = updatedDropDownData.findIndex(
        (nutrient) => nutrient.label === dataValue.label
      );

      if (selectedDataIndex !== -1) {
        const selectedData = updatedDropDownData[selectedDataIndex];
        setNutritionalData((prevData) => [
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
    <div className="bg-white">
      <Label htmlFor="picture">
        <div className="bg-primary shadow-md w-16 h-16 rounded-full fixed bottom-[24px] right-[20px] flex items-center justify-center">
          {" "}
          <Upload />
        </div>
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
