import { useEffect, useState, Fragment } from 'react';
// import UnderConstruction from './UnderConstruction'; // Remove import
import { Section, PortfolioSubSection, TimelineItem } from './types';

// --- Data moved from Timeline.tsx ---
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

// Education data (simplified type for Content component)
const educationItems = [
  {
    year: 2015,
    degree: "PhD",
    subject: "Politics",
    institution: "Durham University",
    dates: "2015 - 2019",
  },
  {
    year: 2013,
    degree: "MA",
    subject: "International Relations",
    institution: "Durham University",
    dates: "2013 - 2014",
  },
  {
    year: 2010,
    degree: "BA",
    subject: "Politics",
    institution: "University of East Anglia",
    dates: "2010 - 2013",
  }
];

// Job-specific details
interface JobDetails {
  [key: number]: React.ReactNode;
}
const jobDetails: JobDetails = {
  0: (
    <>
      <p className="text-sm text-gray-400 mb-2">
        Maintained and expanded a repository of over 50 Tableau dashboards.
      </p>
      <p className="text-sm text-gray-400 mb-2">
        Used SQL to query Snowflake databases to create datasets for dashboards or address ad-hoc data requests from stakeholders.
      </p>
      <p className="text-sm text-gray-400 mb-2">
        Created reports that supported short and long term business strategic thinking.
      </p>
      <p className="text-sm text-gray-400">
        Ingested data from new datasources using SQL and an Airflow-derivated internal tool.
      </p>
    </>
  ),
  1: (
    <>
      <p className="text-sm text-gray-400 mb-2">
        Drove major customer-facing improvements related to Ubisoft accounts and player safety.
      </p>
      <p className="text-sm text-gray-400 mb-2">
        Led the development of a partnership between Northumbria Police and Ubisoft to enhance player safety initiatives.
      </p>
      <p className="text-sm text-gray-400 mb-2">
        Collaborated with legal teams, ICO and OFCOM to develop compliance strategies for data privacy and online safety legislation.
      </p>
      <p className="text-sm text-gray-400">
        Created and managed the department's internal crisis management process, designed to provide adequate responses to security-sensitive situations involving customers.
      </p>
    </>
  ),
  2: (
    <p className="text-sm text-gray-400">
      Provided frontline support to Ubisoft customers across a range of technical and non-technical topics.
      Delivered assistance through both live and asynchronous support channels.
    </p>
  ),
  3: (
    <p className="text-sm text-gray-400">
      Provided support and lead generation chats for a range of Orthodontics practices in the United States.
    </p>
  ),
  4: (
    <>
      <p className="text-sm text-gray-400 mb-2">
        Taught approximately 60 undergraduate students at Durham University.
      </p>
      <p className="text-sm text-gray-400 mb-2">
        Focused on teaching critical thinking skills and how to use international relations
        theories in real life analysis.
      </p>
      <p className="text-sm text-gray-400">
        Received excellent feedback from students and faculty. All students successfully
        passed the module.
      </p>
    </>
  ),
};
// --- End of moved data ---

// --- Side Quest Data ---
interface SideQuestItem {
  id: number;
  linkText: string;
  linkHref: string;
  role: string;
  dates: string;
  details: string;
}

const sideQuestItems: SideQuestItem[] = [
  {
    id: 0,
    linkText: "Whitley Warriors",
    linkHref: "https://www.youtube.com/c/WhitleyWarriorsTV",
    role: "Cameraman and video editor",
    dates: "September 2024 - Present",
    details: "I film home games at Whitley Bay Ice Rink and edit highlights for Warriors TV, the club's Youtube channel. Come support your local team and say hi!",
  },
];
// --- End of Side Quest Data ---

interface ContentProps {
  currentSection: Section;
  currentPortfolioSection: PortfolioSubSection;
}

