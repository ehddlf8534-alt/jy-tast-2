
import React from 'react';
import { CompanyInfo } from '../types';

interface FooterProps {
  onContactClick: () => void;
  info: CompanyInfo;
}

const Footer: React.FC<FooterProps> = ({ onContactClick, info }) => {
  return (
    <footer className="snap-section bg-[#111] text-white flex flex-col justify-center items-center py-24 px-6">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-bold mb-8 uppercase tracking-tighter">JYDESIGN</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-400 text-sm">
            <div>
              <span className="block text-gray-500 font-bold mb-1 uppercase tracking-tighter">Company</span>
              {info.name}
            </div>
            <div>
              <span className="block text-gray-500 font-bold mb-1 uppercase tracking-tighter">Owner</span>
              {info.owner}
            </div>
            <div>
              <span className="block text-gray-500 font-bold mb-1 uppercase tracking-tighter">Email</span>
              {info.email}
            </div>
            <div>
              <span className="block text-gray-500 font-bold mb-1 uppercase tracking-tighter">Call Center</span>
              {info.callCenter}
            </div>
            <div>
              <span className="block text-gray-500 font-bold mb-1 uppercase tracking-tighter">Business License</span>
              {info.businessLicense}
            </div>
            <div className="col-span-1 sm:col-span-2">
              <span className="block text-gray-500 font-bold mb-1 uppercase tracking-tighter">Address</span>
              {info.address}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <p className="text-gray-400 font-light">
              새로운 프로젝트의 시작, JYDESIGN이 함께하겠습니다.<br />
              상담을 원하시면 언제든 연락주세요.
            </p>
            <button 
              onClick={onContactClick}
              className="inline-block py-3 px-8 border border-gray-600 hover:border-white transition-colors uppercase tracking-widest text-xs font-bold text-center"
            >
              Get In Touch
            </button>
          </div>
          
          <div className="mt-12 text-xs text-gray-600 space-x-4">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors font-bold text-gray-500">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용가이드</a>
          </div>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-white/5 w-full text-center text-[10px] text-gray-700 tracking-widest uppercase">
        Copyright JYDESIGN All right reserved / Hosting by CAFE24
      </div>
    </footer>
  );
};

export default Footer;
