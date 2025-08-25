"use client";

import { useState, useEffect, useRef } from 'react';

export default function TeamMembers() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredMember, setHoveredMember] = useState(null);
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

  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Co-Founder & CEO',
      bio: 'Former Google engineer with a passion for food tech. Alex leads our vision of making AI accessible to home cooks worldwide.',
      avatar: '👨‍💻',
      skills: ['Leadership', 'AI Strategy', 'Product Vision'],
      hobby: 'Perfecting homemade ramen',
      color: 'from-blue-500 to-purple-500'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Co-Founder & CTO',
      bio: 'PhD in Machine Learning from MIT. Maria architected our core AI engine that understands ingredients and flavor profiles.',
      avatar: '👩‍🔬',
      skills: ['Machine Learning', 'Backend Architecture', 'Data Science'],
      hobby: 'Molecular gastronomy experiments',
      color: 'from-green-500 to-teal-500'
    },
    {
      name: 'Jamie Thompson',
      role: 'Head of Design',
      bio: 'Award-winning UX designer who ensures our AI complexity translates into intuitive, delightful user experiences.',
      avatar: '🎨',
      skills: ['UX/UI Design', 'User Research', 'Visual Design'],
      hobby: 'Food photography',
      color: 'from-pink-500 to-orange-500'
    },
    {
      name: 'Chef Isabella',
      role: 'Culinary Director',
      bio: 'Michelin-starred chef turned food technologist. Isabella ensures our AI recommendations meet the highest culinary standards.',
      avatar: '👩‍🍳',
      skills: ['Culinary Arts', 'Recipe Development', 'Nutrition'],
      hobby: 'Foraging for wild ingredients',
      color: 'from-yellow-500 to-red-500'
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      bio: 'Full-stack wizard who brings our AI capabilities to life through clean, efficient code and seamless user interfaces.',
      avatar: '⚡',
      skills: ['React/Next.js', 'Node.js', 'DevOps'],
      hobby: 'Korean BBQ master',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      name: 'Sarah Johnson',
      role: 'Community Manager',
      bio: 'Food blogger turned community champion. Sarah builds bridges between our AI and the amazing community of home cooks.',
      avatar: '🌟',
      skills: ['Community Building', 'Content Strategy', 'Social Media'],
      hobby: 'Vintage cookbook collecting',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const values = [
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'We believe the best solutions come from diverse perspectives working together.'
    },
    {
      icon: '🔬',
      title: 'Innovation',
      description: 'We push boundaries to create technology that truly enhances the cooking experience.'
    },
    {
      icon: '❤️',
      title: 'Passion',
      description: 'Our love for food and technology drives everything we do.'
    },
    {
      icon: '🌱',
      title: 'Growth',
      description: 'We continuously learn, adapt, and evolve with our community and technology.'
    }
  ];

  return (
    <section id="team" ref={sectionRef} className="scroll-mt-24">
      <div className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-5xl">👥</span>
            <h2 className="text-4xl font-bold text-gray-800">Meet Our Team</h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            The passionate minds behind Flavor AI - where culinary expertise meets cutting-edge technology.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`group cursor-pointer transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 h-full">
                {/* Avatar & Header */}
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${member.color} flex items-center justify-center text-4xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mt-4 group-hover:text-purple-600 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 font-medium">{member.role}</p>
                </div>

                {/* Bio */}
                <p className="text-gray-700 leading-relaxed mb-6 text-center">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                    Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${member.color} text-white shadow-sm`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hobby */}
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${member.color} bg-opacity-10 transition-all duration-300 ${
                  hoveredMember === index ? 'scale-105' : ''
                }`}>
                  <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Passion Project
                  </h4>
                  <p className="text-gray-700 text-sm italic">
                    🍽️ {member.hobby}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${member.color} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Values */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide our team and shape every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`text-center group transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200 + 800}ms` }}
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white shadow-xl">
            <div className="text-5xl mb-6">🚀</div>
            <h3 className="text-3xl font-bold mb-4">Want to Join Our Team?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              We're always looking for passionate individuals who share our vision of revolutionizing the culinary world through technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:careers@flavor-ai.com"
                className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="text-xl">📧</span>
                <span>Send Us Your Resume</span>
              </a>
              <a
                href="https://github.com/BhumiChawla/Flavor-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-colors duration-300 border border-white/30 hover:border-white/50 transform hover:scale-105"
              >
                <span className="text-xl">💻</span>
                <span>Contribute to Open Source</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
