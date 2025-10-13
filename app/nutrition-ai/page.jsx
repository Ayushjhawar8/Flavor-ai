"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NutritionAI from "@/components/NutritionAI";
import BackButton from "@/components/BackButton";

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen py-10 bg-base-100 flex flex-col mt-20 justify-center items-center relative transition-all duration-300">
        <div className="no-print w-full max-w-4xl px-4">
          <BackButton />

          <NutritionAI />
        </div>
      </div>

      <Footer />
    </>
  );
}
