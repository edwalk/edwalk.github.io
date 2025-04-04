import { useEffect, useState, Fragment } from 'react';
import UnderConstruction from './UnderConstruction';

type Section = 'blog' | 'about' | 'portfolio';
type PortfolioSubSection = 'data' | 'visualisations' | 'vibe-coding';

interface TimelineItem {
  year: number;
  role: string;
  company: string;
  institution?: string;
  dates: string;
  startDate: Date;
  endDate: Date | null;
  responsibilities: string[];
}

interface ContentProps {
  currentSection: Section;
  currentPortfolioSection: PortfolioSubSection;
}

export default function Content({ currentSection, currentPortfolioSection }: ContentProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [content, setContent] = useState(currentSection);
  const [isSubheaderExpanded, setIsSubheaderExpanded] = useState(false);
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<number | null>(null);

  const timelineItems: TimelineItem[] = [
    {
      year: 2023,
      role: "Business Intelligence Analyst",
      company: "Ubisoft",
      dates: "November 2023 - Present",
      startDate: new Date(2023, 10),
      endDate: null,
      responsibilities: []
    },
    {
      year: 2020,
      role: "Experience Manager",
      company: "Ubisoft",
      dates: "September 2020 - November 2023",
      startDate: new Date(2020, 8),
      endDate: new Date(2023, 10),
      responsibilities: []
    },
    {
      year: 2019,
      role: "Customer Support Agent",
      company: "Ubisoft",
      dates: "June 2019 - September 2020",
      startDate: new Date(2019, 5),
      endDate: new Date(2020, 8),
      responsibilities: []
    },
    {
      year: 2018,
      role: "Live Chat Support Agent",
      company: "The Chat Shop",
      dates: "November 2018 - June 2019",
      startDate: new Date(2018, 10),
      endDate: new Date(2019, 5),
      responsibilities: []
    },
    {
      year: 2015,
      role: "Postgraduate Tutor",
      company: "",
      institution: "Durham University",
      dates: "September 2015 - May 2016",
      startDate: new Date(2015, 8),
      endDate: new Date(2016, 4),
      responsibilities: []
    }
  ];

  // Calculate position percentage for timeline highlighting
  const getTimelinePosition = (date: Date): number => {
    const startDate = new Date(2015, 0); // January 2015
    const today = new Date();
    const endDate = new Date(today.getFullYear(), today.getMonth()); // Current month
    const totalDuration = endDate.getTime() - startDate.getTime();
    const position = date.getTime() - startDate.getTime();
    return (position / totalDuration) * 100;
  };

  // Function to format date
  const formatDate = (date: Date) => {
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  };

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
            <div className="mt-6">
              <button
                onClick={() => setIsSubheaderExpanded(!isSubheaderExpanded)}
                className="flex items-center space-x-2 text-lg text-[#f5f1dd] hover:opacity-80 transition-opacity"
              >
                <span>My Professional Journey</span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${isSubheaderExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isSubheaderExpanded && (
                <div className="mt-2 opacity-80">
                  <div className="relative mb-4">
                    {/* Timeline container */}
                    <div className="relative h-16">
                      {/* Base timeline line */}
                      <div className="absolute top-6 h-[2px] bg-gray-200 w-full">
                        {/* Arrow */}
                        <div className="absolute right-[-1px] top-[-3px] w-2 h-2 border-t border-r border-gray-200 transform rotate-45"></div>
                      </div>

                      {/* Year labels and job date bubbles */}
                      <div className="absolute top-0 w-full">
                        {timelineItems.map((item, index) => (
                          <Fragment key={item.year}>
                            {/* Start date bubble */}
                            <div
                              className={`absolute rounded-full border transition-all duration-300 ${selectedTimelineItem === index
                                ? 'w-2.5 h-2.5 border-blue-400 bg-blue-400 z-20'
                                : 'w-2 h-2 border-gray-400 bg-gray-800'
                                }`}
                              style={{
                                left: `${getTimelinePosition(item.startDate)}%`,
                                top: '25px',
                                transform: 'translate(-50%, -50%)'
                              }}
                            />
                            {/* Start date label */}
                            <span
                              className={`absolute text-xs text-gray-400 transition-opacity duration-300 ${selectedTimelineItem === index ? 'opacity-100' : 'opacity-0'
                                }`}
                              style={{
                                left: `${getTimelinePosition(item.startDate)}%`,
                                top: '0px', // 25px above timeline
                                transform: 'translate(-50%, 0)',
                                whiteSpace: 'nowrap',
                                pointerEvents: 'none'
                              }}
                            >
                              {formatDate(item.startDate)}
                            </span>
                            {/* End date bubble - only show if not the current role */}
                            {item.endDate && item.dates !== "November 2023 - Present" && (
                              <>
                                <div
                                  className={`absolute rounded-full border transition-all duration-300 ${selectedTimelineItem === index
                                    ? 'w-2.5 h-2.5 border-red-400 bg-red-400'
                                    : 'w-2 h-2 border-gray-400 bg-gray-800'
                                    }`}
                                  style={{
                                    left: `${getTimelinePosition(item.endDate)}%`,
                                    top: '25px',
                                    transform: 'translate(-50%, -50%)'
                                  }}
                                />
                                {/* End date label */}
                                <span
                                  className={`absolute text-xs text-gray-400 transition-opacity duration-300 ${selectedTimelineItem === index ? 'opacity-100' : 'opacity-0'
                                    }`}
                                  style={{
                                    left: `${getTimelinePosition(item.endDate)}%`,
                                    top: '40px', // 25px below timeline (symmetric with start date)
                                    transform: 'translate(-50%, 0)',
                                    whiteSpace: 'nowrap',
                                    pointerEvents: 'none'
                                  }}
                                >
                                  {formatDate(item.endDate)}
                                </span>
                              </>
                            )}
                          </Fragment>
                        ))}
                        {/* Today's bubble */}
                        <div
                          className="absolute w-2 h-2 rounded-full border border-gray-400 bg-gray-800"
                          style={{
                            left: '98%',
                            top: '25px',
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                        {/* Today label */}
                        <span
                          className={`absolute text-xs text-gray-400 transition-opacity duration-300 ${selectedTimelineItem === null ? 'opacity-100' : 'opacity-0'
                            }`}
                          style={{
                            left: '98%',
                            top: '0px', // 25px offset above timeline
                            transform: 'translate(-50%, 0)',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Today
                        </span>
                      </div>
                    </div>

                    {/* Job entries */}
                    <div className="mt-2 space-y-3 pl-4">
                      {timelineItems.map((item, index) => (
                        <button
                          key={item.year}
                          onClick={() => setSelectedTimelineItem(selectedTimelineItem === index ? null : index)}
                          className={`block text-left transition-opacity duration-300 w-full ${selectedTimelineItem === index ? 'opacity-100' : 'opacity-80'
                            }`}
                        >
                          <div>
                            <div className="text-sm font-medium flex items-center">
                              <span>{item.role}</span>
                              {(item.institution || item.company) && (
                                <>
                                  <span className="mx-2 text-gray-400">•</span>
                                  <span className="text-gray-300">{item.institution || item.company}</span>
                                  {item.company === "The Chat Shop" && (
                                    <>
                                      <span className="mx-2 text-gray-400">•</span>
                                      <span className="text-gray-400">Remote</span>
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                            <div className="text-xs text-gray-400 mb-2">{item.dates}</div>
                            {/* Placeholder for responsibilities */}
                            <div className="space-y-1 text-sm text-gray-400">
                              {/* Bullet points will go here */}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
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