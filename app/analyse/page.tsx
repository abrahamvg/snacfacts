import AddNutritionDropDown from "@/components/AddNutritionDropDown";
import NutritionalInfoTable from "@/components/NutritionalInfoTable/NutritionalInfoTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { nutrientsData } from "@/lib/constants";
import Image from "next/image";

export default function page() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-primary p-2">
        Analyse your Facts
      </h1>
      <div className="px-2">
        <Tabs defaultValue="nutritional-info" className="p-0 w-[100%]">
          <TabsList className="grid w-full grid-cols-2 p-0 m-0">
            <TabsTrigger
              value="nutritional-info"
              className="data-[state=active]:bg-white data-[state=active]:text-primary bg-neutral-100 rounded-none rounded-tl-md h-full"
            >
              Nutritional Info
            </TabsTrigger>
            <TabsTrigger
              value="ingredients-info"
              className="data-[state=active]:bg-white data-[state=active]:text-primary bg-neutral-100 rounded-none rounded-tr-md h-full"
            >
              Ingredients Info
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="nutritional-info"
            className="w-full bg-white m-0 p-4"
          >
            <div className="text-neutral-950 bg-neutral-50 w-full rounded-md p-4">
              <div className="flex flex-row justify-end gap-3 items-start">
                <div>
                  <Button className="bg-secondary rounded-full h-10 w-10 flex justify-center items-center p-0">
                    <Image
                      src={"/images/scan.svg"}
                      alt="scan"
                      width={20}
                      height={20}
                      className="w-6 mt-1"
                    />
                  </Button>
                </div>
                <div>
                  <AddNutritionDropDown data={nutrientsData.nutrients} />
                </div>
              </div>
              <NutritionalInfoTable />
            </div>
          </TabsContent>
          <TabsContent
            value="ingredients-info"
            className="w-full bg-white m-0 p-4"
          >
            bello
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
