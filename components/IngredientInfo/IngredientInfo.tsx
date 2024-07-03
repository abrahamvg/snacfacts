import React from "react";
import ScanImageButton from "../ScanImageButton";
import { Textarea } from "../ui/textarea";

export default function IngredientInfo({
  ingredients,
  setIngredients,
}: {
  ingredients: string;
  setIngredients: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div>
      <div>
        <Textarea
          className="bg-white mt-4 text-base"
          placeholder="Enter Ingredients in comma sperated format"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows={8}
        />
      </div>
      <div className="mt-4">
        <div className="max-h-[120px] overflow-y-auto flex flex-wrap text-[10px] gap-x-1 gap-y-2">
          {ingredients.length > 0 ? (
            ingredients.split(/,\s*(?![^()]*\))/).map(
              (ingredient, index) =>
                ingredient.trim().length > 0 && (
                  <div
                    key={index}
                    className="px-2 py-1 bg-muted/25 border-primary border rounded-full"
                  >
                    {ingredient}
                  </div>
                )
            )
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