export default function Content({ currentSection, currentPortfolioSection }: ContentProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [content, setContent] = useState(currentSection);
  const [selectedJobIndex, setSelectedJobIndex] = useState<number | null>(null);
  const [aboutSubSection, setAboutSubSection] = useState<'work' | 'education' | 'side-quests' | null>('work');
  const [selectedSideQuestIndex, setSelectedSideQuestIndex] = useState<number | null>(null);

  useEffect(() => {
    if (currentSection !== 'about') {
      setSelectedJobIndex(null);
      setSelectedSideQuestIndex(null);
      setAboutSubSection('work');
    }

    if (currentSection !== content) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setContent(currentSection);
        setIsVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentSection, content, currentPortfolioSection]);

  const handleJobClick = (index: number) => {
    setSelectedJobIndex(selectedJobIndex === index ? null : index);
  };

  const handleSideQuestClick = (index: number) => {
    setSelectedSideQuestIndex(selectedSideQuestIndex === index ? null : index);
  };

  const getPortfolioContent = () => {
    return (
      <div className="flex items-center justify-center h-full text-4xl md:text-6xl font-bold text-[#dcd7ba] opacity-70">
        Coming Soon...
      </div>
    );
  };

  const renderAboutContent = () => {
    switch (aboutSubSection) {
      case 'work':
        return (
          <div className="space-y-4 mt-4 animate-fadeIn">
            {timelineItems.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => handleJobClick(index)}
                  className="block text-left w-full transition-opacity duration-300 opacity-80 hover:opacity-100"
                >
                  <div className="font-medium flex items-center">
                    <span>{item.role}</span>
                    {(item.institution || item.company) && (
                      <>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-300">
                          {item.institution || item.company}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="text-sm text-gray-400 mb-1">{item.dates}</div>
                </button>
                {selectedJobIndex === index && (
                  <div className="mt-2 pl-4 border-l border-gray-600 ml-1 opacity-100 animate-fadeIn">
                    {jobDetails[index] || (
                      <p className="text-sm text-gray-400 italic">
                        Details coming soon...
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case 'education':
        return (
          <div className="space-y-4 mt-4 animate-fadeIn">
            {educationItems.map((item, index) => (
              <div key={index} className="opacity-80">
                <div className="font-medium flex items-center">
                  <span>{item.degree} - {item.subject}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-300">{item.institution}</span>
                </div>
                <div className="text-sm text-gray-400 mb-1">{item.dates}</div>
              </div>
            ))}
          </div>
        );
      case 'side-quests':
        return (
          <div className="space-y-4 mt-4 animate-fadeIn">
            {sideQuestItems.map((item, index) => (
              <div key={item.id}>
                <button
                  onClick={() => handleSideQuestClick(index)}
                  className="block text-left w-full transition-opacity duration-300 opacity-80 hover:opacity-100"
                >
                  <div className="font-medium flex items-center">
                    <a
                      href={item.linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="hover:underline"
                    >
                      {item.linkText}
                    </a>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-300">{item.role}</span>
                  </div>
                  <div className="text-sm text-gray-400 mb-1">{item.dates}</div>
                </button>
                {selectedSideQuestIndex === index && (
                  <div className="mt-2 pl-4 border-l border-gray-600 ml-1 opacity-100 animate-fadeIn">
                    <p className="text-sm text-gray-400 italic">
                      {item.details}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const getContent = () => {
    switch (content) {
      case 'blog':
        return (
          <div className="flex items-center justify-center h-full text-4xl md:text-6xl font-bold text-[#dcd7ba] opacity-70">
            Coming Soon...
          </div>
        );
      case 'about':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-3">
              My story so far...
            </h2>
            <nav className="flex space-x-4 border-b border-gray-700 pb-2 mb-4">
              <button
                onClick={() => setAboutSubSection('work')}
                className={`pb-1 transition-colors duration-200 ${aboutSubSection === 'work' ? 'border-b-2 border-[#dcd7ba] text-[#dcd7ba]' : 'text-gray-400 hover:text-gray-200'}`}
              >
                Work
              </button>
              <button
                onClick={() => setAboutSubSection('education')}
                className={`pb-1 transition-colors duration-200 ${aboutSubSection === 'education' ? 'border-b-2 border-[#dcd7ba] text-[#dcd7ba]' : 'text-gray-400 hover:text-gray-200'}`}
              >
                Education
              </button>
              <button
                onClick={() => setAboutSubSection('side-quests')}
                className={`pb-1 transition-colors duration-200 ${aboutSubSection === 'side-quests' ? 'border-b-2 border-[#dcd7ba] text-[#dcd7ba]' : 'text-gray-400 hover:text-gray-200'}`}
              >
                Side Quests
              </button>
            </nav>
            {renderAboutContent()}
          </div>
        );
      case 'portfolio':
        return getPortfolioContent();
    }
  };

  return (
    <main
      className={`p-8 transition-opacity duration-300 flex-grow ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <div className="bg-[#1a1b26]/50 rounded-lg p-6 backdrop-blur-sm flex-grow">
          {getContent()}
        </div>
      </div>
    </main>
  );
} 