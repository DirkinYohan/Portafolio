

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  // ------------------------------
  // Estado para Dark/Light Mode
  // ------------------------------
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // ------------------------------
  // Estado para Idioma (ES / EN)
  // ------------------------------
  const [lang, setLang] = useState<"es" | "en">("es");

  const toggleLang = () => {
    setLang(lang === "es" ? "en" : "es");
  };

  // Textos multilenguaje
  const texts = {
    es: {
      hello: "Hola, soy",
      role: "Software Engineer / Full Stack Developer",
      phrase: "Construyo aplicaciones web modernas, escalables y elegantes.",
      contact: "Contactar",
      projects: "Ver Proyectos",
      about: "Acerca de mí",
      skills: "Habilidades"
    },
    en: {
      hello: "Hi, I'm",
      role: "Software Engineer / Full Stack Developer",
      phrase: "I build modern, scalable and elegant web applications.",
      contact: "Contact",
      projects: "View Projects",
      about: "About Me",
      skills: "Skills"
    }
  };

  const t = texts[lang];

  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-center gap-8 min-h-screen px-6 md:px-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black text-black dark:text-white transition-colors duration-300">
      {/* Controles arriba */}
      <div className="absolute top-5 right-5 flex gap-3">
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-md border border-gray-400 dark:border-gray-600 text-sm hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
        <button
          onClick={toggleLang}
          className="px-3 py-1 rounded-md border border-gray-400 dark:border-gray-600 text-sm hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {lang === "es" ? "EN" : "ES"}
        </button>
      </div>

      {/* Texto */}
      <div className="max-w-xl text-center md:text-left">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold mb-3"
        >
          {t.hello} <span className="text-purple-500">Yohan</span>
        </motion.h1>

        <motion.h2
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-6"
        >
          {t.role}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-lg text-gray-600 dark:text-gray-400 mb-8"
        >
          {t.phrase}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="flex flex-wrap gap-3 justify-center md:justify-start"
        >
          <Link
            href="/contact"
            className="px-5 py-3 rounded-2xl bg-purple-500 hover:bg-purple-600 transition shadow-lg text-white"
          >
            {t.contact}
          </Link>

          <Link
            href="/projects"
            className="px-5 py-3 rounded-2xl border border-purple-500 hover:bg-purple-500/20 transition"
          >
            {t.projects}
          </Link>

          <Link
            href="/about"
            className="px-5 py-3 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition"
          >
            {t.about}
          </Link>

          <Link
            href="/skills"
            className="px-5 py-3 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition"
          >
            {t.skills}
          </Link>
        </motion.div>
      </div>

      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-purple-500 shadow-xl"
      >
        <Image
          src="/avatar.png" // colocar archivo en /public/avatar.png
          alt="Avatar"
          width={224}
          height={224}
          className="object-cover w-full h-full"
        />
      </motion.div>
    </section>
  );
}


