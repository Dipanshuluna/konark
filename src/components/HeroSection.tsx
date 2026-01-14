import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import KonarkWheel from './KonarkWheel';
import CountdownTimer from './CountdownTimer';

const HeroSection = () => {
  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden z-10">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-30 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl z-0" />

      {/* Presenter text */}
      <motion.div
        className="text-center mb-8 sm:mb-12 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xs sm:text-sm text-muted-foreground font-display tracking-widest uppercase">
          PDUIIC, GJUS&T Presents
        </p>
      </motion.div>

      {/* Konark Wheel */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <KonarkWheel />
      </motion.div>

      {/* Title */}
      <motion.div
        className="text-center mt-6 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-wider">
          <span className="text-primary neon-text">KONARK</span>
          <span className="text-golden golden-text ml-2">26</span>
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="text-lg sm:text-xl md:text-2xl font-display text-foreground/80 mt-4 mb-2 tracking-wide text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Bridging Today, Building Tomorrow
      </motion.p>

      {/* Date */}
      <motion.p
        className="text-2xl sm:text-3xl md:text-4xl font-display font-bold golden-text mb-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        16-18 FEB 2026
      </motion.p>

      {/* Countdown */}
      <div className="relative z-10">
        <CountdownTimer />
      </div>

      {/* Enter World Button */}
      <motion.button
        onClick={scrollToEvents}
        className="mt-10 sm:mt-12 group relative overflow-hidden px-8 py-4 font-display font-bold text-lg tracking-wider rounded-lg border-2 border-primary bg-transparent text-primary hover:text-primary-foreground transition-colors duration-300 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-primary to-electric"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative z-10 flex items-center gap-2">
          ENTER WORLD
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </span>
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
