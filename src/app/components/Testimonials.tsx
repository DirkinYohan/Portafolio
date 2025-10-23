"use client";

import { useState, useEffect, useRef } from "react";
import { Star, Quote, Sparkles, ThumbsUp, Heart } from "lucide-react";

// Librería para datos de testimonios
const useTestimonialsData = (lang: "es" | "en") => {
  return [
    {
      name: "Juan Pérez",
      company: "Tech Solutions",
      avatar: "JP",
      role: {
        es: "CTO & Co-fundador",
        en: "CTO & Co-founder",
      },
      message: {
        es: "Dirkin transformó completamente nuestra visión digital. Su enfoque innovador y atención al detalle superaron nuestras expectativas. Un profesional excepcional.",
        en: "Dirkin completely transformed our digital vision. His innovative approach and attention to detail exceeded our expectations. An exceptional professional.",
      },
      rating: 5,
      project: "Plataforma E-commerce",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      name: "María Gómez",
      company: "Innovation Labs",
      avatar: "MG",
      role: {
        es: "Líder de Producto",
        en: "Product Lead",
      },
      message: {
        es: "Trabajar con Dirkin fue una experiencia extraordinaria. Su capacidad para convertir ideas complejas en soluciones elegantes es impresionante. Altamente recomendado.",
        en: "Working with Dirkin was an extraordinary experience. His ability to turn complex ideas into elegant solutions is impressive. Highly recommended.",
      },
      rating: 5,
      project: "App Mobile",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Carlos Rodríguez",
      company: "StartupX",
      avatar: "CR",
      role: {
        es: "CEO & Fundador",
        en: "CEO & Founder",
      },
      message: {
        es: "La dedicación y expertise técnico de Dirkin fueron fundamentales para el éxito de nuestro MVP. Su comunicación clara y entregas puntuales nos dieron total confianza.",
        en: "Dirkin's dedication and technical expertise were fundamental to our MVP's success. His clear communication and timely deliveries gave us complete confidence.",
      },
      rating: 5,
      project: "MVP SaaS",
      gradient: "from-indigo-500 to-cyan-500"
    },
  ];
};

// Componente para tarjeta de testimonio
const TestimonialCard = ({ testimonial, index, isVisible, activeCard, setActiveCard, darkMode, lang }: any) => (
  <div
    className={`group relative transition-all duration-700 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    }`}
    style={{ animationDelay: `${index * 200}ms` }}
    onMouseEnter={() => setActiveCard(index)}
    onMouseLeave={() => setActiveCard(null)}
  >
    {/* Lateral glow effects */}
    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-4 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className={`w-full h-full bg-gradient-to-r ${testimonial.gradient} rounded-full blur-lg animate-pulse`}></div>
    </div>
    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-4 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className={`w-full h-full bg-gradient-to-l ${testimonial.gradient} rounded-full blur-lg animate-pulse`}></div>
    </div>
    <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-32 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className={`w-full h-full bg-gradient-to-b ${testimonial.gradient} rounded-full blur-lg animate-pulse`}></div>
    </div>
    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-32 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className={`w-full h-full bg-gradient-to-t ${testimonial.gradient} rounded-full blur-lg animate-pulse`}></div>
    </div>

    <div className={`relative p-8 rounded-3xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 ${
      darkMode
        ? "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70"
        : "bg-white/80 border-gray-200/50 hover:bg-white/90"
    }`}>
      
      {/* Quote decoration */}
      <div className={`absolute top-6 left-6 opacity-20 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <Quote size={32} />
      </div>

      {/* Header with avatar */}
      <div className="flex items-center mb-6 relative z-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg bg-gradient-to-r ${testimonial.gradient} shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
          {testimonial.avatar}
        </div>
        <div className="ml-4 flex-1">
          <h3 className={`font-bold text-lg transition-colors duration-300 ${
            activeCard === index
              ? `text-transparent bg-gradient-to-r ${testimonial.gradient} bg-clip-text`
              : darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {testimonial.name}
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {testimonial.role[lang]}
          </p>
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {testimonial.company}
          </p>
        </div>
        
        {/* Project badge */}
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          darkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-600'
        }`}>
          {testimonial.project}
        </div>
      </div>

      {/* Message */}
      <p className={`text-base leading-relaxed mb-6 relative z-10 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {testimonial.message[lang]}
      </p>

      {/* Rating and actions */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={`text-yellow-400 fill-current transition-transform duration-300 ${
                activeCard === index ? 'scale-110' : ''
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
          <span className={`ml-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {testimonial.rating}.0
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg transition-colors duration-300 ${
            activeCard === index
              ? `bg-gradient-to-r ${testimonial.gradient} text-white`
              : darkMode 
                ? 'bg-gray-700/50 text-gray-400 hover:bg-gray-700/70' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}>
            <ThumbsUp size={16} />
          </div>
          <div className={`p-2 rounded-lg transition-colors duration-300 ${
            activeCard === index
              ? `bg-gradient-to-r ${testimonial.gradient} text-white`
              : darkMode 
                ? 'bg-gray-700/50 text-gray-400 hover:bg-gray-700/70' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}>
            <Heart size={16} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Testimonials({
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

  const testimonialsData = useTestimonialsData(lang);

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
      title: "Testimonios",
      subtitle: "Lo que dicen mis clientes",
      desc: "La satisfacción de mis clientes es mi mayor logro. Aquí algunas experiencias de quienes han confiado en mi trabajo.",
    },
    en: {
      title: "Testimonials",
      subtitle: "What my clients say",
      desc: "My clients' satisfaction is my greatest achievement. Here are some experiences from those who have trusted my work.",
    }
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
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
              <pattern id="testimonials-grid" width="70" height="70" patternUnits="userSpaceOnUse">
                <path d="M 70 0 L 0 0 0 70" fill="none" stroke={darkMode ? "rgb(34, 197, 94)" : "rgb(59, 130, 246)"} strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#testimonials-grid)" />
          </svg>
        </div>

        {/* Floating elements */}
        <div 
          className={`absolute top-1/5 left-1/6 w-36 h-36 rounded-full blur-3xl animate-pulse transition-all duration-1000 ${
            darkMode ? 'bg-purple-500/15' : 'bg-purple-500/10'
          }`}
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div 
          className={`absolute bottom-1/5 right-1/6 w-28 h-28 rounded-full blur-2xl animate-bounce transition-all duration-1000 ${
            darkMode ? 'bg-indigo-500/15' : 'bg-indigo-500/10'
          }`}
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
          }}
        />

        {/* Geometric shapes */}
        <div className={`absolute top-1/4 right-1/5 w-20 h-20 border-2 rotate-45 animate-spin duration-[40s] ${
          darkMode ? 'border-purple-500/20' : 'border-purple-400/15'
        }`}></div>
        <div className={`absolute bottom-1/3 left-1/4 w-16 h-16 border rounded-full animate-pulse ${
          darkMode ? 'border-indigo-500/25' : 'border-indigo-400/20'
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
              <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient bg-size-200">
                {texts[lang].title}
              </span>
            </h2>

            {/* Description */}
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {texts[lang].desc}
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
                isVisible={isVisible}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
                darkMode={darkMode}
                lang={lang}
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