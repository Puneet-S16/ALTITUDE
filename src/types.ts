export interface Trek {
  id: string;
  name: string;
  region: string;
  days: number;
  maxAltitude: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  price: number;
  image: string;
  alt: string;
  tagline: string;
  description: string;
  highlights: string[];
  bestSeason: string;
  gradientColor?: string;
}

export interface Story {
  id: string;
  quote: string;
  name: string;
  credential: string; // e.g. "IIT Delhi, 22" or "Product Designer, Bangalore"
  trek: string;
  avatar?: string;
  year: string;
}

export interface BentoCard {
  id: string;
  title: string;
  description: string;
  iconName: 'Award' | 'Users' | 'FileCheck' | 'ShieldAlert' | 'Receipt';
  badge?: string;
  image?: string;
  colSpanDesktop: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export type CursorMode = 'default' | 'view' | 'pointer' | 'text';

