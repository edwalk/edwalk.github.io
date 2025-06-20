'use client';

import { useState, useEffect } from 'react';
import { Section, PortfolioSubSection, BlogSubSection } from './types';
import dynamic from 'next/dynamic';
import Content from './Content';
// import Footer from './Footer'; // Removed unused import
// import Header from './Header'; // Removed unused import
import { BlogPost } from '../lib/getBlogPosts';

const ParticlesBackground = dynamic(() => import('./Particles'), {
  ssr: false,
});

// Hamburger Icon Component
const HamburgerIcon = ({ onClick }: { onClick: () => void }) => (
  <svg
    className="w-6 h-6 text-[#dcd7ba] cursor-pointer hover:opacity-80 transition-opacity"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    onClick={onClick}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

// Close Icon Component
const CloseIcon = ({ onClick }: { onClick: () => void }) => (
  <svg
    className="w-6 h-6 text-[#dcd7ba] cursor-pointer hover:opacity-80 transition-opacity"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    onClick={onClick}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

interface ClientLandingPageProps {
  blogPosts: BlogPost[];
}

export default function ClientLandingPage({ blogPosts }: ClientLandingPageProps) {
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [currentPortfolioSection, setCurrentPortfolioSection] = useState<PortfolioSubSection>('vibe-coding');
  const [currentBlogSection, setCurrentBlogSection] = useState<BlogSubSection>('latest');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedPortfolioMenu, setExpandedPortfolioMenu] = useState(false);
  const [expandedBlogMenu, setExpandedBlogMenu] = useState(false);

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
    }
  }, [currentSection]);

  const menuItems: { label: string; section: Section }[] = [
    { label: 'About', section: 'about' },
    { label: 'Portfolio', section: 'portfolio' },
    { label: 'Blog', section: 'blog' },
  ];

  const handleMenuClick = (section: Section) => {
    if (currentSection === section) {
      // Toggle submenu if clicking the active section
      if (section === 'portfolio') {
        setExpandedPortfolioMenu(!expandedPortfolioMenu);
      } else if (section === 'blog') {
        setExpandedBlogMenu(!expandedBlogMenu);
      }
    } else {
      // Navigate to the section and ensure submenu is expanded
      setCurrentSection(section);
      if (section === 'portfolio') {
        setExpandedPortfolioMenu(true);
        setExpandedBlogMenu(false);
      } else if (section === 'blog') {
        setExpandedBlogMenu(true);
        setExpandedPortfolioMenu(false);
      } else {
        setExpandedPortfolioMenu(false);
        setExpandedBlogMenu(false);
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
    <div className="min-h-screen flex relative">
      <ParticlesBackground />

      {/* Semi-transparent background overlay */}
      <div className="fixed inset-0 bg-[#1a1b26] opacity-80 z-0" />

      {/* Menu Button (Visible when menu closed) */}
      {!isMenuOpen && (
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-[#1a1b26]/50 backdrop-blur-sm"
          onClick={toggleMenu}
          aria-label="Open menu"
        >
          <HamburgerIcon onClick={toggleMenu} />
        </button>
      )}

      {/* Left side menu */}
      <nav
        className={`fixed left-0 top-0 h-screen w-64 bg-[#1a1b26]/85 backdrop-blur-md border-r border-[#dcd7ba]/20 z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Updated Header within Nav */}
        <div className="p-6 flex items-center justify-between mb-2">
          {/* Make name clickable */}
          <button
            onClick={() => {
              setCurrentSection(null);
            }}
            className="text-xl font-bold text-[#dcd7ba] hover:opacity-80 transition-opacity"
          >
            Edward Walker
          </button>
          {/* Close button visible only when menu is open */}
          {isMenuOpen && (
            <button
              onClick={toggleMenu}
              aria-label="Close menu"
              className="p-1 -mr-1"
            >
              <CloseIcon onClick={toggleMenu} />
            </button>
          )}
        </div>
        {/* Navigation List */}
        <div className="px-6">
          <ul className="space-y-6">
            {menuItems.map((item) => (
              <li key={item.section}>
                <button
                  onClick={() => handleMenuClick(item.section)}
                  className={`text-lg hover:opacity-80 transition-opacity w-full text-left ${currentSection === item.section
                    ? 'text-[#dcd7ba] font-bold'
                    : 'text-[#dcd7ba]/70'
                    }`}
                >
                  {item.label}
                </button>
                {item.section === 'portfolio' && currentSection === 'portfolio' && expandedPortfolioMenu && (
                  <div className="mt-2 ml-4 space-y-2 transition-opacity duration-300">
                    <button
                      onClick={() => {
                        setCurrentPortfolioSection('data');
                      }}
                      className={`block text-sm w-full text-left transition-opacity ${currentPortfolioSection === 'data'
                        ? 'text-[#dcd7ba] font-bold'
                        : 'text-[#dcd7ba]/60 hover:text-[#dcd7ba]/80'
                        }`}
                    >
                      Data
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPortfolioSection('visualisations');
                      }}
                      className={`block text-sm w-full text-left transition-opacity ${currentPortfolioSection === 'visualisations'
                        ? 'text-[#dcd7ba] font-bold'
                        : 'text-[#dcd7ba]/60 hover:text-[#dcd7ba]/80'
                        }`}
                    >
                      Visualisations
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPortfolioSection('vibe-coding');
                      }}
                      className={`block text-sm w-full text-left transition-opacity ${currentPortfolioSection === 'vibe-coding'
                        ? 'text-[#dcd7ba] font-bold'
                        : 'text-[#dcd7ba]/60 hover:text-[#dcd7ba]/80'
                        }`}
                    >
                      Vibe Coding
                    </button>
                  </div>
                )}
                {item.section === 'blog' && currentSection === 'blog' && expandedBlogMenu && (
                  <div className="mt-2 ml-4 space-y-2 transition-opacity duration-300">
                    {uniqueTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setCurrentBlogSection(`tag-${tag.toLowerCase()}` as BlogSubSection);
                        }}
                        className={`block text-sm w-full text-left transition-opacity ${currentBlogSection === `tag-${tag.toLowerCase()}`
                          ? 'text-[#dcd7ba] font-bold'
                          : 'text-[#dcd7ba]/60 hover:text-[#dcd7ba]/80'
                          }`}
                      >
                        {formatTagName(tag)}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main content area - Conditionally renders Welcome or Content+Footer */}
      <div className="flex-1 z-20 flex flex-col">
        {currentSection !== null && (
          <Content
            currentSection={currentSection}
            currentPortfolioSection={currentPortfolioSection}
            currentBlogSection={currentBlogSection}
            blogPosts={blogPosts}
          />
        )}
        {currentSection === null && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <button
                onClick={() => setCurrentSection('about')}
                className="text-4xl md:text-6xl font-bold text-[#dcd7ba] opacity-70 hover:opacity-100 transition-opacity mb-6"
              >
                Edward Walker
              </button>
                <p className="text-lg md:text-xl text-[#dcd7ba] opacity-60">
                  Data Analyst. Budding Coder. Future Enthusiast.
                </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
