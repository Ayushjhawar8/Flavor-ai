// app/about/page.tsx

"use client";

import Footer from '@/components/Footer'; // <-- 2. Import Footer
import Navbar from '@/components/Navbar'; // <-- 1. Import Navbar
import React, { useEffect, useState } from 'react';

const AboutUsPage = () => {
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
  return (
    // 3. Add a main wrapper div
    <div className={`flex flex-col min-h-screen ${currentTheme === 'dark' ? 'bg-base-100' : 'bg-white'}`}>
      
      {/* 4. Add the Navbar at the top */}
      <Navbar />

      <main className={`flex-grow pt-16 ${currentTheme === 'dark' ? 'text-base-content' : 'text-gray-900'}`}>
        
        {/* Hero Section */}
        <section 
          className="relative flex min-h-[60vh] items-center justify-center bg-cover bg-center py-20 text-white" 
          style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url("https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg")` }}
        >
          <div className={`absolute inset-0 ${currentTheme === 'dark' ? 'bg-black/50' : 'bg-black/30'}`}></div>
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl font-display text-white drop-shadow-lg">
              Blending Code and Cuisine
            </h1>
            <p className="mt-6 text-lg text-gray-100 drop-shadow-md">
              At Flavor AI, we're on a mission to revolutionize the culinary world by harnessing the power of artificial intelligence. We believe that technology can unlock new dimensions of flavor, creativity, and accessibility in cooking.
            </p>
          </div>
        </section>

        {/* Our Journey Section */}
        <section className={`py-16 sm:py-24  ${currentTheme === 'dark' ? 'bg-base-300' : 'bg-amber-50'}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <h2 className={`text-5xl font-bold tracking-tight sm:text-6xl font-display ${currentTheme === 'dark' ? 'text-base-content' : 'text-gray-900'}`}>Our Journey</h2>
                <p className={`mt-5 text-2xl font-semibold leading-relaxed ${currentTheme === 'dark' ? 'text-base-content/90' : 'text-gray-800'}`}>From Kitchen Dreams to AI-Powered Reality</p>
                <p className={`mt-6 text-lg sm:text-xl leading-8 ${currentTheme === 'dark' ? 'text-base-content/80' : 'text-gray-700'}`}>
                  Our story began with a shared passion for food and technology. A group of chefs and coders, united by a vision to bridge the gap between culinary artistry and artificial intelligence, embarked on a journey to create Flavor AI. We envisioned a platform that could not only inspire home cooks with innovative recipes but also empower them with the tools to personalize their culinary experiences.
                </p>
                <p className={`mt-6 text-lg sm:text-xl leading-8 ${currentTheme === 'dark' ? 'text-base-content/80' : 'text-gray-700'}`}>
                  Through countless hours of development, testing, and tasting, we transformed our dream into a reality, bringing the magic of AI to the heart of the kitchen.
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <img alt="Team working in a kitchen" className="w-full rounded-xl object-cover shadow-lg" src="https://images.pexels.com/photos/2977515/pexels-photo-2977515.jpeg" />
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className={`py-16 sm:py-24 ${currentTheme === 'dark' ? 'bg-base-200' : 'bg-base-100'}`}>
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="text-center">
              <h2 className={`text-5xl font-bold tracking-tight sm:text-6xl font-display ${currentTheme === 'dark' ? 'text-base-content' : 'text-gray-900'}`}>Our Philosophy</h2>
              <p className={`mx-auto mt-6 max-w-3xl text-xl sm:text-2xl leading-relaxed ${currentTheme === 'dark' ? 'text-base-content/70' : 'text-gray-700'}`}>
                At Flavor AI, we are guided by a set of core values that drive our work and shape our vision for the future of food. These principles reflect our commitment to innovation, community, and accessibility.
              </p>
            </div>
            <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3">
                <div className={`rounded-2xl border p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300 ${currentTheme === 'dark' ? 'border-base-300 bg-base-200' : 'border-gray-200 bg-white'}`}>
                    <div className={`flex h-20 w-20 items-center justify-center rounded-2xl mb-8 ${currentTheme === 'dark' ? 'bg-gradient-to-br from-amber-900/20 to-orange-900/20 text-amber-400' : 'bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600'}`}>
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M5.143 14A7.8 7.8 0 0 1 4 9.919C4 5.545 7.582 2 12 2s8 3.545 8 7.919A7.8 7.8 0 0 1 18.857 14M7.383 17.098c-.092-.276-.138-.415-.133-.527a.6.6 0 0 1 .382-.53c.104-.041.25-.041.54-.041h7.656c.291 0 .436 0 .54.04a.6.6 0 0 1 .382.531c.005.112-.041.25-.133.527c-.17.511-.255.767-.386.974a2 2 0 0 1-1.2.869c-.238.059-.506.059-1.043.059h-3.976c-.537 0-.806 0-1.043-.06a2 2 0 0 1-1.2-.868c-.131-.207-.216-.463-.386-.974M15 19l-.13.647c-.14.707-.211 1.06-.37 1.34a2 2 0 0 1-1.113.912C13.082 22 12.72 22 12 22s-1.082 0-1.387-.1a2 2 0 0 1-1.113-.913c-.159-.28-.23-.633-.37-1.34L9 19"/>
                          <path d="m12.308 12l-1.461-4.521A.72.72 0 0 0 10.154 7a.72.72 0 0 0-.693.479L8 12m7-5v5m-6.462-1.5h3.231"/>
                        </svg>
                    </div>
                    <h3 className={`text-2xl font-bold font-display mb-4 ${currentTheme === 'dark' ? 'text-base-content' : 'text-gray-900'}`}>Innovation</h3>
                    <p className={`text-lg leading-relaxed ${currentTheme === 'dark' ? 'text-base-content/80' : 'text-gray-700'}`}>We constantly explore new frontiers in culinary AI, pushing the boundaries of what's possible in the kitchen.</p>
                </div>
                <div className={`rounded-2xl border p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300 ${currentTheme === 'dark' ? 'border-base-300 bg-base-200' : 'border-gray-200 bg-white'}`}>
                    <div className={`flex h-20 w-20 items-center justify-center rounded-2xl mb-8 ${currentTheme === 'dark' ? 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20 text-blue-400' : 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600'}`}>
                        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 28 28">
                          <path d="M8.5 3.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5ZM4.75 5.75a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0ZM2 12.982C2 11.887 2.887 11 3.982 11h5.6a4.728 4.728 0 0 0-.326 1.5H3.982a.482.482 0 0 0-.482.482v.393c0 .172.002 1.213.607 2.197c.52.844 1.554 1.759 3.753 1.907a2.993 2.993 0 0 0-1.136 1.368c-2.005-.371-3.207-1.372-3.894-2.49C2 15.01 2 13.618 2 13.378v-.395ZM18.417 11c.186.468.3.973.326 1.5h5.275c.266 0 .482.216.482.482v.393c0 .172-.002 1.213-.608 2.197c-.519.844-1.552 1.759-3.752 1.907c.505.328.904.805 1.136 1.368c2.005-.371 3.207-1.372 3.894-2.49c.83-1.348.83-2.74.83-2.98v-.395A1.982 1.982 0 0 0 24.018 11h-5.6ZM19.5 3.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5Zm-3.75 2.25a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0ZM7.5 19.982C7.5 18.887 8.387 18 9.482 18h9.036c1.095 0 1.982.887 1.982 1.982v.395c0 .24 0 1.632-.83 2.98C18.8 24.773 17.106 26 14 26s-4.8-1.228-5.67-2.642c-.83-1.349-.83-2.74-.83-2.981v-.395Zm1.982-.482a.482.482 0 0 0-.482.482v.393c0 .172.002 1.213.607 2.197c.568.922 1.749 1.928 4.393 1.928c2.644 0 3.825-1.006 4.392-1.928c.606-.983.608-2.025.608-2.197v-.393a.482.482 0 0 0-.482-.482H9.482Zm2.268-6.75a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0ZM14 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 14 9Z"/>
                        </svg>
                    </div>
                    <h3 className={`text-2xl font-bold font-display mb-4 ${currentTheme === 'dark' ? 'text-base-content' : 'text-gray-900'}`}>Community</h3>
                    <p className={`text-lg leading-relaxed ${currentTheme === 'dark' ? 'text-base-content/80' : 'text-gray-700'}`}>We foster a vibrant community of food enthusiasts, chefs, and developers, collaborating to shape the future of food.</p>
                </div>
                <div className={`rounded-2xl border p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300 ${currentTheme === 'dark' ? 'border-base-300 bg-base-200' : 'border-gray-200 bg-white'}`}>
                    <div className={`flex h-20 w-20 items-center justify-center rounded-2xl mb-8 ${currentTheme === 'dark' ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 text-green-400' : 'bg-gradient-to-br from-green-100 to-emerald-100 text-green-600'}`}>
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M15.157 20.136c.211.51.8.757 1.284.492a9.25 9.25 0 1 0-8.882 0c.484.265 1.073.018 1.284-.492l1.358-3.28c.212-.51-.043-1.086-.478-1.426a3.7 3.7 0 1 1 4.554 0c-.435.34-.69.916-.478 1.426z"/>
                        </svg>
                    </div>
                    <h3 className={`text-2xl font-bold font-display mb-4 ${currentTheme === 'dark' ? 'text-base-content' : 'text-gray-900'}`}>Open Source</h3>
                    <p className={`text-lg leading-relaxed ${currentTheme === 'dark' ? 'text-base-content/80' : 'text-gray-700'}`}>We believe in transparency and collaboration, making our core technology open and accessible to all.</p>
                </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-16 sm:py-24 ${currentTheme === 'dark' ? 'bg-primary/10' : 'bg-base-200'}`}>
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl font-display ${currentTheme === 'dark' ? 'text-base-content' : 'text-gray-900'}`}>Help Us Shape the Future of Food</h2>
            <p className={`mt-4 text-lg ${currentTheme === 'dark' ? 'text-base-content/70' : 'text-gray-700'}`}>Join our community and contribute to the next wave of culinary innovation.</p>
            <a className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 text-base font-bold text-white shadow-lg transition-transform hover:scale-105" href="https://github.com/Ayushjhawar8/Flavor-ai" target="_blank" rel="noopener noreferrer">
              Contribute on GitHub
            </a>
          </div>
        </section>
      </main>

      {/* 5. Add the Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default AboutUsPage;