"use client";

import { useState, useEffect, useRef } from 'react';

export default function Vision() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
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

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveCard((prev) => (prev + 1) % 3);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const visionPoints = [
    {
      icon: '🌟',
      title: 'Universal Kitchen Intelligence',
      description: 'Every kitchen becomes a smart kitchen, understanding preferences, dietary needs, and available ingredients.',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: '🌱',
      title: 'Sustainable Food Future',
      description: 'Reducing food waste globally while promoting sustainable cooking practices and local ingredient usage.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: '🤝',
      title: 'Connected Food Community',
      description: 'Building bridges between cultures through food, sharing traditions, and creating new culinary experiences.',
      color: 'from-pink-500 to-orange-500'
    }
  ];

  return (
    <section id="vision" ref={sectionRef} className="scroll-mt-24">
      <div className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-5xl">🔮</span>
            <h2 className="text-4xl font-bold text-gray-800">Our Vision</h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            Imagining a future where technology and culinary art unite to create extraordinary food experiences for everyone.
          </p>
        </div>

        {/* Vision Statement */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50 mb-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              A World Where Everyone Cooks with Confidence
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              We envision a future where artificial intelligence doesn't replace the human touch in cooking, 
              but amplifies it. A world where cultural barriers dissolve through shared meals, where dietary 
              restrictions become opportunities for creativity, and where every person—regardless of their 
              cooking experience—can create meals that nourish both body and soul.
            </p>
          </div>
        </div>

        {/* Interactive Vision Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {visionPoints.map((point, index) => (
            <div
              key={index}
              className={`group cursor-pointer transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setActiveCard(index)}
            >
              <div className={`relative h-full bg-gradient-to-br ${point.color} rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                activeCard === index ? 'ring-4 ring-white ring-opacity-50 scale-105' : ''
              }`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {point.icon}
                  </div>
                  
                  <h4 className="text-2xl font-bold mb-4 group-hover:text-yellow-200 transition-colors duration-300">
                    {point.title}
                  </h4>
                  
                  <p className="text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {point.description}
                  </p>

                  {/* Progress Indicator */}
                  <div className="mt-6 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-white transition-all duration-1000 rounded-full ${
                          activeCard === index ? 'w-full' : 'w-0'
                        }`}
                      ></div>
                    </div>
                    <span className="text-xs text-white/80 font-medium">
                      {activeCard === index ? '100%' : '0%'}
                    </span>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Future Timeline */}
        <div className="mt-16 bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">The Path Forward</h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { year: '2024', milestone: 'AI Recipe Generation', status: 'current' },
              { year: '2025', milestone: 'Smart Meal Planning', status: 'next' },
              { year: '2026', milestone: 'IoT Kitchen Integration', status: 'future' },
              { year: '2027', milestone: 'Global Food Network', status: 'future' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 ${
                  item.status === 'current' ? 'bg-gradient-to-r from-green-500 to-teal-500' :
                  item.status === 'next' ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                  'bg-gradient-to-r from-gray-400 to-gray-500'
                }`}>
                  {item.year}
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{item.milestone}</h4>
                <div className={`w-full h-2 rounded-full ${
                  item.status === 'current' ? 'bg-green-200' :
                  item.status === 'next' ? 'bg-blue-200' :
                  'bg-gray-200'
                }`}>
                  <div className={`h-full rounded-full transition-all duration-1000 ${
                    item.status === 'current' ? 'w-full bg-green-500' :
                    item.status === 'next' ? 'w-1/3 bg-blue-500' :
                    'w-0 bg-gray-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
