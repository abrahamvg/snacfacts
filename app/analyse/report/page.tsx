"use client";

import React, { useEffect } from "react";
import { getScore } from "@/lib/geminiAPI";

export default function Page() {
  useEffect(() => {
    const result = async () => {
    //   const a = await getScore();  
    //   console.log(await JSON.parse(a));
    };
    result();

    return () => {};
  }, []);
  return <div>Page</div>;
}
