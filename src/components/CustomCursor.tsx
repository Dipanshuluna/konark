import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring animation for the follower
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('[role="button"]');
      
      setIsHovering(!!isHoverable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousemove', handleElementHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', handleElementHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Main cursor - 4 rotating squares like KTJ */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.7 : isHovering ? 1.3 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        >
          {/* Rotating container for the 4 squares */}
          <motion.div
            className="relative w-5 h-5"
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Top-left square */}
            <motion.div
              className="absolute top-0 left-0 w-2 h-2 rounded-[2px]"
              style={{
                backgroundColor: 'hsl(var(--primary))',
                boxShadow: '0 0 8px hsl(var(--primary)), 0 0 15px hsl(var(--primary) / 0.5)',
              }}
              animate={{
                backgroundColor: isHovering ? 'hsl(45 100% 55%)' : 'hsl(var(--primary))',
                boxShadow: isHovering 
                  ? '0 0 12px hsl(45 100% 55%), 0 0 20px hsl(45 100% 55% / 0.5)'
                  : '0 0 8px hsl(var(--primary)), 0 0 15px hsl(var(--primary) / 0.5)',
              }}
            />
            
            {/* Top-right square */}
            <motion.div
              className="absolute top-0 right-0 w-2 h-2 rounded-[2px]"
              style={{
                backgroundColor: 'hsl(var(--primary))',
                boxShadow: '0 0 8px hsl(var(--primary)), 0 0 15px hsl(var(--primary) / 0.5)',
              }}
              animate={{
                backgroundColor: isHovering ? 'hsl(45 100% 55%)' : 'hsl(var(--primary))',
                boxShadow: isHovering 
                  ? '0 0 12px hsl(45 100% 55%), 0 0 20px hsl(45 100% 55% / 0.5)'
                  : '0 0 8px hsl(var(--primary)), 0 0 15px hsl(var(--primary) / 0.5)',
              }}
            />
            
            {/* Bottom-left square */}
            <motion.div
              className="absolute bottom-0 left-0 w-2 h-2 rounded-[2px]"
              style={{
                backgroundColor: 'hsl(var(--primary))',
                boxShadow: '0 0 8px hsl(var(--primary)), 0 0 15px hsl(var(--primary) / 0.5)',
              }}
              animate={{
                backgroundColor: isHovering ? 'hsl(45 100% 55%)' : 'hsl(var(--primary))',
                boxShadow: isHovering 
                  ? '0 0 12px hsl(45 100% 55%), 0 0 20px hsl(45 100% 55% / 0.5)'
                  : '0 0 8px hsl(var(--primary)), 0 0 15px hsl(var(--primary) / 0.5)',
              }}
            />
            
            {/* Bottom-right square - slightly offset for the KTJ look */}
            <motion.div
              className="absolute bottom-0 right-0 w-2 h-2 rounded-[2px]"
              style={{
                backgroundColor: 'hsl(var(--primary) / 0.6)',
                boxShadow: '0 0 8px hsl(var(--primary) / 0.5), 0 0 15px hsl(var(--primary) / 0.3)',
              }}
              animate={{
                backgroundColor: isHovering ? 'hsl(45 100% 55% / 0.6)' : 'hsl(var(--primary) / 0.6)',
                boxShadow: isHovering 
                  ? '0 0 12px hsl(45 100% 55% / 0.5), 0 0 20px hsl(45 100% 55% / 0.3)'
                  : '0 0 8px hsl(var(--primary) / 0.5), 0 0 15px hsl(var(--primary) / 0.3)',
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Click ripple effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          initial={false}
          animate={{
            scale: isClicking ? [1, 2.5] : 1,
            opacity: isClicking ? [0.6, 0] : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <div 
            className="w-6 h-6 rounded-sm border border-primary/60"
            style={{
              boxShadow: '0 0 10px hsl(var(--primary) / 0.3)',
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
