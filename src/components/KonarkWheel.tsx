import { motion } from 'framer-motion';

const KonarkWheel = () => {
  const spokes = 12;

  return (
    <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
      {/* Multi-layer glow effects */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(190 100% 50% / 0.2) 0%, hsl(190 100% 50% / 0.05) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
      <div 
        className="absolute inset-8 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(190 100% 60% / 0.25) 0%, transparent 60%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(195, 100%, 50%)" />
              <stop offset="25%" stopColor="hsl(190, 100%, 60%)" />
              <stop offset="50%" stopColor="hsl(200, 90%, 55%)" />
              <stop offset="75%" stopColor="hsl(190, 100%, 60%)" />
              <stop offset="100%" stopColor="hsl(195, 100%, 50%)" />
            </linearGradient>
            <filter id="outerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer decorative dashed ring */}
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="1"
            strokeDasharray="4 8"
            opacity="0.4"
          />
        </svg>
      </motion.div>

      {/* Main wheel - slower rotation */}
      <motion.div
        className="absolute inset-2"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="spokeGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(200, 70%, 40%)" />
              <stop offset="50%" stopColor="hsl(190, 100%, 55%)" />
              <stop offset="100%" stopColor="hsl(200, 70%, 40%)" />
            </linearGradient>
            <filter id="spokeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Main outer circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="url(#spokeGradient2)"
            strokeWidth="3.5"
            filter="url(#spokeGlow)"
          />
          
          {/* Spokes */}
          {Array.from({ length: spokes }).map((_, i) => {
            const angle = (i * 360) / spokes - 90;
            const radian = (angle * Math.PI) / 180;
            const innerRadius = 22;
            const outerRadius = 86;
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
                stroke="url(#spokeGradient2)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#spokeGlow)"
              />
            );
          })}
          
          {/* Inner ring */}
          <circle
            cx="100"
            cy="100"
            r="22"
            fill="none"
            stroke="url(#spokeGradient2)"
            strokeWidth="2.5"
            filter="url(#spokeGlow)"
          />
        </svg>
      </motion.div>

      {/* Inner decorative ring - opposite direction */}
      <motion.div
        className="absolute inset-[30%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="innerRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(190, 100%, 55%)" />
              <stop offset="100%" stopColor="hsl(200, 80%, 45%)" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#innerRingGrad)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            opacity="0.6"
          />
        </svg>
      </motion.div>

      {/* Center hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-1/4 h-1/4">
          <defs>
            <radialGradient id="hubGradient" cx="35%" cy="35%">
              <stop offset="0%" stopColor="hsl(190, 100%, 75%)" />
              <stop offset="40%" stopColor="hsl(190, 100%, 55%)" />
              <stop offset="100%" stopColor="hsl(200, 80%, 35%)" />
            </radialGradient>
            <filter id="hubGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer hub ring */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="hsl(190, 100%, 50%)"
            strokeWidth="2"
            filter="url(#hubGlow)"
            opacity="0.7"
          />
          
          {/* Center orb */}
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="url(#hubGradient)"
            filter="url(#hubGlow)"
          />
          
          {/* Highlight */}
          <ellipse
            cx="42"
            cy="42"
            rx="8"
            ry="6"
            fill="hsl(190, 100%, 85%)"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Static center text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, type: "spring" }}
        >
          <span 
            className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-[0.15em]"
            style={{
              color: 'hsl(192, 90%, 60%)',
              textShadow: `
                0 0 10px hsl(190 100% 50% / 0.9),
                0 0 20px hsl(190 100% 50% / 0.6),
                0 0 40px hsl(190 100% 50% / 0.4),
                0 0 60px hsl(190 100% 50% / 0.2)
              `,
            }}
          >
            KON
          </span>
          <span 
            className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-[0.15em] -mt-1"
            style={{
              color: 'hsl(192, 90%, 60%)',
              textShadow: `
                0 0 10px hsl(190 100% 50% / 0.9),
                0 0 20px hsl(190 100% 50% / 0.6),
                0 0 40px hsl(190 100% 50% / 0.4),
                0 0 60px hsl(190 100% 50% / 0.2)
              `,
            }}
          >
            ARK
          </span>
        </motion.div>
      </div>

      {/* Animated particles around the wheel */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary"
          style={{
            top: '50%',
            left: '50%',
            boxShadow: '0 0 10px hsl(190 100% 50%), 0 0 20px hsl(190 100% 50% / 0.5)',
          }}
          animate={{
            x: [0, Math.cos((i * 60 * Math.PI) / 180) * 180],
            y: [0, Math.sin((i * 60 * Math.PI) / 180) * 180],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default KonarkWheel;
