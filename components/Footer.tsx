import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="text-center text-neutral-300 bg-background-250 p-4 text-sm">
        Crafted by{" "}
        <Link href="https://abrahamvg.in/" className="italic" target="_blank">
          abrahamvg
        </Link>
      </footer>
    </div>
  );
}
