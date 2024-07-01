"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

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
