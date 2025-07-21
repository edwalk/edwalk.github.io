export type Section = 'blog' | 'about' | 'portfolio';
export type PortfolioSubSection = 'data' | 'visualisations' | 'vibe-coding';
export type BlogSubSection = 'latest' | 'tag-ai' | 'tag-web-development' | 'tag-future' | 'tag-react' | 'tag-ui' | 'tag-development';
export type AboutSubSection = 'work' | 'education' | 'side-quests';

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