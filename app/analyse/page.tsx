"use client";

import AddNutritionDropDown from "@/components/AddNutritionDropDown";
import NutritionalInfoTable from "@/components/NutritionalInfoTable/NutritionalInfoTable";
import ScanImageButton from "@/components/ScanImageButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNutrition } from "@/hooks/useNutritionHook";
import { nutrientsData } from "@/lib/constants";
import { getScore } from "@/lib/geminiAPI";
import { SmileIcon } from "lucide-react";
import { Literata } from "next/font/google";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import clsx from "clsx";
import NutritionalInfoTableSkeleton from "@/components/NutritionalInfoTable/NutritionalInfoTableSkeleton";
import IngredientInfo from "@/components/IngredientInfo/IngredientInfo";
import IngredientInfoSkeleton from "@/components/IngredientInfo/IngredientInfoSkeleton";

const literata = Literata({ subsets: ["latin"] });
const foodTypes = [
  "Fresh Mango Juice",
  "Cashew Biscuits",
  "Burger",
  "Salad",
  "Pasta",
];
const typingDuration = 1500; // Duration for typing animation
const pauseDuration = 1000; // Pause duration between words

type result = {
  observations: string[];
  rating: number;
  concerning_ingredients: Record<string, string>[];
  claim_percentage: number;
  real_product_description: string;
  real_product_justification: string;
};

