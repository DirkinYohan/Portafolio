"use client";
import { Sun, Moon, Globe, Briefcase, User, Code2, MessageSquare, Mail, ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Hero({
  lang,
  setLang,
  darkMode,
  setDarkMode,
}: {
  lang: "es" | "en";
  setLang: (l: "es" | "en") => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeNav, setActiveNav] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const texts = {
    es: {
      title: "Dirkin Developer",
      subtitle: "Arquitecto de Soluciones Digitales",
      desc: "Transformando ideas en experiencias digitales excepcionales con tecnología de vanguardia y diseño innovador.",
      cta1: "Explorar Proyectos",
      cta2: "Colaboremos",
      nav: [
        { name: "Proyectos", icon: <Briefcase size={18} /> },
        { name: "Perfil", icon: <User size={18} /> },
        { name: "Stack Tech", icon: <Code2 size={18} /> },
        { name: "Reviews", icon: <MessageSquare size={18} /> },
        { name: "Conectar", icon: <Mail size={18} /> },
      ],
    },
    en: {
      title: "Dirkin Developer",
      subtitle: "Digital Solutions Architect",
      desc: "Transforming ideas into exceptional digital experiences with cutting-edge technology and innovative design.",
      cta1: "Explore Projects",
      cta2: "Let's Collaborate",
      nav: [
        { name: "Projects", icon: <Briefcase size={18} /> },
        { name: "Profile", icon: <User size={18} /> },
        { name: "Tech Stack", icon: <Code2 size={18} /> },
        { name: "Reviews", icon: <MessageSquare size={18} /> },
        { name: "Connect", icon: <Mail size={18} /> },
      ],
    },
  };

  // Tech logos data
  const techLogos = [
    { name: "React", delay: 0, x: 10, y: 20 },
    { name: "Next.js", delay: 500, x: 85, y: 15 },
    { name: "TypeScript", delay: 1000, x: 15, y: 75 },
    { name: "Node.js", delay: 1500, x: 80, y: 80 },
    { name: "Python", delay: 2000, x: 25, y: 45 },
    { name: "Docker", delay: 2500, x: 75, y: 50 },
  ];

  return (
    <section className={`min-h-screen flex flex-col ${inter.className} relative overflow-hidden transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
        : 'bg-gradient-to-br from-slate-50 via-white to-gray-100'
    }`}>
      
      {/* Dynamic Background Grid */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${darkMode ? 'opacity-20' : 'opacity-10'}`}>
        <div 
          className="absolute inset-0 transition-all duration-1000 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke={darkMode ? "rgb(34, 197, 94)" : "rgb(59, 130, 246)"} strokeWidth="0.5" opacity={darkMode ? "0.3" : "0.2"}/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/6 w-32 h-32 border rounded-full animate-spin duration-[20s] ${
          darkMode ? 'border-green-500/30' : 'border-blue-500/30'
        }`}></div>
        <div className={`absolute bottom-1/3 right-1/5 w-24 h-24 rotate-45 animate-pulse ${
          darkMode ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' : 'bg-gradient-to-r from-blue-400/15 to-purple-400/15'
        }`}></div>
        <div className={`absolute top-1/2 right-1/4 w-16 h-16 border-2 animate-bounce ${
          darkMode ? 'border-cyan-500/40' : 'border-cyan-400/30'
        }`}></div>
        <div className={`absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full animate-ping ${
          darkMode ? 'bg-gradient-to-r from-pink-500/20 to-yellow-500/20' : 'bg-gradient-to-r from-pink-400/15 to-yellow-400/15'
        }`}></div>
      </div>

      {/* Floating Tech Logos */}
      <div className="absolute inset-0 pointer-events-none">
        {techLogos.map((logo, index) => (
          <div
            key={logo.name}
            className={`absolute text-xs font-bold px-3 py-1 backdrop-blur-sm border rounded-full transition-all duration-1000 hover:scale-110 ${
              darkMode 
                ? 'bg-gray-800/60 border-gray-700/50 text-green-400' 
                : 'bg-white/80 border-gray-300/50 text-blue-600'
            } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{
              left: `${logo.x}%`,
              top: `${logo.y}%`,
              animationDelay: `${logo.delay}ms`,
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            }}
          >
            {logo.name}
          </div>
        ))}
      </div>

      {/* NAVBAR */}
      <nav className={`flex items-center justify-between px-8 py-6 border-b fixed w-full top-0 left-0 z-50 backdrop-blur-2xl transition-all duration-700 ${
        darkMode 
          ? 'border-gray-800/50 bg-gray-900/70' 
          : 'border-gray-200/50 bg-white/70'
      } ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        
        {/* Enhanced Logo */}
        <div className="relative group">
          <div className="absolute transition-all duration-500 rounded-lg opacity-0 -inset-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 group-hover:opacity-100 blur-lg"></div>
          <span className="relative text-3xl font-black text-transparent cursor-pointer bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text">
            D
          </span>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-purple-400 group-hover:w-full transition-all duration-500"></div>
        </div>

        {/* Premium Navigation */}
        <ul className="hidden space-x-2 lg:flex">
          {texts[lang].nav.map((item, i) => (
            <li
              key={i}
              className="relative group"
              onMouseEnter={() => setActiveNav(i)}
              onMouseLeave={() => setActiveNav(null)}
            >
              <div className={`flex items-center space-x-2 cursor-pointer py-3 px-5 rounded-xl transition-all duration-300 relative z-10 ${
                darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-100/50'
              }`}>
                <div className={`transition-all duration-300 ${activeNav === i ? 'text-green-400 scale-125 rotate-12' : `${darkMode ? 'text-gray-500' : 'text-gray-600'} group-hover:text-green-400`}`}>
                  {item.icon}
                </div>
                <span className={`font-medium transition-all duration-300 ${activeNav === i ? 'text-green-400' : `${darkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}`}>
                  {item.name}
                </span>
              </div>
              
              {/* Animated background */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm`}></div>
              
              {/* Bottom indicator */}
              <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full transition-all duration-300 ${activeNav === i ? 'w-full' : 'group-hover:w-3/4'}`}></div>
            </li>
          ))}
        </ul>

        {/* Enhanced Controls */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`relative p-3 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-110 hover:rotate-180 group ${
              darkMode 
                ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50' 
                : 'bg-white/50 border-gray-300/50 hover:bg-gray-100/50'
            }`}
          >
            <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 group-hover:opacity-100"></div>
            {darkMode ? (
              <Sun size={20} className="relative z-10 text-yellow-400" />
            ) : (
              <Moon size={20} className="relative z-10 text-gray-700" />
            )}
          </button>
          
          <button 
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className={`relative p-3 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-110 group ${
              darkMode 
                ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50' 
                : 'bg-white/50 border-gray-300/50 hover:bg-gray-100/50'
            }`}
          >
            <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 group-hover:opacity-100"></div>
            <Globe size={20} className={`group-hover:rotate-180 transition-transform duration-500 relative z-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </button>
        </div>
      </nav>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-8 pt-40 space-y-12 text-center lg:flex-row lg:text-left lg:pt-48 lg:space-y-0 lg:space-x-16">
        
        {/* Enhanced Profile Section */}
        <div className={`relative transition-all duration-1200 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-32 opacity-0'}`}>
          
          {/* Main Profile Image */}
          <div className="relative group">
            {/* Animated rings */}
            <div className="absolute -inset-8 rounded-full border-2 border-green-500/30 animate-spin duration-[8s]"></div>
            <div className="absolute -inset-12 rounded-full border border-blue-500/20 animate-spin duration-[12s] animation-direction-reverse"></div>
            <div className="absolute -inset-16 rounded-full border border-purple-500/10 animate-spin duration-[16s]"></div>
            
            {/* Profile container */}
            <div className="relative w-56 h-56 lg:w-72 lg:h-72">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/30 via-blue-500/30 to-purple-500/30 blur-xl animate-pulse"></div>
              
              {/* Image container */}
              <div className="relative w-full h-full p-1 overflow-hidden transition-transform duration-500 border-4 border-transparent rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 group-hover:scale-105">
                <div className="w-full h-full overflow-hidden bg-gray-900 rounded-full">
                  <Image 
                    src="/avatar.png" 
                    alt="Dirkin Developer" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
              </div>
            </div>
            
            {/* Floating particles */}
            <div className="absolute w-4 h-4 delay-100 bg-green-400 rounded-full -top-6 -right-6 animate-bounce"></div>
            <div className="absolute w-3 h-3 delay-300 bg-blue-400 rounded-full -bottom-4 -left-4 animate-bounce"></div>
            <div className="absolute w-2 h-2 delay-500 bg-purple-400 rounded-full top-1/2 -right-8 animate-ping"></div>
          </div>
        </div>

        {/* Enhanced Text Content */}
        <div className={`max-w-3xl transition-all duration-1200 delay-400 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-32 opacity-0'}`}>
          
          {/* Animated greeting */}
          <div className="flex items-center justify-center mb-6 lg:justify-start">
            <Sparkles className="mr-3 text-yellow-400 animate-pulse" size={24} />
            <span className={`text-lg font-light tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Welcome to my digital universe</span>
          </div>

          {/* Main title */}
          <h1 className="mb-8 text-6xl font-black leading-none lg:text-8xl">
            <span className={`bg-clip-text text-transparent animate-pulse ${
              darkMode 
                ? 'bg-gradient-to-r from-white via-gray-200 to-gray-400' 
                : 'bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500'
            }`}>
              {texts[lang].title.split(' ')[0]}
            </span>
            <br />
            <span className="text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text bg-size-200 animate-gradient">
              {texts[lang].title.split(' ')[1]}
            </span>
          </h1>
          
          {/* Subtitle with typewriter effect */}
          <h2 className="relative mb-8 text-2xl font-bold lg:text-4xl">
            <span className="text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text">
              {texts[lang].subtitle}
            </span>
            <span className="ml-2 text-green-400 animate-pulse">|</span>
          </h2>
          
          {/* Description */}
          <p className={`text-xl leading-relaxed mb-12 max-w-2xl opacity-90 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {texts[lang].desc}
          </p>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col justify-center gap-6 sm:flex-row lg:justify-start">
            <button className="relative px-10 py-5 overflow-hidden font-bold text-white transition-all duration-500 group bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl hover:shadow-2xl hover:shadow-green-500/25 hover:scale-105">
              <span className="relative z-10 flex items-center justify-center gap-3">
                {texts[lang].cta1}
                <Code2 className="transition-transform duration-300 group-hover:rotate-90" size={20} />
              </span>
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 group-hover:opacity-100"></div>
              <div className="absolute transition-opacity duration-300 opacity-0 -inset-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl blur-lg group-hover:opacity-100 -z-10"></div>
            </button>
            
            <button className={`group relative px-10 py-5 border-2 rounded-2xl font-bold overflow-hidden transition-all duration-500 hover:scale-105 ${
              darkMode 
                ? 'border-gray-600 text-gray-300 hover:border-transparent' 
                : 'border-gray-400 text-gray-700 hover:border-transparent'
            }`}>
              <span className={`relative z-10 flex items-center justify-center gap-3 ${darkMode ? 'group-hover:text-white' : 'group-hover:text-gray-900'}`}>
                {texts[lang].cta2}
                <Mail className="group-hover:animate-bounce" size={20} />
              </span>
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 group-hover:opacity-100"></div>
              <div className="absolute inset-0 transition-opacity duration-300 border-2 border-transparent opacity-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl group-hover:opacity-100"></div>
            </button>
          </div>

          {/* Stats or achievements */}
          <div className={`grid grid-cols-3 gap-8 mt-16 pt-8 border-t transition-colors duration-500 ${
            darkMode ? 'border-gray-800/50' : 'border-gray-300/50'
          }`}>
            {[
              { number: "50+", label: "Proyectos" },
              { number: "3+", label: "Años Exp." },
              { number: "100%", label: "Satisfacción" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl font-black text-transparent transition-transform duration-300 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text group-hover:scale-110">
                  {stat.number}
                </div>
                <div className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute flex flex-col items-center transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce">
        <div className={`text-xs mb-2 tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>SCROLL</div>
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center relative overflow-hidden ${
          darkMode ? 'border-gray-600' : 'border-gray-400'
        }`}>
          <div className="w-1 h-3 mt-2 rounded-full bg-gradient-to-b from-green-400 to-blue-400 animate-bounce"></div>
        </div>
        <ChevronDown className={`mt-2 animate-pulse ${darkMode ? 'text-gray-600' : 'text-gray-500'}`} size={16} />
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}