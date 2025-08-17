import { useEffect, useState } from 'react';
// import UnderConstruction from './UnderConstruction'; // Remove import
import { Section, PortfolioSubSection, TimelineItem, BlogSubSection, AboutSubSection } from './types';
import { BlogPost } from '../lib/getBlogPosts';
import ReactMarkdown from 'react-markdown';

// --- Data moved from Timeline.tsx ---
// Hardcoded timeline data
const timelineItems: TimelineItem[] = [
  {
    year: 2025,
    role: "Senior Intelligence Analyst",
    company: "Infected Blood Compensation Authority",
    dates: "August 2025 - Present",
    startDate: new Date(2025, 7),
    endDate: null,
  },
  {
    year: 2023,
    role: "Business Intelligence Analyst",
    company: "Ubisoft",
    dates: "November 2023 - August 2025",
    startDate: new Date(2023, 10),
    endDate: new Date(2025, 7),
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
    <p className="text-sm text-gray-400 italic">
      Details coming soon...
    </p>
  ),
  1: (
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
  2: (
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
        Created and managed the department&apos;s internal crisis management process, designed to provide adequate responses to security-sensitive situations involving customers.
      </p>
    </>
  ),
  3: (
    <p className="text-sm text-gray-400">
      Provided frontline support to Ubisoft customers across a range of technical and non-technical topics.
      Delivered assistance through both live and asynchronous support channels.
    </p>
  ),
  4: (
    <p className="text-sm text-gray-400">
      Provided support and lead generation chats for a range of Orthodontics practices in the United States.
    </p>
  ),
  5: (
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

// --- Portfolio Project Data ---
interface ProjectItem {
  id: number;
  title: string;
  linkHref?: string;
  dates?: string;
  details: string;
}

const vibeCodingProjects: ProjectItem[] = [
  {
    id: 0,
    title: "This website",
    details: "This website was created over a handful of evenings using Cursor, Claude 3.7 Sonnet and Gemini 2.5 Pro."
  },
  {
    id: 1,
    title: "Ice Hockey Event Tracker",
    linkHref: "https://github.com/edwalk/ice-hockey-event-tracker",
    details: "When filming matches for the Whitley Warriors, I needed a way to track events as they happened to facilitate the editing process. This small, portable web app can be used to track events in sync with camera timestamps and exports events to a CSV that can be used to generate markers in Adobe Premiere Pro."
  },
  {
    id: 2,
    title: "Premiere Pro Marker Importer",
    linkHref: "https://github.com/edwalk/premiere-pro-marker-importer",
    details: "This is small JSX script created to support the use of the event tracker above. Used in Adobe Premiere Pro, it fetches events from a CSV file and imports them as markers on the current active sequence, adding relevant timestamps seamlessly to video."
  }
];

// --- Visualisation Project Data ---
const visualisationProjects: ProjectItem[] = [
  {
    id: 0,
    title: 'WoW Essentials / 2018-13',
    linkHref: 'https://public.tableau.com/app/profile/edward.walker3149/viz/tableau_17378890939780/SalesYear',
    details: '',
  },
  {
    id: 1,
    title: 'WoW Essentials / 2018-07',
    linkHref: 'https://public.tableau.com/app/profile/edward.walker3149/viz/tableau_17378411135730/MinMaxSales',
    details: '',
  },
  {
    id: 2,
    title: 'WoW Essentials / 2018-04',
    linkHref: 'https://public.tableau.com/app/profile/edward.walker3149/viz/tableau_17378273548450/WorkoutWednesday2018Week4',
    details: '',
  },
  {
    id: 3,
    title: 'WoW 2025-17',
    linkHref: 'https://public.tableau.com/app/profile/edward.walker3149/viz/tableau_17462309704380/2025-WW17-Bonus',
    details: '',
  },
  {
    id: 4,
    title: 'WoW 2025-18',
    linkHref: 'https://public.tableau.com/app/profile/edward.walker3149/viz/tableau_17462921997870/WOW2025Week18?publish=yes',
    details: '',
  },
  {
    id: 5,
    title: 'WoW 2025-19',
    linkHref: 'https://public.tableau.com/app/profile/edward.walker3149/viz/WOW2025W19_17529559740600/ChatGPTReviews',
    details: '',
  },
];
// --- End of Visualisation Project Data ---

// --- Blog Data ---
// Note: Blog posts will be passed as props from the parent component
interface ContentProps {
  currentSection: Section | null;
  currentPortfolioSection: PortfolioSubSection;
  currentBlogSection: BlogSubSection;
  currentAboutSection: AboutSubSection;
  blogPosts: BlogPost[];
}

export default function Content({
  currentSection,
  currentPortfolioSection,
  currentBlogSection,
  currentAboutSection,
  blogPosts
}: ContentProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [content, setContent] = useState(currentSection);
  const [portfolioContent, setPortfolioContent] = useState(currentPortfolioSection);
  const [blogContent, setBlogContent] = useState(currentBlogSection);
  const [aboutContent, setAboutContent] = useState(currentAboutSection);
  const [selectedJobIndex, setSelectedJobIndex] = useState<number | null>(null);
  const [selectedSideQuestIndex, setSelectedSideQuestIndex] = useState<number | null>(null);

  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);

  useEffect(() => {
    if (currentSection !== 'about') {
      setSelectedJobIndex(null);
      setSelectedSideQuestIndex(null);
    }

    if (currentSection !== 'blog') {
      setSelectedBlogPostId(null);
    }

    if (currentSection !== content) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setContent(currentSection);
        setPortfolioContent(currentPortfolioSection);
        setBlogContent(currentBlogSection);
        setAboutContent(currentAboutSection);
        setIsVisible(true);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [currentSection, content]);

  // Handle portfolio subsection changes
  useEffect(() => {
    if (currentSection === 'portfolio' && currentPortfolioSection !== portfolioContent) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setPortfolioContent(currentPortfolioSection);
        setIsVisible(true);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [currentPortfolioSection, portfolioContent, currentSection]);

  // Handle blog subsection changes
  useEffect(() => {
    if (currentSection === 'blog' && currentBlogSection !== blogContent) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setBlogContent(currentBlogSection);
        setIsVisible(true);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [currentBlogSection, blogContent, currentSection]);

  // Handle about subsection changes
  useEffect(() => {
    if (currentSection === 'about' && currentAboutSection !== aboutContent) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setAboutContent(currentAboutSection);
        setIsVisible(true);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [currentAboutSection, aboutContent, currentSection]);

  const handleJobClick = (index: number) => {
    setSelectedJobIndex(selectedJobIndex === index ? null : index);
  };

  const handleSideQuestClick = (index: number) => {
    setSelectedSideQuestIndex(selectedSideQuestIndex === index ? null : index);
  };



  const getPortfolioContent = () => {
    switch (portfolioContent) {
      case 'vibe-coding':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-3">
              Vibe Coding Projects
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              I&apos;m an AI enthusiast, exploring new technologies and tools as they emerge every day. The projects below showcase how I&apos;ve solved real problems using AI-supported solutions.
            </p>
            <div className="space-y-6 mt-4 animate-fadeIn">
              {vibeCodingProjects.map((project) => (
                <div key={project.id} className="opacity-80 hover:opacity-100 transition-opacity">
                  <div className="font-medium flex items-center mb-2">
                    <span>{project.title}</span>
                    {project.linkHref && (
                      <a
                        href={project.linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-gray-400 hover:text-gray-200"
                        aria-label="GitHub repository"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                      </a>
                    )}
                    {project.dates && (
                      <>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-300">{project.dates}</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 ml-0">
                    {project.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'visualisations':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="inline-flex items-center">
                <span>Workout Wednesday Visualisations</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 64 64"
                  aria-label="Tableau logo"
                  className="ml-2"
                >
                  <g>
                    <rect width="64" height="64" fill="none" />
                    <g>
                      <g>
                        <rect x="30" y="6" width="4" height="12" fill="#4F8CA5"/>
                        <rect x="30" y="46" width="4" height="12" fill="#4F8CA5"/>
                        <rect x="6" y="30" width="12" height="4" fill="#4F8CA5"/>
                        <rect x="46" y="30" width="12" height="4" fill="#4F8CA5"/>
                        <rect x="16" y="16" width="4" height="8" fill="#E97627"/>
                        <rect x="44" y="16" width="4" height="8" fill="#E97627"/>
                        <rect x="16" y="40" width="4" height="8" fill="#E97627"/>
                        <rect x="44" y="40" width="4" height="8" fill="#E97627"/>
                        <rect x="24" y="24" width="4" height="8" fill="#D13F3F"/>
                        <rect x="36" y="24" width="4" height="8" fill="#D13F3F"/>
                        <rect x="24" y="36" width="4" height="8" fill="#D13F3F"/>
                        <rect x="36" y="36" width="4" height="8" fill="#D13F3F"/>
                        <rect x="28" y="28" width="8" height="4" fill="#4F8CA5"/>
                        <rect x="28" y="32" width="8" height="4" fill="#4F8CA5"/>
                      </g>
                      <g>
                        <rect x="12" y="12" width="4" height="4" fill="#4F8CA5"/>
                        <rect x="48" y="12" width="4" height="4" fill="#4F8CA5"/>
                        <rect x="12" y="48" width="4" height="4" fill="#4F8CA5"/>
                        <rect x="48" y="48" width="4" height="4" fill="#4F8CA5"/>
                        <rect x="20" y="20" width="4" height="4" fill="#E97627"/>
                        <rect x="40" y="20" width="4" height="4" fill="#E97627"/>
                        <rect x="20" y="40" width="4" height="4" fill="#E97627"/>
                        <rect x="40" y="40" width="4" height="4" fill="#E97627"/>
                        <rect x="28" y="28" width="4" height="4" fill="#D13F3F"/>
                        <rect x="36" y="28" width="4" height="4" fill="#D13F3F"/>
                        <rect x="28" y="36" width="4" height="4" fill="#D13F3F"/>
                        <rect x="36" y="36" width="4" height="4" fill="#D13F3F"/>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              I occasionally complete Workout Wednesday challenges to keep my Tableau skills fresh and to keep learning the finer points of dashboard design. Workout Wednesday is a popular BI community that provide weekly challenges in Tableau, PowerBI and other BI software. You can find out more about them <a href="https://workout-wednesday.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#dcd7ba]">here</a>.
            </p>
            <div className="mt-4 animate-fadeIn">
              <div className="flex flex-wrap items-center text-xs text-[#dcd7ba] gap-x-2">
                {visualisationProjects.map((project, idx) => (
                  <span key={project.id} className="inline-flex items-center">
                    {project.linkHref ? (
                      <a
                        href={project.linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        aria-label={project.title}
                      >
                        {project.title}
                      </a>
                    ) : (
                      <span>{project.title}</span>
                    )}
                    {idx < visualisationProjects.length - 1 && (
                      <span className="mx-2 opacity-60">|</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      case 'data':
      default:
        return (
          <div className="flex items-center justify-center h-full text-lg md:text-xl font-bold text-[#dcd7ba] opacity-70">
            Coming Soon...
          </div>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderBlogList = () => {
    // Get filtered posts based on the current blog section
    let filteredPosts = [...blogPosts];

    if (blogContent !== 'latest') {
      // Extract the tag name from the subsection
      const tagName = blogContent.replace('tag-', '').replace(/-/g, ' ');

      // Filter posts that include this tag (case insensitive)
      filteredPosts = filteredPosts.filter(post =>
        post.tags.some(tag => tag.toLowerCase() === tagName.toLowerCase())
      );
    }

    // Sort posts by date in descending order (newest first)
    const sortedPosts = filteredPosts.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
      <div className="space-y-8 animate-fadeIn">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <article key={post.id} className="opacity-80 hover:opacity-100 transition-opacity">
              <button
                onClick={() => setSelectedBlogPostId(post.id)}
                className="text-left w-full"
              >
                <h3 className="text-lg font-medium text-[#dcd7ba] hover:underline">{post.title}</h3>
              </button>
              <div className="flex items-center my-2 text-sm text-gray-400">
                <span>{formatDate(post.date)}</span>
                <span className="mx-2">•</span>
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-0.5 bg-[#1a1b26] rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No posts found for this category.</p>
          </div>
        )}
      </div>
    );
  };

  const renderBlogPost = (postId: string) => {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return null;

    return (
      <article className="prose prose-invert max-w-none animate-fadeIn">
        <button
          onClick={() => setSelectedBlogPostId(null)}
          className="flex items-center mb-4 text-sm text-[#dcd7ba] hover:underline no-prose"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </button>
        <h2 className="text-2xl font-bold mb-2 text-[#dcd7ba]">{post.title}</h2>
        <div className="flex items-center my-3 text-sm text-gray-400 no-prose">
          <span>{formatDate(post.date)}</span>
          <span className="mx-2">•</span>
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-2 py-0.5 bg-[#1a1b26] rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="prose prose-invert prose-sm max-w-none text-sm [&>p]:mb-4 [&>p]:leading-relaxed">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>
    );
  };

  const renderAboutContent = () => {
    switch (aboutContent) {
      case 'work':
        return (
          <div className="space-y-4 animate-fadeIn">
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
          <div className="space-y-4 animate-fadeIn">
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
          <div className="space-y-4 animate-fadeIn">
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
    if (!content) return null;
    
    switch (content) {
      case 'blog':
        return (
          <div className="space-y-4">
            {selectedBlogPostId ? renderBlogPost(selectedBlogPostId) : renderBlogList()}
          </div>
        );
      case 'about':
        return (
          <div className="space-y-4">
            {renderAboutContent()}
          </div>
        );
      case 'portfolio':
        return getPortfolioContent();
    }
  };

  return (
    <div className={`transition-all duration-500 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      {getContent()}
    </div>
  );
} 