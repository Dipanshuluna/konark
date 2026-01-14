import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring animation for the outer ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
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

    // Check for hoverable elements
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

      {/* Outer ring - follows with delay */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute -inset-2 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(190 100% 50% / 0.3) 0%, transparent 70%)',
            }}
            animate={{
              scale: isHovering ? 1.2 : 1,
            }}
          />
          
          {/* Main ring */}
          <motion.div
            className="w-8 h-8 rounded-full border-2 border-primary/80"
            style={{
              boxShadow: '0 0 15px hsl(190 100% 50% / 0.5), inset 0 0 10px hsl(190 100% 50% / 0.2)',
            }}
            animate={{
              borderColor: isHovering 
                ? 'hsl(45 100% 55%)' 
                : 'hsl(190 100% 50% / 0.8)',
              boxShadow: isHovering
                ? '0 0 25px hsl(45 100% 55% / 0.6), inset 0 0 15px hsl(45 100% 55% / 0.3)'
                : '0 0 15px hsl(190 100% 50% / 0.5), inset 0 0 10px hsl(190 100% 50% / 0.2)',
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Crosshair lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div 
              className="absolute w-3 h-px bg-primary/60 -left-1.5"
              animate={{ 
                backgroundColor: isHovering ? 'hsl(45 100% 55% / 0.8)' : 'hsl(190 100% 50% / 0.6)' 
              }}
            />
            <motion.div 
              className="absolute w-px h-3 bg-primary/60 -top-1.5"
              animate={{ 
                backgroundColor: isHovering ? 'hsl(45 100% 55% / 0.8)' : 'hsl(190 100% 50% / 0.6)' 
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Inner dot - follows exactly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.5 : isHovering ? 0 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.1 }}
        >
          <div 
            className="w-1.5 h-1.5 rounded-full bg-primary"
            style={{
              boxShadow: '0 0 10px hsl(190 100% 50%), 0 0 20px hsl(190 100% 50% / 0.5)',
            }}
          />
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
            scale: isClicking ? [1, 2] : 1,
            opacity: isClicking ? [0.5, 0] : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <div 
            className="w-8 h-8 rounded-full border border-primary/50"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
