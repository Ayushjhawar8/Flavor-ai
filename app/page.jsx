"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Mission from '@/components/about/Mission';
import Vision from '@/components/about/Vision';
import OurStory from '@/components/about/OurStory';
import TeamMembers from '@/components/about/TeamMembers';
import ContactInfo from '@/components/about/ContactInfo';

export default function AboutPage() {
  const [showResults, setShowResults] = useState(false);

  const handleSearchFocus = () => {
    setShowResults(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  useEffect(() => {
    // Smooth scroll behavior for navigation links
    const handleSmoothScroll = (e) => {
      const target = e.target.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Navbar 
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
            <span className="text-3xl">🍱</span>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              About Flavor AI
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing the way you cook, eat, and explore culinary creativity with the power of artificial intelligence.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <nav className="sticky top-16 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { href: '#mission', label: 'Mission', icon: '🎯' },
              { href: '#vision', label: 'Vision', icon: '🔮' },
              { href: '#story', label: 'Our Story', icon: '📖' },
              { href: '#team', label: 'Team', icon: '👥' },
              { href: '#contact', label: 'Contact', icon: '📞' }
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-gray-800 font-medium transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
              >
                <span>{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 space-y-16 pb-16">
        <Mission />
        <Vision />
        <OurStory />
        <TeamMembers />
        <ContactInfo />
      </main>

      <Footer />
    </div>
  );
}
