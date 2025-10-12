"use client"; // Required for using hooks like useState

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
  {
    question: "What is Flavor AI?",
    answer:
      "Flavor AI is an AI-powered recipe discovery platform that helps users find personalized meal ideas, ingredients, and cooking methods based on their preferences."
  },
  {
    question: "How do I use Flavor AI to find recipes?",
    answer:
      "Simply enter your preferred ingredients, cuisine, or dish name, and Flavor AI will generate recipes that best match your taste and requirements."
  },
  {
    question: "How are recipes generated / where does your data come from?",
    answer:
      "Our AI model curates and recommends recipes from trusted culinary databases and user preferences, ensuring accuracy and variety."
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes, Flavor AI is completely free to use. Premium features may be introduced later to enhance personalization."
  },
  {
    question: "Can I search recipes by ingredient or cuisine?",
    answer:
      "Yes! You can search recipes by typing in specific ingredients, cuisines, or even a type of dish. Flavor AI will instantly suggest creative and matching recipe ideas."
  },
  {
    question: "Is there a limit to how many recipes I can view?",
    answer:
      "There’s no viewing limit. You can explore as many recipes as you like without restrictions."
  },
  {
    question: "Can I use Flavor AI without cooking experience?",
    answer:
      "Absolutely! Flavor AI is designed for everyone—from beginners to home chefs. Recipes are easy to follow, with clear steps and simple ingredient lists."
  },
  {
    question: "Can I exclude ingredients I dislike or am allergic to?",
    answer:
      "Yes, you can easily filter out ingredients you wish to avoid. Flavor AI tailors recipe recommendations to match your preferences and dietary restrictions."
  },
   {
    question: "Can I generate meal plans for a week?",
    answer:
      "Yes! Using the Diet Planner AI, you can generate weekly meal plans based on your calorie goals, dietary restrictions, and cuisine preferences — making healthy eating easier than ever."
  },
  {
    question: "How do I report an error or bug in a recipe?",
    answer:
      "You can use the 'Feedback & Support' section on the site to report any issue, and our team will review it promptly."
  },
  {
    question: "Can I share recipes with friends or on social media?",
    answer:
      "Absolutely! You can share recipe links directly on social platforms or via messaging apps."
  },
  {
    question: "Does Flavor AI support dietary preferences (vegan, keto, gluten-free)?",
    answer:
      "Yes, you can filter recipes based on dietary preferences like vegan, keto, and gluten-free options."
  }

];

  return (
    <div className="flex flex-col min-h-screen bg-base-300">
      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <div className="relative mt-10">
        <BackButton />
      </div>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 pt-32">
        <div className="w-full max-w-3xl bg-base-100 rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-300 ease-in-out">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary">Frequently Asked Questions</h1>
            <p className="text-base-content/70 mt-2">
              Find quick answers to common questions about Flavor-AI.
            </p>
          </div>

          {/* FAQ Accordion Section */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="collapse collapse-arrow bg-base-200 rounded-2xl shadow-sm border border-base-300"
              >
                <input
                  type="checkbox"
                  checked={openIndex === index}
                  onChange={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="peer"
                  readOnly
                />
                <div className="collapse-title text-lg font-semibold text-base-content flex items-center justify-between cursor-pointer">
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FAQPage;
