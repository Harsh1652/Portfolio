import { Button } from "@/components/UI/button";
import { ArrowRight } from "lucide-react";
import profileImage from "../../assets/profile.jpg"; 

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 opacity-0 animate-fade-in">
            <p className="text-highlight-teal text-lg font-medium mb-4 animate-pulse-slow">
              Backend Developer | Problem Solver | Full Stack Developer
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Hi, I'm <span className="text-gradient">Harsh Gupta</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              I build secure, scalable, and intelligent systems that solve real-world problems.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-gradient-to-r from-highlight-blue to-highlight-teal hover:opacity-90 px-6 py-2 text-base"
                asChild
              >
                <a href="#projects">
                  View Projects <ArrowRight size={18} className="ml-2" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-highlight-teal text-highlight-teal hover:bg-highlight-teal/10"
                asChild
              >
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center opacity-0 animate-fade-in animate-delay-200">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-highlight-blue/30 p-1">
                <img 
                  src= {profileImage}
                  alt="Harsh Gupta" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-highlight-blue to-highlight-teal opacity-20 blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
