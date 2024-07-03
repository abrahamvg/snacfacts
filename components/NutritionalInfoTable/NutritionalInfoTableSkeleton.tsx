import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function NutritionalInfoTableSkeleton() {
  return (
    <div className="mt-4">
      <div className="space-y-2">
        <Skeleton className="w-full h-[32px] rounded-md" />
        <Skeleton className="w-full h-[32px] rounded-md" />
        <Skeleton className="w-full h-[32px] rounded-md" />
      </div>
    </div>
  );
}
