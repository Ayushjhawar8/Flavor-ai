'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, X } from 'lucide-react';

export default function FloatingContactUsButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <Link
        href="/contact"
        className="group relative flex items-center justify-center"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Button */}
        <div className="flex items-center gap-2 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-4 py-3">
          <Mail size={20} className="flex-shrink-0" />
          <span
            className={`overflow-hidden transition-all duration-300 whitespace-nowrap font-medium ${
              isExpanded ? 'max-w-[100px] opacity-100' : 'max-w-0 opacity-0'
            }`}
          >
            Contact Us
          </span>
        </div>

        {/* Pulse effect when not expanded */}
        {!isExpanded && (
          <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20" />
        )}
      </Link>
    </div>
  );
}

