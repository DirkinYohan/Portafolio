"use client";

import React, { useState, useEffect, useRef, JSX } from "react";
import { Code2, Server, Wrench, Sparkles, Database, Palette, Terminal } from "lucide-react";

// Import JSON data
import portfolioData from '../data/Skills-data.json';

type Lang = "es" | "en";

export default function Skills({
  lang,
  darkMode,
}: {
  lang: Lang;
  darkMode: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // Extract data from JSON
  const { sections } = portfolioData.Skills;
  const skillsSection = sections.skills;
  const currentContent = skillsSection.content[lang];

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

  // Icon mapping function
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      Code2: <Code2 size={20} />,
      Server: <Server size={20} />,
      Wrench: <Wrench size={20} />,
      Sparkles: <Sparkles size={20} />,
      Database: <Database size={20} />,
      Palette: <Palette size={20} />,
      Terminal: <Terminal size={20} />
    };
    return iconMap[iconName] || <Code2 size={20} />;
  };

  // Prepare skill categories with titles
  const skillCategories = skillsSection.skillCategories.map(category => ({
    ...category,
    icon: getIcon(category.icon),
    title: currentContent[category.key as keyof typeof currentContent] as string
  }));

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`relative min-h-fit overflow-hidden transition-all duration-700 ${
        darkMode 
          ? skillsSection.colors.darkMode.background
          : skillsSection.colors.lightMode.background
      }`}
      style={{ fontFamily: 'Aptos, -apple-system, BlinkMacSystemFont, sans-serif' }}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated grid */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${darkMode ? 'opacity-10' : 'opacity-5'}`}>
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="skills-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke={darkMode ? "rgb(34, 197, 94)" : "rgb(59, 130, 246)"} strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#skills-grid)" />
          </svg>
        </div>

        {/* Floating elements */}
        <div 
          className={`absolute top-1/6 right-1/6 w-32 h-32 rounded-full blur-3xl animate-pulse transition-all duration-1000 ${
            darkMode ? 'bg-blue-500/20' : 'bg-blue-500/15'
          }`}
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div 
          className={`absolute bottom-1/6 left-1/6 w-24 h-24 rounded-full blur-2xl animate-bounce transition-all duration-1000 ${
            darkMode ? 'bg-green-500/20' : 'bg-green-500/15'
          }`}
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
          }}
        />

        {/* Geometric shapes */}
        <div className={`absolute top-1/4 left-1/5 w-16 h-16 border-2 rotate-45 animate-spin duration-[25s] ${
          darkMode ? 'border-purple-500/30' : 'border-purple-400/20'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-20 h-20 border rounded-full animate-pulse ${
          darkMode ? 'border-cyan-500/40' : 'border-cyan-400/30'
        }`}></div>
      </div>

      <div className="relative z-10 px-4 sm:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Enhanced Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Sparkle decorations */}
            <div className="flex items-center justify-center mb-6">
              <Sparkles className={`mr-3 animate-spin duration-[3s] ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} size={24} />
              <span className={`text-base font-medium tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentContent.subtitle}
              </span>
              <Sparkles className={`ml-3 animate-spin duration-[3s] animation-delay-1000 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} size={24} />
            </div>

            {/* Main title */}
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient bg-size-200">
                {currentContent.title}
              </span>
            </h2>

            {/* Description */}
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {currentContent.description}
            </p>
          </div>

          {/* Skills Grid - MODIFICADO: 1 columna en móvil, 2 en tablet, 3 en desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {skillCategories.map((category, categoryIndex) => (
              <SkillCard
                key={category.key}
                category={category}
                skills={skillsSection.skills[category.key as keyof typeof skillsSection.skills]}
                darkMode={darkMode}
                isVisible={isVisible}
                categoryIndex={categoryIndex}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
                lang={lang}
                texts={currentContent}
                getIcon={getIcon}
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

function SkillCard({
  category,
  skills,
  darkMode,
  isVisible,
  categoryIndex,
  activeCard,
  setActiveCard,
  lang,
  texts,
  getIcon
}: {
  category: {
    key: string;
    icon: JSX.Element;
    title: string;
    gradient: string;
    bgGradient: string;
  };
  skills: { 
    name: string; 
    icon: string; 
    gradient: string;
    description: string;
  }[];
  darkMode: boolean;
  isVisible: boolean;
  categoryIndex: number;
  activeCard: number | null;
  setActiveCard: (index: number | null) => void;
  lang: Lang;
  texts: any;
  getIcon: (iconName: string) => JSX.Element;
}) {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Función para obtener colores del gradiente
  const getGradientColors = (gradient: string) => {
    const colorMap: { [key: string]: string } = {
      'from-blue-500 to-cyan-500': '59, 130, 246',
      'from-orange-500 to-red-500': '249, 115, 22',
      'from-purple-500 to-pink-500': '168, 85, 247',
      'from-green-500 to-emerald-500': '34, 197, 94',
      'from-yellow-500 to-orange-500': '234, 179, 8',
      'from-indigo-500 to-purple-500': '99, 102, 241',
      'from-cyan-500 to-blue-500': '6, 182, 212',
    };
    return colorMap[gradient] || '59, 130, 246';
  };

  const cardGlowColor = getGradientColors(category.gradient);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ animationDelay: `${categoryIndex * 200}ms` }}
      onMouseEnter={() => setActiveCard(categoryIndex)}
      onMouseLeave={() => setActiveCard(null)}
    >
      {/* Card container con box-shadow para el glow */}
      <div 
        className={`rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur-sm border transition-all duration-500 ${
          darkMode
            ? "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70"
            : "bg-white/80 border-gray-200/50 hover:bg-white/90"
        }`}
        style={{
          boxShadow: activeCard === categoryIndex 
            ? `0 0 20px rgba(${cardGlowColor}, 0.4), 0 0 40px rgba(${cardGlowColor}, 0.2)` 
            : 'none'
        }}
      >
        
        {/* Card header */}
        <div className="flex flex-col items-center text-center mb-4 sm:mb-6 md:mb-8">
          <div className={`p-2 sm:p-3 md:p-4 rounded-2xl bg-gradient-to-r ${category.gradient} text-white group-hover:rotate-12 transition-transform duration-300 shadow-lg mb-3`}>
            {category.icon}
          </div>
          <div>
            <h3 className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-300 ${
              activeCard === categoryIndex 
                ? `text-transparent bg-gradient-to-r ${category.gradient} bg-clip-text` 
                : darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {category.title}
            </h3>
            <div className={`text-xs sm:text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              {skills.length} {texts.technologies}
            </div>
          </div>
        </div>

        {/* Skills list */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          {skills.map((skill, skillIndex) => {
            const skillGlowColor = getGradientColors(skill.gradient);
            
            return (
              <div
                key={skill.name}
                className={`relative p-2 sm:p-3 md:p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                  darkMode 
                    ? 'bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/20' 
                    : 'bg-gray-50/50 hover:bg-gray-100/80 border border-gray-200/30'
                }`}
                style={{
                  boxShadow: hoveredSkill === skillIndex
                    ? `0 0 15px rgba(${skillGlowColor}, 0.3), 0 0 30px rgba(${skillGlowColor}, 0.15)`
                    : 'none'
                }}
                onMouseEnter={() => setHoveredSkill(skillIndex)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="relative flex flex-col items-center text-center gap-2">
                  {/* Skill icon */}
                  <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-r ${skill.gradient} text-white group-hover:rotate-12 transition-transform duration-300 flex-shrink-0`}>
                    {getIcon(skill.icon)}
                  </div>
                  
                  {/* Skill info */}
                  <div className="flex-1 min-w-0 w-full">
                    <div className={`font-semibold text-xs sm:text-sm md:text-base mb-1 transition-colors duration-300 ${
                      hoveredSkill === skillIndex
                        ? `text-transparent bg-gradient-to-r ${skill.gradient} bg-clip-text`
                        : darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {skill.name}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                      {skill.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}