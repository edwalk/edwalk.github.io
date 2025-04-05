import { useEffect, useState, Fragment } from 'react';
import UnderConstruction from './UnderConstruction';
import Timeline from './Timeline';
import { Section, PortfolioSubSection, TimelineItem } from './types';

interface ContentProps {
  currentSection: Section;
  currentPortfolioSection: PortfolioSubSection;
}

export default function Content({ currentSection, currentPortfolioSection }: ContentProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [content, setContent] = useState(currentSection);

  useEffect(() => {
    if (currentSection !== content) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setContent(currentSection);
        setIsVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentSection, content, currentPortfolioSection]);

  const getPortfolioContent = () => {
    switch (currentPortfolioSection) {
      case 'data':
        return (
          <div className="space-y-4">
            <h3 className="text-xl mb-2">Data Projects</h3>
            <UnderConstruction />
          </div>
        );
      case 'visualisations':
        return (
          <div className="space-y-4">
            <h3 className="text-xl mb-2">Creative Visualisations</h3>
            <UnderConstruction />
          </div>
        );
      case 'vibe-coding':
        return (
          <div className="space-y-4">
            <h3 className="text-xl mb-2">Vibe Coding Projects</h3>
            <UnderConstruction />
          </div>
        );
    }
  };

  const getContent = () => {
    switch (content) {
      case 'blog':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
            <UnderConstruction />
          </div>
        );
      case 'about':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">
              Hello!
            </h2>
            <p className="opacity-80">
              I am a Business Intelligence Analyst currently employed by{' '}
              <a
                href="https://www.ubisoft.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5f1dd] hover:opacity-80 transition-opacity"
              >
                Ubisoft
              </a>
              . I design, build, and deliver compelling data visualizations and
              dashboards using SQL and Tableau, bringing complex operational data to life.
            </p>
            <Timeline />
          </div>
        );
      case 'portfolio':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">My Work</h2>
            {getPortfolioContent()}
          </div>
        );
    }
  };

  return (
    <main className={`pl-16 max-w-[50%] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
      {getContent()}
    </main>
  );
} 