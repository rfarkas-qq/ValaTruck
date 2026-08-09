"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LANGUAGES, Language } from "@/i18n/translations";
import { Globe, ChevronDown } from "lucide-react";

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-10 px-3 bg-white/95 backdrop-blur-md border border-slate-200 hover:border-sky-500 text-slate-800 font-medium rounded-xl flex items-center gap-2 text-xs shadow-sm hover:shadow active:scale-95 transition-all"
        title="Select Language / Zvoľte jazyk"
      >
        <Globe className="w-4 h-4 text-sky-600 shrink-0" />
        <span className="text-sm">{currentLang.flag}</span>
        <span className="font-semibold text-slate-900 hidden sm:inline">{currentLang.name}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-0.5 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 py-1 text-xs overflow-hidden max-h-80 overflow-y-auto">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as Language);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left transition-colors ${
                language === lang.code
                  ? "bg-sky-50 text-sky-800 font-bold border-l-4 border-sky-600"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className="text-base leading-none">{lang.flag}</span>
                <span className="text-xs font-semibold">{lang.name}</span>
              </span>
              {language === lang.code && <span className="text-sky-600 font-black">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
