import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import ConstellationBackground from "@/components/ConstellationBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ConstellationBackground />
      <div className="relative z-10 text-center">
        <motion.h1
          className="mb-4 text-8xl font-display font-bold text-primary neon-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          404
        </motion.h1>
        <motion.p
          className="mb-8 text-xl text-muted-foreground font-display"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Mission not found. Return to base.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 font-display font-bold text-lg tracking-wider rounded-lg border-2 border-primary bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Return to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
