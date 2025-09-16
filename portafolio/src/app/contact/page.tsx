// File: app/contact/page.tsx
// Página de Contacto con navbar mejorado, foto redonda, descripción, ubicación y redes sociales grandes

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen text-black transition-colors duration-300 bg-gradient-to-b from-gray-100 to-white dark:from-gray-950 dark:to-black dark:text-white">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky top-0 z-50 flex items-center justify-center gap-2 py-4 text-xs font-medium shadow md:gap-4 md:text-sm backdrop-blur bg-white/40 dark:bg-black/40"
      >
        {[{ href: "/", label: "Hero" }, { href: "/projects", label: "Proyectos" }, { href: "/about", label: "Acerca de mí" }, { href: "/skills", label: "Habilidades" }, { href: "/contact", label: "Contacto" }].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-1 rounded-full border border-purple-400 transition shadow-sm ${
              item.label === "Contacto"
                ? "bg-purple-500 text-white shadow-lg"
                : "hover:bg-purple-500 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </motion.nav>

      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-center max-w-6xl gap-12 px-6 py-12 mx-auto md:flex-row">
        {/* Foto redonda */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-56 h-56 overflow-hidden border-4 border-purple-500 rounded-full shadow-2xl"
        >
          <Image
            src="/contact-photo.jpg" // Coloca tu foto en /public/contact-photo.jpg
            alt="Foto de perfil"
            width={400}
            height={400}
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Descripción, ubicación y Redes Sociales */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="mb-4 text-4xl font-bold">Contacto</h1>
          <p className="max-w-xl mx-auto mb-4 text-gray-700 dark:text-gray-300 md:mx-0">
            Puedes contactarme para colaborar en proyectos de software, discutir ideas o crear aplicaciones modernas y escalables.
          </p>

          {/* Ubicación */}
          <div className="flex items-center justify-center gap-2 mb-8 text-gray-600 md:justify-start dark:text-gray-400">
            <MapPin className="text-purple-500" size={22} />
            <span>Colombia - Pasto - Nariño</span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center gap-10 text-5xl md:justify-start"
          >
            <a
              href="https://github.com/DirkinYohan/Interfaces.git"
              target="_blank"
              className="flex flex-col items-center transition hover:text-purple-500"
              aria-label="GitHub"
            >
              <Github size={64} />
              <span className="mt-2 text-sm">Visita mi GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/johan-ojeda-rodr%C3%ADguez-987625368?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BKVM7DFEQS3Cujaeil7nXxA%3D%3D"
              target="_blank"
              className="flex flex-col items-center transition hover:text-purple-500"
              aria-label="LinkedIn"
            >
              <Linkedin size={64} />
              <span className="mt-2 text-sm">Conecta en LinkedIn</span>
            </a>
            <a
              href="mailto:dirkinojedarodriguez@gmail.com?subject=Contacto%20desde%20tu%20portafolio&body=Hola%20Dirkin,%20vi%20tu%20portafolio%20y%20me%20gustaría%20ponerme%20en%20contacto."
               target="_blank"

              className="flex flex-col items-center transition hover:text-purple-500"
              aria-label="Email"
            >
              <Mail size={64} />
              <span className="mt-2 text-sm">Envíame un correo</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}


