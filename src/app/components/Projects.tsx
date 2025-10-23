"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Github, ExternalLink, Code2, Sparkles, ChevronLeft, ChevronRight, Zap, Globe, Play } from "lucide-react";

type Lang = "es" | "en";

const projects = [
  {
    title: "Portafolio Web",
    descEs: "Portafolio personal construido con Next.js, TypeScript y Tailwind CSS, featuring modern animations and responsive design.",
    descEn: "Personal portfolio built with Next.js, TypeScript and Tailwind CSS, featuring modern animations and responsive design.",
    image: "/avion.png",
    live: "https://boleto-avion.vercel.app/",
    code: "https://github.com/DirkinYohan/BoletoAvion.git",
    gradient: "from-pink-500 to-purple-600",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    category: "Frontend"
  },
  {
    title: "Simulador de Tráfico",
    descEs: "Aplicación avanzada en Python que simula patrones de tráfico urbano utilizando algoritmos de inteligencia artificial.",
    descEn: "Advanced Python application that simulates urban traffic patterns using artificial intelligence algorithms.",
    image: "/projects/traffic.png",
    live: "https://simulador-trafico.vercel.app",
    code: "https://github.com/tuusuario/simulador-trafico",
    gradient: "from-green-400 to-blue-500",
    tech: ["Python", "AI", "Simulation"],
    category: "AI/ML"
  },
  {
    title: "App Rastreo de Perros",
    descEs: "Sistema completo de rastreo de mascotas con Angular frontend y Spring Boot backend, incluyendo geolocalización en tiempo real.",
    descEn: "Complete pet tracking system with Angular frontend and Spring Boot backend, including real-time geolocation.",
    image: "/projects/dogs.png",
    live: "https://app-perros.vercel.app",
    code: "https://github.com/tuusuario/app-perros",
    gradient: "from-yellow-400 to-orange-500",
    tech: ["Angular", "Spring Boot", "GPS"],
    category: "Fullstack"
  },
  {
    title: "Ecommerce Fullstack",
    descEs: "Plataforma de comercio electrónico completa con carrito de compras, pasarela de pago segura y panel de administración.",
    descEn: "Complete e-commerce platform with shopping cart, secure payment gateway and admin dashboard.",
    image: "/projects/ecommerce.png",
    live: "https://ecommerce-fullstack.vercel.app",
    code: "#",
    gradient: "from-indigo-400 to-cyan-500",
    tech: ["React", "Node.js", "MongoDB"],
    category: "Ecommerce"
  },
  {
    title: "Ecommerce Fullstack",
    descEs: "Plataforma de comercio electrónico completa con carrito de compras, pasarela de pago segura y panel de administración.",
    descEn: "Complete e-commerce platform with shopping cart, secure payment gateway and admin dashboard.",
    image: "/projects/ecommerce.png",
    live: "https://ecommerce-fullstack.vercel.app",
    code: "#",
    gradient: "from-indigo-400 to-cyan-500",
    tech: ["React", "Node.js", "MongoDB"],
    category: "Ecommerce"
  },
];

