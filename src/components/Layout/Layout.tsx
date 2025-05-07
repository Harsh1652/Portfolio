
import { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ParticleBackground from '../ui/ParticleBackground';

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
    </div>
  );
};

export default Layout;
