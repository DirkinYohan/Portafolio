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

// Import JSON data
import portfolioData from '../data/Contact-data.json';

// Icon mapping function
const getIcon = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
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
  };
  return iconMap[iconName] || Mail;
};

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

  // Extract data from JSON
  const { sections, functionalities } = portfolioData.Contact;
  const contactSection = sections.contact;
  const currentContent = contactSection.content[lang];
  const contactInfo = contactSection.contactInfo;
  const contactMethods = contactSection.contactMethods;
  const additionalInfo = contactSection.additionalInfo;
  const stats = contactSection.stats;

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
    if (!functionalities.emailCopy) return;
    
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email');
    }
  };

  // Prepare contact methods with actual data
  const preparedContactMethods = contactMethods.map(method => {
    const IconComponent = getIcon(method.icon);
    const methodData = {
      email: {
        label: currentContent.email,
        value: contactInfo.email,
        href: `mailto:${contactInfo.email}?subject=Contacto%20desde%20tu%20portafolio&body=Hola%20Dirkin,%20vi%20tu%20portafolio%20y%20me%20gustaría%20ponerme%20en%20contacto.`,
        bgColor: darkMode ? "bg-red-500/20" : "bg-red-100",
        textColor: "text-red-500",
        action: method.hasCopyAction ? copyEmail : null
      },
      linkedin: {
        label: currentContent.linkedin,
        value: "@dirkin-developer",
        href: contactInfo.linkedin,
        bgColor: darkMode ? "bg-blue-500/20" : "bg-blue-100",
        textColor: "text-blue-600",
        action: null
      },
      github: {
        label: currentContent.github,
        value: "@dirkin-developer",
        href: contactInfo.github,
        bgColor: darkMode ? "bg-gray-500/20" : "bg-gray-100",
        textColor: darkMode ? "text-gray-300" : "text-gray-700",
        action: null
      }
    };

    return {
      ...method,
      icon: IconComponent,
      ...methodData[method.type as keyof typeof methodData]
    };
  });

  // Prepare additional info with actual data
  const preparedAdditionalInfo = additionalInfo.map(info => {
    const IconComponent = getIcon(info.icon);
    const infoData = {
      location: {
        label: currentContent.location,
        value: contactInfo.location[lang]
      },
      availability: {
        label: currentContent.availability,
        value: contactInfo.availability[lang]
      }
    };

    return {
      ...info,
      icon: IconComponent,
      ...infoData[info.type as keyof typeof infoData]
    };
  });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ${
        darkMode 
          ? contactSection.colors.darkMode.background
          : contactSection.colors.lightMode.background
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
        <div className={`text-center mb-8 md:mb-12 lg:mb-20 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Sparkle decorations */}
          <div className="flex items-center justify-center mb-3 md:mb-4 lg:mb-6">
            <Sparkles className={`mr-2 md:mr-3 animate-spin duration-[3s] ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} size={18} />
            <span className={`text-xs md:text-sm lg:text-base font-medium tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentContent.subtitle}
            </span>
            <Sparkles className={`ml-2 md:ml-3 animate-spin duration-[3s] animation-delay-1000 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} size={18} />
          </div>

          {/* Main title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 lg:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient bg-size-200">
              {currentContent.title}
            </span>
          </h2>

          {/* Description */}
          <p className={`text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {currentContent.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-start lg:items-center">
          
          {/* Left Column - Contact Methods */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            
            {/* Contact Methods Cards */}
            <div className="space-y-3 md:space-y-4 lg:space-y-6 mb-6 md:mb-8 lg:mb-12">
              {preparedContactMethods.map((method, index) => (
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
                  <div className={`absolute -inset-1 bg-gradient-to-r ${method.color} rounded-2xl md:rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  <div className={`relative p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl lg:rounded-3xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    darkMode
                      ? "bg-gray-800/60 border-gray-700/50 hover:bg-gray-800/80"
                      : "bg-white/90 border-gray-200/50 hover:bg-white"
                  }`}>
                    
                    <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
                      {/* Icon */}
                      <div className={`relative p-2 md:p-3 lg:p-4 rounded-lg md:rounded-xl lg:rounded-2xl transition-all duration-300 flex-shrink-0 ${
                        hoveredCard === index 
                          ? `bg-gradient-to-r ${method.color} text-white rotate-12 scale-110` 
                          : `${method.bgColor} ${method.textColor}`
                      }`}>
                        <method.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                        
                        {/* Icon pulse effect */}
                        {hoveredCard === index && (
                          <div className={`absolute inset-0 rounded-lg md:rounded-xl lg:rounded-2xl bg-gradient-to-r ${method.color} animate-ping opacity-20`}></div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm sm:text-base md:text-lg font-bold mb-0.5 md:mb-1 lg:mb-2 transition-colors duration-300 ${
                          hoveredCard === index
                            ? `text-transparent bg-gradient-to-r ${method.color} bg-clip-text`
                            : darkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {method.label}
                        </h3>
                        <p className={`text-xs sm:text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'} break-all`}>
                          {method.value}
                        </p>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 md:gap-2 lg:gap-3 flex-shrink-0">
                        {method.action && (
                          <button
                            onClick={method.action}
                            className={`p-1.5 sm:p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 hover:scale-110 ${
                              darkMode 
                                ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-400 hover:text-white' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                            }`}
                            title={copiedEmail ? currentContent.emailCopied : currentContent.copyEmail}
                          >
                            {copiedEmail ? <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Copy className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
                          </button>
                        )}
                        
                        <a
                          href={method.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-1.5 sm:p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 hover:scale-110 ${
                            darkMode 
                              ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-400 hover:text-white' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                          }`}
                        >
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
              {preparedAdditionalInfo.map((info, index) => (
                <div
                  key={index}
                  className={`p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? "bg-gray-800/40 border-gray-700/50"
                      : "bg-white/80 border-gray-200/50"
                  }`}
                >
                  <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                    <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-r ${info.color} text-white flex-shrink-0`}>
                      <info.icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className={`text-xs sm:text-sm md:text-base font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {info.label}
                      </h4>
                      <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
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
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-xl md:rounded-2xl lg:rounded-3xl blur-xl md:blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              
              <div className={`relative p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl md:rounded-2xl lg:rounded-3xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 ${
                darkMode
                  ? "bg-gray-800/60 border-gray-700/50"
                  : "bg-white/90 border-gray-200/50"
              }`}>
                
                {/* Decorative elements */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full animate-pulse ${
                    darkMode ? 'bg-gradient-to-r from-green-400/20 to-blue-400/20' : 'bg-gradient-to-r from-green-400/30 to-blue-400/30'
                  }`}></div>
                </div>
                
                <div className="text-center">
                  <div className="mb-4 sm:mb-6 md:mb-8">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-xl md:rounded-2xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 flex items-center justify-center text-white animate-bounce`}>
                      <Send className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                    </div>
                    
                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {currentContent.cta}
                    </h3>
                    
                    <p className={`mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentContent.ctaDesc}
                    </p>
                  </div>
                  
                  {/* Premium CTA Button */}
                  <a
                    href={`mailto:${contactInfo.email}?subject=Contacto%20desde%20tu%20portafolio&body=Hola%20Dirkin,%20vi%20tu%20portafolio%20y%20me%20gustaría%20ponerme%20en%20contacto.`}
                    className="group relative inline-flex items-center gap-2 md:gap-3 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 overflow-hidden font-bold text-white transition-all duration-500 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-xl md:rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-110 text-xs sm:text-sm md:text-base"
                  >
                    <span className="relative z-10 flex items-center gap-2 md:gap-3">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      {currentContent.sendMessage}
                      <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 group-hover:opacity-100"></div>
                    <div className="absolute transition-opacity duration-300 opacity-0 -inset-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-xl md:rounded-2xl blur-lg group-hover:opacity-100 -z-10"></div>
                  </a>
                </div>
                
                {/* Stats */}
                <div className={`grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 md:mt-12 pt-4 sm:pt-6 md:pt-8 border-t ${
                  darkMode ? 'border-gray-700/50' : 'border-gray-300/50'
                }`}>
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg sm:text-xl md:text-2xl font-black text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
                        {stat.value}
                      </div>
                      <div className={`text-xs md:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                        {currentContent[stat.labelKey as keyof typeof currentContent]}
                      </div>
                    </div>
                  ))}
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