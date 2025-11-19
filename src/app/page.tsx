"use client";

import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from './components/Footer';

export default function Page() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [darkMode, setDarkMode] = useState(true);

  return (
    <main
      className={`transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* 👇 Contenido del portafolio sin animación inicial */}
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
    </main>
  );
}