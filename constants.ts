
import { SectionData, MenuItem, CompanyInfo, AboutData } from './types.ts';

export const INITIAL_COMPANY_INFO: CompanyInfo = {
  name: "JYDESIGN (제이와이디자인)",
  owner: "제이와이",
  email: "info@jydesign.co.kr",
  callCenter: "02-576-0000",
  businessLicense: "000-00-00000",
  address: "강원특별자치도 강릉시 포남동 630-3",
  mapUrl: "https://map.naver.com/p?c=18.35,0,0,0,dh"
};

export const INITIAL_ABOUT_DATA: AboutData = {
  mainTitle: "About JYDESIGN",
  mainSubtitle: "우리는 공간이 사람을 바꾼다고 믿습니다. 전문성과 진정성을 바탕으로 공간의 본질적인 아름다움을 찾아냅니다.",
  philosophyImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
  philosophyTitle: "Philosophy",
  philosophyText: "단순히 '예쁜' 공간이 아닌, 그곳에 머무는 사람들의 동선과 편의, 그리고 브랜드가 가진 아이덴티티가 조화를 이루는 설계를 지향합니다. 작은 마감재 하나부터 조명의 조도까지, 타협하지 않는 디테일이 JYDESIGN의 정체성입니다.",
  stat1Value: "500+",
  stat1Label: "Projects Completed",
  stat2Value: "12Y",
  stat2Label: "Design Expertise",
  bottomQuote: "Space defines your Life",
  listItems: [
    "우리는 의뢰인의 라이프스타일을 심층 분석합니다.",
    "전문적인 실내건축 면허를 보유한 기술진이 함께합니다.",
    "투명한 견적과 체계적인 A/S 시스템으로 끝까지 신뢰를 지킵니다."
  ]
};

export const INITIAL_SECTIONS: SectionData[] = [
  {
    id: "01",
    subtitle: "Interior Design Studio",
    title: "JYDESIGN",
    description: "공간의 가치를 깊이 있게 탐구하고, 단순한 미학을 넘어 삶의 질을 바꾸는 프리미엄 인테리어 브랜드입니다. 우리는 당신의 일상이 예술이 되는 순간을 디자인합니다.",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1920",
    linkText: "GO PORTFOLIO"
  },
  {
    id: "02",
    subtitle: "Philosophy",
    title: "Sincerity & Detail",
    description: "신뢰는 정직한 자재와 보이지 않는 곳까지 챙기는 디테일에서 나옵니다. JYDESIGN은 수백 건의 시공 경험을 통해 증명된 압도적인 퀄리티를 약속합니다.",
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1920",
    linkText: "GO PORTFOLIO"
  },
  {
    id: "03",
    subtitle: "Premium Space",
    title: "Art of Living",
    description: "우리는 단순히 머무는 곳을 넘어, 영감을 주고 휴식을 완성하는 최상의 공간을 창조합니다. JYDESIGN의 프리미엄 감각을 지금 확인해 보세요.",
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1920",
    linkText: "GO PORTFOLIO"
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "HOME",
    href: "/",
    view: 'home'
  },
  {
    label: "PORTFOLIO",
    href: "/portfolio",
    view: 'portfolio',
    subItems: [
      { label: "주거 인테리어", view: 'portfolio', filter: "주거 인테리어" },
      { label: "상가 인테리어", view: 'portfolio', filter: "상가 인테리어" },
      { label: "부분 리모델링", view: 'portfolio', filter: "부분 리모델링" }
    ]
  },
  {
    label: "ABOUT",
    href: "/about",
    view: 'about',
    subItems: [
      { label: "회사소개", view: 'about' },
      { label: "오시는길", view: 'location' }
    ]
  },
  {
    label: "CONTACT",
    href: "/contact",
    view: 'contact'
  },
  {
    label: "ADMIN",
    href: "/admin",
    view: 'admin'
  }
];
