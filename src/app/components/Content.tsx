import { useEffect, useState, Fragment } from 'react';
// import UnderConstruction from './UnderConstruction'; // Remove import
import { Section, PortfolioSubSection, TimelineItem, BlogSubSection } from './types';

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
// --- End of Portfolio Project Data ---

// --- Blog Data ---
interface BlogPost {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
  excerpt: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "post-2025-04-01",
    title: "The Future of AI in Web Development",
    date: "2025-04-01",
    tags: ["AI", "Web Development", "Future"],
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel tincidunt finibus, nisl nisi tincidunt nisl, eget tincidunt nisl nisl sit amet nisl. Nullam euismod, nisi vel tincidunt finibus, nisl nisi tincidunt nisl, eget tincidunt nisl nisl sit amet nisl.

In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam. Integer et elit eget elit facilisis tristique. Nam vel iaculis mauris. Sed ullamcorper tellus erat, non ultrices sem tincidunt euismod. Fusce rhoncus porttitor velit, eu bibendum nibh aliquet vel. Fusce lorem leo, vehicula at nibh quis, facilisis accumsan turpis.

Quisque venenatis sit amet libero vel laoreet. Etiam cursus nibh eu lorem semper, id varius eros pharetra. Proin molestie lectus at magna condimentum, eget tincidunt urna semper. Aliquam erat volutpat. Donec eget quam ornare, scelerisque metus eu, elementum purus. Aenean tincidunt vel eros at placerat. Mauris tempor quam id nisi ornare, non ultrices sem pharetra.

Donec faucibus lacus non purus maximus viverra. Aliquam erat volutpat. Praesent ut felis id ligula convallis sodales vel eget ligula. Aliquam id elementum eros. Curabitur ut gravida justo, nec vestibulum lorem. Nullam vel est scelerisque, blandit massa a, congue turpis. Praesent id justo ornare, finibus tortor vitae, elementum massa.

Proin dolor enim, interdum vel porttitor quis, suscipit quis nisl. Ut feugiat sem quis varius lacinia. Quisque vitae nulla porta, ultricies odio at, eleifend eros. Sed vel vehicula odio, id condimentum augue. Etiam dapibus dictum velit eget commodo. Nam sollicitudin, ipsum eu facilisis efficitur, tortor arcu volutpat eros, sed tristique augue massa at odio. Fusce sollicitudin enim vitae velit tincidunt consequat.`,
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel tincidunt finibus, nisl nisi tincidunt nisl, eget tincidunt nisl nisl sit amet nisl. Nullam euismod, nisi vel tincidunt finibus, nisl nisi tincidunt nisl, eget tincidunt nisl nisl sit amet nisl. In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam. Integer et elit eget elit facilisis tristique. Nam vel iaculis mauris."
  },
  {
    id: "post-2024-03-01",
    title: "Building Interactive User Interfaces with React",
    date: "2024-03-01",
    tags: ["React", "UI", "Development"],
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.

Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede.

Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.

Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam.

Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat.`,
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat."
  }
];
// --- End of Blog Data ---

interface ContentProps {
  currentSection: Section;
  currentPortfolioSection: PortfolioSubSection;
  currentBlogSection: BlogSubSection;
}

export default function Content({ currentSection, currentPortfolioSection, currentBlogSection }: ContentProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [content, setContent] = useState(currentSection);
  const [selectedJobIndex, setSelectedJobIndex] = useState<number | null>(null);
  const [aboutSubSection, setAboutSubSection] = useState<'work' | 'education' | 'side-quests' | null>('work');
  const [selectedSideQuestIndex, setSelectedSideQuestIndex] = useState<number | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);

  useEffect(() => {
    if (currentSection !== 'about') {
      setSelectedJobIndex(null);
      setSelectedSideQuestIndex(null);
      setSelectedProjectIndex(null);
      setAboutSubSection('work');
    }

    if (currentSection !== 'blog') {
      setSelectedBlogPostId(null);
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

  const handleProjectClick = (index: number) => {
    setSelectedProjectIndex(selectedProjectIndex === index ? null : index);
  };

  const getPortfolioContent = () => {
    switch (currentPortfolioSection) {
      case 'vibe-coding':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-3">
              Vibe Coding Projects
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              I'm an AI enthusiast, exploring new technologies and tools as they emerge every day. The projects below showcase how I've solved real problems using AI-supported solutions.
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
      case 'data':
      case 'visualisations':
      default:
        return (
          <div className="flex items-center justify-center h-full text-4xl md:text-6xl font-bold text-[#dcd7ba] opacity-70">
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

    if (currentBlogSection !== 'latest') {
      // Extract the tag name from the subsection
      const tagName = currentBlogSection.replace('tag-', '').replace(/-/g, ' ');

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
                <h3 className="text-xl font-medium text-[#dcd7ba] hover:underline">{post.title}</h3>
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
              <p className="text-sm text-gray-300">{post.excerpt}</p>
              <button
                onClick={() => setSelectedBlogPostId(post.id)}
                className="mt-2 text-sm text-[#dcd7ba] hover:underline"
              >
                Read more →
              </button>
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
      <article className="animate-fadeIn">
        <button
          onClick={() => setSelectedBlogPostId(null)}
          className="flex items-center mb-4 text-sm text-[#dcd7ba] hover:underline"
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
        <div className="flex items-center my-3 text-sm text-gray-400">
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
        {post.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-300">{paragraph}</p>
        ))}
      </article>
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
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-3">
              Blog
            </h2>
            {selectedBlogPostId ? renderBlogPost(selectedBlogPostId) : renderBlogList()}
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