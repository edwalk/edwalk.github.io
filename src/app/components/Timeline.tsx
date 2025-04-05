import { useState, Fragment, useRef, useEffect } from 'react';
import { TimelineItem } from './types'; // Import the shared type

// Hardcoded timeline data
const timelineItems: TimelineItem[] = [
  {
    year: 2023,
    role: "Business Intelligence Analyst",
    company: "Ubisoft",
    dates: "November 2023 - Present",
    startDate: new Date(2023, 10),
    endDate: null,
  },
  {
    year: 2020,
    role: "Experience Manager",
    company: "Ubisoft",
    dates: "September 2020 - November 2023",
    startDate: new Date(2020, 8),
    endDate: new Date(2023, 10),
  },
  {
    year: 2019,
    role: "Customer Support Agent",
    company: "Ubisoft",
    dates: "June 2019 - September 2020",
    startDate: new Date(2019, 5),
    endDate: new Date(2020, 8),
  },
  {
    year: 2018,
    role: "Live Chat Support Agent",
    company: "The Chat Shop",
    dates: "November 2018 - June 2019",
    startDate: new Date(2018, 10),
    endDate: new Date(2019, 5),
  },
  {
    year: 2015,
    role: "Postgraduate Tutor",
    company: "",
    institution: "Durham University",
    dates: "September 2015 - May 2016",
    startDate: new Date(2015, 8),
    endDate: new Date(2016, 4),
  }
];

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function Timeline() {
  const [isSubheaderExpanded, setIsSubheaderExpanded] = useState(false);
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<number | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Keep timeline visualization helpers
  const getTimelinePosition = (date: Date): number => {
    const startDate = new Date(2015, 0);
    const today = new Date();
    const endDate = new Date(today.getFullYear(), today.getMonth());
    const totalDuration = endDate.getTime() - startDate.getTime();
    const position = date.getTime() - startDate.getTime();
    return (position / totalDuration) * 100;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  };

  const handleItemClick = (index: number) => {
    setSelectedTimelineItem(selectedTimelineItem === index ? null : index);
  };

  return (
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
                  <Fragment key={item.year + '-' + index}> {/* Improved key */}
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
                    left: '98%', // Adjusted slightly for better end positioning
                    top: '25px',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
                {/* Today label */}
                <span
                  className={`absolute text-xs text-gray-400 transition-opacity duration-300 ${selectedTimelineItem === null ? 'opacity-100' : 'opacity-0'
                    }`}
                  style={{
                    left: '98%', // Adjusted slightly for better end positioning
                    top: '0px', // 25px offset above timeline
                    transform: 'translate(-50%, 0)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Today
                </span>
              </div>
            </div>
          </div>

          {/* Simplified job entries with consistent animation */}
          <div className="mt-2 pl-4 relative overflow-visible">
            {/* If an item is selected, show only that item at the top */}
            {selectedTimelineItem !== null && (
              <div
                className="transition-all duration-500 ease-in-out"
              >
                <div className="pb-2">
                  <div
                    className="font-medium flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedTimelineItem(null)}
                  >
                    <span>{timelineItems[selectedTimelineItem].role}</span>
                    {(timelineItems[selectedTimelineItem].institution || timelineItems[selectedTimelineItem].company) && (
                      <>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-white">
                          {timelineItems[selectedTimelineItem].institution || timelineItems[selectedTimelineItem].company}
                        </span>
                        {timelineItems[selectedTimelineItem].company === "The Chat Shop" && (
                          <>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-gray-400">Remote</span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div className="text-sm text-gray-400 mb-2">{timelineItems[selectedTimelineItem].dates}</div>
                </div>

                {/* Details Section */}
                <div
                  ref={detailsRef}
                  className="mt-2 pl-4 border-l border-gray-600 ml-1 opacity-100 animate-fadeIn"
                >
                  <h4 className="font-semibold text-gray-200 mb-1">Details:</h4>
                  <p className="text-sm text-gray-400 italic">
                    {loremIpsum}
                  </p>
                </div>
              </div>
            )}

            {/* List of all jobs when nothing is selected */}
            {selectedTimelineItem === null && (
              <div className="space-y-4 transition-opacity duration-500 ease-in-out">
                {timelineItems.map((item, index) => (
                  <button
                    key={item.year + '-' + item.role}
                    onClick={() => handleItemClick(index)}
                    className="block text-left w-full transition-opacity duration-300 opacity-80 hover:opacity-100"
                  >
                    <div>
                      <div className="font-medium flex items-center">
                        <span>{item.role}</span>
                        {(item.institution || item.company) && (
                          <>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-gray-300">
                              {item.institution || item.company}
                            </span>
                            {item.company === "The Chat Shop" && (
                              <>
                                <span className="mx-2 text-gray-400">•</span>
                                <span className="text-gray-400">Remote</span>
                              </>
                            )}
                          </>
                        )}
                      </div>
                      <div className="text-sm text-gray-400 mb-2">{item.dates}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 