import type { Metadata } from "next";
import { Satoshi } from "@/fonts/fonts";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { NutritionProvider } from "@/hooks/useNutritionHook";
import { DropDownDataProvider } from "@/hooks/useDropDownData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export const metadata: Metadata = {
  title: "SnacFacts",
  description: "Just a normal app to find the hiddent facts about your snacks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <NutritionProvider>
        <DropDownDataProvider>
          <body className={`${Satoshi.className} relative`}>
            <Navbar/>
            {children}
            <Analytics />
            <Footer/>
          </body>
        </DropDownDataProvider>
      </NutritionProvider>
    </html>
  );
}
