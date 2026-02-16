
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Filter, ArrowLeft } from 'lucide-react';
import { PortfolioProject } from '../types.ts';
import * as db from '../db.ts';

const INITIAL_PROJECTS: PortfolioProject[] = [
  {
    id: '1',
    title: 'Modern Clinic A',
    category: '상가 인테리어',
    description: '환자와 의료진 모두를 위한 치유의 공간 디자인입니다. 차분한 톤의 마감재와 자연 채광을 극대화하여 병원 특유의 긴장감을 완화시켰습니다.',
    images: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: '2',
    title: 'Cafe Minimalist',
    category: '상가 인테리어',
    description: '여백의 미를 강조한 미니멀리즘 상업 공간입니다. 가구의 배치를 최소화하고 조형미가 돋보이는 오브제를 배치하여 브랜드의 정체성을 강조했습니다.',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1559925393-8be0ec41b50d?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: '3',
    title: 'Premium Penthouse',
    category: '주거 인테리어',
    description: '고급스러운 자재와 세련된 조명 설계로 완성된 프리미엄 주거 공간입니다. 거주자의 라이프스타일을 반영한 맞춤형 레이아웃을 제안합니다.',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200'
    ]
  }
];

interface PortfolioProps {
  filter?: string;
  onFilterChange: (filter?: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ filter, onFilterChange }) => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadProjects = async () => {
      const saved = await db.getItem('jydesign_projects');
      if (saved && Array.isArray(saved) && saved.length > 0) {
        setProjects(saved);
      } else {
        setProjects(INITIAL_PROJECTS);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = filter 
    ? projects.filter(p => p.category === filter)
    : projects;

  const openDetail = (project: PortfolioProject) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const categories = ["전체", "주거 인테리어", "상가 인테리어", "부분 리모델링"];

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-6 md:px-24 md:ml-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-gray-900 uppercase">Portfolio</h1>
          <div className="w-20 h-1 bg-black mb-6 mx-auto md:mx-0"></div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8">
            <Filter size={16} className="text-gray-400 hidden md:block" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => onFilterChange(cat === "전체" ? undefined : cat)}
                className={`text-xs tracking-widest uppercase font-bold px-4 py-2 border transition-all ${
                  (cat === "전체" && !filter) || cat === filter
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="text-gray-500 font-light max-w-2xl leading-relaxed text-lg">
            공간은 그 자체로 브랜드의 언어가 됩니다. JYDESIGN이 제안하는 감도 높은 디자인 포트폴리오를 경험해보세요.
          </p>
        </header>

        {selectedProject && (
          <div className="fixed inset-0 z-[110] bg-black flex items-center justify-center animate-fadeIn">
            <button onClick={() => setSelectedProject(null)} className="absolute top-8 left-8 md:left-32 z-[120] w-14 h-14 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:bg-gray-100 transition-all group scale-100 active:scale-90"><ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" /></button>
            <button onClick={() => setSelectedProject(null)} className="absolute top-8 right-8 z-[120] w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><X size={24} /></button>
            <div className="relative w-full h-full flex flex-col md:flex-row items-center">
              <div className="relative flex-1 w-full h-full flex items-center justify-center p-4 md:p-12">
                <img src={selectedProject.images[currentImageIndex]} alt={selectedProject.title} className="max-w-full max-h-full object-contain shadow-2xl transition-all duration-700 ease-in-out" />
                {selectedProject.images.length > 1 && (
                  <>
                    <button onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : selectedProject.images.length - 1))} className="absolute left-4 md:left-12 p-4 text-white/30 hover:text-white transition-colors"><ChevronLeft size={48} /></button>
                    <button onClick={() => setCurrentImageIndex((prev) => (prev < selectedProject.images.length - 1 ? prev + 1 : 0))} className="absolute right-4 md:right-12 p-4 text-white/30 hover:text-white transition-colors"><ChevronRight size={48} /></button>
                  </>
                )}
              </div>
              <div className="w-full md:w-[450px] bg-white h-auto md:h-full p-8 md:p-16 flex flex-col justify-center border-l border-gray-100">
                <span className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4 font-bold">{selectedProject.category}</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-8 uppercase tracking-tighter leading-none">{selectedProject.title}</h3>
                <div className="w-12 h-px bg-gray-200 mb-8"></div>
                <p className="text-gray-500 font-light leading-relaxed mb-12">{selectedProject.description}</p>
                <div className="mt-auto">
                  <p className="text-[10px] text-gray-300 tracking-widest uppercase mb-4">Image {currentImageIndex + 1} of {selectedProject.images.length}</p>
                  <div className="flex gap-2">
                    {selectedProject.images.map((_, idx) => (
                      <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-1 transition-all duration-500 ${idx === currentImageIndex ? 'w-12 bg-black' : 'w-4 bg-gray-200'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProjects.map(project => (
            <div key={project.id} className="group relative bg-white cursor-pointer" onClick={() => openDetail(project)}>
              <div className="aspect-[3/4] overflow-hidden mb-6 relative bg-gray-50">
                <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="bg-white/95 p-5 rounded-full text-black transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl"><Maximize2 size={24} strokeWidth={1.5} /></div>
                </div>
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 text-[10px] tracking-widest uppercase font-bold text-black border border-gray-100">{project.images.length} SERIES</div>
              </div>
              <div className="px-1">
                <span className="text-[9px] tracking-[0.4em] text-gray-300 uppercase mb-3 block font-bold">{project.category}</span>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-gray-400 transition-colors uppercase tracking-tighter">{project.title}</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed line-clamp-2 italic">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <div className="py-60 text-center">
            <p className="text-gray-200 font-light text-2xl uppercase tracking-[0.2em]">검색된 프로젝트가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
