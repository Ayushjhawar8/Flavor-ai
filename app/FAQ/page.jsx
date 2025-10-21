"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

const faqs = [
  {
    question: "What is Flavor AI?",
    answer:
      "Flavor AI is an AI-powered recipe discovery platform that helps users find personalized meal ideas, ingredients, and cooking methods based on their preferences.",
  },
  {
    question: "How do I use Flavor AI to find recipes?",
    answer:
      "Simply enter your preferred ingredients, cuisine, or dish name, and Flavor AI will generate recipes that best match your taste and requirements.",
  },
  {
    question: "How are recipes generated / where does your data come from?",
    answer:
      "Our AI model curates and recommends recipes from trusted culinary databases and user preferences, ensuring accuracy and variety.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes, Flavor AI is completely free to use. Premium features may be introduced later to enhance personalization.",
  },
  {
    question: "Can I search recipes by ingredient or cuisine?",
    answer:
      "Yes! You can search recipes by typing in specific ingredients, cuisines, or even a type of dish. Flavor AI will instantly suggest creative and matching recipe ideas.",
  },
  {
    question: "Is there a limit to how many recipes I can view?",
    answer:
      "There’s no viewing limit. You can explore as many recipes as you like without restrictions.",
  },
  {
    question: "Can I use Flavor AI without cooking experience?",
    answer:
      "Absolutely! Flavor AI is designed for everyone—from beginners to home chefs. Recipes are easy to follow, with clear steps and simple ingredient lists.",
  },
  {
    question: "Can I exclude ingredients I dislike or am allergic to?",
    answer:
      "Yes, you can easily filter out ingredients you wish to avoid. Flavor AI tailors recipe recommendations to match your preferences and dietary restrictions.",
  },
  {
    question: "Can I generate meal plans for a week?",
    answer:
      "Yes! Using the Diet Planner AI, you can generate weekly meal plans based on your calorie goals, dietary restrictions, and cuisine preferences — making healthy eating easier than ever.",
  },
  {
    question: "How do I report an error or bug in a recipe?",
    answer:
      "You can use the 'Feedback & Support' section on the site to report any issue, and our team will review it promptly.",
  },
  {
    question: "Can I share recipes with friends or on social media?",
    answer:
      "Absolutely! You can share recipe links directly on social platforms or via messaging apps.",
  },
  {
    question: "Does Flavor AI support dietary preferences (vegan, keto, gluten-free)?",
    answer:
      "Yes, you can filter recipes based on dietary preferences like vegan, keto, and gluten-free options.",
  },
];

const FAQItem = ({ faq, isOpen, onClick }) => {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");
  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen]);
  return (
  <div
  className="rounded-2xl shadow-sm border border-base-300 overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
  style={{
    backgroundImage: 'linear-gradient(45deg, rgba(235, 163, 108, 0.3), rgba(246, 214, 170, 0.2), rgba(251, 225, 193, 0.2), rgba(255, 218, 179, 0.3), rgba(48, 21, 1, 0.2))',
  }}
>
    <button
  onClick={onClick}
  className={`w-full flex items-center justify-between p-4 text-lg font-semibold text-base-content cursor-pointer rounded-2xl focus:outline-none border transition-all duration-300 ease-in-out
    ${isOpen ? "text-primary bg-base-300 border-brown-500" : "border-brown-300 hover:border-brown-500 hover:bg-base-200"}`}
  aria-expanded={isOpen}
  type="button"
>
  {faq.question}
<div
  className="w-6 h-6 flex items-center justify-center rounded-full [background-image:linear-gradient(135deg,#3B1F0B,#ffffff)] transition-transform duration-300"
>
<ChevronDown
  strokeWidth={4} 
  className={`w-3 h-3 transition-transform duration-300 ${
    isOpen ? "rotate-180 text-white" : "text-white"
  }`}
/>
</div>



</button>

      <div
        ref={contentRef}
        style={{
          maxHeight,
          transition: "max-height 0.5s ease"
        }}
        className="px-6 overflow-hidden"
      >
        <p className={`text-base-content/80 py-4 leading-relaxed${isOpen ? "" : " hidden"}`}>
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <style>{`
        @keyframes smoothBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-smoothBounce {
          animation: smoothBounce 3s ease-in-out infinite;
        }
      `}</style>

      <div className="flex flex-col min-h-screen bg-base-300 ">
        <Navbar />
        <div className="relative mt-10"><BackButton /></div>
        <main className="flex-grow flex items-center justify-center p-4 mt-6 sm:p-6 lg:p-8 pt-32">
          <div className="w-full max-w-3xl bg-base-100 rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-300">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary">
                Frequently Asked <span className="text-orange-300">Questions</span>
              </h1>

              <h1 className="text-4xl text-orange-600 flex justify-center items-center mt-10 animate-smoothBounce">
                ❓
              </h1>

              <p
                className="font-semibold text-base-content/70 mt-8 mb-8 px-4 py-2 rounded-[25px] bg-[rgba(160,110,60,0.3)] backdrop-blur-md border border-[rgba(160,110,60,0.4)]"
              >
                Find quick answers to common questions about Flavor AI.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} isOpen={openIndex === i} onClick={() => toggle(i)} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FAQPage;
