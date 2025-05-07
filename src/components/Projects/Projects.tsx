
import { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import { Card } from "@/components/ui/card";
import { ArrowRight, Github, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

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
