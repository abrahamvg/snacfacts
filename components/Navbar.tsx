import { literata } from "@/fonts/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div
      className={cn(
        "w-full max-w-5xl items-center justify-between text-sm lg:flex",
        literata.className
      )}
    >
      <Link href={"/"} >
        <p className="z-30 fixed left-0 top-0 flex w-full justify-center bg-[#1c5f20]/50 py-4 backdrop-blur-2xl text-2xl font-semibold">
          snacfacts
        </p>
      </Link>
    </div>
  );
}
