'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, X } from 'lucide-react';

export default function FloatingFeedbackButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="/feedback"
        className="group relative flex items-center justify-center"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Button */}
        <div className="flex items-center gap-2 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-4 py-3">
          <MessageSquare size={20} className="flex-shrink-0" />
          <span
            className={`overflow-hidden transition-all duration-300 whitespace-nowrap font-medium ${
              isExpanded ? 'max-w-[100px] opacity-100' : 'max-w-0 opacity-0'
            }`}
          >
            Feedback
          </span>
        </div>

        {/* Pulse effect when not expanded */}
        {!isExpanded && (
          <span className="absolute inset-0 rounded-full bg-purple-600 animate-ping opacity-20" />
        )}
      </Link>
    </div>
  );
}

