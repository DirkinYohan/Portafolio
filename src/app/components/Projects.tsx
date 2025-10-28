"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Github, Sparkles, ChevronLeft, ChevronRight, Globe, Play } from "lucide-react";

// Import JSON data
import portfolioData from '../data/Projects-data.json';

type Lang = "es" | "en";

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
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Extract data from JSON
  const { sections } = portfolioData.Projects;
  const projectsSection = sections.projects;
  const currentContent = projectsSection.content[lang];
  const projects = projectsSection.projects;

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

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      next();
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      prev();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative min-h-fit overflow-hidden transition-all duration-700 ${
        darkMode 
          ? projectsSection.colors.darkMode.background
          : projectsSection.colors.lightMode.background
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

      <div className="relative z-10 px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Enhanced Header */}
          <div className={`text-center mb-8 md:mb-16 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Sparkle decorations */}
            <div className="flex items-center justify-center mb-4 md:mb-6">
              <Sparkles className={`mr-2 md:mr-3 animate-spin duration-[3s] ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} size={20} />
              <span className={`text-sm md:text-base font-medium tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentContent.subtitle}
              </span>
              <Sparkles className={`ml-2 md:ml-3 animate-spin duration-[3s] animation-delay-1000 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} size={20} />
            </div>

            {/* Main title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient bg-size-200">
                {currentContent.title}
              </span>
            </h2>

            {/* Description */}
            <p className={`text-base md:text-lg max-w-2xl mx-auto px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {currentContent.description}
            </p>
          </div>

          {/* Enhanced Carousel */}
          <div className="relative flex items-center justify-center">
            
            {/* Navigation Buttons - Hidden on mobile */}
            <button
              onClick={prev}
              className={`hidden md:block absolute left-4 z-30 p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-110 group ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70 text-white' 
                  : 'bg-white/80 border-gray-200/50 hover:bg-white/90 text-gray-800'
              }`}
            >
              <ChevronLeft className="group-hover:-translate-x-1 transition-transform duration-300" size={24} />
            </button>

            <button
              onClick={next}
              className={`hidden md:block absolute right-4 z-30 p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-110 group ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70 text-white' 
                  : 'bg-white/80 border-gray-200/50 hover:bg-white/90 text-gray-800'
              }`}
            >
              <ChevronRight className="group-hover:translate-x-1 transition-transform duration-300" size={24} />
            </button>

            {/* Carousel Container with Touch Support */}
            <div 
              className="flex items-center justify-center w-full h-[600px] md:h-[520px] overflow-hidden relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {projects.map((project, index) => {
                const position = (index - current + projects.length) % projects.length;
                const isActive = position === 0;
                const isAdjacent = position === 1 || position === projects.length - 1;

                let scale = 0.7;
                let opacity = 0;
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
                    className={`absolute transition-all duration-700 ${blur} ${isActive ? 'block' : 'hidden md:block'}`}
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      opacity,
                      zIndex,
                    }}
                    onMouseEnter={() => setHoveredProject(index)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Project Card */}
                    <div className={`relative w-[340px] md:w-[400px] h-auto md:h-[520px] rounded-3xl overflow-hidden backdrop-blur-sm border group cursor-pointer ${
                      darkMode
                        ? "bg-gray-800/50 border-gray-700/50"
                        : "bg-white/80 border-gray-200/50"
                    } ${isActive ? 'hover:scale-105' : ''}`}>
                      
                      {/* Glow effect for active card */}
                      {isActive && (
                        <div className={`absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r ${project.gradient}`}></div>
                      )}

                      {/* Image Section */}
                      <div className="relative h-48 md:h-64 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient}/70 opacity-80`} />
                        
                        {/* Category Badge */}
                        <div className={`absolute top-3 md:top-4 left-3 md:left-4 px-2 md:px-3 py-1 rounded-full backdrop-blur-sm text-xs font-medium text-white border border-white/20`}>
                          {project.category}
                        </div>
                        
                        {/* Play button overlay for active card */}
                        {isActive && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="p-3 md:p-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                              <Play className="text-white ml-1" size={28} />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-4 md:p-6 flex flex-col justify-between relative">
                        
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`px-2 py-0.5 md:py-1 text-xs rounded-lg ${
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
                        <h3 className={`text-lg md:text-xl font-bold mb-2 md:mb-3 transition-colors duration-300 ${
                          isActive && hoveredProject === index
                            ? `text-transparent bg-gradient-to-r ${project.gradient} bg-clip-text`
                            : darkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className={`text-xs md:text-sm leading-relaxed mb-3 md:mb-4 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {project.description[lang]}
                        </p>

                        {/* Action Buttons - Always show both buttons for all cards */}
                        <div className={`flex gap-2 md:gap-3 transition-all duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-70'
                        }`}>
                          {/* Demo Button */}
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-2.5 md:py-3 px-3 md:px-4 rounded-xl text-sm font-medium transition-all duration-300 text-white bg-gradient-to-r ${project.gradient} hover:shadow-lg ${
                              isActive ? 'hover:scale-105' : 'hover:opacity-90'
                            }`}
                          >
                            <Globe size={14} />
                            {currentContent.viewDemo}
                          </a>
                          
                          {/* Code Button */}
                          <a
                            href={project.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-2.5 md:py-3 px-3 md:px-4 rounded-xl text-sm font-medium transition-all duration-300 border ${
                              darkMode
                                ? "bg-gray-700/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/70"
                                : "bg-gray-100/80 border-gray-200/50 text-gray-700 hover:bg-gray-200/80"
                            } ${isActive ? 'hover:scale-105' : 'hover:opacity-90'}`}
                          >
                            <Github size={14} />
                            {currentContent.viewCode}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 md:gap-3 mt-8 md:mt-12">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
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