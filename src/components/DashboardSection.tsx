import { motion } from 'framer-motion';
import { Cpu, Eye, Lightbulb, Code2, Mic, Radar } from 'lucide-react';
import ZoneCard from './ZoneCard';

const events = [
  {
    title: 'SUSTAINTECH HACKATHON',
    tagline: 'Hack Today for a Better Tomorrow',
    registerBy: 'Jan 26, 2026',
    finalDate: 'Feb 16, 2026',
    icon: Cpu,
    zoneNumber: 1,
    gradientFrom: 'from-primary',
    gradientTo: 'to-electric',
    link: 'https://unstop.com/hackathons/sustain-tech-hackathon-konark26-guru-jambheshwar-university-of-science-and-technology-hisar-haryana-1617961',
    rulebookLink: 'https://unstop.com/hackathons/sustain-tech-hackathon-konark26-guru-jambheshwar-university-of-science-and-technology-hisar-haryana-1617961',
    floatDelay: 0,
  },
  {
    title: 'VISIONATHON',
    tagline: 'Ideas that Shape the Future',
    registerBy: 'Jan 26, 2026',
    finalDate: 'Feb 17, 2026',
    icon: Eye,
    zoneNumber: 2,
    gradientFrom: 'from-electric',
    gradientTo: 'to-magenta',
    link: 'https://unstop.com/competitions/visionathon-konark-2026-guru-jambheshwar-university-of-science-and-technology-hisar-haryana-1617986',
    rulebookLink: 'https://drive.google.com/drive/folders/1d-jEhnqwtxxMDg6kD0V_QKjxZhMDkWdC?usp=sharing',
    floatDelay: 1,
  },
  {
    title: 'IDEATHON',
    tagline: 'Innovative Minds, Bold Ideas',
    registerBy: 'Jan 26, 2026',
    finalDate: 'Feb 16, 2026',
    icon: Lightbulb,
    zoneNumber: 3,
    gradientFrom: 'from-golden',
    gradientTo: 'to-coral',
    link: 'https://unstop.com/p/ideathon-konark-2026-guru-jambheshwar-university-of-science-and-technology-hisar-haryana-1617990',
    rulebookLink: 'https://drive.google.com/drive/folders/1XcPZ-bJInGX6SHtGh6_Ru9Ut3ygajVIO?usp=drive_link',
    floatDelay: 2,
  },
  {
    title: 'CROWN FOR CODE',
    tagline: 'Code Your Way to Victory',
    registerBy: 'Jan 26, 2026',
    finalDate: 'Feb 17, 2026',
    icon: Code2,
    zoneNumber: 4,
    gradientFrom: 'from-magenta',
    gradientTo: 'to-primary',
    link: 'https://linktr.ee/',
    floatDelay: 0,
  },
  {
    title: "ELEVATOR'S PITCH",
    tagline: 'Pitch Your Vision in 60 Seconds',
    registerBy: 'Jan 26, 2026',
    finalDate: 'Feb 16, 2026',
    icon: Mic,
    zoneNumber: 5,
    gradientFrom: 'from-electric',
    gradientTo: 'to-primary',
    link: 'https://linktr.ee/',
    floatDelay: 1,
  },
];

const DashboardSection = () => {
  return (
    <section id="dashboard" className="relative py-16 sm:py-24 px-4 min-h-screen">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      
      {/* Section header */}
      <motion.div
        className="text-center mb-12 sm:mb-16 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* HUD-style badge */}
        <motion.div
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/40 bg-primary/5 backdrop-blur-sm mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Radar className="w-5 h-5 text-primary animate-pulse" />
          <span className="font-display text-sm sm:text-base text-primary tracking-widest">
            EVENT ZONES
          </span>
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-foreground">Choose Your </span>
          <span className="text-primary neon-text">Mission</span>
        </motion.h2>

        <motion.p
          className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg font-body"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Enter the zones. Complete the challenges. Shape the future of technology.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        />
      </motion.div>

      {/* Event cards grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        {events.map((event, index) => (
          <ZoneCard key={event.title} {...event} index={index} />
        ))}
      </div>

      {/* Decorative corner brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-primary/30 hidden lg:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-primary/30 hidden lg:block" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-primary/30 hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-primary/30 hidden lg:block" />

      {/* Side decorations */}
      <motion.div
        className="absolute top-1/2 left-0 w-px h-60 bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden lg:block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      <motion.div
        className="absolute top-1/2 right-0 w-px h-60 bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden lg:block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
    </section>
  );
};

export default DashboardSection;
