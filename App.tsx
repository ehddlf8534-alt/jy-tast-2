
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.tsx';
import HeroSection from './components/HeroSection.tsx';
import Footer from './components/Footer.tsx';
import Portfolio from './pages/Portfolio.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Location from './pages/Location.tsx';
import Admin from './pages/Admin.tsx';
import { INITIAL_SECTIONS, INITIAL_COMPANY_INFO } from './constants.ts';
import { PageView, SectionData, CompanyInfo } from './types.ts';
import * as db from './db.ts';

const App: React.FC = () => {
  const [view, setView] = useState<PageView>('home');
  const [portfolioFilter, setPortfolioFilter] = useState<string | undefined>(undefined);
  const [sections, setSections] = useState<SectionData[]>(INITIAL_SECTIONS);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(INITIAL_COMPANY_INFO);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedSections = await db.getItem('jydesign_sections');
        if (savedSections && Array.isArray(savedSections) && savedSections.length > 0) {
          setSections(savedSections);
        }
        
        const savedInfo = await db.getItem('jydesign_info');
        if (savedInfo) {
          setCompanyInfo(savedInfo);
        }
      } catch (e) {
        console.error("Data loading error:", e);
      } finally {
        setIsInitialized(true);
      }
    };
    loadData();
  }, []);

  const handleNavigate = (newView: PageView, filter?: string) => {
    setView(newView);
    setPortfolioFilter(filter);
    // 홈이 아닌 페이지로 갈 때 스크롤 상단 이동
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    if (!isInitialized) {
       return <div className="h-screen w-full bg-black flex items-center justify-center text-white font-black tracking-tighter text-2xl uppercase italic animate-pulse">JYDESIGN</div>;
    }

    if (view === 'home') {
      return (
        <main className="snap-container">
          {sections.map((section) => (
            <HeroSection 
              key={section.id} 
              data={section} 
              onAction={() => handleNavigate('portfolio')}
            />
          ))}
          <Footer info={companyInfo} onContactClick={() => setView('contact')} />
        </main>
      );
    }

    return (
      <main className="h-screen overflow-y-auto scroll-smooth bg-white">
        {view === 'portfolio' && (
          <Portfolio filter={portfolioFilter} onFilterChange={setPortfolioFilter} />
        )}
        {view === 'about' && <About />}
        {view === 'contact' && <Contact />}
        {view === 'location' && <Location info={companyInfo} />}
        {view === 'admin' && <Admin />}
      </main>
    );
  };

  return (
    <div className="relative bg-white font-sans overflow-x-hidden min-h-screen">
      <Sidebar onNavigate={handleNavigate} currentView={view} />
      {renderContent()}

      {view === 'home' && isInitialized && (
        <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-4">
          {[...Array(sections.length + 1)].map((_, i) => (
            <div 
              key={i} 
              className="w-1.5 h-1.5 rounded-full bg-white/30 hover:bg-white transition-colors cursor-pointer shadow-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
