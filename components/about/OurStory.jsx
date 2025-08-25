"use client";

import { useState, useEffect, useRef } from 'react';

export default function OurStory() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStory, setActiveStory] = useState(0);
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

  const storyMilestones = [
    {
      year: 'The Beginning',
      title: 'A Kitchen Dilemma',
      description: 'It all started with a simple problem: staring at a fridge full of random ingredients and having no idea what to cook. Like many home cooks, our founders faced the daily challenge of meal planning.',
      icon: '🤔',
      color: 'from-red-400 to-pink-400'
    },
    {
      year: 'The Spark',
      title: 'AI Meets Culinary',
      description: 'During a late-night coding session, the idea struck: What if artificial intelligence could understand ingredients like a seasoned chef? What if technology could bridge the gap between available ingredients and delicious meals?',
      icon: '💡',
      color: 'from-yellow-400 to-orange-400'
    },
    {
      year: 'The Build',
      title: 'Prototypes & Pasta',
      description: 'Months of research, countless recipe tests, and AI model training followed. Our team tested everything from simple pasta dishes to complex fusion cuisines, refining our algorithms with each iteration.',
      icon: '🔬',
      color: 'from-blue-400 to-purple-400'
    },
    {
      year: 'The Launch',
      title: 'Flavor AI is Born',
      description: 'After extensive testing and community feedback, Flavor AI launched as a comprehensive culinary companion. Our platform now helps thousands of users transform their cooking experience daily.',
      icon: '🚀',
      color: 'from-green-400 to-teal-400'
    }
  ];

  const achievements = [
    { number: '10K+', label: 'Recipes Generated', icon: '📝' },
    { number: '5K+', label: 'Happy Users', icon: '😊' },
    { number: '50+', label: 'Cuisines Covered', icon: '🌍' },
    { number: '95%', label: 'User Satisfaction', icon: '⭐' }
  ];

  return (
    <section id="story" ref={sectionRef} className="scroll-mt-24">
      <div className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-5xl">📖</span>
            <h2 className="text-4xl font-bold text-gray-800">Our Story</h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            From a simple kitchen problem to an AI-powered culinary revolution - discover how Flavor AI came to life.
          </p>
        </div>

        {/* Story Timeline */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50 mb-12">
          <div className="space-y-12">
            {storyMilestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                } transform transition-all duration-700 ${
                  isVisible ? 'translate-x-0 opacity-100' : `${index % 2 === 0 ? '-translate-x-10' : 'translate-x-10'} opacity-0`
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {milestone.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {milestone.year}
                      </p>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {milestone.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {milestone.description}
                  </p>
                </div>

                {/* Visual Element */}
                <div className="flex-1 max-w-md">
                  <div className={`bg-gradient-to-br ${milestone.color} rounded-2xl p-8 text-white shadow-xl transform hover:scale-105 transition-transform duration-300`}>
                    <div className="text-center">
                      <div className="text-6xl mb-4">{milestone.icon}</div>
                      <h4 className="text-xl font-bold mb-2">{milestone.title}</h4>
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white rounded-full transition-all duration-1000"
                          style={{ width: isVisible ? '100%' : '0%', transitionDelay: `${index * 300 + 500}ms` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50 hover:shadow-xl transition-all duration-500 hover:scale-105 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="text-3xl mb-3">{achievement.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                {achievement.number}
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium">
                {achievement.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white shadow-xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-6xl mb-6">💬</div>
            <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-6 italic">
              "We didn't just want to create another recipe app. We wanted to build a culinary companion that understands you, learns with you, and grows alongside your cooking journey."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍💻</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-lg">The Flavor AI Team</p>
                <p className="text-white/80">Founders & Developers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Continues */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg">
            <span className="text-2xl">🌟</span>
            <p className="text-lg font-medium text-gray-800">
              Our journey continues... and we're just getting started!
            </p>
            <span className="text-2xl">🌟</span>
          </div>
        </div>
      </div>
    </section>
  );
}
