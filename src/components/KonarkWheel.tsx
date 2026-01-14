import { motion } from 'framer-motion';

const KonarkWheel = () => {
  const spokes = 12;
  const innerSpokes = 8;

  return (
    <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(190, 100%, 50%)" />
              <stop offset="50%" stopColor="hsl(210, 100%, 60%)" />
              <stop offset="100%" stopColor="hsl(190, 100%, 50%)" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
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
            opacity="0.9"
          />
          
          {/* Secondary ring */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="url(#wheelGradient)"
            strokeWidth="1"
            strokeDasharray="8 4"
            filter="url(#glow)"
            opacity="0.5"
          />
          
          {/* Outer spokes */}
          {Array.from({ length: spokes }).map((_, i) => {
            const angle = (i * 360) / spokes;
            const radian = (angle * Math.PI) / 180;
            const x2 = 100 + 90 * Math.cos(radian);
            const y2 = 100 + 90 * Math.sin(radian);
            return (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={x2}
                y2={y2}
                stroke="url(#wheelGradient)"
                strokeWidth="1.5"
                filter="url(#glow)"
                opacity="0.8"
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Inner rotating ring (opposite direction) */}
      <motion.div
        className="absolute inset-8"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Inner circle */}
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="url(#wheelGradient)"
            strokeWidth="2"
            filter="url(#glow)"
            opacity="0.7"
          />
          
          {/* Inner spokes */}
          {Array.from({ length: innerSpokes }).map((_, i) => {
            const angle = (i * 360) / innerSpokes;
            const radian = (angle * Math.PI) / 180;
            const x1 = 100 + 40 * Math.cos(radian);
            const y1 = 100 + 40 * Math.sin(radian);
            const x2 = 100 + 65 * Math.cos(radian);
            const y2 = 100 + 65 * Math.sin(radian);
            return (
              <line
                key={`inner-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#wheelGradient)"
                strokeWidth="2"
                filter="url(#glow)"
                opacity="0.6"
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Static center with text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="absolute w-2/3 h-2/3">
          {/* Inner hub circle */}
          <circle
            cx="100"
            cy="100"
            r="35"
            fill="none"
            stroke="url(#wheelGradient)"
            strokeWidth="2.5"
            filter="url(#strongGlow)"
          />
          
          {/* Center dot */}
          <circle
            cx="100"
            cy="100"
            r="8"
            fill="hsl(190, 100%, 55%)"
            filter="url(#strongGlow)"
          />
        </svg>
        
        {/* Center text */}
        <motion.div
          className="text-center z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <span className="block text-xl sm:text-2xl md:text-3xl font-display font-bold text-primary neon-text tracking-wider">
            KON
          </span>
          <span className="block text-xl sm:text-2xl md:text-3xl font-display font-bold text-primary neon-text tracking-wider">
            ARK
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default KonarkWheel;
