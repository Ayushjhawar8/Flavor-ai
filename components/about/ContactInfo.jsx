"use client";

import { useState, useEffect, useRef } from 'react';

export default function ContactInfo() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Thank you for your message! We\'ll get back to you soon.');
    }, 1000);
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      description: 'Drop us a line anytime',
      contact: 'hello@flavor-ai.com',
      action: 'mailto:hello@flavor-ai.com',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Chat with our support team',
      contact: 'Available 9AM-6PM EST',
      action: '#',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: '🐦',
      title: 'Follow Us',
      description: 'Stay updated on social media',
      contact: '@FlavorAI',
      action: 'https://twitter.com/flavorai',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: '💼',
      title: 'Business Inquiries',
      description: 'Partnership and business opportunities',
      contact: 'business@flavor-ai.com',
      action: 'mailto:business@flavor-ai.com',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const faqs = [
    {
      question: 'How does Flavor AI generate recipes?',
      answer: 'Our AI analyzes ingredient combinations, cooking techniques, and flavor profiles from thousands of recipes to generate personalized suggestions based on your available ingredients and preferences.'
    },
    {
      question: 'Is Flavor AI free to use?',
      answer: 'Yes! Flavor AI offers a robust free tier with basic recipe generation. Premium features like advanced meal planning and dietary customization are available through our subscription plans.'
    },
    {
      question: 'Can I contribute my own recipes?',
      answer: 'Absolutely! We love community contributions. You can submit your recipes through our platform, and our AI learns from high-quality, user-contributed content.'
    },
    {
      question: 'Do you support special dietary requirements?',
      answer: 'Yes, Flavor AI supports various dietary restrictions including vegetarian, vegan, gluten-free, keto, paleo, and many others. Our AI adapts recipes to meet your specific needs.'
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="scroll-mt-24">
      <div className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-5xl">📞</span>
            <h2 className="text-4xl font-bold text-gray-800">Get In Touch</h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            Have questions, suggestions, or just want to say hi? We'd love to hear from you!
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.action}
              target={method.action.startsWith('http') ? '_blank' : '_self'}
              rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
              className={`group block bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-500 hover:scale-105 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4`}>
                {method.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                {method.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {method.description}
              </p>
              <p className="text-purple-600 font-medium text-sm">
                {method.contact}
              </p>
            </a>
          ))}
        </div>

        {/* Contact Form & FAQ Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Send Us a Message</h3>
              <p className="text-gray-600">We typically respond within 24 hours</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                  placeholder="Tell us more about your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-8 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-xl">🚀</span>
                    Send Message
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h3>
              <p className="text-gray-600">Quick answers to common questions</p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border-l-4 border-purple-500 pl-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-r-xl transform transition-all duration-700 ${
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200 + 500}ms` }}
                >
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-start gap-2">
                    <span className="text-purple-500 mt-1">❓</span>
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 leading-relaxed ml-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white text-center">
              <div className="text-3xl mb-3">💡</div>
              <h4 className="font-bold mb-2">Still have questions?</h4>
              <p className="text-sm opacity-90 mb-4">
                Check out our comprehensive documentation or join our community forum.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#"
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white/30 transition-colors duration-300 border border-white/30"
                >
                  📚 Documentation
                </a>
                <a
                  href="#"
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white/30 transition-colors duration-300 border border-white/30"
                >
                  💬 Community Forum
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Office Info */}
        <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-8 md:p-12 text-white shadow-xl">
          <div className="text-center">
            <div className="text-5xl mb-6">🏢</div>
            <h3 className="text-3xl font-bold mb-4">Our Virtual Kitchen</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              We're a remote-first team, cooking up innovations from kitchens around the world. 
              Our headquarters might be virtual, but our passion for food technology is very real.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl mb-2">🌍</div>
                <h4 className="font-semibold mb-1">Global Team</h4>
                <p className="text-white/80 text-sm">15+ Countries</p>
              </div>
              <div>
                <div className="text-3xl mb-2">⏰</div>
                <h4 className="font-semibold mb-1">24/7 Support</h4>
                <p className="text-white/80 text-sm">Always Here to Help</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🚀</div>
                <h4 className="font-semibold mb-1">Quick Response</h4>
                <p className="text-white/80 text-sm">&lt; 24 Hour Reply</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
