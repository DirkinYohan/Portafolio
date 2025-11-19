"use client";

import { useState, useEffect } from "react";
import LetterSlices from "./components/LetterSlices";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from './components/Footer';

export default function Page() {
  const [showContent, setShowContent] = useState(false);
  const [lang, setLang] = useState<"es" | "en">("es");
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    

    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);

    const timer = setTimeout(() => setShowContent(true), 3500); 
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <main className="bg-white text-black">
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex space-x-2">
            {"DIRKIN".split("").map((letter, index) => (
              <div key={index} className="w-8 h-12 bg-gray-200 animate-pulse rounded"></div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {!showContent ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex space-x-2">
            {"DIRKIN".split("").map((letter, index) => (
              <LetterSlices key={index} letter={letter} letterIndex={index} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <Hero
            lang={lang}
            setLang={setLang}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          <About lang={lang} darkMode={darkMode} />
          <Skills lang={lang} darkMode={darkMode} />
          <Projects lang={lang} darkMode={darkMode} />
          <Experience lang={lang} darkMode={darkMode} />
          <Testimonials lang={lang} darkMode={darkMode} />
          <Contact lang={lang} darkMode={darkMode} />
          <Footer lang={lang} darkMode={darkMode} />
        </>
      )}
    </main>
  );
}