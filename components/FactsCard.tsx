import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FactsCard() {
  return (
    <div className="text-neutral-950 bg-neutral-50 w-full rounded-md p-4 mt-4">
      <div className="flex flex-row justify-between items-start h-24">
        <h3 className="font-bold text-xl w-1/3 text-wrap">Facts Card</h3>
        <div>
          <Select>
            <SelectTrigger className="w-[120px] bg-transparent border-2 border-primary color-primary">
              <SelectValue defaultValue="feedback" placeholder="Feedback" />
            </SelectTrigger>
            <SelectContent className="" align="end">
              <SelectItem value="feedback">Feedback</SelectItem>
              <SelectItem value="visualise">Visualise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="content mt-4"></div>
    </div>
  );
}
