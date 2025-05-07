import SectionTitle from "../UI/SectionTitle";
import { Card } from "@/components/ui/card";


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
      period: "Feb ~ 2025 - Present",
      description: "Developing secure and scalable backend systems, designing APIs, and implementing database solutions."

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
                I specialize in Java and Spring Boot development, with a strong focus on system architecture and security. My approach combines technical precision with creative problem-solving to build robust applications that perform seamlessly while maintaining high security standards.
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

          <div className="opacity-0 animate-fade-in animate-delay-200">
            <h3 className="text-xl font-semibold mb-4 text-white">Experience</h3>
            <div className="space-y-6">
              {Experience.map((item, index) => (
                <Card key={index} className="glass-card p-6 hover-card">
                  <h4 className="font-semibold text-lg text-gradient">{item.title}</h4>
                  <p className="text-gray-300 mb-2">{item.company}</p>
                  <p className="text-sm text-highlight-teal mb-3">{item.period}</p>
                  <p className="text-gray-400">{item.description}</p>
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
