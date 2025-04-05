export type Section = 'blog' | 'about' | 'portfolio';
export type PortfolioSubSection = 'data' | 'visualisations' | 'vibe-coding';

// Add the TimelineItem interface
export interface TimelineItem {
  year: number;
  role: string;
  company: string;
  institution?: string;
  dates: string;
  startDate: Date;
  endDate: Date | null;
} 