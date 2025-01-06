"use client";

import { AOSInit } from "@/components/AOSInit";
export default function Home() {

  return (
    <div className="flex min-h-screen flex-col">
      <AOSInit />
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          </div>
        </div>
      </main>
    </div>
  );
}
