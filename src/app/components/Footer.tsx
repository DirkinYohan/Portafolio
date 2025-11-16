"use client";

import { Linkedin, Github, Mail } from "lucide-react";

export default function Footer({
  lang,
  darkMode,
}: {
  lang: "es" | "en";
  darkMode: boolean;
}) {
  return (
    <footer 
      className={`py-6 px-4 transition-colors duration-300 ${
        darkMode 
          ? "bg-gray-900 text-gray-300" 
          : "bg-gray-100 text-gray-700"
      }`}
      style={{ fontFamily: 'Aptos, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Información de derechos y autor */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">
            Hecho por: <span className="font-semibold">Dirkin Yohan Ojeda Rodriguez</span>
          </p>
          <p className="text-xs mt-1">
            Todos los derechos reservados ©2025
          </p>
        </div>
        
        {/* Iconos de contacto */}
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/in/dirkin-ojeda-rodriguez-8a1b6b2b3/"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              darkMode 
                ? "bg-gray-800 hover:bg-blue-500/20 text-blue-400" 
                : "bg-white hover:bg-blue-100 text-blue-600"
            }`}
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          
          <a
            href="https://github.com/dirkin-developer"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              darkMode 
                ? "bg-gray-800 hover:bg-gray-600 text-gray-300" 
                : "bg-white hover:bg-gray-200 text-gray-700"
            }`}
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          
          <a
            href="mailto:dirkin.ojeda@example.com"
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              darkMode 
                ? "bg-gray-800 hover:bg-red-500/20 text-red-400" 
                : "bg-white hover:bg-red-100 text-red-600"
            }`}
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}