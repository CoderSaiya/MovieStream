"use client";

import { AOSInit } from "@/components/AOSInit";
import { Banner } from "@/components/Banner";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <AOSInit />
      <main>
        <Banner />
      </main>
    </div>
  );
}
