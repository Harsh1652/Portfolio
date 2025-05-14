import { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ParticleBackground from '../UI/ParticleBackground';
import ChatBotWidget from '../ChatBotWidget/ChatBotWidget';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <ParticleBackground />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ChatBotWidget />
    </div>
  );
};

export default Layout;