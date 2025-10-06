// app/about/page.tsx

"use client";

import React from 'react';
import Navbar from '@/components/Navbar'; // <-- 1. Import Navbar
import Footer from '@/components/Footer'; // <-- 2. Import Footer

const AboutUsPage = () => {
  return (
    // 3. Add a main wrapper div
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      
      {/* 4. Add the Navbar at the top */}
      <Navbar />

      <main className="flex-grow text-zinc-900 dark:text-zinc-200 pt-16">
        
        {/* Hero Section */}
        <section 
          className="relative flex min-h-[60vh] items-center justify-center bg-cover bg-center py-20 text-white" 
          style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg")` }}
        >
          <div className="absolute inset-0 bg-zinc-900/20 dark:bg-zinc-900/40"></div>
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl font-display">
              Blending Code and Cuisine
            </h1>
            <p className="mt-6 text-lg text-zinc-200">
              At Flavor AI, we're on a mission to revolutionize the culinary world by harnessing the power of artificial intelligence. We believe that technology can unlock new dimensions of flavor, creativity, and accessibility in cooking.
            </p>
          </div>
        </section>

        {/* Our Journey Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl font-display">Our Journey</h2>
                <p className="mt-4 text-lg font-bold text-zinc-700 dark:text-zinc-300">From Kitchen Dreams to AI-Powered Reality</p>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  Our story began with a shared passion for food and technology. A group of chefs and coders, united by a vision to bridge the gap between culinary artistry and artificial intelligence, embarked on a journey to create Flavor AI. We envisioned a platform that could not only inspire home cooks with innovative recipes but also empower them with the tools to personalize their culinary experiences.
                </p>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
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
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl font-display">Our Philosophy</h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
                At Flavor AI, we are guided by a set of core values that drive our work and shape our vision for the future of food. These principles reflect our commitment to innovation, community, and accessibility.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-background-dark">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">lightbulb</span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-zinc-900 dark:text-white font-display">Innovation</h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">We constantly explore new frontiers in culinary AI, pushing the boundaries of what's possible in the kitchen.</p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-background-dark">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">group</span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-zinc-900 dark:text-white font-display">Community</h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">We foster a vibrant community of food enthusiasts, chefs, and developers, collaborating to shape the future of food.</p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-background-dark">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">code</span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-zinc-900 dark:text-white font-display">Open Source</h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">We believe in transparency and collaboration, making our core technology open and accessible to all.</p>
                </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 py-16 dark:bg-primary/10 sm:py-24">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl font-display">Help Us Shape the Future of Food</h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">Join our community and contribute to the next wave of culinary innovation.</p>
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