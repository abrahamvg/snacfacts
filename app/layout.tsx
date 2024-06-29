import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Copernicus } from "@/fonts/fonts";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { NutritionProvider } from "@/hooks/useNutritionHook";
import { DropDownDataProvider } from "@/hooks/useDropDownData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <body className={Copernicus.className}>
            {children}
            <Analytics />
          </body>
        </DropDownDataProvider>
      </NutritionProvider>
    </html>
  );
}
