'use client';

import { useEffect, useState } from 'react';

const GoogleTranslate = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.googleTranslateInit = () => {
      if (!window.google?.translate?.TranslateElement) {
        setTimeout(window.googleTranslateInit, 100);
      } else {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,hi,mr,sa,ta,te,kn,ml,gu,pa,bn,ur,or,as,ne,sd,si,fr,de,es,zh,ja,ru',
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          autoDisplay: false,
        }, 'google_element');
        setIsVisible(true);
      }
    };

    if (!document.getElementById('google_translate_script')) {
      const script = document.createElement('script');
      script.id = 'google_translate_script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateInit';
      script.async = true;
      script.onerror = () => console.error('Google Translate failed to load');
      document.body.appendChild(script);
    } else {
      window.googleTranslateInit();
    }
  }, []);

  return (
    <div id="google_element" className={`google-translate-container ${isVisible ? '' : 'hidden'}`} />
  );
};

export default GoogleTranslate;
