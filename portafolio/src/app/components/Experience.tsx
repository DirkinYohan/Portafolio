"use client";

import { useState, useEffect, useRef } from "react";
import { Briefcase, Calendar, Building, GraduationCap, Sparkles, Trophy, MapPin, Clock, Award } from "lucide-react";

export default function Experience({
  lang,
  darkMode,
}: {
  lang: "es" | "en";
  darkMode: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState<number | null>(null);
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

  const texts = {
    es: {
      title: "Experiencia",
      subtitle: "Mi trayectoria profesional",
      desc: "Un recorrido por mi formación académica y experiencia profesional en el desarrollo de software.",
      academic: "Formación Académica",
      work: "Experiencia Laboral",
      present: "Actualidad",
      duration: "Duración"
    },
    en: {
      title: "Experience",
      subtitle: "My professional journey",
      desc: "A journey through my academic background and professional experience in software development.",
      academic: "Academic Background",
      work: "Work Experience",
      present: "Present",
      duration: "Duration"
    }
  };

  const academicExperience = [
    {
      degree: {
        es: "Ingeniería de Software",
        en: "Software Engineering",
      },
      institution: {
        es: "Universidad Nacional",
        en: "National University",
      },
      period: "2017 - 2022",
      description: {
        es: "Formación integral en desarrollo de software, estructuras de datos, bases de datos, ingeniería de requisitos y arquitecturas modernas. Enfoque en metodologías ágiles y buenas prácticas de programación.",
        en: "Comprehensive training in software development, data structures, databases, requirements engineering, and modern architectures. Focus on agile methodologies and programming best practices.",
      },
      skills: ["Algoritmos", "Estructuras de Datos", "Arquitectura de Software"],
      level: "Universitario",
      grade: "Magna Cum Laude"
    },
    {
      degree: {
        es: "Diplomado en Desarrollo Web",
        en: "Web Development Diploma",
      },
      institution: {
        es: "Platzi",
        en: "Platzi",
      },
      period: "2020",
      description: {
        es: "Especialización intensiva en tecnologías modernas como React, Node.js, bases de datos NoSQL y despliegues en la nube. Certificación en desarrollo full-stack.",
        en: "Intensive specialization in modern technologies such as React, Node.js, NoSQL databases, and cloud deployments. Full-stack development certification.",
      },
      skills: ["React", "Node.js", "Cloud Computing"],
      level: "Certificación",
      grade: "Excelencia"
    },
  ];

  const workExperience = [

    {
      role: {
        es: "Frontend Developer",
        en: "Frontend Developer",
      },
      company: {
        es: "Tech Solutions",
        en: "Tech Solutions",
      },
      period: "2021 - 2023",
      description: {
        es: "Desarrollo e implementación de interfaces de usuario modernas y responsivas en React y Angular. Colaboración estrecha con equipos de UX/UI para crear experiencias excepcionales.",
        en: "Development and implementation of modern and responsive user interfaces in React and Angular. Close collaboration with UX/UI teams to create exceptional experiences.",
      },
      achievements: ["20+ componentes reutilizables", "100% responsive design", "Metodologías ágiles"],
      location: "Híbrido",
      type: "Tiempo Completo"
    },
    {
      role: {
        es: "Desarrollador Junior",
        en: "Junior Developer",
      },
      company: {
        es: "Startup Labs",
        en: "Startup Labs",
      },
      period: "2020 - 2021",
      description: {
        es: "Desarrollo de prototipos y MVPs en un entorno startup dinámico. Experiencia en desarrollo ágil, testing automatizado y colaboración en equipos multidisciplinarios.",
        en: "Development of prototypes and MVPs in a dynamic startup environment. Experience in agile development, automated testing, and collaboration in multidisciplinary teams.",
      },
      achievements: ["5 MVPs desarrollados", "Testing automatizado", "Scrum Master"],
      location: "Presencial",
      type: "Medio Tiempo"
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
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
              <pattern id="experience-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke={darkMode ? "rgb(34, 197, 94)" : "rgb(59, 130, 246)"} strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#experience-grid)" />
          </svg>
        </div>

        {/* Floating elements */}
        <div 
          className={`absolute top-1/6 right-1/6 w-36 h-36 rounded-full blur-3xl animate-pulse transition-all duration-1000 ${
            darkMode ? 'bg-purple-500/15' : 'bg-purple-500/10'
          }`}
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div 
          className={`absolute bottom-1/6 left-1/6 w-28 h-28 rounded-full blur-2xl animate-bounce transition-all duration-1000 ${
            darkMode ? 'bg-indigo-500/15' : 'bg-indigo-500/10'
          }`}
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
          }}
        />

        {/* Geometric shapes */}
        <div className={`absolute top-1/4 left-1/5 w-20 h-20 border-2 rotate-45 animate-spin duration-[35s] ${
          darkMode ? 'border-purple-500/20' : 'border-purple-400/15'
        }`}></div>
        <div className={`absolute bottom-1/3 right-1/4 w-16 h-16 border rounded-full animate-pulse ${
          darkMode ? 'border-indigo-500/25' : 'border-indigo-400/20'
        }`}></div>
      </div>

      <div className="relative z-10 px-8 py-20">
        <div className="max-w-6xl mx-auto">
          
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
              <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient bg-size-200">
                {texts[lang].title}
              </span>
            </h2>

            {/* Description */}
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {texts[lang].desc}
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Column - Academic Experience */}
            <div className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <div className="flex items-center gap-4 mb-12">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">
                    {texts[lang].academic}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                    Formación y certificaciones
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {academicExperience.map((exp, index) => (
                  <div
                    key={index}
                    className={`group relative transition-all duration-700 ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    {/* Lateral glow effects */}
                    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-4 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg animate-pulse"></div>
                    </div>
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-4 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-full h-full bg-gradient-to-l from-purple-500 to-pink-500 rounded-full blur-lg animate-pulse"></div>
                    </div>

                    <div className={`relative p-8 rounded-3xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 ${
                      darkMode
                        ? "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70"
                        : "bg-white/80 border-gray-200/50 hover:bg-white/90"
                    }`}>
                      
                      <div className="flex items-start gap-6">
                        {/* Academic icon */}
                        <div className={`p-3 rounded-xl transition-all duration-300 ${
                          activeCard === index 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rotate-12 scale-110' 
                            : darkMode 
                              ? 'bg-purple-500/20 text-purple-400' 
                              : 'bg-purple-100 text-purple-600'
                        }`}>
                          <GraduationCap size={24} />
                        </div>
                        
                        <div className="flex-1">
                          {/* Header */}
                          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                            <div>
                              <h4 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                                activeCard === index
                                  ? 'text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text'
                                  : darkMode ? 'text-white' : 'text-gray-800'
                              }`}>
                                {exp.degree[lang]}
                              </h4>
                              <div className="flex items-center gap-4 text-sm">
                                <span className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  <Building size={16} />
                                  {exp.institution[lang]}
                                </span>
                                <span className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  <Calendar size={16} />
                                  {exp.period}
                                </span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                              }`}>
                                {exp.level}
                              </div>
                              <div className={`mt-1 text-xs flex items-center gap-1 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                <Award size={12} />
                                {exp.grade}
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className={`mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {exp.description[lang]}
                          </p>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className={`px-3 py-1 text-xs rounded-lg transition-colors duration-300 ${
                                  activeCard === index
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                    : darkMode 
                                      ? 'bg-gray-700/50 text-gray-300' 
                                      : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Work Experience */}
            <div className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              <div className="flex items-center gap-4 mb-12">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
                  <Briefcase size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
                    {texts[lang].work}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                    Trayectoria profesional
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {workExperience.map((exp, index) => (
                  <div
                    key={index}
                    className={`group relative transition-all duration-700 ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                    style={{ animationDelay: `${(index + 3) * 200}ms` }}
                    onMouseEnter={() => setActiveCard(index + 100)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    {/* Lateral glow effects */}
                    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-4 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-lg animate-pulse"></div>
                    </div>
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-4 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-full h-full bg-gradient-to-l from-indigo-500 to-purple-500 rounded-full blur-lg animate-pulse"></div>
                    </div>

                    <div className={`relative p-8 rounded-3xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 ${
                      darkMode
                        ? "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70"
                        : "bg-white/80 border-gray-200/50 hover:bg-white/90"
                    }`}>
                      
                      <div className="flex items-start gap-6">
                        {/* Work icon */}
                        <div className={`p-3 rounded-xl transition-all duration-300 ${
                          activeCard === index + 100
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rotate-12 scale-110'
                            : darkMode 
                              ? 'bg-indigo-500/20 text-indigo-400' 
                              : 'bg-indigo-100 text-indigo-600'
                        }`}>
                          <Briefcase size={24} />
                        </div>
                        
                        <div className="flex-1">
                          {/* Header */}
                          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                            <div>
                              <h4 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                                activeCard === index + 100
                                  ? 'text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text'
                                  : darkMode ? 'text-white' : 'text-gray-800'
                              }`}>
                                {exp.role[lang]}
                              </h4>
                              <div className="flex flex-wrap items-center gap-4 text-sm">
                                <span className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  <Building size={16} />
                                  {exp.company[lang]}
                                </span>
                                <span className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  <Calendar size={16} />
                                  {exp.period}
                                </span>
                                <span className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  <MapPin size={16} />
                                  {exp.location}
                                </span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
                              }`}>
                                {exp.type}
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className={`mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {exp.description[lang]}
                          </p>

                          {/* Achievements */}
                          <div className="space-y-2">
                            <h5 className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Logros destacados:
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {exp.achievements.map((achievement, achIndex) => (
                                <span
                                  key={achIndex}
                                  className={`px-3 py-1 text-xs rounded-lg transition-colors duration-300 ${
                                    activeCard === index + 100
                                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                                      : darkMode 
                                        ? 'bg-gray-700/50 text-gray-300' 
                                        : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {achievement}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
