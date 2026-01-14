import { motion } from 'framer-motion';

const KonarkWheel = () => {
  const spokes = 8;

  return (
    <div className="relative w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80">
      {/* Outer glow effect */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(190 100% 50% / 0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Rotating wheel */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="spokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(200, 80%, 45%)" />
              <stop offset="50%" stopColor="hsl(190, 100%, 55%)" />
              <stop offset="100%" stopColor="hsl(200, 80%, 45%)" />
            </linearGradient>
            <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Main outer circle - thick and prominent */}
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="url(#spokeGradient)"
            strokeWidth="4"
            filter="url(#strongGlow)"
          />
          
          {/* Thick spokes radiating from center */}
          {Array.from({ length: spokes }).map((_, i) => {
            const angle = (i * 360) / spokes - 90; // Start from top
            const radian = (angle * Math.PI) / 180;
            const innerRadius = 18;
            const outerRadius = 88;
            const x1 = 100 + innerRadius * Math.cos(radian);
            const y1 = 100 + innerRadius * Math.sin(radian);
            const x2 = 100 + outerRadius * Math.cos(radian);
            const y2 = 100 + outerRadius * Math.sin(radian);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#spokeGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glowFilter)"
              />
            );
          })}
          
          {/* Inner hub circle */}
          <circle
            cx="100"
            cy="100"
            r="18"
            fill="none"
            stroke="url(#spokeGradient)"
            strokeWidth="3"
            filter="url(#glowFilter)"
          />
          
          {/* Center orb with gradient */}
          <defs>
            <radialGradient id="orbGradient" cx="40%" cy="40%">
              <stop offset="0%" stopColor="hsl(190, 100%, 70%)" />
              <stop offset="50%" stopColor="hsl(190, 100%, 50%)" />
              <stop offset="100%" stopColor="hsl(200, 80%, 35%)" />
            </radialGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="8"
            fill="url(#orbGradient)"
            filter="url(#strongGlow)"
          />
          
          {/* Highlight on orb */}
          <circle
            cx="97"
            cy="97"
            r="3"
            fill="hsl(190, 100%, 85%)"
            opacity="0.7"
          />
        </svg>
      </motion.div>

      {/* Static center text - doesn't rotate */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        >
          <span 
            className="block text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-[0.2em]"
            style={{
              color: 'hsl(195, 80%, 60%)',
              textShadow: '0 0 10px hsl(190 100% 50% / 0.8), 0 0 20px hsl(190 100% 50% / 0.5), 0 0 30px hsl(190 100% 50% / 0.3)',
            }}
          >
            KON
          </span>
          <span 
            className="block text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-[0.2em]"
            style={{
              color: 'hsl(195, 80%, 60%)',
              textShadow: '0 0 10px hsl(190 100% 50% / 0.8), 0 0 20px hsl(190 100% 50% / 0.5), 0 0 30px hsl(190 100% 50% / 0.3)',
            }}
          >
            ARK
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default KonarkWheel;
