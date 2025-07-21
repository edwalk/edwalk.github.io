'use client';

import { useState, useEffect, useMemo } from 'react';
import { Section, PortfolioSubSection, BlogSubSection, AboutSubSection } from './types';
import dynamic from 'next/dynamic';
import Content from './Content';
import { BlogPost } from '../lib/getBlogPosts';

const ParticlesBackground = dynamic(() => import('./Particles'), {
  ssr: false,
});

interface ClientLandingPageProps {
  blogPosts: BlogPost[];
}

export default function ClientLandingPage({ blogPosts }: ClientLandingPageProps) {
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [currentPortfolioSection, setCurrentPortfolioSection] = useState<PortfolioSubSection>('vibe-coding');
  const [currentBlogSection, setCurrentBlogSection] = useState<BlogSubSection>('latest');
  const [currentAboutSection, setCurrentAboutSection] = useState<AboutSubSection>('work');
  const [expandedPortfolioMenu, setExpandedPortfolioMenu] = useState(false);
  const [expandedBlogMenu, setExpandedBlogMenu] = useState(false);
  const [expandedAboutMenu, setExpandedAboutMenu] = useState(false);

  // Memoize particles to prevent reloading
  const particles = useMemo(() => <ParticlesBackground />, []);

  // Set document title based on current section
  useEffect(() => {
    let sectionTitle = '';
    if (currentSection === null) {
      sectionTitle = 'Edward Walker';
    } else {
      // Capitalize first letter
      sectionTitle = `Edward Walker | ${currentSection.charAt(0).toUpperCase()}${currentSection.slice(1)}`;
    }
    document.title = sectionTitle;
  }, [currentSection]);

  useEffect(() => {
    // Expand appropriate submenu based on current section
    if (currentSection === 'portfolio') {
      setExpandedPortfolioMenu(true);
    } else if (currentSection === 'blog') {
      setExpandedBlogMenu(true);
    } else if (currentSection === 'about') {
      setExpandedAboutMenu(true);
    }
  }, [currentSection]);

  const menuItems: { label: string; section: Section }[] = [
    { label: 'About', section: 'about' },
    { label: 'Portfolio', section: 'portfolio' },
    { label: 'Blog', section: 'blog' },
  ];

  const handleMenuClick = (section: Section) => {
    // Always navigate to the section and ensure submenu is expanded
    setCurrentSection(section);
    if (section === 'portfolio') {
      setCurrentPortfolioSection('data'); // Default to leftmost (Data)
      setExpandedPortfolioMenu(true);
      setExpandedBlogMenu(false);
      setExpandedAboutMenu(false);
    } else if (section === 'blog') {
      setCurrentBlogSection('latest'); // Default to All posts
      setExpandedBlogMenu(true);
      setExpandedPortfolioMenu(false);
      setExpandedAboutMenu(false);
    } else if (section === 'about') {
      setCurrentAboutSection('work'); // Default to leftmost (Work)
      setExpandedAboutMenu(true);
      setExpandedPortfolioMenu(false);
      setExpandedBlogMenu(false);
    } else {
      setExpandedPortfolioMenu(false);
      setExpandedBlogMenu(false);
      setExpandedAboutMenu(false);
    }
  };



  // Extract unique tags from blog posts
  const uniqueTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  // Function to convert tag format for display
  const formatTagName = (tag: string): string => {
    return tag
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {particles}
      
      {/* Semi-transparent background overlay */}
      <div className="fixed inset-0 bg-[#1a1b26] opacity-80 z-0" />

      {/* Main content container */}
      <div className="z-20 w-full max-w-4xl mx-auto p-8">
        <div className="bg-[#1a1b26]/85 backdrop-blur-md border border-[#dcd7ba]/20 rounded-lg overflow-hidden transition-all duration-500 ease-in-out">
          {/* Header section with name and navigation */}
          <div className="p-6 border-b border-[#dcd7ba]/20">
            {/* Name/Title */}
            <div className="text-center mb-4">
              <button
                onClick={() => setCurrentSection(null)}
                className="text-3xl md:text-4xl font-bold text-[#dcd7ba] hover:opacity-80 transition-opacity"
              >
                Edward Walker
              </button>
              <p className="text-sm text-[#dcd7ba]/60 mt-1">
                Data Professional in Newcastle-Upon-Tyne, UK
              </p>
            </div>

            {/* Navigation Menu */}
            <nav className="flex justify-center">
              <ul className="flex space-x-8">
                {menuItems.map((item) => (
                  <li key={item.section}>
                    <button
                      onClick={() => handleMenuClick(item.section)}
                      className={`text-lg hover:opacity-80 transition-opacity ${currentSection === item.section
                        ? 'text-[#dcd7ba] font-bold border-b-2 border-[#dcd7ba] pb-1'
                        : 'text-[#dcd7ba]/70'
                        }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sub-navigation for Portfolio */}
            {currentSection === 'portfolio' && expandedPortfolioMenu && (
              <div className="mt-4 flex justify-center transition-all duration-300 ease-in-out animate-fadeIn">
                <div className="flex space-x-6">
                  <button
                    onClick={() => setCurrentPortfolioSection('data')}
                    className={`text-sm transition-all duration-200 ${currentPortfolioSection === 'data'
                      ? 'text-[#dcd7ba] font-bold'
                      : 'text-[#dcd7ba]/60 hover:text-[#dcd7ba]/80'
                      }`}
                  >
                    Data
                  </button>
                  <button
                    onClick={() => setCurrentPortfolioSection('visualisations')}
                    className={`text-sm transition-all duration-200 ${currentPortfolioSection === 'visualisations'
                      ? 'text-[#dcd7ba] font-bold'
                      : 'text-[#dcd7ba]/60 hover:text-[#dcd7ba]/80'
                      }`}
                  >
                    Visualisations
                  </button>
                  <button
                    onClick={() => setCurrentPortfolioSection('vibe-coding')}
                    className={`text-sm transition-all duration-200 ${currentPortfolioSection === 'vibe-coding'
                      ? 'text-[#dcd7ba] font-bold'
                      : 'text-[#dcd7ba]/60 hover:text-[#dcd7ba]/80'
                      }`}
                  >
                    Vibe Coding
                  </button>
                </div>
              </div>
            )}

            {/* Sub-navigation for Blog */}
            {currentSection === 'blog' && expandedBlogMenu && (
              <div className="mt-4 flex justify-center transition-all duration-300 ease-in-out animate-fadeIn">
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => setCurrentBlogSection('latest')}
                    className={`text-sm transition-all duration-200 ${currentBlogSection === 'latest'
                      ? 'text-[#dcd7ba] font-bold'
                      : 'text-[#dcd7ba]/60 hover:text-[#dcd7ba]/80'
                      }`}
                  >
                    All
                  </button>
                  {uniqueTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setCurrentBlogSection(`tag-${tag.toLowerCase()}` as BlogSubSection)}
                      className={`text-sm transition-all duration-200 ${currentBlogSection === `tag-${tag.toLowerCase()}`
                        ? 'text-[#dcd7ba] font-bold'
                        : 'text-[#dcd7ba]/60 hover:text-[#dcd7ba]/80'
                        }`}
                    >
                      {formatTagName(tag)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-navigation for About */}
            {currentSection === 'about' && expandedAboutMenu && (
              <div className="mt-4 flex justify-center transition-all duration-300 ease-in-out animate-fadeIn">
                <div className="flex space-x-6">
                  <button
                    onClick={() => setCurrentAboutSection('work')}
                    className={`text-sm transition-all duration-200 ${currentAboutSection === 'work'
                      ? 'text-[#dcd7ba] font-bold'
                      : 'text-[#dcd7ba]/60 hover:text-[#dcd7ba]/80'
                      }`}
                  >
                    Work
                  </button>
                  <button
                    onClick={() => setCurrentAboutSection('education')}
                    className={`text-sm transition-all duration-200 ${currentAboutSection === 'education'
                      ? 'text-[#dcd7ba] font-bold'
                      : 'text-[#dcd7ba]/60 hover:text-[#dcd7ba]/80'
                      }`}
                  >
                    Education
                  </button>
                  <button
                    onClick={() => setCurrentAboutSection('side-quests')}
                    className={`text-sm transition-all duration-200 ${currentAboutSection === 'side-quests'
                      ? 'text-[#dcd7ba] font-bold'
                      : 'text-[#dcd7ba]/60 hover:text-[#dcd7ba]/80'
                      }`}
                  >
                    Side Quests
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Content area */}
          {currentSection && (
            <div className="p-6 pr-2 transition-all duration-500 ease-in-out">
              <div className="min-h-[200px] max-h-[60vh] overflow-y-auto pr-4 transition-all duration-500 ease-in-out">
                <Content
                  currentSection={currentSection}
                  currentPortfolioSection={currentPortfolioSection}
                  currentBlogSection={currentBlogSection}
                  currentAboutSection={currentAboutSection}
                  blogPosts={blogPosts}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
