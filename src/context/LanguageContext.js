'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/lib/translations';

const LanguageContext = createContext({
  lang: 'en',
  switchLang: () => {},
  t: translations.en,
  mounted: false,
});

export function LanguageProvider({ children, initialLang = 'en' }) {
  const [lang, setLang] = useState(initialLang);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 1. Check URL param ?lang=en or ?lang=id
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'id' || urlLang === 'en') {
      setLang(urlLang);
      try {
        localStorage.setItem('tetebatu_lang', urlLang);
        document.cookie = `tetebatu_lang=${urlLang}; path=/; max-age=31536000`;
        document.documentElement.lang = urlLang;
      } catch (e) {}
      return;
    }

    // 2. Check localStorage
    try {
      const saved = localStorage.getItem('tetebatu_lang');
      if (saved === 'id' || saved === 'en') {
        setLang(saved);
        document.documentElement.lang = saved;
        return;
      }
    } catch (e) {}

    // 3. Check cookie
    try {
      const match = document.cookie.match(/(?:^|;\s*)tetebatu_lang=([^;]+)/);
      if (match && (match[1] === 'id' || match[1] === 'en')) {
        setLang(match[1]);
        document.documentElement.lang = match[1];
        return;
      }
    } catch (e) {}

    // Default to 'en' as requested
    setLang('en');
    document.documentElement.lang = 'en';
  }, []);

  const switchLang = (newLang) => {
    if (newLang !== 'id' && newLang !== 'en') return;
    setLang(newLang);
    try {
      localStorage.setItem('tetebatu_lang', newLang);
      document.cookie = `tetebatu_lang=${newLang}; path=/; max-age=31536000`;
      document.documentElement.lang = newLang;
    } catch (e) {}
  };

  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
