import { motion } from 'framer-motion';
import { Calendar, ArrowRight, LucideIcon } from 'lucide-react';

interface EventCardProps {
  title: string;
  tagline: string;
  registerBy: string;
  finalDate: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  link: string;
  index: number;
}

const EventCard = ({
  title,
  tagline,
  registerBy,
  finalDate,
  icon: Icon,
  gradientFrom,
  gradientTo,
  link,
  index,
}: EventCardProps) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Hover glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-electric/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
      
      <div className="relative glass-card p-6 sm:p-8 overflow-hidden">
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.div
            className="absolute w-full h-20 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
            animate={{ y: ['-100%', '400%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/60" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/60" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/60" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/60" />

        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} p-4 mb-6 mx-auto`}
        >
          <Icon className="w-full h-full text-primary-foreground" />
        </div>

        {/* Title */}
        <h3
          className={`text-xl sm:text-2xl font-display font-bold text-center mb-2 bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}
        >
          {title}
        </h3>

        {/* Tagline */}
        <p className="text-muted-foreground text-center mb-6 font-body italic">
          "{tagline}"
        </p>

        {/* Dates */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <Calendar className="w-4 h-4 text-primary" />
            <span>
              Register by: <span className="text-golden font-semibold">{registerBy}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <Calendar className="w-4 h-4 text-primary" />
            <span>
              Final: <span className="text-primary font-semibold">{finalDate}</span>
            </span>
          </div>
        </div>

        {/* Register button */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r from-primary to-electric text-primary-foreground font-display font-semibold rounded-lg group-hover:animate-pulse-glow transition-all"
        >
          Register Now
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};

export default EventCard;
