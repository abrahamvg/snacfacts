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

export type ComparisonData = {
  [key: string]: {
    name: string;
    label: string;
    value: string;
    weight: number;
  };
}
