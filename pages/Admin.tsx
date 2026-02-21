
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Image as ImageIcon, X, LogIn, Lock, Save, Layout, Grid, Info, UserCheck, Loader2, Edit2, Upload } from 'lucide-react';
import { PortfolioProject, SectionData, CompanyInfo, AboutData } from '../types.ts';
import { INITIAL_SECTIONS, INITIAL_COMPANY_INFO, INITIAL_ABOUT_DATA } from '../constants.ts';
import * as db from '../db.ts';

const ADMIN_PASSWORD = "2026";

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [sections, setSections] = useState<SectionData[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(INITIAL_COMPANY_INFO);
  const [aboutData, setAboutData] = useState<AboutData>(INITIAL_ABOUT_DATA);
  
  const [activeTab, setActiveTab] = useState<'portfolio' | 'main' | 'about' | 'company'>('portfolio');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentProject, setCurrentProject] = useState<Partial<PortfolioProject>>({
    title: '',
    category: '주거 인테리어',
    description: '',
    images: []
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const aboutFileInputRef = useRef<HTMLInputElement>(null);
  const [targetHeroIndex, setTargetHeroIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadAllData = async () => {
      const savedProjects = await db.getItem('jydesign_projects');
      if (savedProjects) setProjects(savedProjects);
      
      const savedSections = await db.getItem('jydesign_sections');
      if (savedSections) setSections(savedSections);
      else setSections(INITIAL_SECTIONS);

      const savedInfo = await db.getItem('jydesign_info');
      if (savedInfo) setCompanyInfo(savedInfo);

      const savedAbout = await db.getItem('jydesign_about');
      if (savedAbout) setAboutData(savedAbout);
    };
    loadAllData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files) as File[];
      const uploadPromises = filesArray.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(file);
        });
      });

      try {
        const base64Images = await Promise.all(uploadPromises);
        setCurrentProject(prev => ({
          ...prev,
          images: [...(prev.images || []), ...base64Images]
        }));
      } catch (err) {
        alert("이미지 업로드 중 오류가 발생했습니다.");
      }
      e.target.value = '';
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && targetHeroIndex !== null) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const newSections = [...sections];
        newSections[targetHeroIndex].imageUrl = base64;
        setSections(newSections);
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const handleAboutImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setAboutData(prev => ({ ...prev, philosophyImage: base64 }));
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const openAddModal = () => {
    setModalMode('add');
    setCurrentProject({ title: '', category: '주거 인테리어', description: '', images: [] });
    setIsModalOpen(true);
  };

  const openEditModal = (project: PortfolioProject) => {
    setModalMode('edit');
    setCurrentProject({ ...project });
    setIsModalOpen(true);
  };

  const handleSaveProject = async () => {
    if (!currentProject.title || !currentProject.images?.length) {
      alert('제목과 최소 한 장의 사진이 필요합니다.');
      return;
    }
    setIsSaving(true);
    let updatedList: PortfolioProject[];
    if (modalMode === 'add') {
      const newProj: PortfolioProject = {
        id: Date.now().toString(),
        title: currentProject.title || '',
        category: currentProject.category || '기타',
        description: currentProject.description || '',
        images: currentProject.images as string[]
      };
      updatedList = [newProj, ...projects];
    } else {
      updatedList = projects.map(p => p.id === (currentProject as PortfolioProject).id ? (currentProject as PortfolioProject) : p);
    }
    setProjects(updatedList);
    await db.setItem('jydesign_projects', updatedList);
    setIsModalOpen(false);
    setIsSaving(false);
    alert('저장되었습니다.');
  };

  const removeProject = async (id: string) => {
    if (window.confirm('이 프로젝트를 영구적으로 삭제하시겠습니까?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      await db.setItem('jydesign_projects', updated);
    }
  };

  const removeImage = (index: number) => {
    setCurrentProject(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }));
  };

  const saveMainSections = async () => {
    setIsSaving(true);
    await db.setItem('jydesign_sections', sections);
    setIsSaving(false);
    alert('메인 레이아웃이 저장되었습니다.');
  };

  const saveAboutData = async () => {
    setIsSaving(true);
    await db.setItem('jydesign_about', aboutData);
    setIsSaving(false);
    alert('회사 소개 정보가 저장되었습니다.');
  };

  const saveCompanyInfo = async () => {
    setIsSaving(true);
    await db.setItem('jydesign_info', companyInfo);
    setIsSaving(false);
    alert('기업 정보가 저장되었습니다.');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-6">
        <div className="bg-white p-10 shadow-2xl rounded-xl max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={24} />
          </div>
          <h2 className="text-2xl font-bold tracking-tighter mb-2 uppercase">jydesign Admin</h2>
          <p className="text-gray-400 text-sm mb-8">관리자 비밀번호를 입력하세요.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full border-b-2 border-gray-100 py-3 text-center outline-none focus:border-black transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
            <button className="w-full py-4 bg-black text-white rounded-lg font-bold hover:bg-neutral-800 transition-all uppercase text-xs tracking-widest">
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-24 px-6 md:px-24 md:ml-24">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 pb-8 border-b border-gray-200">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase text-black">jydesign Dashboard</h1>
            <p className="text-gray-400 font-light text-sm">포트폴리오와 사이트 콘텐츠를 완벽하게 관리하세요.</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="px-6 py-3 border border-gray-200 text-gray-500 text-xs font-bold hover:bg-gray-100 transition-all uppercase rounded-md">
            로그아웃
          </button>
        </header>

        <div className="flex gap-8 mb-12 border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <button onClick={() => setActiveTab('portfolio')} className={`pb-4 text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'portfolio' ? 'border-b-2 border-black text-black' : 'text-gray-300'}`}>
            <div className="flex items-center gap-2"><Grid size={16} /> 포트폴리오 관리</div>
          </button>
          <button onClick={() => setActiveTab('main')} className={`pb-4 text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'main' ? 'border-b-2 border-black text-black' : 'text-gray-300'}`}>
            <div className="flex items-center gap-2"><Layout size={16} /> 메인 관리</div>
          </button>
          <button onClick={() => setActiveTab('about')} className={`pb-4 text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'about' ? 'border-b-2 border-black text-black' : 'text-gray-300'}`}>
            <div className="flex items-center gap-2"><Info size={16} /> 회사소개 관리</div>
          </button>
          <button onClick={() => setActiveTab('company')} className={`pb-4 text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'company' ? 'border-b-2 border-black text-black' : 'text-gray-300'}`}>
            <div className="flex items-center gap-2"><UserCheck size={16} /> 기업정보 관리</div>
          </button>
        </div>

        {activeTab === 'portfolio' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold uppercase tracking-tighter">Project List ({projects.length})</h2>
              <button 
                onClick={openAddModal}
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md text-xs font-bold hover:bg-gray-800 transition-all uppercase"
              >
                <Plus size={16} /> 프로젝트 추가
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <div key={project.id} className="bg-white p-4 shadow-sm border border-gray-100 group">
                  <div className="aspect-[4/3] bg-gray-100 mb-4 overflow-hidden relative">
                    <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                      <button onClick={() => openEditModal(project)} className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"><Edit2 size={18} /></button>
                      <button onClick={() => removeProject(project.id)} className="p-3 bg-white text-red-500 rounded-full hover:scale-110 transition-transform"><Trash2 size={18} /></button>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">{project.category}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'main' && (
          <div className="space-y-12 animate-fadeIn">
            <input 
              type="file" 
              ref={heroFileInputRef} 
              hidden 
              accept="image/*" 
              onChange={handleHeroImageUpload} 
            />
            {sections.map((section, index) => (
              <div key={section.id} className="bg-white p-8 border border-gray-200 rounded-lg space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold uppercase tracking-widest text-sm text-gray-400">Hero Slide {index + 1}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Title</label>
                      <input 
                        type="text" 
                        value={section.title}
                        onChange={(e) => {
                          const newSections = [...sections];
                          newSections[index].title = e.target.value;
                          setSections(newSections);
                        }}
                        className="w-full border-b border-gray-100 py-2 outline-none focus:border-black font-bold text-xl"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Subtitle</label>
                      <input 
                        type="text" 
                        value={section.subtitle}
                        onChange={(e) => {
                          const newSections = [...sections];
                          newSections[index].subtitle = e.target.value;
                          setSections(newSections);
                        }}
                        className="w-full border-b border-gray-100 py-2 outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Description</label>
                      <textarea 
                        value={section.description}
                        onChange={(e) => {
                          const newSections = [...sections];
                          newSections[index].description = e.target.value;
                          setSections(newSections);
                        }}
                        className="w-full border border-gray-100 p-3 h-32 resize-none outline-none focus:border-black text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Hero Image</label>
                     <div className="aspect-video bg-gray-50 border border-dashed border-gray-200 overflow-hidden relative group">
                        <img src={section.imageUrl} className="w-full h-full object-cover" alt="Hero Preview" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-4 transition-all">
                           <button 
                             onClick={() => {
                               setTargetHeroIndex(index);
                               heroFileInputRef.current?.click();
                             }}
                             className="px-4 py-2 bg-white text-black text-[10px] font-bold uppercase rounded-sm flex items-center gap-2 hover:scale-105 transition-transform"
                           >
                             <Upload size={14} /> 내 컴퓨터에서 선택
                           </button>
                           <div className="w-4/5 flex flex-col items-center gap-2">
                             <span className="text-white text-[9px] uppercase tracking-widest font-bold">Or enter Image URL</span>
                             <input 
                              type="text" 
                              className="w-full p-2 bg-white/20 text-[10px] text-white border border-white/30 outline-none backdrop-blur-sm focus:bg-white focus:text-black transition-all" 
                              placeholder="https://..." 
                              value={section.imageUrl} 
                              onChange={(e) => {
                                const newSections = [...sections];
                                newSections[index].imageUrl = e.target.value;
                                setSections(newSections);
                              }}
                             />
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            ))}
            <button 
              onClick={saveMainSections}
              disabled={isSaving}
              className="w-full py-5 bg-black text-white font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} 메인 레이아웃 설정 저장
            </button>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-white p-8 md:p-12 border border-gray-200 rounded-lg space-y-12 animate-fadeIn">
            <input 
              type="file" 
              ref={aboutFileInputRef} 
              hidden 
              accept="image/*" 
              onChange={handleAboutImageUpload} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Main Title</label>
                  <textarea 
                    value={aboutData.mainTitle}
                    onChange={(e) => setAboutData({...aboutData, mainTitle: e.target.value})}
                    className="w-full border-b border-gray-100 py-2 outline-none focus:border-black font-black text-4xl h-32 resize-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Main Subtitle</label>
                  <textarea 
                    value={aboutData.mainSubtitle}
                    onChange={(e) => setAboutData({...aboutData, mainSubtitle: e.target.value})}
                    className="w-full border-b border-gray-100 py-2 outline-none focus:border-black text-gray-500 h-32 resize-none"
                  />
                </div>
              </div>
              <div className="space-y-6">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Philosophy Image</label>
                 <div className="aspect-[3/4] bg-gray-50 border border-dashed border-gray-200 overflow-hidden relative group">
                    <img src={aboutData.philosophyImage} className="w-full h-full object-cover" alt="Philosophy" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-4 transition-all">
                       <button 
                         onClick={() => aboutFileInputRef.current?.click()}
                         className="px-4 py-2 bg-white text-black text-[10px] font-bold uppercase rounded-sm flex items-center gap-2 hover:scale-105 transition-transform"
                       >
                         <Upload size={14} /> 내 컴퓨터에서 선택
                       </button>
                       <div className="w-4/5 flex flex-col items-center gap-2">
                         <span className="text-white text-[9px] uppercase tracking-widest font-bold">Or enter Image URL</span>
                         <input 
                          type="text" 
                          className="w-full p-2 bg-white/20 text-[10px] text-white border border-white/30 outline-none backdrop-blur-sm focus:bg-white focus:text-black transition-all" 
                          placeholder="https://..." 
                          value={aboutData.philosophyImage} 
                          onChange={(e) => setAboutData({...aboutData, philosophyImage: e.target.value})}
                         />
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-12 space-y-6">
               <h3 className="font-bold text-xl uppercase tracking-tighter">Stats & Quote</h3>
               <div className="grid grid-cols-2 gap-8">
                  <div>
                    <input className="w-full border-b font-bold text-2xl mb-2" value={aboutData.stat1Value} onChange={e => setAboutData({...aboutData, stat1Value: e.target.value})} />
                    <input className="w-full border-none text-xs text-gray-400 uppercase tracking-widest" value={aboutData.stat1Label} onChange={e => setAboutData({...aboutData, stat1Label: e.target.value})} />
                  </div>
                  <div>
                    <input className="w-full border-b font-bold text-2xl mb-2" value={aboutData.stat2Value} onChange={e => setAboutData({...aboutData, stat2Value: e.target.value})} />
                    <input className="w-full border-none text-xs text-gray-400 uppercase tracking-widest" value={aboutData.stat2Label} onChange={e => setAboutData({...aboutData, stat2Label: e.target.value})} />
                  </div>
               </div>
               <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Bottom Quote</label>
                  <input className="w-full border-b py-2 italic font-bold text-xl" value={aboutData.bottomQuote} onChange={e => setAboutData({...aboutData, bottomQuote: e.target.value})} />
               </div>
            </div>

            <button 
              onClick={saveAboutData}
              disabled={isSaving}
              className="w-full py-5 bg-black text-white font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} 회사소개 저장
            </button>
          </div>
        )}

        {activeTab === 'company' && (
          <div className="bg-white p-8 md:p-12 border border-gray-200 rounded-lg space-y-8 animate-fadeIn">
            <h2 className="text-xl font-bold uppercase tracking-tighter mb-8">Basic Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: '상호명', key: 'name' },
                { label: '대표자', key: 'owner' },
                { label: '이메일', key: 'email' },
                { label: '고객센터', key: 'callCenter' },
                { label: '사업자번호', key: 'businessLicense' },
                { label: '지도 URL (Naver)', key: 'mapUrl' },
              ].map(item => (
                <div key={item.key}>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">{item.label}</label>
                  <input 
                    type="text" 
                    value={(companyInfo as any)[item.key] || ''}
                    onChange={(e) => setCompanyInfo({...companyInfo, [item.key]: e.target.value})}
                    className="w-full border-b border-gray-100 py-2 outline-none focus:border-black font-medium"
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">주소</label>
                <input 
                  type="text" 
                  value={companyInfo.address}
                  onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                  className="w-full border-b border-gray-100 py-2 outline-none focus:border-black font-medium"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">오시는길 설명 (상단)</label>
                <textarea 
                  value={companyInfo.locationDescription}
                  onChange={(e) => setCompanyInfo({...companyInfo, locationDescription: e.target.value})}
                  className="w-full border border-gray-100 p-3 h-24 resize-none outline-none focus:border-black text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">오시는길 설명 (주소 하단)</label>
                <input 
                  type="text" 
                  value={companyInfo.locationSubDescription}
                  onChange={(e) => setCompanyInfo({...companyInfo, locationSubDescription: e.target.value})}
                  className="w-full border-b border-gray-100 py-2 outline-none focus:border-black font-medium"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">영업시간 (줄바꿈 가능)</label>
                <textarea 
                  value={companyInfo.businessHours}
                  onChange={(e) => setCompanyInfo({...companyInfo, businessHours: e.target.value})}
                  className="w-full border border-gray-100 p-3 h-24 resize-none outline-none focus:border-black text-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">주차안내 (줄바꿈 가능)</label>
                <textarea 
                  value={companyInfo.parkingInfo}
                  onChange={(e) => setCompanyInfo({...companyInfo, parkingInfo: e.target.value})}
                  className="w-full border border-gray-100 p-3 h-24 resize-none outline-none focus:border-black text-sm"
                />
              </div>
            </div>
            <button 
              onClick={saveCompanyInfo}
              disabled={isSaving}
              className="w-full py-5 bg-black text-white font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} 기업정보 저장
            </button>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl animate-scaleIn">
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-black uppercase tracking-tighter">
                  {modalMode === 'add' ? 'New Project' : 'Edit Project'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Title</label>
                    <input 
                      type="text" 
                      value={currentProject.title}
                      onChange={e => setCurrentProject({...currentProject, title: e.target.value})}
                      className="w-full border-b border-gray-200 py-3 text-2xl font-bold outline-none focus:border-black transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Category</label>
                    <select 
                      value={currentProject.category}
                      onChange={e => setCurrentProject({...currentProject, category: e.target.value})}
                      className="w-full border-b border-gray-200 py-3 outline-none focus:border-black bg-white"
                    >
                      <option>주거 인테리어</option>
                      <option>상가 인테리어</option>
                      <option>부분 리모델링</option>
                      <option>기타</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Description</label>
                    <textarea 
                      value={currentProject.description}
                      onChange={e => setCurrentProject({...currentProject, description: e.target.value})}
                      className="w-full border border-gray-200 p-4 h-40 resize-none outline-none focus:border-black text-sm bg-gray-50"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Images ({currentProject.images?.length || 0})</label>
                  <div className="grid grid-cols-3 gap-2">
                    {currentProject.images?.map((img, idx) => (
                      <div key={idx} className="aspect-square relative group bg-gray-100 border border-gray-100 overflow-hidden">
                        <img src={img} className="w-full h-full object-cover" alt="Preview" />
                        <button 
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-black hover:bg-gray-50 transition-all text-gray-400"
                    >
                      <Upload size={20} />
                      <span className="text-[10px] font-bold uppercase">Upload</span>
                    </button>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    hidden 
                    multiple 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                  />
                  <p className="text-[10px] text-gray-400 italic">First image will be the cover photo.</p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4">
                <button 
                  onClick={handleSaveProject}
                  disabled={isSaving}
                  className="flex-1 py-5 bg-black text-white font-bold tracking-widest uppercase hover:bg-neutral-800 disabled:bg-gray-400 transition-all flex items-center justify-center gap-2"
                >
                  {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} {modalMode === 'add' ? 'Create Project' : 'Update Project'}
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-5 border border-gray-200 font-bold tracking-widest uppercase hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
