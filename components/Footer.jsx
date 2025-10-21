"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { FaCode, FaHeart } from "react-icons/fa";

const Footer = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
    return () => observer.disconnect();
  }, []);

  const textColor = currentTheme === 'dark' ? 'text-base-content' : 'text-base-content';

  

  const sections = [
    {
      title: "✨ Features",
      links: [
        { label: "🤖 AI Recipe Generator", href: "/ai-recipe-generator" },
        { label: "📋 Diet Planner", href: "/diet-planner-ai" },
        { label: "🔍 Recipe Search", href: "/recipe-search" },
        { label: "📤 Upload Recipe", href: "/upload-recipe-new" },
      ],
    },
    {
      title: "🧭 Explore",
      links: [
        { label: "🥕 Ingredient Explorer", href: "/ingredient-explorer" },
        { label: "🔗 Ingredient Similarity", href: "/ingredient-similarity" },
        { label: "🎲 Random Recipe", href: "/random" },
        { label: "❤️ Favorites", href: "/favorite" },
      ],
    },
    {
      title: "👥 Community",
      links: [
        { label: "🍽️ Community Recipes", href: "/community" },
        { label: "🎉 Festive Recipes", href: "/festive" },
        { label: "🥬 Vegetarian Recipes", href: "/category/Vegetarian" },
        { label: "🍰 Dessert Recipes", href: "/festive" },
      ],
    },
    {
      title: "🛠️ Tools & Support",
      links: [
        { label: "🛒 Shopping List", href: "/shopping-list" },
        { label: "✉️ Feedback & Support", href: "/feedback" },
        { label: "📖 About Us", href: "/about" },
        { label: "📞 Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className={`mt-auto relative overflow-hidden ${currentTheme === 'dark' ? 'bg-base-100' : 'bg-base-100'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Brand Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-focus mb-6 shadow-lg">
            <span className="text-3xl">🍱</span>
          </div>
          <h3 className={`text-5xl font-bold ${textColor} tracking-tight mb-4 bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent`}>
            Flavor AI
          </h3>
          <p className={`${textColor} opacity-80 text-xl max-w-3xl mx-auto leading-relaxed`}>
            Your AI-powered culinary companion for recipes, nutrition, meal planning & more. 
            <br className="hidden sm:block" />
            <span className="text-primary font-semibold">Blending technology with taste</span>
          </p>
        </div>

        {/* Horizontal Links Grid */}
        <div className={`${currentTheme === 'dark' ? 'bg-base-200 border border-base-300' : 'bg-base-200 border border-base-300'} backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-16`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sections.map(({ title, links }, index) => (
              <div key={title} className="space-y-4">
                <h4 className={`font-bold text-lg ${textColor} border-b ${currentTheme === 'dark' ? 'border-base-300' : 'border-base-300'} pb-2`}>
                  {title}
                </h4>
                <ul className="space-y-2">
                  {links.map(({ label, href }, linkIndex) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className={`${textColor} opacity-80 hover:opacity-100 text-sm transition-all duration-300 hover:text-primary hover:translate-x-1 inline-block`}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t ${currentTheme === 'dark' ? 'border-base-300' : 'border-base-300'} pt-8`}>
          {/* Social Media & Legal Links Row */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-8">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className={`${textColor} text-sm font-medium`}>Connect:</span>
              <SocialLinks currentTheme={currentTheme}/>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { label: "About Us", href: "/about" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Contact", href: "/contact" },
                {label: "FAQ", href: "/FAQ" }
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`${textColor} opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300 hover:underline`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Creator Info & Copyright Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <div className={`${textColor} flex items-center gap-2`}>
              <span>Created with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>by</span>
              <a
                href="https://x.com/itsAyushJ"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:text-primary-focus transition-colors duration-300 hover:underline"
              >
                Ayush Jhawar
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="mailto:ayushjhawar499@gmail.com"
                className={`${textColor} opacity-70 hover:opacity-100 transition-all duration-300 hover:text-primary hover:underline flex items-center gap-1`}
              >
                <span>📧</span>
                <span>Contact</span>
              </a>
              <div className={`${textColor} opacity-60 flex items-center gap-1`}>
                <FaCode className="text-primary" />
                <span>&copy; {new Date().getFullYear()} Flavor AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
