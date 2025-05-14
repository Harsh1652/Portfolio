// Alternative approach: Add ChatWidget directly to your Index page
import Layout from "../components/Layout/Layout";
import Hero from "../components/Home/Hero";
import About from "../components/About/About";
import Skills from "../components/Skills/Skills";
import Services from "../components/Services/Services";
import Projects from "../components/Projects/Projects";
import Testimonials from "../components/Testimonials/Testimonials";
import Contact from "../components/Contact/Contact";
import ChatBotWidget from "../components/ChatBotWidget/ChatBotWidget";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Testimonials />
      <Contact />
      <ChatBotWidget />
    </Layout>
  );
};

export default Index;