export default function ProjectsCarousel({
  lang,
  darkMode,
}: {
  lang: Lang;
  darkMode: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    if (sectionRef.current) {
      sectionRef.current.addEventListener('mousemove', handleMouseMove);
      return () => sectionRef.current?.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % projects.length);
  const prev = () => setCurrent((prev) => (prev - 1 + projects.length) % projects.length);

  const texts = {
    es: {
      title: "Proyectos",
      subtitle: "Mis creaciones digitales",
      desc: "Una selección de proyectos que muestran mi experiencia en diferentes tecnologías y dominios.",
      viewDemo: "Ver Demo",
      viewCode: "Ver Código",
      category: "Categoría",
      technologies: "Tecnologías"
    },
    en: {
      title: "Projects",
      subtitle: "My digital creations",
      desc: "A selection of projects showcasing my experience across different technologies and domains.",
      viewDemo: "View Demo",
      viewCode: "View Code",
      category: "Category",
      technologies: "Technologies"
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative min-h-fit overflow-hidden transition-all duration-700 ${
        darkMode 
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black" 
          : "bg-gradient-to-br from-slate-50 via-white to-gray-100"
      }`}
      style={{ fontFamily: 'Aptos, -apple-system, BlinkMacSystemFont, sans-serif' }}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated grid */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${darkMode ? 'opacity-10' : 'opacity-5'}`}>
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="projects-grid" width="70" height="70" patternUnits="userSpaceOnUse">
                <path d="M 70 0 L 0 0 0 70" fill="none" stroke={darkMode ? "rgb(34, 197, 94)" : "rgb(59, 130, 246)"} strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#projects-grid)" />
          </svg>
        </div>

        {/* Floating elements */}
        <div 
          className={`absolute top-1/5 left-1/6 w-40 h-40 rounded-full blur-3xl animate-pulse transition-all duration-1000 ${
            darkMode ? 'bg-purple-500/20' : 'bg-purple-500/15'
          }`}
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div 
          className={`absolute bottom-1/5 right-1/5 w-32 h-32 rounded-full blur-2xl animate-bounce transition-all duration-1000 ${
            darkMode ? 'bg-cyan-500/20' : 'bg-cyan-500/15'
          }`}
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
          }}
        />

        {/* Geometric shapes */}
        <div className={`absolute top-1/3 right-1/6 w-20 h-20 border-2 rotate-45 animate-spin duration-[30s] ${
          darkMode ? 'border-pink-500/30' : 'border-pink-400/20'
        }`}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-16 h-16 border rounded-full animate-pulse ${
          darkMode ? 'border-blue-500/40' : 'border-blue-400/30'
        }`}></div>
      </div>

      <div className="relative z-10 px-8 py-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Enhanced Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Sparkle decorations */}
            <div className="flex items-center justify-center mb-6">
              <Sparkles className={`mr-3 animate-spin duration-[3s] ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} size={24} />
              <span className={`text-base font-medium tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {texts[lang].subtitle}
              </span>
              <Sparkles className={`ml-3 animate-spin duration-[3s] animation-delay-1000 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} size={24} />
            </div>

            {/* Main title */}
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient bg-size-200">
                {texts[lang].title}
              </span>
            </h2>

            {/* Description */}
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {texts[lang].desc}
            </p>
          </div>

          {/* Enhanced Carousel */}
          <div className="relative flex items-center justify-center">
            
            {/* Navigation Buttons */}
            <button
              onClick={prev}
              className={`absolute left-4 z-30 p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-110 group ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70 text-white' 
                  : 'bg-white/80 border-gray-200/50 hover:bg-white/90 text-gray-800'
              }`}
            >
              <ChevronLeft className="group-hover:-translate-x-1 transition-transform duration-300" size={24} />
            </button>

            <button
              onClick={next}
              className={`absolute right-4 z-30 p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-110 group ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70 text-white' 
                  : 'bg-white/80 border-gray-200/50 hover:bg-white/90 text-gray-800'
              }`}
            >
              <ChevronRight className="group-hover:translate-x-1 transition-transform duration-300" size={24} />
            </button>

            {/* Carousel Container */}
            <div className="flex items-center justify-center w-full h-[520px] overflow-hidden relative">
              {projects.map((project, index) => {
                const position = (index - current + projects.length) % projects.length;
                const isActive = position === 0;
                const isAdjacent = position === 1 || position === projects.length - 1;

                let scale = 0.7;
                let opacity = 0.4;
                let zIndex = 0;
                let translateX = position === 1 ? 280 : position === projects.length - 1 ? -280 : 0;
                let blur = 'blur-sm';

                if (isActive) {
                  scale = 1;
                  opacity = 1;
                  zIndex = 20;
                  translateX = 0;
                  blur = 'blur-0';
                } else if (isAdjacent) {
                  scale = 0.85;
                  opacity = 0.7;
                  zIndex = 10;
                  blur = 'blur-0';
                }

                return (
                  <div
                    key={index}
                    className={`absolute transition-all duration-700 ${blur}`}
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      opacity,
                      zIndex,
                    }}
                    onMouseEnter={() => setHoveredProject(index)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Project Card */}
                    <div className={`relative w-[400px] h-[480px] rounded-3xl overflow-hidden backdrop-blur-sm border group cursor-pointer ${
                      darkMode
                        ? "bg-gray-800/50 border-gray-700/50"
                        : "bg-white/80 border-gray-200/50"
                    } ${isActive ? 'hover:scale-105' : ''}`}>
                      
                      {/* Glow effect for active card */}
                      {isActive && (
                        <div className={`absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r ${project.gradient}`}></div>
                      )}

                      {/* Image Section */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient}/70 opacity-80`} />
                        
                        {/* Category Badge */}
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-sm text-xs font-medium text-white border border-white/20`}>
                          {project.category}
                        </div>
                        
                        {/* Play button overlay for active card */}
                        {isActive && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                              <Play className="text-white ml-1" size={32} />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-6 h-56 flex flex-col justify-between relative">
                        
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`px-2 py-1 text-xs rounded-lg ${
                                darkMode 
                                  ? 'bg-gray-700/50 text-gray-300' 
                                  : 'bg-gray-100/80 text-gray-600'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                          isActive && hoveredProject === index
                            ? `text-transparent bg-gradient-to-r ${project.gradient} bg-clip-text`
                            : darkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className={`text-sm leading-relaxed flex-grow ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {lang === "es" ? project.descEs : project.descEn}
                        </p>

                        {/* Action Buttons - Only show for active card */}
                        {isActive && (
                          <div className={`flex gap-3 mt-4 transition-all duration-300 ${
                            hoveredProject === index ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-80'
                          }`}>
                            {project.live && project.live !== "#" && (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 text-white bg-gradient-to-r ${project.gradient} hover:shadow-lg hover:scale-105`}
                              >
                                <Globe size={16} />
                                {texts[lang].viewDemo}
                              </a>
                            )}
                            {project.code && project.code !== "#" && (
                              <a
                                href={project.code}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 border ${
                                  darkMode
                                    ? "bg-gray-700/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/70"
                                    : "bg-gray-100/80 border-gray-200/50 text-gray-700 hover:bg-gray-200/80"
                                }`}
                              >
                                <Github size={16} />
                                {texts[lang].viewCode}
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current
                    ? `bg-gradient-to-r ${projects[current].gradient} scale-125`
                    : darkMode 
                      ? 'bg-gray-600 hover:bg-gray-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
}
