import { motion } from 'framer-motion';
import { ChevronDown, Zap } from 'lucide-react';
import KonarkWheel from './KonarkWheel';
import CountdownTimer from './CountdownTimer';

interface HeroSectionProps {
  onEnterWorld: () => void;
}

const HeroSection = ({ onEnterWorld }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Cyber grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      
      {/* Radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Top badge */}
      <motion.div
        className="text-center mb-4 sm:mb-6 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
          <Zap className="w-4 h-4 text-golden animate-pulse" />
          <span className="text-xs sm:text-sm text-muted-foreground font-display tracking-widest uppercase">
            PDUIIC, GJUS&T Presents
          </span>
          <Zap className="w-4 h-4 text-golden animate-pulse" />
        </div>
      </motion.div>

      {/* Konark Wheel */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
      >
        <KonarkWheel />
      </motion.div>

      {/* Title */}
      <motion.div
        className="text-center mt-6 sm:mt-8 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-wider">
          <span className="text-primary neon-text">KONARK</span>
          <span className="text-golden golden-text ml-2 sm:ml-4">26</span>
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="text-base sm:text-xl md:text-2xl font-display text-foreground/80 mt-3 sm:mt-4 tracking-[0.2em] text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        Bridging Today, Building Tomorrow
      </motion.p>

      {/* Date badge */}
      <motion.div
        className="mt-4 sm:mt-6 relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <div className="px-6 py-2 border border-golden/40 rounded-full bg-golden/5 backdrop-blur-sm">
          <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold golden-text tracking-wider">
            16-18 FEB 2026
          </p>
        </div>
      </motion.div>

      {/* Countdown */}
      <div className="mt-6 sm:mt-8 relative z-10">
        <CountdownTimer />
      </div>

      {/* Enter World Button */}
      <motion.button
        onClick={onEnterWorld}
        className="mt-8 sm:mt-10 group relative overflow-hidden px-8 sm:px-12 py-4 sm:py-5 font-display font-bold text-base sm:text-lg tracking-wider rounded-lg border-2 border-primary bg-primary/10 text-primary hover:text-primary-foreground transition-all duration-300 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(190 100% 50% / 0.4)" }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-primary via-electric to-primary"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.4 }}
        />
        <span className="relative z-10 flex items-center gap-3">
          ENTER WORLD
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </span>
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2 cursor-pointer"
          onClick={onEnterWorld}
          whileHover={{ borderColor: "hsl(190 100% 50%)" }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Decorative side lines */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:block">
        <motion.div
          className="w-px h-40 bg-gradient-to-b from-transparent via-primary/50 to-transparent"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block">
        <motion.div
          className="w-px h-40 bg-gradient-to-b from-transparent via-primary/50 to-transparent"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
