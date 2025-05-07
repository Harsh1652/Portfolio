
import SectionTitle from "../UI/SectionTitle";
import { Card } from "@/components/UI/card";
import { Code, Database, Laptop } from "lucide-react";

const Services = () => {
  const servicesData = [
    {
      icon: <Code size={40} className="text-highlight-blue" />,
      title: "Web Application Development",
      description: "Full-stack web applications with secure backend systems, efficient APIs, and responsive frontend interfaces.",
      useCases: [
        "E-commerce platforms",
        "Content management systems",
        "Enterprise web applications"
      ]
    },
    {
      icon: <Laptop size={40} className="text-highlight-teal" />,
      title: "Mobile Application Development",
      description: "Native and hybrid mobile applications with seamless backend integration and intuitive user experiences.",
      useCases: [
        "Android applications",
        "Cross-platform solutions",
        "Mobile-first web apps"
      ]
    },
    {
      icon: <Database size={40} className="text-highlight-purple" />,
      title: "AI ChatBot Development",
      description: "Intelligent conversational agents that understand user intent and provide helpful responses.",
      useCases: [
        "Customer support automation",
        "Personal assistant applications",
        "Information retrieval systems"
      ]
    }
  ];

  return (
    <section id="services" className="bg-dark-400/50">
      <div className="container">
        <SectionTitle 
          subtitle="What I offer"
          title="My Services"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <Card 
              key={index} 
              className="glass-card hover-card p-6 flex flex-col h-full opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-6">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-center">{service.title}</h3>
              
              <p className="text-gray-300 mb-6 text-center">
                {service.description}
              </p>
              
              <div className="mt-auto">
                <h4 className="text-sm font-medium uppercase tracking-wider text-highlight-teal mb-2">
                  Sample Use Cases
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  {service.useCases.map((useCase, useCaseIndex) => (
                    <li key={useCaseIndex}>{useCase}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
