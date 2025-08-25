"use client";

import { useState, useEffect, useRef } from 'react';

export default function Mission() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="mission" ref={sectionRef} className="scroll-mt-24">
      <div className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-5xl">🎯</span>
            <h2 className="text-4xl font-bold text-gray-800">Our Mission</h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Mission Content */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Mission Statement */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Empowering Culinary Creativity Through AI
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is to democratize cooking by making culinary creativity accessible to everyone. 
                We believe that great food should not be limited by skill level, available ingredients, or time constraints.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through the power of artificial intelligence, we're building a platform that understands your 
                preferences, dietary needs, and available ingredients to create personalized recipe experiences 
                that inspire and delight.
              </p>
              
              {/* Key Points */}
              <div className="space-y-4 mt-8">
                {[
                  {
                    icon: '🤖',
                    title: 'AI-Powered Personalization',
                    description: 'Smart recommendations based on your taste preferences and dietary requirements'
                  },
                  {
                    icon: '🥘',
                    title: 'Ingredient Intelligence',
                    description: 'Transform whatever you have in your kitchen into delicious meals'
                  },
                  {
                    icon: '🌍',
                    title: 'Global Cuisine Access',
                    description: 'Explore flavors from around the world, adapted to your local ingredients'
                  }
                ].map((point, index) => (
                  <div 
                    key={index}
                    className={`flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 transform transition-all duration-500 delay-${(index + 1) * 200} ${
                      isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                    }`}
                  >
                    <span className="text-2xl flex-shrink-0">{point.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{point.title}</h4>
                      <p className="text-gray-600 text-sm">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl p-8 text-white shadow-2xl">
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
                
                <h4 className="text-xl font-bold mb-6">Making Cooking Magical</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span className="text-sm">Reduce food waste by 40%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span className="text-sm">Save 2+ hours weekly on meal planning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span className="text-sm">Discover 100+ new recipes monthly</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span className="text-sm">Support diverse dietary needs</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <p className="text-sm font-medium">
                    "Flavor AI has transformed my kitchen from a place of stress into a playground of creativity."
                  </p>
                  <p className="text-xs mt-2 opacity-80">- Sarah, Home Cook</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">🍳</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">🥗</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
