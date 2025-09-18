"use client";

import { useState } from "react";
import { Sun, Moon, Globe } from "lucide-react";

type Language = "es" | "en";

export default function Navbar({ onLangChange }: { onLangChange: (lang: Language) => void }) {
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState<Language>("es");

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleLang = () => {
    const newLang: Language = lang === "es" ? "en" : "es";
    setLang(newLang);
    onLangChange(newLang);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center 
        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} shadow-md transition-colors`}
    >
      <h1 className="text-2xl font-bold">Dirkin</h1>

      <ul className="flex space-x-6 font-medium">
        <li><a href="#portfolio">{lang === "es" ? "Portafolio" : "Portfolio"}</a></li>
        <li><a href="#about">{lang === "es" ? "Sobre mí" : "About me"}</a></li>
        <li><a href="#skills">{lang === "es" ? "Habilidades" : "Skills"}</a></li>
        <li><a href="#testimonials">{lang === "es" ? "Testimonios" : "Testimonials"}</a></li>
        <li><a href="#contact">{lang === "es" ? "Contacto" : "Contact"}</a></li>
      </ul>

      <div className="flex space-x-3">
        <button onClick={toggleTheme}>
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
        <button onClick={toggleLang}>
          <Globe className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}