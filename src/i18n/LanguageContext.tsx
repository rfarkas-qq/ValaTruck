"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, LANGUAGES, TRANSLATIONS, TranslationKey } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("valatruck_lang") as Language;
    if (storedLang && LANGUAGES.some((l) => l.code === storedLang)) {
      setLanguageState(storedLang);
    } else if (typeof navigator !== "undefined") {
      const browserLang = navigator.language.slice(0, 2) as Language;
      if (LANGUAGES.some((l) => l.code === browserLang)) {
        setLanguageState(browserLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("valatruck_lang", lang);
    }
  };

  const t = (key: TranslationKey): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
