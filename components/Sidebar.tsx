
import React, { useState } from 'react';
import { Menu, X, Instagram } from 'lucide-react';
import { MENU_ITEMS } from '../constants.ts';
import { PageView } from '../types.ts';

interface SidebarProps {
  onNavigate: (view: PageView, filter?: string) => void;
  currentView: PageView;
}

const NaverBlogIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="2" fill="currentColor" />
    <path 
      d="M16.5 18H13.8L10.2 12.6V18H7.5V6H10.2L13.8 11.4V6H16.5V18Z" 
      fill="white" 
    />
  </svg>
);

const PinterestIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.718-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.93 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const handleNav = (view: PageView, filter?: string) => {
    onNavigate(view, filter);
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-50 p-6 flex items-center justify-between w-full md:w-auto md:h-full md:flex-col md:bg-white/10 md:backdrop-blur-md md:hover:bg-white/30 transition-all duration-500">
        <div 
          className="text-2xl font-black tracking-tighter text-white drop-shadow-lg md:text-black md:drop-shadow-none mb-0 md:mb-12 cursor-pointer transition-all hover:scale-105" 
          onClick={() => handleNav('home')}
        >
          JYDESIGN
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3 rounded-full transition-all duration-300 ${isOpen ? 'bg-black text-white' : 'bg-white/20 backdrop-blur-lg text-white md:text-black hover:bg-white/40 shadow-lg'}`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex flex-col gap-8 mt-auto mb-6">
          <div className="flex flex-col gap-8 text-black/40 items-center">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-all hover:scale-110"><Instagram size={22} /></a>
            <a href="https://blog.naver.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#03C75A] transition-all hover:scale-110"><NaverBlogIcon size={22} /></a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E60023] transition-all hover:scale-110"><PinterestIcon size={24} /></a>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-40 bg-white/70 backdrop-blur-3xl transition-all duration-700 ease-in-out transform ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col h-full p-12 md:pl-48">
          <nav className="mt-12 space-y-8">
            {MENU_ITEMS.map((item) => (
              <div key={item.label} className="group">
                <button 
                  onClick={() => {
                    if (item.subItems) {
                      setActiveSubMenu(activeSubMenu === item.label ? null : item.label);
                    } else {
                      handleNav(item.view);
                    }
                  }}
                  className={`text-4xl md:text-7xl font-black transition-all duration-500 text-left uppercase tracking-tighter hover:tracking-normal ${currentView === item.view && !activeSubMenu ? 'text-black' : 'text-black/20 hover:text-black'}`}
                >
                  {item.label}
                </button>
                {item.subItems && (
                  <div className={`mt-6 space-y-4 overflow-hidden transition-all duration-500 ${activeSubMenu === item.label ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {item.subItems.map(sub => (
                      <button 
                        key={sub.label} 
                        onClick={() => handleNav(sub.view, sub.filter)}
                        className="block text-2xl font-bold text-black/40 hover:text-black pl-6 border-l-2 border-black/10 hover:border-black transition-all text-left w-full"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-auto pt-12 text-sm text-black/30 font-medium tracking-widest uppercase">
            <p className="animate-pulse">Trust in Excellence. Design for Life.</p>
            <p className="mt-4">© JYDESIGN. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
