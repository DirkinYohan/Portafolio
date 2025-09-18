"use client";

import { useState, useEffect } from "react";
import LetterSlices from "./components/LetterSlices";
import Hero from "./components/Hero";

export default function Page() {
  const [showHero, setShowHero] = useState(false);
  const [lang, setLang] = useState<"es" | "en">("es");
  const [darkMode, setDarkMode] = useState(true);

  // ⏳ Mostrar Hero después de la animación
  useEffect(() => {
    const timer = setTimeout(() => setShowHero(true), 3500); // dura 3.5s aprox
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}>
      {!showHero ? (
        // 🔥 Animación del nombre sola
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex space-x-2">
            {"DIRKIN".split("").map((letter, index) => (
              <LetterSlices key={index} letter={letter} letterIndex={index} />
            ))}
          </div>
        </div>
      ) : (
        // 👇 Hero aparece después
        <Hero lang={lang} setLang={setLang} darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
    </main>
  );
}
