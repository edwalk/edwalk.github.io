'use client';

import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import { Section, PortfolioSubSection, BlogSubSection } from './components/types';

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [currentPortfolioSection, setCurrentPortfolioSection] = useState<PortfolioSubSection>('data');
  const [currentBlogSection, setCurrentBlogSection] = useState<BlogSubSection>('latest');

  // Update page title when section changes
  useEffect(() => {
    const getTitle = () => {
      if (!currentSection) return 'Edward Walker';
      const titles: Record<Section, string> = {
        about: 'About',
        blog: 'Blog',
        portfolio: 'Portfolio',
      };
      return `Edward Walker | ${titles[currentSection]}`;
    };
    document.title = getTitle();
  }, [currentSection]);

  // Render only LandingPage, passing state and setters
  return (
    <LandingPage
      onNavigate={setCurrentSection}
      currentSection={currentSection}
      currentPortfolioSection={currentPortfolioSection}
      onPortfolioSectionChange={setCurrentPortfolioSection}
      currentBlogSection={currentBlogSection}
      onBlogSectionChange={setCurrentBlogSection}
    />
  );
}
