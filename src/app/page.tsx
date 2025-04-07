'use client';

import { useState } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import { Section, PortfolioSubSection } from './components/types';

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>('about');
  const [currentPortfolioSection, setCurrentPortfolioSection] = useState<PortfolioSubSection>('data');

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col min-h-[50vh]">
        <Header
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
          currentPortfolioSection={currentPortfolioSection}
          onPortfolioSectionChange={setCurrentPortfolioSection}
        />
        <Content
          currentSection={currentSection}
          currentPortfolioSection={currentPortfolioSection}
        />
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
