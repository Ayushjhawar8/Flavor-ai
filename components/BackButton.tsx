"use client";

import { useRouter } from 'next/navigation';
import { BackIcon } from '@/components/Icons';
import { useState, useEffect } from 'react';
import React from 'react';

function BackButton({ fallbackUrl = "/" }) {
    const router = useRouter();
    const [isPressed, setIsPressed] = useState(false);
    const [canGoBack, setCanGoBack] = useState(false);

    useEffect(() => {
        
        setCanGoBack(window.history.length > 1);
    }, []);

    const handleBack = async (e) => {
        
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Back button clicked'); // Debug log
        
        
        setIsPressed(true);
        
        try {
            
            if (canGoBack && window.history.length > 1) {
                
                console.log('Using window.history.back()');
                window.history.back();
            } else {
               
                console.log('Using router.push to fallback');
                await router.push(fallbackUrl);
            }
        } catch (error) {
            console.error('All back methods failed:', error);
            
            window.location.href = fallbackUrl;
        }
        
        // Reset pressed state
        setTimeout(() => setIsPressed(false), 200);
    };

    const handleTouchStart = (e) => {
        e.stopPropagation();
        setIsPressed(true);
        console.log('Touch started'); // Debug log
    };

    const handleTouchEnd = (e) => {
        e.stopPropagation();
        console.log('Touch ended'); // Debug log
    };

    const handleMouseDown = (e) => {
        e.stopPropagation();
        setIsPressed(true);
        console.log('Mouse down'); // Debug log
    };

    const handleMouseUp = (e) => {
        e.stopPropagation();
        setTimeout(() => setIsPressed(false), 100);
        console.log('Mouse up'); // Debug log
    };

    return (
        <button
            className={`
                btn btn-circle 
                bg-base-200 hover:bg-base-300 
                active:bg-base-300
                absolute top-5 md:top-10 left-3 md:left-10 
                z-0
                transition-all duration-150 ease-in-out
                select-none
                ${isPressed ? 'scale-90 bg-base-300 shadow-inner' : 'scale-100 shadow-lg'}
                text-base-content
            `}
            onClick={handleBack}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{
              
                minWidth: '48px',
                minHeight: '48px',
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                touchAction: 'manipulation',
                // Force hardware acceleration for better mobile performance
                transform: 'translateZ(0)',
                willChange: 'transform'
            }}
            aria-label="Go back to previous page"
            type="button"
            
            tabIndex={0}
            role="button"
        >
            <BackIcon />
        </button>
    );
}

export default BackButton;