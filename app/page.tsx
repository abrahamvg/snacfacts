import Header from "@/components/Header";
import NutritionInfoTable from "@/components/NutritionInfoTable";
import { NutritionProvider} from "@/providers/dataProvider";

export default function Home() {
  return (
    <NutritionProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-8 px-4 bg-background">
        {/* <Header/> */}
        <NutritionInfoTable />
      </main>
    </NutritionProvider>
  );
}
