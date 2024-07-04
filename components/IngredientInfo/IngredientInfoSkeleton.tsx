import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function IngredientInfoSkeleton() {
  return (
    <div className="mt-4">
      <Skeleton className="w-full h-[200px] rounded-md " />
      <div className="flex flex-wrap flex-row mt-4 gap-x-1 gap-y-2">
      <Skeleton className="w-[31%] h-[20px] rounded-md " />
      <Skeleton className="w-[45%] h-[20px] rounded-md " />
      <Skeleton className="w-1/5 h-[20px] rounded-md " />
      </div>
    </div>
  );
}
