import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring animation
  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
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

      {/* Main cursor container */}
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
            scale: isClicking ? 0.7 : isHovering ? 1.2 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        >
          {/* Outer rotating hexagon frame */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <motion.polygon
                points="20,2 36,11 36,29 20,38 4,29 4,11"
                fill="none"
                strokeWidth="1"
                strokeDasharray="4 2"
                animate={{
                  stroke: isHovering ? 'hsl(190, 100%, 60%)' : 'hsl(190, 100%, 50%)',
                  strokeOpacity: isHovering ? 0.8 : 0.4,
                }}
              />
            </svg>
          </motion.div>

          {/* Inner rotating triangle */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6"
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <motion.polygon
                points="12,3 22,20 2,20"
                fill="none"
                strokeWidth="1.5"
                animate={{
                  stroke: isHovering ? 'hsl(190, 100%, 70%)' : 'hsl(190, 100%, 50%)',
                  strokeOpacity: isHovering ? 1 : 0.6,
                }}
              />
            </svg>
          </motion.div>

          {/* Center core */}
          <motion.div
            className="relative w-3 h-3 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(190, 100%, 60%) 0%, hsl(190, 100%, 40%) 100%)',
              boxShadow: '0 0 8px hsl(190, 100%, 50%), 0 0 16px hsl(190, 100%, 50% / 0.5)',
            }}
            animate={{
              background: isHovering 
                ? 'radial-gradient(circle, hsl(190, 100%, 80%) 0%, hsl(190, 100%, 50%) 100%)'
                : 'radial-gradient(circle, hsl(190, 100%, 60%) 0%, hsl(190, 100%, 40%) 100%)',
              boxShadow: isHovering
                ? '0 0 12px hsl(190, 100%, 60%), 0 0 24px hsl(190, 100%, 50% / 0.7), 0 0 36px hsl(190, 100%, 50% / 0.4)'
                : '0 0 8px hsl(190, 100%, 50%), 0 0 16px hsl(190, 100%, 50% / 0.5)',
            }}
          />

          {/* Scanning line effect on hover */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(190, 100%, 60%), transparent)',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: isHovering ? 1 : 0,
              opacity: isHovering ? 1 : 0,
              rotate: [0, 180],
            }}
            transition={{
              scaleX: { duration: 0.2 },
              opacity: { duration: 0.2 },
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            }}
          />

          {/* Corner brackets on hover */}
          {isHovering && (
            <>
              <motion.div
                className="absolute -top-3 -left-3 w-2 h-2 border-t border-l"
                style={{ borderColor: 'hsl(190, 100%, 60%)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="absolute -top-3 -right-3 w-2 h-2 border-t border-r"
                style={{ borderColor: 'hsl(190, 100%, 60%)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.05 }}
              />
              <motion.div
                className="absolute -bottom-3 -left-3 w-2 h-2 border-b border-l"
                style={{ borderColor: 'hsl(190, 100%, 60%)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
              <motion.div
                className="absolute -bottom-3 -right-3 w-2 h-2 border-b border-r"
                style={{ borderColor: 'hsl(190, 100%, 60%)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.15 }}
              />
            </>
          )}
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
          <svg viewBox="0 0 40 40" className="w-10 h-10">
            <polygon
              points="20,2 36,11 36,29 20,38 4,29 4,11"
              fill="none"
              stroke="hsl(190, 100%, 50%)"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;