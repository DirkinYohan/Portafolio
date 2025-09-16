

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
      hello: "Hello, I'm",
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
    <section className="relative flex flex-col-reverse items-center justify-center min-h-screen gap-8 px-6 text-black transition-colors duration-300 md:flex-row md:px-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black dark:text-white">
      {/* Controles arriba */}
      <div className="absolute flex gap-3 top-5 right-5">
        <button
          onClick={toggleTheme}
          className="px-3 py-1 text-sm border border-gray-400 rounded-md dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
        <button
          onClick={toggleLang}
          className="px-3 py-1 text-sm border border-gray-400 rounded-md dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800"
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
          className="mb-3 text-4xl font-extrabold md:text-6xl"
        >
          {t.hello} <span className="text-purple-500">Yohan</span>
        </motion.h1>

        <motion.h2
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-6 text-lg text-gray-600 md:text-2xl dark:text-gray-300"
        >
          {t.role}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-lg mb-8 text-gray-600 dark:text-gray-400"
        >
          {t.phrase}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-3 md:justify-start"
        >
          <Link
            href="/contact"
            className="py-3 text-white transition bg-purple-500 shadow-lg px- rounded-2xl hover:bg-purple-600 "
          >
            {t.contact}
          </Link>

          <Link
            href="/projects"
            className="px-5 py-3 transition border border-purple-500 rounded-2xl hover:bg-purple-500/20"
          >
            {t.projects}
          </Link>

          <Link
            href="/about"
            className="px-5 py-3 transition rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
          >
            {t.about}
          </Link>

          <Link
            href="/skills"
            className="px-5 py-3 transition rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
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
        className="w-48 h-48 overflow-hidden border-4 border-purple-500 rounded-full shadow-xl md:w-56 md:h-56"
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


