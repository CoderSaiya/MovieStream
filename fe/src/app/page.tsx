"use client";

import { AOSInit } from "@/components/AOSInit";
import { Banner } from "@/components/Banner";
import { Features } from "@/components/Features";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <AOSInit />
      <main>
        <Banner />
        <Features />
      </main>
    </div>
  );
}
