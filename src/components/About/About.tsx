import SectionTitle from "../UI/SectionTitle";
import { Card } from "@/components/UI/card";


const About = () => {
  const educationData = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "UPES",
      period: "2023 - 2025",
      description: "Completed advanced studies focusing on software development and system architecture."
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "St. Xavier's College Jaipur",
      period: "2020 - 2023",
      description: "Developed strong foundation in computer science principles, programming, and software development."
    }
  ];

  const Experience = [
    {
      title: "Software Developer (Full Time)",
      company: "Excollo",
      period: "June 2025 - Present",
      description: "Promoted to full-time Software Developer. Building AI automation agents and working on advanced backend systems.",
      details: [
        {
          text: "Projects: AI Agent Automation with n8n"
        },
        {
          text: "Building AI automation agents using n8n for document parsing, data extraction, and workflow automation."
        },
        {
          text: "Collaborating on ",
          highlights: ["prompt engineering", "LLM integration", "vector search using OpenAI + Pinecone"]
        },
        {
          text: "Continuing to develop and maintain key modules including Order, Customer, Notification, and Store."
        },
        {
          text: "Working with ",
          highlights: ["Node.js", "Express", "MongoDB", "JWT", "REST APIs", "Cron jobs"]
        }
      ]
    },
    {
      title: "Backend Developer Intern",
      company: "Excollo",
      period: "Feb 2025 - May 2025",
      description: "Contributed to a full-stack order management system (Crudo), integrated with SWIL ERP. Developed and maintained key modules including Order, Customer, Notification, and Store. Worked with Node.js, Express, MongoDB, JWT, REST APIs, and Cron jobs. Implemented vector database for customer clustering and purchase pattern analysis.",
      details: [
        {
          text: "Contributed to a full-stack order management system",
          highlight: "(Crudo)",
          end: ", integrated with SWIL ERP"
        },
        {
          text: "Developed and maintained modules: ",
          highlights: ["Order", "Customer", "Notification", "Store"]
        },
        {
          text: "Worked with ",
          highlights: ["Node.js", "Express", "MongoDB", "JWT", "REST APIs", "Cron jobs"]
        },
        {
          text: "Implemented vector database for customer clustering and purchase pattern analysis"
        }
      ]
    },
    // {
    //   title: "Freelance Software Developer",
    //   company: "Balaji Exports",
    //   period: "May 2025",
    //   description: "Developed a responsive business website for Balaji Exports using Next.js and TypeScript, hosted on Firebase. Built a custom SEO panel (Node.js + React) for managing SEO tags and blogs, with all data stored and fetched from MongoDB.",
    //   details: [
    //     {
    //       text: "Built a responsive business website using Next.js, TypeScript, and Firebase."
    //     },
    //     {
    //       text: "Developed a custom SEO panel (Node.js, React) with MongoDB integration."
    //     },
    //     {
    //       text: "Enabled dynamic SEO and blog management, optimized for high performance."
    //     }
    //   ]
    // }
  ];

  return (
    <section id="about" className="bg-dark-400/50">
      <div className="container">
        <SectionTitle 
          subtitle="Get to know me"
          title="Passionate About Building What Matters"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bio Section */}
          <div className="opacity-0 animate-fade-in animate-delay-100">
            <h3 className="text-xl font-semibold mb-4 text-white">Who I Am</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                Hi, I'm Harsh Gupta — a dedicated Software Engineer with a strong focus on backend development using Java (Spring Boot) and Node.js. I enjoy building scalable APIs and robust systems, and I've worked on projects ranging from e-commerce backends to AI-powered chatbots that use semantic search and embeddings.
              </p>
              <p>
                I love the problem-solving side of software engineering — whether it's designing efficient database schemas with MongoDB, optimizing API performance, or integrating external AI APIs into real-world applications.
              </p>
              <p>
                Currently, I'm working full-time as a Software Engineer and continuously sharpening my skills in backend architecture, system design, and AI integrations. I'm always excited to explore new technologies and contribute to meaningful products that make a difference.
              </p>
              <p>
                When I'm not coding, I enjoy diving into AI concepts, tech podcasts, and experimenting with new tools to stay ahead in the ever-evolving dev world.
              </p>
            </div>
          </div>
          
          {/* Education Section */}
          <div className="opacity-0 animate-fade-in animate-delay-200">
            <h3 className="text-xl font-semibold mb-4 text-white">Education</h3>
            <div className="space-y-6">
              {educationData.map((item, index) => (
                <Card key={index} className="glass-card p-6 hover-card">
                  <h4 className="font-semibold text-lg text-gradient">{item.degree}</h4>
                  <p className="text-gray-300 mb-2">{item.institution}</p>
                  <p className="text-sm text-highlight-teal mb-3">{item.period}</p>
                  <p className="text-gray-400">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="opacity-0 animate-fade-in animate-delay-200 lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
              <span className="inline-block mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-highlight-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              Experience
            </h3>
            <div className="space-y-6">
              {Experience.map((item, index) => (
                <Card key={index} className="glass-card p-6 hover-card border-l-4 border-highlight-teal overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 rounded-full bg-gradient-to-br from-highlight-teal/20 to-transparent"></div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-xl text-gradient">{item.title}</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-gray-300 font-medium">{item.company}</span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-sm text-highlight-teal font-medium">{item.period}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-dark-500/30 rounded-lg p-4 backdrop-blur-sm">
                    <ul className="space-y-3">
                      {item.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <span className="text-highlight-teal mr-2 mt-1">▹</span>
                          <span className="text-gray-300">
                            {detail.text}
                            {detail.highlight && <span className="text-highlight-teal font-medium"> {detail.highlight}</span>}
                            {detail.end && detail.end}
                            
                            {detail.highlights && detail.highlights.map((highlight, highlightIndex) => (
                              <span key={highlightIndex}>
                                <span className="text-white">{highlight}</span>
                                {highlightIndex < detail.highlights.length - 1 && <span>, </span>}
                              </span>
                            ))}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;