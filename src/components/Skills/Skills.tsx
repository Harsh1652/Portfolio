
import SectionTitle from "../UI/SectionTitle";
import { Card } from "@/components/UI/card";

const Skills = () => {
  const skillsData = [
    {
      category: "Languages",
      skills: ["Java", "JavaScript"],
      color: "from-blue-500 to-blue-700"
    },
    {
      category: "Concepts",
      skills: ["Object-Oriented Programming (OOP)", "RESTful Architecture"],
      color: "from-teal-500 to-teal-700"
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "Spring Boot", "Jakarta EE", "Hibernate"],
      color: "from-green-500 to-green-700"
    },
    {
      category: "Frontend",
      skills: ["HTML", "CSS", "Thymeleaf", "MUI"],
      color: "from-purple-500 to-purple-700"
    },
    {
      category: "Databases",
      skills: ["MongoDB", "MySQL", "Pinecone (Vector DB)"] ,
      color: "from-yellow-500 to-yellow-700"
    },
    {
      category: "AI Tools",
      skills: ["OpenAI GPT", "Cohere", "n8n", "Prompt Engineering", "RAG (Retrieval-Augmented Generation)"] ,
      color: "from-pink-500 to-pink-700"
    },
    {
      category: "Tools & Platforms",
      skills: ["VS Code", "Cursor", "Postman", "Git", "GitHub", "Maven", "REST APIs", "JWT", "Socket.io"],
      color: "from-gray-500 to-gray-700"
    }
  ];

  return (
    <section id="skills">
      <div className="container">
        <SectionTitle 
          subtitle="What I'm good at"
          title="Technical Skills & Expertise"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category, index) => (
            <Card 
              key={index} 
              className="glass-card hover-card overflow-hidden opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className="bg-dark-200 px-3 py-1 rounded-full text-sm text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center opacity-0 animate-fade-in animate-delay-500">
          <p className="text-lg text-gray-300">
            Always learning new technologies and improving my skills to build better software.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
