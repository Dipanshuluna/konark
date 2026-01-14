import { motion } from 'framer-motion';
import { Calendar, ArrowRight, LucideIcon } from 'lucide-react';

interface ZoneCardProps {
  title: string;
  tagline: string;
  registerBy: string;
  finalDate: string;
  icon: LucideIcon;
  zoneNumber: number;
  gradientFrom: string;
  gradientTo: string;
  link: string;
  index: number;
  floatDelay?: number;
}

const ZoneCard = ({
  title,
  tagline,
  registerBy,
  finalDate,
  icon: Icon,
  zoneNumber,
  gradientFrom,
  gradientTo,
  link,
  index,
  floatDelay = 0,
}: ZoneCardProps) => {
  return (
    <motion.div
      className="group relative perspective-1000"
      initial={{ opacity: 0, y: 80, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.15, duration: 0.7, type: "spring" }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ animationDelay: `${floatDelay}s` }}
    >
      {/* 3D floating effect container */}
      <motion.div
        className="relative preserve-3d"
        whileHover={{ 
          y: -10, 
          rotateX: 5,
          rotateY: 5,
          transition: { duration: 0.3 }
        }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatDelay,
          }
        }}
      >
        {/* Glow effect on hover */}
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-electric/30 to-primary/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Main card */}
        <div className="relative glass-card glass-card-hover rounded-xl overflow-hidden transition-all duration-500">
          {/* Scan line effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.div
              className="absolute w-full h-24 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
              animate={{ y: ['-100%', '500%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Zone number badge */}
          <div className="absolute top-3 left-3 z-10">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-primary tracking-wider">ZONE {zoneNumber}</span>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/50 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary/50 rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary/50 rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/50 rounded-br-xl" />

          <div className="p-6 pt-12 sm:p-8 sm:pt-14">
            {/* Icon */}
            <motion.div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} p-4 mb-6 mx-auto shadow-lg`}
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon className="w-full h-full text-primary-foreground" />
            </motion.div>

            {/* Title */}
            <h3 className={`text-lg sm:text-xl md:text-2xl font-display font-bold text-center mb-2 bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
              {title}
            </h3>

            {/* Tagline */}
            <p className="text-muted-foreground text-center mb-6 font-body text-sm sm:text-base italic">
              "{tagline}"
            </p>

            {/* Dates */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-foreground/80">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-mono">
                  Register by: <span className="text-golden font-semibold">{registerBy}</span>
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-foreground/80">
                <Calendar className="w-4 h-4 text-electric" />
                <span className="font-mono">
                  Final: <span className="text-primary font-semibold">{finalDate}</span>
                </span>
              </div>
            </div>

            {/* Register button */}
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r ${gradientFrom} ${gradientTo} text-primary-foreground font-display font-semibold rounded-lg transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Register Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ZoneCard;
