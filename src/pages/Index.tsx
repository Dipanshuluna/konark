import ConstellationBackground from '@/components/ConstellationBackground';
import HeroSection from '@/components/HeroSection';
import EventsSection from '@/components/EventsSection';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ConstellationBackground />
      <div className="relative z-10">
        <HeroSection />
        <EventsSection />
      </div>
    </div>
  );
};

export default Index;