export default function Page() {
  const { nutritionalData = [], setNutritionalData } = useNutrition();
  const [ingredients, setIngredients] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>(foodTypes[0]);
  const [foodType, setFoodType] = useState("");
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const [perSize, setPerSize] = useState(100);
  const [serveSize, setServeSize] = useState(20);
  const [resultData, setResultData] = useState<result>();
  const [inputCheck, setInputCheck] = useState(false);
  const [fetchingNutrient, setFetchingNutrient] = useState(false);
  const [fetchingIngredient, setFetchingIngredient] = useState(false);
  const [open, setOpen] = useState(false);

  const ref = useRef<NodeJS.Timeout | null>(null);

  const handleData = async () => {
    const scrollDown = () => {
      window.scrollTo({
        top: window.scrollY + 500, // Adjust this value for the desired scroll distance
        behavior: 'smooth'
      });
    };

    if (
      !foodType ||
      !ingredients ||
      !perSize ||
      !serveSize ||
      !nutritionalData
    ) {
      setInputCheck(true);
      return;
    }

    setOpen(true);
    const nutrients = nutritionalData.reduce((acc: any, data) => {
      acc.push({
        label: data.nutrientInfo.label,
        quantity: (data.value / perSize) * serveSize,
        unit: data.nutrientInfo.unit,
        recommededValue: data.nutrientInfo.recommendedValue,
      });
      return acc;
    }, []);

    const result = await getScore(nutrients, ingredients, foodType);
    setResultData(JSON.parse(result));
    scrollDown()
    setOpen(false)
  };

  useEffect(() => {
    ref.current = setInterval(() => {
      setCurrentFoodIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % foodTypes.length;
        setPlaceholder(foodTypes[newIndex]);
        return newIndex;
      });
    }, typingDuration + pauseDuration);

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, []);

  return (
    <div className="px-[7.5%] mb-12">
      <h1
        className={`text-5xl font-bold text-foreground p-2 ${literata.className}`}
      >
        Analyse your Facts
      </h1>
      <div>
        <div className="my-2 mt-4">
          <Label htmlFor="foodType" className="text-lg">
            {" "}
            Enter Food Type
          </Label>
          <Input
            placeholder={placeholder}
            id="foodType"
            type="text"
            className={clsx("border-2 text-base px-2 py-1 mt-1 mb-3", {
              "border-red-500": inputCheck,
            })}
            onChange={(e) => {
              if (inputCheck) setInputCheck(false);
              setFoodType(e.target.value);
            }}
            onMouseEnter={() => {
              if (ref.current) {
                clearInterval(ref.current);
              }
            }}
            onMouseLeave={() => {
              ref.current = setInterval(() => {
                setCurrentFoodIndex((prevIndex) => {
                  const newIndex = (prevIndex + 1) % foodTypes.length;
                  setPlaceholder(foodTypes[newIndex]);
                  return newIndex;
                });
              }, typingDuration + pauseDuration);
            }}
          />
        </div>
        <Tabs defaultValue="nutritional-info" className="p-0 w-[100%]">
          <TabsList className="grid w-full grid-cols-2 p-0 m-0">
            <TabsTrigger
              value="nutritional-info"
              className="data-[state=active]:bg-white data-[state=active]:text-primary bg-neutral-100 rounded-none rounded-tl-md h-full  text-base"
            >
              Nutritional Info
            </TabsTrigger>
            <TabsTrigger
              value="ingredients-info"
              className="data-[state=active]:bg-white data-[state=active]:text-primary bg-neutral-100 rounded-none rounded-tr-md h-full text-base "
            >
              Ingredients Info
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="nutritional-info"
            className="w-full bg-white m-0 p-4 rounded-b-md"
          >
            <div className="text-neutral-950 bg-background-50 w-full rounded-md p-4">
              <div className="flex flex-row justify-end gap-3 items-start">
                <div>
                  <ScanImageButton
                    dataType="nutrient"
                    setDataFunction={setNutritionalData}
                    setFetchingDataFunction={setFetchingNutrient}
                  />
                </div>
                <div>
                  <AddNutritionDropDown data={nutrientsData.nutrients} />
                </div>
              </div>
              {fetchingNutrient && <NutritionalInfoTableSkeleton />}
              {nutritionalData.length > 0 && !fetchingNutrient ? (
                <NutritionalInfoTable
                  perSize={perSize}
                  serveSize={serveSize}
                  setPerSize={setPerSize}
                  setServeSize={setServeSize}
                />
              ) : (
                !fetchingNutrient && (
                  <div className="max-h-48 overflow-y-auto bg-white rounded-md mt-4 text-background-100 py-4">
                    <h3 className="text-sxl font-bold p-2 text-center text-wrap">
                      Nothing to dispay{" "}
                      <SmileIcon className="mx-auto w-16 h-16 mt-2 " />
                    </h3>
                  </div>
                )
              )}
            </div>
          </TabsContent>
          <TabsContent
            value="ingredients-info"
            className="w-full bg-white m-0 p-4 rounded-b-md"
          >
            <div className="text-neutral-950 bg-background-50 w-full rounded-md p-4">
              <div className="flex flex-row justify-end gap-3 items-center">
                <div>
                  <ScanImageButton
                    dataType="ingredient"
                    setDataFunction={setIngredients}
                    setFetchingDataFunction={setFetchingIngredient}
                  />
                </div>
              </div>
              {fetchingIngredient ? (
                <IngredientInfoSkeleton />
              ) : (
                <IngredientInfo
                  ingredients={ingredients}
                  setIngredients={setIngredients}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-full flex justify-end">
        <Button className="bg-background-250 mt-2" onClick={handleData}>
          Analyse
        </Button>
      </div>
      {resultData && (
        <div className="my-12">
          <div
            className={`flex flex-col items-center text-2xl text-foreground ${literata.className}`}
          >
            <span>We Feel</span>
            <h1 className={`text-5xl font-bold`}>Your Snack</h1>
            <span>deserves</span>
          </div>
          <div className="report flex flex-col items-center w-full mt-4 gap-0">
            <div className="bg-white rounded-t-full h-16 w-32 flex flex-row items-end justify-center pb-1">
              <h3 className="text-5xl font-black text-center text-primary ml-4">
                {resultData?.rating}
              </h3>
              <span className="text-muted/75 -mt-2">/10</span>
            </div>
            <div className="bg-white rounded-md w-full text-black p-4">
              <div>
                <h4 className="font-bold text-lg">
                  {" "}
                  Here are our observations
                </h4>
                <ul className="list-disc pl-4 text-neutral-600 w-[95%]">
                  {resultData?.observations.map((observation, index) => (
                    <li className="mt-2" key={index}>
                      {observation}
                    </li>
                  ))}
                </ul>
              </div>
              {resultData?.concerning_ingredients?.length > 0 && (
                <div className="mt-8">
                  <h4 className="font-bold w-[80%] text-lg">
                    {" "}
                    Here are ingredients we think you should care about
                  </h4>
                  <div className="text-base mt-2">
                    <Accordion type="single" collapsible>
                      {resultData?.concerning_ingredients?.map(
                        (ingredient: any, index: number) => (
                          <AccordionItem
                            value={`item-${index + 1}`}
                            className="bg-neutral-100 rounded-md px-2 mt-2 text-sm"
                            key={index}
                          >
                            <AccordionTrigger>
                              <div className="w-56 overflow-hidden text-left truncate text-ellipsis">
                                {ingredient.ingredient}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              {ingredient.reason}
                            </AccordionContent>
                          </AccordionItem>
                        )
                      )}
                    </Accordion>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-2 w-full bg-white rounded-md p-4 text-black">
            <div className="flex flex-row justify-between mt-4 items-end">
              <h4 className="font-bold text-lg">
                {" "}
                Is this really <br /> a{" "}
                <span className={`${literata.className} font-semibold`}>
                  {foodType}
                </span>{" "}
                ??{" "}
              </h4>
              <div className="text-2xl font-black text-red-400">
                {resultData?.claim_percentage}%
              </div>
            </div>
            <div className="bg-neutral-200 h-2 w-full mt-2 rounded-full">
              <div
                className={`h-full rounded-full bg-red-400`}
                style={{
                  width: `${resultData?.claim_percentage}%`,
                }}
              ></div>
            </div>
            <div className="my-12 flex flex-col items-center">
              <p> We feel it is close to a</p>
              <h4 className="font-bold text-xl">
                {" "}
                {resultData?.real_product_description}
              </h4>
            </div>
            {resultData?.claim_percentage <= 60 && (
              <div>
                <h4 className="font-bold text-lg"> Here&apos;s why</h4>
                <p className=" text-neutral-600 w-[95%]">
                  {resultData?.real_product_justification}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div
        className={clsx(
          "w-full min-h-screen bg-background-200 fixed top-0 left-0 flex justify-center items-center",
          {
            "animate-slide-down": open,
            "animate-slide-up": !open,
          }
        )}
      >
        <h1
          className={`text-2xl w-4/5 text-wrap text-center ${literata.className}`}
        >
          Preparing the<br/> <span className="text-5xl">Results</span>
        </h1>
      </div>
    </div>
  );
}
