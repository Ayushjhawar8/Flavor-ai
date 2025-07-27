"use client";

import BackButton from "@/components/BackButton";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center p-8">
      <BackButton />
      <h1 className="text-4xl font-bold mb-4">Budget Bowl</h1>
      <Image
        src="/images/budgetbowl.png"
        alt="Budget Bowl"
        width={600}
        height={400}
        className="rounded-md mb-4"
      />
      <p className="text-lg text-gray-700 max-w-3xl text-center">
        Budget Bowl focuses on meals that are cost-effective, healthy, and easy to make with minimal ingredients. By@kritigupta
      </p>
    </div>
  );
}
