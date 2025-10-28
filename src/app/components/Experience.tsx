"use client";

import { useState, useEffect, useRef } from "react";
import { Briefcase, Calendar, Building, GraduationCap, Sparkles, Trophy, MapPin, Clock, Award } from "lucide-react";

// Import JSON data
import portfolioData from '../data/Experience-data.json';

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

  // Extract data from JSON
  const { sections } = portfolioData.Experience;
  const experienceSection = sections.experience;
  const currentContent = experienceSection.content[lang];
  const academicExperience = experienceSection.academicExperience;
  const workExperience = experienceSection.workExperience;
  const gradients = experienceSection.gradients;

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

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`relative min-h-fit overflow-hidden transition-all duration-700 ${
        darkMode 
          ? experienceSection.colors.darkMode.background
          : experienceSection.colors.lightMode.background
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
                {currentContent.subtitle}
              </span>
              <Sparkles className={`ml-3 animate-spin duration-[3s] animation-delay-1000 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} size={24} />
            </div>

            {/* Main title */}
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient bg-size-200">
                {currentContent.title}
              </span>
            </h2>

            {/* Description */}
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {currentContent.description}
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Column - Academic Experience */}
            <div className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <div className="flex items-center gap-4 mb-12">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${gradients.academic.icon} text-white shadow-lg`}>
                  <GraduationCap size={28} />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold text-transparent bg-gradient-to-r ${gradients.academic.text} bg-clip-text`}>
                    {currentContent.academic}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                    {currentContent.academicSubtitle}
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
                    {/* Lateral glow effects - Solo en desktop */}
                    <div className="hidden lg:block absolute -left-4 top-1/2 transform -translate-y-1/2 w-4 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`w-full h-full bg-gradient-to-r ${gradients.academic.hover} rounded-full blur-lg animate-pulse`}></div>
                    </div>
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-4 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`w-full h-full bg-gradient-to-l ${gradients.academic.hover} rounded-full blur-lg animate-pulse`}></div>
                    </div>

                    {/* Card Container - Simplificado en móvil */}
                    <div className={`relative p-6 lg:p-8 rounded-3xl backdrop-blur-sm border transition-all duration-500 lg:hover:scale-105 ${
                      darkMode
                        ? "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70"
                        : "bg-white/80 border-gray-200/50 hover:bg-white/90"
                    }`}>
                      
                      <div className="flex items-start gap-4 lg:gap-6">
                        {/* Academic icon - Simplificado en móvil */}
                        <div className={`p-2 lg:p-3 rounded-xl transition-all duration-300 ${
                          activeCard === index
                            ? `bg-gradient-to-r ${gradients.academic.hover} text-white rotate-12 scale-110` 
                            : darkMode 
                              ? 'bg-purple-500/20 text-purple-400' 
                              : 'bg-purple-100 text-purple-600'
                        }`}>
                          <GraduationCap size={20} className="lg:w-6 lg:h-6" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-4 mb-4">
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-lg lg:text-xl font-bold mb-2 transition-colors duration-300 ${
                                activeCard === index
                                  ? `text-transparent bg-gradient-to-r ${gradients.academic.hover} bg-clip-text`
                                  : darkMode ? 'text-white' : 'text-gray-800'
                              }`}>
                                {exp.degree[lang]}
                              </h4>
                              
                              {/* Institution and period */}
                              <div className="flex flex-col gap-2 text-sm">
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
                            
                            <div className="flex lg:flex-col lg:items-end lg:text-right gap-2 lg:gap-1">
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                              }`}>
                                {exp.level}
                              </div>
                              <div className={`text-xs flex items-center gap-1 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                <Award size={12} />
                                {exp.grade}
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className={`mb-4 leading-relaxed text-sm lg:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {exp.description[lang]}
                          </p>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className={`px-3 py-1 text-xs rounded-lg transition-colors duration-300 ${
                                  activeCard === index
                                    ? `bg-gradient-to-r ${gradients.academic.hover} text-white`
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
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${gradients.work.icon} text-white shadow-lg`}>
                  <Briefcase size={28} />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold text-transparent bg-gradient-to-r ${gradients.work.text} bg-clip-text`}>
                    {currentContent.work}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                    {currentContent.workSubtitle}
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
                    {/* Lateral glow effects - Solo en desktop */}
                    <div className="hidden lg:block absolute -left-4 top-1/2 transform -translate-y-1/2 w-4 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`w-full h-full bg-gradient-to-r ${gradients.work.hover} rounded-full blur-lg animate-pulse`}></div>
                    </div>
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-4 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`w-full h-full bg-gradient-to-l ${gradients.work.hover} rounded-full blur-lg animate-pulse`}></div>
                    </div>

                    {/* Card Container - Simplificado en móvil */}
                    <div className={`relative p-6 lg:p-8 rounded-3xl backdrop-blur-sm border transition-all duration-500 lg:hover:scale-105 ${
                      darkMode
                        ? "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70"
                        : "bg-white/80 border-gray-200/50 hover:bg-white/90"
                    }`}>
                      
                      <div className="flex items-start gap-4 lg:gap-6">
                        {/* Work icon - Simplificado en móvil */}
                        <div className={`p-2 lg:p-3 rounded-xl transition-all duration-300 ${
                          activeCard === index + 100
                            ? `bg-gradient-to-r ${gradients.work.hover} text-white rotate-12 scale-110`
                            : darkMode 
                              ? 'bg-indigo-500/20 text-indigo-400' 
                              : 'bg-indigo-100 text-indigo-600'
                        }`}>
                          <Briefcase size={20} className="lg:w-6 lg:h-6" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-4 mb-4">
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-lg lg:text-xl font-bold mb-2 transition-colors duration-300 ${
                                activeCard === index + 100
                                  ? `text-transparent bg-gradient-to-r ${gradients.work.hover} bg-clip-text`
                                  : darkMode ? 'text-white' : 'text-gray-800'
                              }`}>
                                {exp.role[lang]}
                              </h4>
                              <div className="flex flex-col gap-2 text-sm">
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
                          <p className={`mb-4 leading-relaxed text-sm lg:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {exp.description[lang]}
                          </p>

                          {/* Achievements */}
                          <div className="space-y-2">
                            <h5 className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {currentContent.achievements}:
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {exp.achievements.map((achievement, achIndex) => (
                                <span
                                  key={achIndex}
                                  className={`px-3 py-1 text-xs rounded-lg transition-colors duration-300 ${
                                    activeCard === index + 100
                                      ? `bg-gradient-to-r ${gradients.work.hover} text-white`
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