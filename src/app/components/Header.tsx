import { Section, PortfolioSubSection } from './types';

interface HeaderProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  currentPortfolioSection: PortfolioSubSection;
  onPortfolioSectionChange: (section: PortfolioSubSection) => void;
  onBack: () => void;
}

export default function Header({
  currentSection,
  onSectionChange,
  currentPortfolioSection,
  onPortfolioSectionChange,
  onBack
}: HeaderProps) {
  const getLinkStyles = (section: Section) => {
    return `text-[#dcd7ba] text-lg transition-all duration-300 ${currentSection === section
      ? 'opacity-100 font-bold'
      : 'opacity-80 hover:opacity-100'
      }`;
  };

  const getSubLinkStyles = (section: PortfolioSubSection) => {
    return `text-[#dcd7ba] text-sm transition-all duration-300 ${currentPortfolioSection === section
      ? 'opacity-100 font-bold'
      : 'opacity-70 hover:opacity-100'
      }`;
  };

  return (
    <header className="p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 md:gap-8">
          <button
            onClick={onBack}
            className="text-[#dcd7ba] hover:opacity-80 transition-opacity"
            aria-label="Go back to landing page"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-[#dcd7ba]">
            Edward Walker
          </h1>

          <nav className="ml-auto">
            <ul className="flex flex-wrap gap-4 md:gap-6 text-base">
              <li>
                <button
                  onClick={() => onSectionChange('about')}
                  className={getLinkStyles('about')}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSectionChange('blog')}
                  className={getLinkStyles('blog')}
                >
                  Blog
                </button>
              </li>
              <li className="relative">
                <button
                  onClick={() => onSectionChange('portfolio')}
                  className={getLinkStyles('portfolio')}
                >
                  Portfolio
                </button>
                {currentSection === 'portfolio' && (
                  <div className="absolute left-0 top-full mt-2 bg-[#1a1b26] rounded shadow-lg p-2 min-w-[150px]">
                    <ul className="space-y-2">
                      <li>
                        <button
                          onClick={() => onPortfolioSectionChange('data')}
                          className={getSubLinkStyles('data')}
                        >
                          Data
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => onPortfolioSectionChange('visualisations')}
                          className={getSubLinkStyles('visualisations')}
                        >
                          Visualisations
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => onPortfolioSectionChange('vibe-coding')}
                          className={getSubLinkStyles('vibe-coding')}
                        >
                          Vibe Coding
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
} 