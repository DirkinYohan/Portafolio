"use client";

import React, { useState, useEffect, useRef } from "react";
import { Code2, Server, Wrench, Sparkles, Database, Palette, Terminal } from "lucide-react";

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
      title: "Habilidades",
      subtitle: "Mi arsenal tecnológico",
      desc: "Domino un amplio stack de tecnologías modernas para crear soluciones completas y escalables.",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Herramientas",
    },
    en: {
      title: "Skills",
      subtitle: "My technology arsenal",
      desc: "I master a wide stack of modern technologies to create complete and scalable solutions.",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools",
    },
  } as const;

  const skills: Record<string, { 
    name: string; 
    icon: React.ReactNode; 
    level: number; 
    gradient: string;
    description: string;
  }[]> = {
    frontend: [
      { 
        name: "HTML5", 
        icon: <Code2 size={20} />, 
        level: 92, 
        gradient: "from-orange-500 to-red-500",
        description: "Semantic markup"
      },
      { 
        name: "CSS3", 
        icon: <Palette size={20} />, 
        level: 90, 
        gradient: "from-blue-500 to-cyan-500",
        description: "Modern styling"
      },
      { 
        name: "Tailwind CSS", 
        icon: <Palette size={20} />, 
        level: 88, 
        gradient: "from-cyan-500 to-teal-500",
        description: "Utility-first CSS"
      },
      { 
        name: "JavaScript", 
        icon: <Terminal size={20} />, 
        level: 94, 
        gradient: "from-yellow-500 to-amber-500",
        description: "Dynamic programming"
      },
      { 
        name: "TypeScript", 
        icon: <Terminal size={20} />, 
        level: 87, 
        gradient: "from-blue-600 to-indigo-600",
        description: "Type-safe JS"
      },
      { 
        name: "React", 
        icon: <Code2 size={20} />, 
        level: 93, 
        gradient: "from-cyan-400 to-blue-400",
        description: "Component library"
      },
      { 
        name: "Next.js", 
        icon: <Code2 size={20} />, 
        level: 90, 
        gradient: "from-gray-800 to-black",
        description: "React framework"
      },
    ],
    backend: [
      { 
        name: "Node.js", 
        icon: <Server size={20} />, 
        level: 86, 
        gradient: "from-green-500 to-emerald-500",
        description: "Server-side JS"
      },
      { 
        name: "Spring Boot", 
        icon: <Server size={20} />, 
        level: 80, 
        gradient: "from-green-600 to-lime-600",
        description: "Java framework"
      },
      { 
        name: "Python", 
        icon: <Terminal size={20} />, 
        level: 82, 
        gradient: "from-blue-500 to-yellow-400",
        description: "Versatile language"
      },
      { 
        name: "MongoDB", 
        icon: <Database size={20} />, 
        level: 80, 
        gradient: "from-green-500 to-green-600",
        description: "NoSQL database"
      },
      { 
        name: "MySQL", 
        icon: <Database size={20} />, 
        level: 78, 
        gradient: "from-blue-600 to-orange-500",
        description: "Relational DB"
      },
    ],
    tools: [
      { 
        name: "Git", 
        icon: <Wrench size={20} />, 
        level: 94, 
        gradient: "from-orange-500 to-red-500",
        description: "Version control"
      },
      { 
        name: "GitHub", 
        icon: <Code2 size={20} />, 
        level: 93, 
        gradient: "from-gray-700 to-gray-900",
        description: "Code hosting"
      },
      { 
        name: "Docker", 
        icon: <Server size={20} />, 
        level: 82, 
        gradient: "from-blue-500 to-cyan-500",
        description: "Containerization"
      },
      { 
        name: "Jenkins", 
        icon: <Wrench size={20} />, 
        level: 72, 
        gradient: "from-blue-600 to-gray-600",
        description: "CI/CD automation"
      },
      { 
        name: "Figma", 
        icon: <Palette size={20} />, 
        level: 76, 
        gradient: "from-purple-500 to-pink-500",
        description: "UI/UX design"
      },
    ],
  };

  const skillCategories = [
    {
      key: 'frontend',
      icon: <Code2 size={28} />,
      title: texts[lang].frontend,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      key: 'backend',
      icon: <Server size={28} />,
      title: texts[lang].backend,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10'
    },
    {
      key: 'tools',
      icon: <Wrench size={28} />,
      title: texts[lang].tools,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
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

          {/* Skills Grid */}
          <div className="grid gap-8 md:gap-12 lg:grid-cols-3">
            {skillCategories.map((category, categoryIndex) => (
              <SkillCard
                key={category.key}
                category={category}
                skills={skills[category.key]}
                darkMode={darkMode}
                isVisible={isVisible}
                categoryIndex={categoryIndex}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
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
}: {
  category: {
    key: string;
    icon: React.ReactNode;
    title: string;
    gradient: string;
    bgGradient: string;
  };
  skills: { 
    name: string; 
    icon: React.ReactNode; 
    level: number; 
    gradient: string;
    description: string;
  }[];
  darkMode: boolean;
  isVisible: boolean;
  categoryIndex: number;
  activeCard: number | null;
  setActiveCard: (index: number | null) => void;
}) {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  return (
    <div
      className={`relative group transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ animationDelay: `${categoryIndex * 200}ms` }}
      onMouseEnter={() => setActiveCard(categoryIndex)}
      onMouseLeave={() => setActiveCard(null)}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl bg-gradient-to-r ${category.gradient}`}></div>
      
      {/* Card container */}
      <div className={`relative rounded-3xl p-8 backdrop-blur-sm border transition-all duration-500 hover:scale-105 ${
        darkMode
          ? "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70"
          : "bg-white/80 border-gray-200/50 hover:bg-white/90"
      }`}>
        
        {/* Card header */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`p-4 rounded-2xl bg-gradient-to-r ${category.gradient} text-white group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
            {category.icon}
          </div>
          <div>
            <h3 className={`text-2xl font-bold transition-colors duration-300 ${
              activeCard === categoryIndex 
                ? `text-transparent bg-gradient-to-r ${category.gradient} bg-clip-text` 
                : darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {category.title}
            </h3>
            <div className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              {skills.length} tecnologías
            </div>
          </div>
        </div>

        {/* Skills list */}
        <div className="space-y-4">
          {skills.map((skill, skillIndex) => (
            <div
              key={skill.name}
              className={`group/skill relative p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                darkMode 
                  ? 'bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/20' 
                  : 'bg-gray-50/50 hover:bg-gray-100/80 border border-gray-200/30'
              } ${hoveredSkill === skillIndex ? 'scale-105 shadow-lg' : ''}`}
              onMouseEnter={() => setHoveredSkill(skillIndex)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Skill glow */}
              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300 blur bg-gradient-to-r ${skill.gradient}/20`}></div>
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Skill icon */}
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${skill.gradient} text-white group-hover/skill:rotate-12 transition-transform duration-300`}>
                    {skill.icon}
                  </div>
                  
                  {/* Skill info */}
                  <div className="flex-1">
                    <div className={`font-semibold mb-1 transition-colors duration-300 ${
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

                {/* Progress bar */}
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${skill.gradient}`}
                      style={{ 
                        width: hoveredSkill === skillIndex ? `${skill.level}%` : '0%',
                        transitionDelay: hoveredSkill === skillIndex ? `${skillIndex * 100}ms` : '0ms'
                      }}
                    />
                  </div>
                  <div className={`text-sm font-bold min-w-[3rem] text-right transition-colors duration-300 ${
                    hoveredSkill === skillIndex
                      ? `text-transparent bg-gradient-to-r ${skill.gradient} bg-clip-text`
                      : darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {skill.level}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category stats */}
        <div className={`mt-6 pt-6 border-t flex justify-between items-center ${
          darkMode ? 'border-gray-700/50' : 'border-gray-300/50'
        }`}>
          <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            Promedio de dominio
          </div>
          <div className={`text-lg font-bold text-transparent bg-gradient-to-r ${category.gradient} bg-clip-text`}>
            {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
          </div>
        </div>
      </div>
    </div>
  );
}
