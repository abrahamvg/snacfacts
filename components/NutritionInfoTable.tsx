import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AddNutritionDropDown from "./AddNutritionDropDown";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useNutrition } from "@/hooks/useNutritionHook";
import {nutrientsData} from "@/providers/constants"
import { Label } from "@radix-ui/react-select";

export default function NutritionInfoTable({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { nutritionalData, setNutritionalData } = useNutrition();

  const changeTableData = (label: string, newValue: number) => {
    setNutritionalData((prevTableData) =>
      prevTableData.map((data) =>
        data.nutrientInfo.label === label ? { ...data, value: newValue } : data
      )
    );
  };

  return (
    <div className="text-neutral-950 bg-neutral-50 w-full rounded-md p-4">
      <div className="flex flex-row justify-between items-start h-24">
        <h3 className="font-bold text-xl w-1/3 text-wrap">Nutrition Info</h3>
        <div>
          <AddNutritionDropDown data={nutrientsData.nutrients} />
        </div>
      </div>
      <div className="content mt-4">
        <div className="h-64 overflow-y-auto masked-overflow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-3/4">Nutrition</TableHead>
              <TableHead className="w-1/4 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nutritionalData.map((nutrient) => {
              return (
                <TableRow key={nutrient.nutrientInfo.value}>
                  <TableCell className="w-3/4">
                    {nutrient.nutrientInfo.label +
                      " (" +
                      nutrient.nutrientInfo.unit +
                      ")"}
                  </TableCell>
                  <TableCell className="w-1/4 text-right">
                    <Input
                      type="number"
                      value={nutrient.value}
                      placeholder="Enter weight"
                      className="placeholder:text-neutral-950 px-2 text-right"
                      onChange={(e) =>
                        changeTableData(
                          nutrient.nutrientInfo.label,
                          Number(e.target.value)
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </div>
        <div>
          <Label></Label>
        <Input id="servingSize" type="text" placeholder="100g" className="w-20 text-right mt-4" />
        </div>
        <Button
          className="w-full mt-4 bg-transparent text-primary border-primary border-2 hover:bg-primary hover:text-neutral-50"
          onClick={() => setOpen(true)}
        >
          Track
        </Button>
      </div>
    </div>
  );
}
