import { motion } from 'framer-motion';

const KonarkWheel = () => {
  const spokes = 12;

  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 w-40 h-40 sm:w-56 sm:h-56 mx-auto"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(185, 100%, 50%)" />
              <stop offset="50%" stopColor="hsl(200, 100%, 55%)" />
              <stop offset="100%" stopColor="hsl(185, 100%, 50%)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer circle */}
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="url(#wheelGradient)"
            strokeWidth="2"
            filter="url(#glow)"
          />
          
          {/* Spokes */}
          {Array.from({ length: spokes }).map((_, i) => {
            const angle = (i * 360) / spokes;
            const radian = (angle * Math.PI) / 180;
            const x2 = 100 + 85 * Math.cos(radian);
            const y2 = 100 + 85 * Math.sin(radian);
            return (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={x2}
                y2={y2}
                stroke="url(#wheelGradient)"
                strokeWidth="2"
                filter="url(#glow)"
              />
            );
          })}
          
          {/* Inner circle */}
          <circle
            cx="100"
            cy="100"
            r="30"
            fill="none"
            stroke="url(#wheelGradient)"
            strokeWidth="3"
            filter="url(#glow)"
          />
          
          {/* Center dot */}
          <circle
            cx="100"
            cy="100"
            r="8"
            fill="hsl(185, 100%, 50%)"
            filter="url(#glow)"
          />
        </svg>
      </motion.div>
      
      {/* Center text */}
      <div className="w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="block text-3xl sm:text-4xl font-display font-bold text-primary neon-text">
            KON
          </span>
          <span className="block text-3xl sm:text-4xl font-display font-bold text-primary neon-text">
            ARK
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default KonarkWheel;
