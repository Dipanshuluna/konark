import { motion } from 'framer-motion';
import { Cpu, Eye, Lightbulb } from 'lucide-react';
import EventCard from './EventCard';

const events = [
  {
    title: 'SUSTAINTECH HACKATHON',
    tagline: 'Hack Today for a Better Tomorrow',
    registerBy: 'Jan 26, 2026',
    finalDate: 'Feb 16, 2026',
    icon: Cpu,
    gradientFrom: 'from-primary',
    gradientTo: 'to-electric',
    link: 'https://linktr.ee/',
  },
  {
    title: 'VISIONATHON',
    tagline: 'Ideas that Shape the Future',
    registerBy: 'Jan 26, 2026',
    finalDate: 'Feb 17, 2026',
    icon: Eye,
    gradientFrom: 'from-electric',
    gradientTo: 'to-primary',
    link: 'https://linktr.ee/',
  },
  {
    title: 'IDEATHON',
    tagline: 'Innovative Minds, Bold Ideas',
    registerBy: 'Jan 26, 2026',
    finalDate: 'Feb 16, 2026',
    icon: Lightbulb,
    gradientFrom: 'from-golden',
    gradientTo: 'to-coral',
    link: 'https://linktr.ee/',
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="relative py-20 px-4 min-h-screen">
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-display text-sm text-primary tracking-wider">
            EVENT ZONES
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
          <span className="text-foreground">Choose Your </span>
          <span className="text-primary neon-text">Mission</span>
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto font-body">
          Enter the zones. Complete the challenges. Shape the future of technology.
        </p>
      </motion.div>

      {/* Event cards grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <EventCard key={event.title} {...event} index={index} />
        ))}
      </div>

      {/* Side decorations */}
      <motion.div
        className="absolute top-1/2 left-0 w-px h-40 bg-gradient-to-b from-transparent via-primary to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      <motion.div
        className="absolute top-1/2 right-0 w-px h-40 bg-gradient-to-b from-transparent via-primary to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
    </section>
  );
};

export default EventsSection;
