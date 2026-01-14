import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConstellationBackground from '@/components/ConstellationBackground';
import NavigationBar from '@/components/NavigationBar';
import HeroSection from '@/components/HeroSection';
import DashboardSection from '@/components/DashboardSection';
import HUDFooter from '@/components/HUDFooter';

const Index = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const handleEnterWorld = () => {
    setHasEntered(true);
    setTimeout(() => {
      dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Constellation Background */}
      <ConstellationBackground />
      
      {/* Navigation Bar */}
      <NavigationBar />
      
      {/* Main Content */}
      <div className="relative z-10 pt-16">
        {/* Hero Section */}
        <HeroSection onEnterWorld={handleEnterWorld} />
        
        {/* Dashboard/Events Section */}
        <div ref={dashboardRef}>
          <AnimatePresence>
            {hasEntered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <DashboardSection />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Always show dashboard for scroll access */}
          {!hasEntered && <DashboardSection />}
        </div>
        
        {/* Spacer for HUD footer */}
        <div className="h-32" />
      </div>
      
      {/* HUD Footer */}
      <HUDFooter />
    </div>
  );
};

export default Index;
