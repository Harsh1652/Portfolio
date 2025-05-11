
import { useState } from "react";
import SectionTitle from "../UI/SectionTitle";
import { Card } from "@/components/UI/card";
import { ArrowRight, Github, Link } from "lucide-react";
import { Button } from "@/components/UI/button";

const Projects = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  const projectsData = [
    {
      id: 1,
      title: "ShopEase",
      description: "Full-stack e-commerce platform with authentication and admin features.",
      techStack: ["Spring Boot", "MySQL", "Thymeleaf"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
      emoji: "🛍️",
      githubLink: "https://github.com/Harsh1652/shopease",
    },
    {
      id: 2,
      title: "Chattify",
      description: "Real-time chat app with Socket.io and Cloudinary integration.",
      techStack: ["React", "Node.js", "MongoDB", "Socket.io"],
      image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=2070&auto=format&fit=crop",
      emoji: "💬",
      githubLink: "https://github.com/Harsh1652/chattify",
    },
    {
      id: 3,
      title: "SecureNet",
      description: "IDS and vulnerability scanner integrating Snort/Nikto with Spring Boot dashboard.",
      techStack: ["Java", "MySQL", "Spring Boot", "REST APIs"],
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop",
      emoji: "🔐",
      githubLink: "https://github.com/Harsh1652/securenet",
    },
    {
      id: 4,
      title: "Portfolio AI Assistant",
      description: "An AI-powered chatbot that answers questions about my projects, skills, and experience using natural language.",
      techStack: ["React", "Node.js", "Express.js", "MongoDB", "OpenAI API (GPT-3.5 Turbo)", "Cohere AI (Embeddings)"],
      image: "https://plus.unsplash.com/premium_photo-1677094310893-0d6594c211ea?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      emoji: "🤖",
      githubLink: "https://github.com/Harsh1652/Portfolio_Chat-Bot",
      liveLink: "https://portfolio-chatbot-ecru.vercel.app/"
    },
    {
      id: 5,
      title: "Balaji Exports Business Website",
      description: "Freelance project to build a business website for Balaji Exports using React and MUI.",
      techStack: ["React", "Material-UI", "Firebase"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      emoji: "💼",
      githubLink: "https://github.com/Harsh1652/balaji-exports",
      liveLink: "#"
    }
  ];

  return (
    <section id="projects">
      <div className="container">
        <SectionTitle 
          subtitle="My work"
          title="Featured Projects"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <Card 
              key={project.id} 
              className="glass-card overflow-hidden hover-card opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
                  style={{
                    transform: hoveredId === project.id ? "scale(1.05)" : "scale(1)"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-300 to-transparent opacity-80"></div>
                <div className="absolute top-4 left-4 text-4xl">
                  {project.emoji}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="bg-dark-200 px-2 py-1 rounded text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button size="icon" variant="outline" asChild>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
                        <Github size={18} />
                      </a>
                    </Button>
                    {project.liveLink && (
                    <Button size="icon" variant="outline" asChild>
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                        <Link size={18} />
                      </a>
                    </Button>
                  )}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-highlight-teal hover:text-highlight-teal/80"
                    asChild
                  >
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      View Details <ArrowRight size={14} className="ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
