import SectionTitle from "../UI/SectionTitle";
import { Card } from "@/components/UI/card";


const About = () => {
  const educationData = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "UPES",
      period: "2023 - 2025",
      description: "Currently pursuing advanced studies focusing on software development and system architecture."
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
      title: "Backend Developer Intern",
      company: "Excollo",
      period: "Feb 2025 - Present",
      description: "Contributed to a full-stack order management system (Crudo), integrated with SWIL ERP. Developed and maintained key modules including Order, Customer, Notification, and Store. Working with Node.js, Express, MongoDB, JWT, REST APIs, and Cron jobs. Currently implementing vector database for customer clustering and purchase pattern analysis.",
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
          text: "Implementing vector database for customer clustering and purchase pattern analysis"
        }
      ]
    },
    {
      title: "Freelance Software Developer",
      company: "Balaji Exports",
      period: "May 2025",
      description: "Built a business website for Balaji Exports using React and MUI.",
      details: [
        {
          text: "Designed and developed a responsive business website for",
          highlight: "Balaji Exports",
          end: ", an import/export company"
        },
        {
          text: "Implemented UI components using ",
          highlights: ["React", "Material-UI", "CSS Grid", "Flexbox"]
        },
        {
          text: "Set up Firebase for ",
          highlights: ["Authentication", "Database", "Hosting"]
        },
        {
          text: "Optimized for SEO and performance with 90+ Lighthouse score"
        }
      ]
    }
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
                As a backend-focused software developer with full-stack capabilities, I'm driven by the challenges of designing secure, scalable systems that solve real problems. Currently working at Excollo, I get to pursue my passion for technology while continuously expanding my skills.
              </p>
              <p>
                My core strengths lie in Node.js, Express, and MongoDB, alongside a strong foundation in Java and Spring Boot. with a strong focus on system architecture and security. My approach combines technical precision with creative problem-solving to build robust applications that perform seamlessly while maintaining high security standards.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, and continuously learning to stay ahead in the ever-evolving tech landscape.
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