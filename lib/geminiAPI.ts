"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { nutrientsData } from "./constants";

//Intialisation
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" },
});

export async function nutirentFromImage(image: any) {
  "use server";

  const prompt = `Return me a list of objects with values {label : <nutrient>, value : <quantity>} 
  if you see nutrients and its quantity in the picture.
  labels should be captialised and values should be a integer or a float which ever is appropriate.
  Ignore all the other information including the units for each nutrition.
  If you can\'t see any nutrition data, please return []`;

  try {
    const result = await model.generateContent([prompt, image]);
    return result.response.text();
  } catch (error) {
    console.error("Error in nutirentFromImage:", error);
    throw new Error("Failed to process image");
  }
}

export async function ingredientFromImage(image: any) {
  "use server";

  const prompt = `Return ingredients separated by comma from the picture. 
  Return 1 single string of ingredients. 
  Ignore Acidity Regulators. Allowed special charachters are %&(),.
  If you can\'t see any ingredient data, please return ''`;

  try {
    const result = await model.generateContent([prompt, image]);
    return result.response.text();
  } catch (error) {
    console.error("Error in ingredientFromImage:", error);
    throw new Error("Failed to process image");
  }
}

export async function getScore(
  nutrientData: {
    label: string;
    quantity: number;
    unit: string;
    recommededValue: number;
  }[],
  ingredientData: string,
  foodType: string
) : Promise<string> {
  "use server";

  // const nutrientData = [
  //   {
  //     label: "Energy",
  //     quantity: 55.2,
  //     unit: "Kcal",
  //     recommededValue: 2000,
  //   },
  //   {
  //     label: "Protein",
  //     quantity: 0.15,
  //     unit: "g",
  //     recommededValue: 50,
  //   },
  //   {
  //     label: "Trans Fat",
  //     quantity: 0,
  //     unit: "g",
  //     recommededValue: 2,
  //   },
  //   {
  //     label: "Cholesterol",
  //     quantity: 0,
  //     unit: "mg",
  //     recommededValue: 300,
  //   },
  //   {
  //     label: "Saturated Fat",
  //     quantity: 0.0285,
  //     unit: "g",
  //     recommededValue: 20,
  //   },
  //   {
  //     label: "Sodium",
  //     quantity: 4.35,
  //     unit: "mg",
  //     recommededValue: 2300,
  //   },
  //   {
  //     label: "Iron",
  //     quantity: 0.6,
  //     unit: "mg",
  //     recommededValue: 8,
  //   },
  //   {
  //     label: "Calcium",
  //     quantity: 14.1,
  //     unit: "mg",
  //     recommededValue: 1000,
  //   },
  // ];

  // const ingredientData =
  //   "Jaggery Powder, Mixed Spices & Herb (10.2%), Pepper powder, tulsi powder, cardamom powder, coffee powder(2.4%)";

  // const foodType = "Herbal Coffee";

  const prompt = `Given the nutrient info and ingredient info, of ${foodType},
  Nutrients : ${JSON.stringify(nutrientData)},
  Ingredients : ${ingredientData}

  The audience we are catering to are Normal people. 
  
  Give me 3 observations about how the food product is, who all can consume it, if its not healthy why it isn't . (basis should be with respect to a normal person)
  On the basis of the observations, rate this product on a scale of 1 - 10 on the basis of health benifits and potential risks. 
  
  After that please list down top concerning ingredients (if any) with reason 
  (basis should be with respect to a normal person, if concerning or harmful, mention age-group/ type of person/ gender)., 
  Reference the nutrient info to quantify the ingredient's presence, 
  Ignore ingredients that have low risk or below/lower that the recommended daily intake.
  Answers should also be on the basis of recommended daily intake for a normal person.


  Assess whether product truly qualifies as ${foodType} (Estimate the percentage to which it matches ${foodType})  
  If not, provide a brief (3-4 words) description of what it actually is.
  Justify your rating.

  please provide your answer in JSON
  {
    "observations": [string[]],
  "rating": number,
  "concerning_ingredients":[{ingredient: string, reason: string}[]],
  "claim_percentage": number,
  "real_product_description": string
  "real_product_justification": string
  }`;

  try {
    const result = await model.generateContent([prompt]);
    return result.response.text();
  } catch (error) {
    console.error("Error in getScore method:", error);
    throw new Error("Failed to analyse food content");
  }
}
