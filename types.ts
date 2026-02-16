
export interface SectionData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  linkText: string;
}

export interface CompanyInfo {
  name: string;
  owner: string;
  email: string;
  callCenter: string;
  businessLicense: string;
  address: string;
  mapUrl?: string;
}

export interface AboutData {
  mainTitle: string;
  mainSubtitle: string;
  philosophyImage: string;
  philosophyTitle: string;
  philosophyText: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  bottomQuote: string;
  listItems: string[];
}

export interface MenuItem {
  label: string;
  href: string;
  view: PageView;
  subItems?: { label: string; view: PageView; filter?: string }[];
}

export type PageView = 'home' | 'portfolio' | 'about' | 'contact' | 'location' | 'admin';

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  images: string[]; // Base64 or ObjectURLs
}
