"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Mail, 
  Linkedin, 
  Github, 
  Send, 
  MapPin, 
  Phone, 
  Calendar,
  Sparkles,
  ExternalLink,
  Copy,
  Check
} from "lucide-react";

export default function Contact({
  lang,
  darkMode,
}: {
  lang: "es" | "en";
  darkMode: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('dirkin.developer@email.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email');
    }
  };

  const texts = {
    es: {
      title: "Contacto",
      subtitle: "Conectemos y creemos algo increíble juntos",
      description: "¿Tienes una idea innovadora o un proyecto desafiante? Me encanta colaborar en soluciones digitales que marquen la diferencia. Hablemos sobre cómo puedo ayudarte a transformar tu visión en realidad.",
      email: "Correo Electrónico",
      linkedin: "LinkedIn",
      github: "GitHub",
      location: "Ubicación",
      availability: "Disponibilidad",
      schedule: "Agendar Reunión",
      copyEmail: "Copiar email",
      emailCopied: "Email copiado",
      locationText: "Pasto, Colombia",
      availabilityText: "Disponible para proyectos",
      cta: "Iniciar Conversación"
    },
    en: {
      title: "Contact",
      subtitle: "Let's connect and create something amazing together",
      description: "Do you have an innovative idea or a challenging project? I love collaborating on digital solutions that make a difference. Let's talk about how I can help you transform your vision into reality.",
      email: "Email Address",
      linkedin: "LinkedIn",
      github: "GitHub",
      location: "Location",
      availability: "Availability",
      schedule: "Schedule Meeting",
      copyEmail: "Copy email",
      emailCopied: "Email copied",
      locationText: "Pasto, Colombia",
      availabilityText: "Available for projects",
      cta: "Start Conversation"
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: texts[lang].email,
      value: "dirkinojedarodriguez@gmail.com",
      href: "mailto:dirkinojedarodriguez@gmail.com?subject=Contacto%20desde%20tu%20portafolio&body=Hola%20Dirkin,%20vi%20tu%20portafolio%20y%20me%20gustaría%20ponerme%20en%20contacto.",
      color: "from-red-500 to-pink-500",
      bgColor: darkMode ? "bg-red-500/20" : "bg-red-100",
      textColor: "text-red-500",
      action: copyEmail
    },
    {
      icon: Linkedin,
      label: texts[lang].linkedin,
      value: "@dirkin-developer",
      href: "https://www.linkedin.com/in/johan-ojeda-rodr%C3%ADguez-987625368/",
      color: "from-blue-600 to-blue-500",
      bgColor: darkMode ? "bg-blue-500/20" : "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      icon: Github,
      label: texts[lang].github,
      value: "@dirkin-developer",
      href: "https://github.com/DirkinYohan/Portafolio.git",
      color: "from-gray-700 to-gray-600",
      bgColor: darkMode ? "bg-gray-500/20" : "bg-gray-100",
      textColor: darkMode ? "text-gray-300" : "text-gray-700"
    }
  ];

  const additionalInfo = [
    {
      icon: MapPin,
      label: texts[lang].location,
      value: texts[lang].locationText,
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Calendar,
      label: texts[lang].availability,
      value: texts[lang].availabilityText,
      color: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ${
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
              <pattern id="contact-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke={darkMode ? "rgb(34, 197, 94)" : "rgb(59, 130, 246)"} strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-grid)" />
          </svg>
        </div>

        {/* Floating elements with mouse interaction */}
        <div 
          className={`absolute top-1/6 right-1/6 w-20 h-20 md:w-32 md:h-32 rounded-full blur-3xl animate-pulse transition-all duration-1000 ${
            darkMode ? 'bg-green-500/20' : 'bg-green-500/15'
          }`}
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div 
          className={`absolute bottom-1/6 left-1/6 w-16 h-16 md:w-28 md:h-28 rounded-full blur-2xl animate-bounce transition-all duration-1000 ${
            darkMode ? 'bg-blue-500/20' : 'bg-blue-500/15'
          }`}
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
          }}
        />

        {/* Geometric shapes */}
        <div className={`hidden sm:block absolute top-1/4 left-1/5 w-12 h-12 md:w-16 md:h-16 border-2 rotate-45 animate-spin duration-[20s] ${
          darkMode ? 'border-green-500/30' : 'border-green-400/20'
        }`}></div>
        <div className={`hidden sm:block absolute bottom-1/3 right-1/4 w-8 h-8 md:w-12 md:h-12 border rounded-full animate-ping ${
          darkMode ? 'border-blue-500/40' : 'border-blue-400/30'
        }`}></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Enhanced Header */}
        <div className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Sparkle decorations */}
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <Sparkles className={`mr-2 md:mr-3 animate-spin duration-[3s] ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} size={20} />
            <span className={`text-sm md:text-base font-medium tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {texts[lang].subtitle}
            </span>
            <Sparkles className={`ml-2 md:ml-3 animate-spin duration-[3s] animation-delay-1000 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} size={20} />
          </div>

          {/* Main title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 md:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient bg-size-200">
              {texts[lang].title}
            </span>
          </h2>

          {/* Description */}
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {texts[lang].description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          
          {/* Left Column - Contact Methods */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            
            {/* Contact Methods Cards */}
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${method.color} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  <div className={`relative p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    darkMode
                      ? "bg-gray-800/60 border-gray-700/50 hover:bg-gray-800/80"
                      : "bg-white/90 border-gray-200/50 hover:bg-white"
                  }`}>
                    
                    <div className="flex items-center gap-4 md:gap-6">
                      {/* Icon */}
                      <div className={`relative p-2 md:p-3 lg:p-4 rounded-xl md:rounded-2xl transition-all duration-300 ${
                        hoveredCard === index 
                          ? `bg-gradient-to-r ${method.color} text-white rotate-12 scale-110` 
                          : `${method.bgColor} ${method.textColor}`
                      }`}>
                        <method.icon className="w-6 h-6 md:w-7 md:h-7" />
                        
                        {/* Icon pulse effect */}
                        {hoveredCard === index && (
                          <div className={`absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r ${method.color} animate-ping opacity-20`}></div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-base md:text-lg font-bold mb-1 md:mb-2 transition-colors duration-300 truncate ${
                          hoveredCard === index
                            ? `text-transparent bg-gradient-to-r ${method.color} bg-clip-text`
                            : darkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {method.label}
                        </h3>
                        <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                          {method.value}
                        </p>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                        {method.action && (
                          <button
                            onClick={method.action}
                            className={`p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 hover:scale-110 ${
                              darkMode 
                                ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-400 hover:text-white' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                            }`}
                            title={copiedEmail ? texts[lang].emailCopied : texts[lang].copyEmail}
                          >
                            {copiedEmail ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : <Copy className="w-4 h-4 md:w-5 md:h-5" />}
                          </button>
                        )}
                        
                        <a
                          href={method.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 hover:scale-110 ${
                            darkMode 
                              ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-400 hover:text-white' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                          }`}
                        >
                          <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {additionalInfo.map((info, index) => (
                <div
                  key={index}
                  className={`p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? "bg-gray-800/40 border-gray-700/50"
                      : "bg-white/80 border-gray-200/50"
                  }`}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-r ${info.color} text-white`}>
                      <info.icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className={`text-sm md:text-base font-semibold truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {info.label}
                      </h4>
                      <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                        {info.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - CTA and Visual */}
          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            
            {/* Main CTA Card */}
            <div className="relative group">
              {/* Background glow */}
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              
              <div className={`relative p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 ${
                darkMode
                  ? "bg-gray-800/60 border-gray-700/50"
                  : "bg-white/90 border-gray-200/50"
              }`}>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6">
                  <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full animate-pulse ${
                    darkMode ? 'bg-gradient-to-r from-green-400/20 to-blue-400/20' : 'bg-gradient-to-r from-green-400/30 to-blue-400/30'
                  }`}></div>
                </div>
                
                <div className="text-center">
                  <div className="mb-6 md:mb-8">
                    <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-xl md:rounded-2xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 flex items-center justify-center text-white animate-bounce`}>
                      <Send className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    
                    <h3 className={`text-xl md:text-2xl font-bold mb-3 md:mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {texts[lang].cta}
                    </h3>
                    
                    <p className={`mb-6 md:mb-8 text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {lang === "es" 
                        ? "Estoy aquí para ayudarte a convertir tus ideas en soluciones digitales exitosas."
                        : "I'm here to help you turn your ideas into successful digital solutions."
                      }
                    </p>
                  </div>
                  
                  {/* Premium CTA Button */}
                  <a
                    href="mailto:dirkinojedarodriguez@gmail.com?subject=Contacto%20desde%20tu%20portafolio&body=Hola%20Dirkin,%20vi%20tu%20portafolio%20y%20me%20gustaría%20ponerme%20en%20contacto."
                    className="group relative inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 overflow-hidden font-bold text-white transition-all duration-500 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-xl md:rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-110 text-sm md:text-base"
                  >
                    <span className="relative z-10 flex items-center gap-2 md:gap-3">
                      <Mail className="w-4 h-4 md:w-5 md:h-5" />
                      {lang === "es" ? "Enviar Mensaje" : "Send Message"}
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 group-hover:opacity-100"></div>
                    <div className="absolute transition-opacity duration-300 opacity-0 -inset-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-xl md:rounded-2xl blur-lg group-hover:opacity-100 -z-10"></div>
                  </a>
                </div>
                
                {/* Stats */}
                <div className={`grid grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-12 pt-6 md:pt-8 border-t ${
                  darkMode ? 'border-gray-700/50' : 'border-gray-300/50'
                }`}>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-black text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
                      24h
                    </div>
                    <div className={`text-xs md:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                      {lang === "es" ? "Respuesta" : "Response"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-black text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
                      100%
                    </div>
                    <div className={`text-xs md:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                      {lang === "es" ? "Compromiso" : "Commitment"}
                    </div>
                  </div>
                </div>
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