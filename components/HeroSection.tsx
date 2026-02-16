
import React, { useEffect, useRef, useState } from 'react';
import { SectionData } from '../types.ts';

interface HeroSectionProps {
  data: SectionData;
  onAction: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data, onAction }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`snap-section relative w-full h-screen flex items-center justify-center overflow-hidden transition-colors duration-1000 ${isVisible ? 'is-visible' : ''}`}
    >
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-60'}`}
        style={{ backgroundImage: `url(${data.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-24 flex flex-col items-center text-center">
        <span className={`text-white/70 uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6 content-fade-in`} style={{ transitionDelay: '200ms' }}>
          {data.subtitle}
        </span>
        <h2 className={`text-5xl md:text-9xl font-black text-white mb-10 tracking-tighter uppercase leading-none content-fade-in`} style={{ transitionDelay: '400ms' }}>
          {data.title}
        </h2>
        <p className={`max-w-2xl text-white/80 text-base md:text-xl leading-relaxed mb-12 font-light content-fade-in`} style={{ transitionDelay: '600ms' }}>
          {data.description}
        </p>
        <div className="content-fade-in" style={{ transitionDelay: '800ms' }}>
          <button 
            onClick={onAction}
            className="group relative inline-block px-12 py-5 border border-white/30 text-white hover:text-black transition-all duration-500 uppercase tracking-[0.3em] text-xs font-bold overflow-hidden"
          >
            <span className="relative z-10">GO PORTFOLIO</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>
      </div>

      <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-40 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span className="text-white text-[8px] tracking-[0.5em] uppercase font-bold">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </div>
  );
};

export default HeroSection;
