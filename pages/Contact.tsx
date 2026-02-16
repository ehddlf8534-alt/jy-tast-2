
import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mykdwnww', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:ml-24">
      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/3">
          <h1 className="text-6xl font-bold tracking-tighter mb-8 uppercase">Contact</h1>
          <p className="text-gray-500 mb-12 font-light leading-relaxed">
            귀하의 소중한 프로젝트를 들려주세요. <br/>
            jydesign의 전문 디자이너가 직접 상담을 도와드립니다.
          </p>
          
          <div className="space-y-8 border-t border-gray-200 pt-12">
            <div className="flex gap-4">
              <CheckCircle2 className="text-black" />
              <div>
                <h4 className="font-bold">Fast Response</h4>
                <p className="text-sm text-gray-400">문의 후 24시간 이내 답변 보장</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="text-black" />
              <div>
                <h4 className="font-bold">Expert Consulting</h4>
                <p className="text-sm text-gray-400">무료 현장 방문 및 가견적 제안</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3 bg-white p-8 md:p-16 shadow-xl rounded-sm min-h-[500px] flex flex-col justify-center">
          {status === 'success' ? (
            <div className="text-center space-y-6 animate-fadeIn">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-bold uppercase tracking-tighter">Thank You</h2>
              <p className="text-gray-500 font-light leading-relaxed">
                문의가 성공적으로 전달되었습니다.<br/>
                검토 후 담당자가 빠른 시일 내에 연락드리겠습니다.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-8 text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors"
              >
                New Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {status === 'error' && (
                <div className="p-4 bg-red-50 text-red-600 text-sm flex items-center gap-3 border border-red-100 mb-4">
                  <AlertCircle size={18} />
                  <span>전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">성함 / 업체명</label>
                  <input 
                    required 
                    name="name"
                    type="text" 
                    placeholder="홍길동"
                    className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">연락처</label>
                  <input 
                    required 
                    name="phone"
                    type="tel" 
                    placeholder="010-0000-0000"
                    className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">프로젝트 유형</label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {['주거 인테리어', '상가 인테리어', '부분 리모델링'].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="project_type" value={type} className="accent-black" />
                      <span className="text-sm text-gray-500 group-hover:text-black transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">상담 내용</label>
                <textarea 
                  required 
                  name="message"
                  className="w-full border border-gray-100 p-4 h-48 outline-none focus:border-black transition-colors resize-none text-sm bg-gray-50" 
                  placeholder="공간 면적, 예산 규모, 희망 스타일 등을 자유롭게 적어주세요."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full py-5 bg-black text-white flex items-center justify-center gap-3 tracking-[0.2em] font-bold hover:bg-gray-800 transition-all uppercase disabled:bg-gray-400 shadow-xl"
              >
                {status === 'submitting' ? (
                  <>Sending <Loader2 size={16} className="animate-spin" /></>
                ) : (
                  <>Send Inquiry <Send size={16} /></>
                )}
              </button>
              
              <p className="text-[9px] text-gray-300 text-center tracking-widest uppercase italic">
                Powered by Formspree for Secure Data Transmission
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
