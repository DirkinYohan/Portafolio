"use client";
import Image from "next/image";
import { Code2, Target, Heart, Sparkles, Award } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function About({
  lang,
  darkMode,
}: {
  lang: "es" | "en";
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
      { threshold: 0.1 } // Reducido el threshold para que se active antes
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

  // Función para manejar el scroll suave si es necesario
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#about' && sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const texts = {
    es: {
      title: "Sobre mí",
      subtitle: "Descubre mi historia",
      desc: "Soy Dirkin, un arquitecto digital apasionado por transformar ideas complejas en soluciones elegantes y funcionales. Con una mentalidad innovadora, me especializo en crear experiencias digitales que no solo cumplen objetivos técnicos, sino que también inspiran y conectan con las personas.",
      cards: [
        { 
          icon: <Code2 size={28} />, 
          title: "Tecnología", 
          text: "Dominio avanzado en tecnologías emergentes y frameworks modernos para crear soluciones robustas y escalables.",
          gradient: "from-blue-500 to-cyan-500"
        },
        { 
          icon: <Target size={28} />, 
          title: "Precisión", 
          text: "Enfoque meticuloso en cada detalle, garantizando resultados que superan expectativas y estándares de calidad.",
          gradient: "from-green-500 to-emerald-500"
        },
        { 
          icon: <Heart size={28} />, 
          title: "Pasión", 
          text: "Cada proyecto es una oportunidad de innovar y crear impacto positivo a través del código y el diseño.",
          gradient: "from-purple-500 to-pink-500"
        },
      ],
    },
    en: {
      title: "About Me",
      subtitle: "Discover my journey",
      desc: "I'm Dirkin, a digital architect passionate about transforming complex ideas into elegant and functional solutions. With an innovative mindset, I specialize in creating digital experiences that not only meet technical objectives but also inspire and connect with people.",
      cards: [
        { 
          icon: <Code2 size={28} />, 
          title: "Technology", 
          text: "Advanced expertise in emerging technologies and modern frameworks to create robust and scalable solutions.",
          gradient: "from-blue-500 to-cyan-500"
        },
        { 
          icon: <Target size={28} />, 
          title: "Precision", 
          text: "Meticulous focus on every detail, ensuring results that exceed expectations and quality standards.",
          gradient: "from-green-500 to-emerald-500"
        },
        { 
          icon: <Heart size={28} />, 
          title: "Passion", 
          text: "Every project is an opportunity to innovate and create positive impact through code and design.",
          gradient: "from-purple-500 to-pink-500"
        },
      ],
    },
  };

  // Tech logos data similar al Hero
  const techLogos = [
    { name: "React", delay: 0, x: 10, y: 20 },
    { name: "Next.js", delay: 500, x: 85, y: 15 },
    { name: "TypeScript", delay: 1000, x: 15, y: 75 },
    { name: "Node.js", delay: 1500, x: 80, y: 80 },
    { name: "Python", delay: 2000, x: 25, y: 45 },
    { name: "Docker", delay: 2500, x: 75, y: 50 },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`min-h-screen relative overflow-hidden transition-all duration-500 font-sans scroll-mt-20 ${
        darkMode 
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black" 
          : "bg-gradient-to-br from-slate-50 via-white to-gray-100"
      }`}
    >
      
      {/* Dynamic Background Grid - Estilo Hero */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${darkMode ? 'opacity-20' : 'opacity-10'}`}>
        <div 
          className="absolute inset-0 transition-all duration-1000 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="about-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke={darkMode ? "rgb(34, 197, 94)" : "rgb(59, 130, 246)"} strokeWidth="0.5" opacity={darkMode ? "0.3" : "0.2"}/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      {/* Floating Tech Logos - Estilo Hero */}
      <div className="absolute inset-0 pointer-events-none">
        {techLogos.map((logo, index) => (
          <div
            key={logo.name}
            className={`absolute text-xs font-bold px-3 py-1 backdrop-blur-sm border rounded-full transition-all duration-1000 hover:scale-110 ${
              darkMode 
                ? 'bg-gray-800/60 border-gray-700/50 text-green-400' 
                : 'bg-white/80 border-gray-300/50 text-blue-600'
            } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
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

      {/* Floating Geometric Shapes - Estilo Hero */}
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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-20">
        
        {/* Enhanced Header - Estilo Hero */}
        <div className={`max-w-6xl w-full text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Sparkle icon - Estilo Hero */}
          <div className="flex items-center justify-center mb-6">
            <Sparkles className={`mr-3 animate-pulse ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} size={24} />
            <span className={`text-lg font-normal tracking-normal ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {texts[lang].subtitle}
            </span>
            <Sparkles className={`ml-3 animate-pulse ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} size={24} />
          </div>

          {/* Main title with Hero styling */}
          <h2 className="mb-8 text-5xl font-semibold leading-tight lg:text-6xl">
            <span className="text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text bg-size-200 animate-gradient">
              {texts[lang].title}
            </span>
          </h2>
        </div>

        {/* Main Content - Layout similar al Hero */}
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl w-full">
          
          {/* Enhanced Image Section - Estilo Hero */}
          <div className={`flex-1 flex justify-center transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-32 opacity-0'
          }`}>
            <div className="relative group">
              
              {/* Animated rings - Estilo Hero */}
              <div className={`absolute -inset-8 rounded-full border-2 animate-spin duration-[15s] ${
                darkMode ? 'border-green-500/30' : 'border-blue-500/40'
              }`}></div>
              <div className={`absolute -inset-12 rounded-full border animate-spin duration-[20s] animation-direction-reverse ${
                darkMode ? 'border-blue-500/20' : 'border-green-500/30'
              }`}></div>
              <div className={`absolute -inset-16 rounded-full border animate-spin duration-[25s] ${
                darkMode ? 'border-purple-500/10' : 'border-purple-500/20'
              }`}></div>
              
              {/* Main image container */}
              <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-full blur-xl animate-pulse ${
                  darkMode 
                    ? 'bg-gradient-to-r from-green-500/30 via-blue-500/30 to-purple-500/30' 
                    : 'bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20'
                }`}></div>
                
                {/* Image wrapper - Estilo Hero */}
                <div className={`relative w-full h-full rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-1 group-hover:scale-105 transition-transform duration-500`}>
                  <div className={`w-full h-full rounded-full overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                    <Image
                      src="/about.png"
                      alt="About me"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                
                {/* Floating elements around image - Estilo Hero */}
                <div className={`absolute -top-6 -right-6 w-4 h-4 rounded-full animate-bounce delay-100 ${
                  darkMode ? 'bg-green-400' : 'bg-green-500'
                }`}></div>
                <div className={`absolute -bottom-4 -left-4 w-3 h-3 rounded-full animate-bounce delay-300 ${
                  darkMode ? 'bg-blue-400' : 'bg-blue-500'
                }`}></div>
                <div className={`absolute top-1/2 -right-8 w-2 h-2 rounded-full animate-ping delay-500 ${
                  darkMode ? 'bg-purple-400' : 'bg-purple-500'
                }`}></div>
                
                {/* Achievement badges - Estilo Hero */}
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full backdrop-blur-sm border transition-all duration-500 hover:scale-110 ${
                  darkMode ? 'bg-gray-800/80 border-gray-700/50 text-yellow-400' : 'bg-white/80 border-gray-300/50 text-yellow-500'
                }`}>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Award size={16} />
                    {lang === "es" ? "Desarrollador" : "Developer"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Text Content - Estilo Hero */}
          <div className={`flex-1 space-y-8 transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-32 opacity-0'
          }`}>
            
            {/* Main description with Hero typography */}
            <div className="relative">
              <p className={`text-lg leading-relaxed mb-8 font-normal ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {texts[lang].desc}
              </p>
              
              {/* Quote mark decoration */}
              <div className={`absolute -top-4 -left-4 text-4xl opacity-20 ${
                darkMode ? 'text-green-400' : 'text-blue-500'
              }`}>"</div>
            </div>

            {/* Enhanced Cards Grid - Estilo Hero */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {texts[lang].cards.map((card, i) => (
                <div
                  key={i}
                  className={`group relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                    darkMode
                      ? "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70"
                      : "bg-white/80 border-gray-200/50 hover:bg-white/90"
                  } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  style={{ animationDelay: `${(i + 1) * 150}ms` }}
                  onMouseEnter={() => setActiveCard(i)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Glow effect - Estilo Hero */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r ${card.gradient}`}></div>
                  
                  {/* Card content */}
                  <div className="relative z-10">
                    <div className={`flex items-center gap-4 mb-4 transition-all duration-300 ${
                      activeCard === i ? 'scale-110' : ''
                    }`}>
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${card.gradient} text-white group-hover:rotate-12 transition-transform duration-300`}>
                        {card.icon}
                      </div>
                      <h3 className={`text-lg font-medium transition-colors duration-300 ${
                        activeCard === i 
                          ? `text-transparent bg-gradient-to-r ${card.gradient} bg-clip-text` 
                          : darkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {card.title}
                      </h3>
                    </div>
                    
                    <p className={`text-sm leading-relaxed font-normal transition-colors duration-300 ${
                      darkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'
                    }`}>
                      {card.text}
                    </p>
                  </div>
                </div>
              ))}
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
      `}</style>

      {/* Font family styles for Aptos */}
      <style jsx global>{`
        .font-sans {
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }
      `}</style>
    </section>
  );
}