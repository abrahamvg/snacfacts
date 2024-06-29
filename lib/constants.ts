import { ComparisonData, NutrientsData } from "@/types/types";

export const nutrientsData: NutrientsData = {
  nutrients: [
    {
      label: "Energy",
      value: "energy",
      unit: "Kcal",
      recommendedValue: 2000,
    },
    {
      label: "Sugars",
      value: "addedSugars",
      unit: "g",
      recommendedValue: 30,
    },
    {
      label: "Fat",
      value: "fat",
      unit: "g",
      recommendedValue: 70,
    },
    {
      label: "Protein",
      value: "protein",
      unit: "g",
      recommendedValue: 50,
    },
    {
      label: "Cholesterol",
      value: "cholesterol",
      unit: "mg",
      recommendedValue: 300,
    },
    {
      label: "Carbohydrates",
      value: "carbohydrates",
      unit: "g",
      recommendedValue: 300,
    },
    {
      label: "Trans Fat",
      value: "transFat",
      unit: "g",
      recommendedValue: 2,
    },
    {
      label: "Saturated Fat",
      value: "saturatedFat",
      unit: "g",
      recommendedValue: 20,
    },
    {
      label: "Sodium",
      value: "sodium",
      unit: "mg",
      recommendedValue: 2300,
    },
    {
      label: "Iron",
      value: "iron",
      unit: "mg",
      recommendedValue: 18,
    },
    {
      label: "Calcium",
      value: "calcium",
      unit: "mg",
      recommendedValue: 1000,
    },
    {
      label: "Dietary Fiber",
      value: "dietaryFiber",
      unit: "g",
      recommendedValue: 25,
    },
  ],
};

export const comparisonData : ComparisonData = {
  "protein": {
    name: "Egg",
    label: "An egg has about 6 grams of protein.",
    value: "egg",
    weight: 6,
  },
  "addedSugars": {
    name: "Sugar Cube",
    label: "A sugar cube is about 5 grams.",
    value: "sugar-cube",
    weight: 5,
  },
  "carbohydrates": {
    name: "Banana",
    label: "A banana has about 27 grams of carbs.",
    value: "banana",
    weight: 27,
  },
  "dietaryFiber": {
    name: "Apple",
    label: "An apple has about 4.4 grams of fiber.",
    value: "apple",
    weight: 4.4,
  },
  "iron": {
    name: "Chick Peas (100g)",
    label: "Chick Peas has about 6 grams of iron.",
    value: "chick-peas",
    weight: 6,
  },
  "fat": {
    name: "Peanut Butter (2 tbsp)",
    label: "2 tablespoon of peanut butter has about 16 grams of fat.",
    value: "tablespoon",
    weight: 14,
  },
  "calcium": {
    name: "Milk",
    label: "A cup of milk has about 300 mg of calcium.",
    value: "milk",
    weight: 300,
  },
  "cholesterol": {
    name: "Egg",
    label: "An egg has about 186 mg of cholesterol.",
    value: "egg",
    weight: 186,
  },
  "transFat": {
    name: "Cookies",
    label: "Some cookies have about 1 gram of trans fat per serving.",
    value: "cookies",
    weight: 1,
  },

  "saturatedFat": {
    name: "Butter",
    label: "One tablespoon (about 14 grams) of butter has 7 grams of saturated fat.",
    value: "tablespoon",
    weight: 7,
  },

  "sodium": {
    name: "Water",
    label: "A cup of water has about 2300 mg of sodium.",
    value: "water",
    weight: 2300,
  },

  "energy": {
    name: "Apple",
    label: "A medium apple has about 95 calories.",
    value: "apple",
    weight: 95,
  },
};
