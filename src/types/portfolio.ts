export type PortfolioCategory =
  | 'ALL WORK'
  | 'BLACK & GREY'
  | 'REALISM'
  | 'FINE LINE'
  | 'TRIBAL'
  | 'GEOMETRIC'
  | 'TRADITIONAL'
  | 'CUSTOM DESIGNS';

export type SpecificPortfolioCategory = Exclude<PortfolioCategory, 'ALL WORK'>;

export interface PortfolioItem {
  id: string;
  title: string;
  primaryCategory: SpecificPortfolioCategory;
  categories: SpecificPortfolioCategory[];
  image: string;
  alt: string;
  aspectRatio: '3/4' | '4/5' | '1/1' | '4/3';
  placement: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  /** Matches a Tattoo Style option in the booking enquiry form for one-click prefill */
  styleValue: string;
  description: string;
  image: string;
  alt: string;
}

export interface ProcessFeature {
  id: string;
  title: string;
  description: string;
  icon: 'pen' | 'craft' | 'hygiene' | 'client';
}

export interface ExperienceStat {
  value: string;
  label: string;
  note?: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  tattooStyle: string;
  preferredDate: string;
  placement: string;
  approximateSize: string;
  estimatedBudget: string;
  description: string;
  attachments: File[];
}
