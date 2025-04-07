'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import { Section, PortfolioSubSection } from '../components/types';

export default function About() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<Section>('about');
  const [currentPortfolioSection, setCurrentPortfolioSection] = useState<PortfolioSubSection>('data');

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen">
      <Header
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        currentPortfolioSection={currentPortfolioSection}
        onPortfolioSectionChange={setCurrentPortfolioSection}
        onBack={handleBack}
      />
      <main className="max-w-[50%] pl-16">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        {/* About content will go here */}
      </main>
    </div>
  );
} 