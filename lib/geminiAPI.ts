'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";


//Intialisation
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

console.log(apiKey)

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" },
});

const prompt = `Return me a list of objects with values {label : <nutrient>, value : <quantity>} 
if you see nutrients and its quantity in the picture.
labels should be captialised and values should be a integer or a float which ever is appropriate.
Ignore all the other information including the units for each nutrition.
If you can\'t see any nutrition data, please return []`;



export async function textFromImage(image: any) {
    'use server';
    try {
      const result = await model.generateContent([prompt, image]);
      return result.response.text();
    } catch (error) {
      console.error("Error in textFromImage:", error);
      throw new Error("Failed to process image");
    }
  }
