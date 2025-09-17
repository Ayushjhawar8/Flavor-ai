'use client';

import { useEffect, useState } from 'react';

let scriptLoadingPromise = null; // cache script so it loads only once

const GoogleTranslate = ({ onLoad }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initGoogleTranslate = () => {
      if (window.google?.translate?.TranslateElement) {
        // Prevent re-rendering if it's already there
        if (!document.getElementById('google_element').hasChildNodes()) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages:
                'en,hi,mr,sa,ta,te,kn,ml,gu,pa,bn,ur,or,as,ne,sd,si,fr,de,es,zh,ja,ru',
              layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
              autoDisplay: false,
            },
            'google_element'
          );
        }
        setIsVisible(true);
        if (onLoad) onLoad();
      }
    };

    // Load the script only once globally
    if (!scriptLoadingPromise) {
      scriptLoadingPromise = new Promise((resolve) => {
        window.googleTranslateInit = () => {
          initGoogleTranslate();
          resolve();
        };
        const script = document.createElement('script');
        script.id = 'google_translate_script';
        script.src =
          'https://translate.google.com/translate_a/element.js?cb=googleTranslateInit';
        script.async = true;
        script.onerror = () => console.error('Google Translate failed to load');
        document.body.appendChild(script);
      });
    } else {
      scriptLoadingPromise.then(initGoogleTranslate);
    }
  }, [onLoad]);

  return (
    <div id="google_element" className={`google-translate-container ${isVisible ? '' : 'hidden'}`} />
  );
};

export default GoogleTranslate;
