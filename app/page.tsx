"use client";

import { Button } from "@/components/ui/button";
import GlowBall from "@/components/ui/glowBall";
import { literata, literataItalic } from "@/fonts/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col bg-background h-[75vh]">
        <div
          className="flex flex-col justify-center gap-10 items-center h-full"
          style={{
            background:
              "radial-gradient(55.96% 58.05% at 48.47% 38.79%, rgba(143, 213, 101, 0.58) 0%, #378E3C 100%)",
          }}
        >
          <div className="text-3xl font-medium text-neutral-100 text-center flex flex-col gap-2 justify-center items-center">
            <span className="block">Uncovering</span>
            <span
              className={`text-5xl ${literataItalic.className} italic block`}
            >
              Hidden Facts
            </span>
            <span className="block text-4xl">
              from your fav
              <span className={`${literataItalic.className} italic`}>
                {" "}
                snacks
              </span>
            </span>
          </div>
          <Link href={"/analyse"}>
            <Button
              className="mx-auto w-40 text-[18px] bg-background-250 rounded-full"
              size={"lg"}
            >
              Try it out
            </Button>
          </Link>
        </div>
      </main>
      <section className="flex min-h-screen flex-col py-8 bg-background mb-24">
        <div className="w-full text-center">
          <h2 className={`text-[44px] ${literata.className} mb-12`}>
            {" "}
            Features
          </h2>
          <div className="space-y-8 overflow-x-clip">
            <div className="flex flex-row justify-end gap-4 h-64 relative ">
              <div className="feature bg-white rounded-3xl absolute z-10 p-1 -left-[16%] top-1/2 -translate-y-1/2 w-fit h-fit">
                <Image
                  src={"/images/feature1.png"}
                  width={1000}
                  height={1000}
                  alt="feature1"
                  className="rounded-3xl h-64 w-fit"
                />
              </div>
              <GlowBall size={400} className="-top-[4rem] -left-[6rem]" />
              <div className="description w-40 h-full rounded-md mr-4 flex flex-col items-center justify-center text-left relative z-10">
                <h4 className="text-2xl font-bold w-full">SnacAnalyse</h4>
                <p className="text-base font-light">
                  Analyse nutritional information to get meaningful information
                  about the ingredients used in the food product
                </p>
              </div>
            </div>
            <div className="flex justify-between gap-4 h-64 flex-row-reverse relative">
              <div className="feature bg-white w-1/2 h-full rounded-l-3xl relative z-10 text-black flex flex-col justify-center items-center">
                In Process
              </div>
              <GlowBall size={400} className="-top-[4rem] -right-[8rem]" />
              <div className="description w-1/2 h-full rounded-md ml-4 flex flex-col items-center justify-center text-left  relative z-10">
                <h4 className="text-2xl font-bold w-full">NutriVisualise</h4>
                <p className="text-base font-light">
                  Visualize the amount of nutrition by comparing it with easy to
                  visualize objects
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
