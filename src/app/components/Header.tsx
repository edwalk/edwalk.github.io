type Section = 'blog' | 'about' | 'portfolio';
type PortfolioSubSection = 'data' | 'visualisations' | 'vibe-coding';

interface HeaderProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  currentPortfolioSection: PortfolioSubSection;
  onPortfolioSectionChange: (section: PortfolioSubSection) => void;
}

export default function Header({
  currentSection,
  onSectionChange,
  currentPortfolioSection,
  onPortfolioSectionChange
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
    <header className="pl-16 py-6 max-w-[50%]">
      <div className="flex items-baseline gap-8">
        <h1 className="text-3xl font-bold text-[#dcd7ba]">
          Edward Walker
        </h1>
        <nav>
          <ul className="flex space-x-6 text-base">
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
              <div className={`
                absolute left-full ml-4 top-1
                transition-all duration-300 origin-left
                ${currentSection === 'portfolio'
                  ? 'opacity-100 transform scale-x-100'
                  : 'opacity-0 transform scale-x-0 pointer-events-none'}
              `}>
                <ul className="flex flex-row space-x-4">
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
                      Vibe&nbsp;Coding
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 