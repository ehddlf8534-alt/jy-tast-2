
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Location from './pages/Location';
import Admin from './pages/Admin';
import { INITIAL_SECTIONS, INITIAL_COMPANY_INFO } from './constants';
import { PageView, SectionData, CompanyInfo } from './types';
import * as db from './db';

const App: React.FC = () => {
  const [view, setView] = useState<PageView>('home');
  const [portfolioFilter, setPortfolioFilter] = useState<string | undefined>(undefined);
  const [sections, setSections] = useState<SectionData[]>(INITIAL_SECTIONS);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(INITIAL_COMPANY_INFO);

  useEffect(() => {
    const loadData = async () => {
      const savedSections = await db.getItem('jydesign_sections');
      if (savedSections) setSections(savedSections);
      
      const savedInfo = await db.getItem('jydesign_info');
      if (savedInfo) setCompanyInfo(savedInfo);
    };
    loadData();
  }, [view]);

  const handleNavigate = (newView: PageView, filter?: string) => {
    setView(newView);
    setPortfolioFilter(filter);
  };

  const renderContent = () => {
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

    // 홈 화면이 아닌 경우 스크롤이 가능한 컨테이너를 제공합니다.
    return (
      <main className="h-screen overflow-y-auto scroll-smooth">
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
    <div className="relative bg-white font-sans overflow-x-hidden">
      <Sidebar onNavigate={handleNavigate} currentView={view} />
      
      {renderContent()}

      {/* Right side navigation dots (Only for Home) */}
      {view === 'home' && (
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
