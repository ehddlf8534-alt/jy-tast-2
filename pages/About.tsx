
import React, { useEffect, useState } from 'react';
import { AboutData } from '../types.ts';
import { INITIAL_ABOUT_DATA } from '../constants.ts';
import * as db from '../db.ts';
import { MoveRight } from 'lucide-react';

const About: React.FC = () => {
  const [data, setData] = useState<AboutData>(INITIAL_ABOUT_DATA);

  useEffect(() => {
    const loadAbout = async () => {
      const saved = await db.getItem('jydesign_about');
      if (saved) {
        setData(saved);
      }
    };
    loadAbout();
  }, []);

  return (
    <div className="min-h-screen bg-white md:ml-24 animate-fadeIn overflow-x-hidden">
      {/* Editorial Hero Section */}
      <section className="relative pt-40 pb-32 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
             <span className="text-[10px] font-black tracking-[0.8em] text-gray-300 uppercase block mb-8">Establishment Since 2012</span>
             <h1 className="text-[12vw] md:text-[9vw] font-black tracking-tighter text-black leading-[0.85] uppercase mb-12">
               Space <br/>
               <span className="text-gray-100 italic">Redefined.</span>
             </h1>
             <div className="md:absolute md:right-0 md:bottom-0 max-w-lg">
                <p className="text-xl md:text-2xl font-light text-gray-400 leading-tight border-l-4 border-black pl-8 py-2">
                  {data.mainSubtitle}
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Dynamic Grid Philosophy Section */}
      <section className="py-32 px-6 md:px-24 bg-neutral-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
          <div className="lg:col-span-7 relative">
            <div className="aspect-[4/5] overflow-hidden relative z-10 group">
              <img 
                src={data.philosophyImage} 
                alt="Design Philosophy" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700"></div>
            </div>
            {/* Decorative Background Text */}
            <div className="absolute -bottom-20 -left-20 text-[20vw] font-black text-white/5 select-none pointer-events-none uppercase">
              JYDSN
            </div>
          </div>
          
          <div className="lg:col-span-5 space-y-12 relative z-20">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                {data.philosophyTitle}
              </h2>
              <div className="w-20 h-2 bg-white"></div>
              <p className="text-lg text-gray-400 font-light leading-relaxed whitespace-pre-line pt-4">
                {data.philosophyText}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/10">
              <div className="group">
                <span className="block text-6xl md:text-7xl font-black mb-2 tracking-tighter group-hover:text-gray-400 transition-colors">{data.stat1Value}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">{data.stat1Label}</span>
              </div>
              <div className="group">
                <span className="block text-6xl md:text-7xl font-black mb-2 tracking-tighter group-hover:text-gray-400 transition-colors">{data.stat2Value}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">{data.stat2Label}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section with Aesthetic Design */}
      <section className="py-48 px-6 md:px-24 flex items-center justify-center text-center relative">
        <div className="max-w-4xl relative z-10">
           <div className="inline-block px-4 py-1 bg-black text-white text-[10px] font-bold tracking-widest uppercase mb-12">Manifesto</div>
           <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 leading-tight mb-16 italic">
             "{data.bottomQuote}"
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {data.listItems.map((item, idx) => (
                <div key={idx} className="p-8 border border-gray-100 group hover:border-black transition-all duration-500">
                  <span className="block text-xs font-bold text-gray-300 group-hover:text-black mb-4">0{idx + 1}</span>
                  <p className="text-sm text-gray-500 group-hover:text-black leading-relaxed transition-colors">{item}</p>
                </div>
              ))}
           </div>
        </div>
        {/* Subtle Background Mark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-gray-50/50 select-none -z-10">
          JY
        </div>
      </section>

      {/* Final Call to Action Mark */}
      <section className="py-24 border-t border-gray-50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] font-bold tracking-[0.5em] text-gray-300 uppercase mb-8">Ready to start your project?</p>
          <a href="/contact" className="inline-flex items-center gap-4 text-3xl md:text-5xl font-black tracking-tighter uppercase hover:gap-8 transition-all">
            Work with JYDESIGN <MoveRight size={40} strokeWidth={3} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
