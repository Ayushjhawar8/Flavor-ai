"use client";

import BackButton from "@/components/BackButton";
import { PlusIcon } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ideas = [
    {
        name: "Budget Bowl",
        description: "Quick healthy meals under budget",
        link: "/app/budgetbowl",
        image:"https://www.google.com/imgres?q=budgetbowl%20images&imgurl=https%3A%2F%2Fsteamykitchen.com%2Fwp-content%2Fuploads%2F2023%2F09%2Fgreen-goddess-tofu-bowl-recipe.jpg&imgrefurl=https%3A%2F%2Fsteamykitchen.com%2F248533-the-best-healthy-budget-buddha-bowl-recipes-under-5.html&docid=x9v5WB23LHEORM&tbnid=5Y-xgBy2snL7yM&vet=12ahUKEwi3lLTywt2OAxXHUPUHHQnrGoMQM3oECC8QAA..i&w=520&h=650&hcb=2&ved=2ahUKEwi3lLTywt2OAxXHUPUHHQnrGoMQM3oECC8QAA",        
    },
];
export default function Page(){
    return(
        <div classname="flex flex-col items-center p-8">
            <BackButton/>
            <h1 classname="text-4xl font-bold mb-6"> Explore meal ideas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {ideas.map((idea) => (
          <div key={idea.name} className="relative bg-white rounded-xl shadow-lg p-4">
            <Image
              src={idea.image}
              alt={idea.name}
              width={400}
              height={250}
              className="rounded-md object-cover"
            />
            <h2 className="text-2xl font-semibold mt-4">{idea.name}</h2>
            <p className="text-gray-600 mb-2">{idea.description}</p>
            <Link
              href={idea.link}
              className="inline-flex items-center text-blue-600 font-semibold hover:underline"
            >
              <PlusIcon className="mr-1" />
              Explore
            </Link>
          </div>
        ))}
      </div>
        </div>
    );
}