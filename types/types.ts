export type NutrientsData = {
  nutrients: Nutrient[];
};

export type TableDataEntry = {
  nutrientInfo: Nutrient;
  value: number;
};

export type FeedbackDataEntry = {
  nutrientInfo: Nutrient;
  feedback: string;
  percentage: number;
};

export type Nutrient = {
  label: string;
  value: string;
  unit: string;
  recommendedValue: number;
};
