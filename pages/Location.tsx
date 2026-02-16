
import React from 'react';
import { MapPin, Phone, Mail, Clock, Car, ChevronRight, ExternalLink } from 'lucide-react';
import { CompanyInfo } from '../types';

interface LocationProps {
  info: CompanyInfo;
}

const Location: React.FC<LocationProps> = ({ info }) => {
  // 주소 인코딩
  const encodedAddress = encodeURIComponent(info.address);
  // Google Maps Embed URL (No API key needed for basic search display)
  const mapIframeUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-white md:ml-24 animate-fadeIn">
      {/* Hero Header Section */}
      <section className="pt-32 pb-20 px-6 md:px-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black tracking-[0.5em] text-gray-300 uppercase block">Direction</span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black leading-none uppercase">
                Space of <br/>
                <span className="text-gray-200">JYDESIGN</span>
              </h1>
            </div>
            <div className="max-w-xs">
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                제이와이디자인의 공간은 당신의 꿈이 현실이 되는 시작점입니다. 
                차별화된 감각과 전문성이 공존하는 저희 스튜디오로 초대합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24 px-6 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          
          {/* Left: Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-12">
              <div className="group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-black group-hover:w-12 transition-all duration-500"></div>
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Office Address</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight mb-4">
                  {info.address}
                </h3>
                <p className="text-gray-400 text-sm font-light">
                  강릉의 중심, 포남동에 위치한 제이와이디자인 스튜디오입니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-gray-50">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Phone size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Customer Center</span>
                  </div>
                  <p className="text-xl font-black tracking-tighter">{info.callCenter}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Mail size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Email Inquiry</span>
                  </div>
                  <p className="text-xl font-black tracking-tighter">{info.email}</p>
                </div>
              </div>
            </div>

            {/* Practical Info Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 bg-gray-50 rounded-sm space-y-4 hover:bg-black group transition-all duration-500">
                <Clock className="text-black group-hover:text-white transition-colors" size={24} />
                <h5 className="font-bold text-sm group-hover:text-white transition-colors uppercase">Business Hours</h5>
                <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300">
                  평일 09:00 - 18:00<br/>
                  토요일 10:00 - 15:00<br/>
                  일요일 및 공휴일 휴무
                </p>
              </div>
              <div className="p-8 bg-gray-50 rounded-sm space-y-4 hover:bg-black group transition-all duration-500">
                <Car className="text-black group-hover:text-white transition-colors" size={24} />
                <h5 className="font-bold text-sm group-hover:text-white transition-colors uppercase">Parking Info</h5>
                <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300">
                  건물 전용 주차장 이용 가능<br/>
                  방문 전 미리 연락 주시면<br/>
                  주차 공간을 확보해 드립니다.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Map & Visual (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative group">
              {/* Map UI Frame */}
              <div className="aspect-[4/5] md:aspect-square bg-gray-100 overflow-hidden relative shadow-2xl border border-gray-100">
                {/* Interactive Map with Grayscale Filter */}
                <iframe
                  title="JYDESIGN Location Map"
                  src={mapIframeUrl}
                  className="w-full h-full grayscale-[1] contrast-[1.1] brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-in-out pointer-events-auto"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
                
                {/* Visual Overlay - Decorative Lines */}
                <div className="absolute inset-0 border-[20px] border-white/5 pointer-events-none group-hover:border-transparent transition-all duration-500"></div>
                
                {/* Floating Map Link Card */}
                <div className="absolute bottom-10 left-10 right-10 bg-white p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 pointer-events-auto">
                  <div className="flex items-start gap-4">
                    <div className="bg-black p-3 rounded-full text-white">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold tracking-tighter mb-1">Naver Maps</h4>
                      <p className="text-xs text-gray-400">네이버 지도로 정확한 위치를 확인하세요.</p>
                    </div>
                  </div>
                  <a 
                    href={info.mapUrl || "https://map.naver.com"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 py-4 bg-black text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-all group/btn shadow-lg"
                  >
                    Open Map <ExternalLink size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </a>
                </div>

                {/* Decorative Badge */}
                <div className="absolute top-10 right-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border border-black/20 flex items-center justify-center text-black text-[8px] font-bold tracking-widest text-center animate-spin-slow bg-white/80 backdrop-blur-sm">
                    JYDESIGN<br/>STUDIO
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="mt-12 flex items-center gap-6 opacity-40">
              <span className="text-[10px] font-bold tracking-widest uppercase">Visit Us</span>
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="text-[10px] font-bold tracking-widest uppercase">Interior Design Studio</span>
            </div>
          </div>

        </div>
      </section>

      {/* Brand Footer Mark */}
      <section className="py-24 bg-gray-50 text-center">
        <h2 className="text-[12vw] font-black text-white leading-none tracking-tighter select-none mb-12">
          JYDESIGN
        </h2>
        <p className="text-[10px] font-bold tracking-[0.8em] text-gray-300 uppercase">
          Beyond the Space, Design for Life
        </p>
      </section>
    </div>
  );
};

export default Location;
