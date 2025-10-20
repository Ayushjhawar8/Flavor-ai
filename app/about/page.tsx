'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';

const AboutUsPage = () => {
  const [currentTheme, setCurrentTheme] = useState('light');

  // dynamic tab title
  
    useEffect(()=>{
      document.title='Flavor AI-About Us'
    },[])
  

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setCurrentTheme(document.documentElement.getAttribute('data-theme') || 'light');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    setCurrentTheme(document.documentElement.getAttribute('data-theme') || 'light');
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`flex flex-col min-h-screen ${currentTheme === 'dark' ? 'bg-base-100 text-base-content' : 'bg-white text-gray-900'}`}>
      <Navbar />

      <main className={`flex-grow pt-16 ${currentTheme === 'dark' ? 'text-base-content' : 'text-gray-900'}`}>

        {/* Hero Section */}
        <section
          className="relative flex min-h-[60vh] items-center justify-center bg-cover bg-center py-20 text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url("https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg")`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-extrabold font-display tracking-tight sm:text-6xl lg:text-7xl">
              Blending Code and Cuisine
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-100 drop-shadow-md">
              At Flavor AI, we merge food artistry and technology to craft intelligent culinary experiences.
            </p>
          </div>
        </section>

        {/* Our Journey */}
        <section className={`py-16 sm:py-24 ${currentTheme === 'dark' ? 'bg-base-300' : 'bg-amber-50'}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-5xl font-bold font-display ${currentTheme === 'dark' ? 'text-base-content' : 'text-gray-900'}`}>
                Our Journey
              </h2>
              <p className={`mt-4 text-2xl font-semibold ${currentTheme === 'dark' ? 'text-base-content/90' : 'text-gray-800'}`}>
                From Kitchen Dreams to AI Reality
              </p>
              <p className={`mt-6 text-lg ${currentTheme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                We began as chefs and coders driven by a shared vision — to bring AI into the kitchen. After countless nights of testing, debugging, and tasting, Flavor AI came to life.
              </p>
              <p className={`mt-6 text-lg ${currentTheme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                Our mission continues to be simple: empower creativity and personalization in every dish.
              </p>
            </div>
            <div>
              <img
                alt="AI team cooking"
                className="w-full rounded-2xl shadow-xl object-cover"
                src="https://images.pexels.com/photos/2977515/pexels-photo-2977515.jpeg"
              />
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className={`py-16 sm:py-24 ${currentTheme === 'dark' ? 'bg-base-200' : 'bg-base-100'}`}>
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 text-center">
            <h2 className={`text-5xl font-display font-bold ${currentTheme === 'dark' ? 'text-base-content' : 'text-gray-900'}`}>
              Our Philosophy
            </h2>
            <p className={`mt-6 max-w-3xl mx-auto text-xl sm:text-2xl leading-relaxed ${currentTheme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              We’re guided by principles that define our pursuit of culinary innovation—pushing boundaries, fostering connection, and embracing openness.
            </p>

            {/* Animated Cards */}
            <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3">

              {/* Card 1 - Innovation */}
              <div className={`relative group overflow-hidden rounded-2xl border shadow-xl transition-all duration-500 ${
                currentTheme === 'dark'
                  ? 'bg-neutral-900 border-neutral-700 text-base-content'
                  : 'bg-white border-gray-200 text-gray-900'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 p-10">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-300 mb-6 ${
                    currentTheme === 'dark'
                      ? 'bg-amber-800/30 text-amber-300 group-hover:scale-110'
                      : 'bg-amber-100 text-amber-600 group-hover:scale-110'
                  }`}>
                    {/* 💡 Lightbulb Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a7 7 0 0 0-7 7c0 2.45 1.152 4.281 2.783 5.99C8.91 17.804 9 18.248 9 18.5A1.5 1.5 0 0 0 10.5 20h3A1.5 1.5 0 0 0 15 18.5c0-.252.09-.696 1.217-2.51C17.848 14.281 19 12.45 19 10a7 7 0 0 0-7-7zM9 21h6m-3 0v1"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    Innovation
                  </h3>
                  <p className={`text-lg leading-relaxed transition-colors duration-300 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-500'}`}>
                    We illuminate new paths in AI-driven cooking, transforming sparks of creativity into practical innovation.
                  </p>
                </div>
              </div>

              {/* Card 2 - Community */}
              <div className={`relative group overflow-hidden rounded-2xl border shadow-xl transition-all duration-500 ${
                currentTheme === 'dark'
                  ? 'bg-neutral-900 border-neutral-700 text-base-content'
                  : 'bg-white border-gray-200 text-gray-900'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 p-10">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-xl mb-6 transition-all duration-300 ${
                    currentTheme === 'dark'
                      ? 'bg-blue-900/30 text-blue-300 group-hover:scale-110'
                      : 'bg-blue-100 text-blue-600 group-hover:scale-110'
                  }`}>
                    {/* 👥 People Network Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 6.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM4 18a4 4 0 014-4h8a4 4 0 014 4M3 10a2 2 0 012-2h2M19 8h2a2 2 0 012 2M2 18h20"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Community
                  </h3>
                  <p className={`text-lg leading-relaxed transition-colors ${currentTheme === 'dark' ? 'text-white' : 'text-gray-500'}`}>
                    We build bridges between developers, chefs, and creators, cultivating collaboration around AI and flavor.
                  </p>
                </div>
              </div>

              {/* Card 3 - Open Source */}
              <div className={`relative group overflow-hidden rounded-2xl border shadow-xl transition-all duration-500 ${
                currentTheme === 'dark'
                  ? 'bg-neutral-900 border-neutral-700 text-base-content'
                  : 'bg-white border-gray-200 text-gray-900'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 p-10">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-xl mb-6 transition-all duration-300 ${
                    currentTheme === 'dark'
                      ? 'bg-green-900/30 text-green-300 group-hover:scale-110'
                      : 'bg-green-100 text-green-600 group-hover:scale-110'
                  }`}>
                    {/* 💻 Code Brackets Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 9l3 3-3 3m-9-6l-3 3 3 3m4.5-9l-1.5 12"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-3 group-hover:text-green-600 dark:group-hover:text-green-400">
                    Open Source
                  </h3>
                  <p className={`text-lg leading-relaxed ${currentTheme === 'dark' ? 'text-white' : 'text-gray-500'}`}>
                    We grow faster together—sharing our code and ideas to make culinary AI accessible to everyone.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`py-16 sm:py-24 ${currentTheme === 'dark' ? 'bg-primary/10' : 'bg-base-200'}`}>
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-4xl font-display font-bold">{`Help Us Shape the Future of Food`}</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-base-content/70">
              Join the Flavor AI community and contribute to the next wave of intelligent culinary creation.
            </p>
            <a
              href="https://github.com/Ayushjhawar8/Flavor-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:scale-105"
            >
              Contribute on GitHub
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
