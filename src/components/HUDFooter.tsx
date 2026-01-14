import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Linkedin, Twitter, Youtube, Globe, Radio } from 'lucide-react';

const HUDFooter = () => {
  const socialLinks = [
    { icon: Globe, href: 'https://www.iconnectgjust.in/', label: 'Website' },
    { icon: Instagram, href: 'https://www.instagram.com/iconnectgjust/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/iconnect-gjust/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/iconnectgjust', label: 'Twitter' },
    { icon: Youtube, href: 'https://www.youtube.com/@iConnectGJUST', label: 'YouTube' },
  ];

  return (
    <motion.footer
      className="fixed bottom-0 left-0 right-0 z-50 hud-footer"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Left side - Status indicator */}
          <motion.div
            className="flex items-center gap-2 sm:gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2, duration: 0.4 }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-primary/30 bg-primary/5 backdrop-blur-sm">
              <Radio className="w-3 h-3 sm:w-4 sm:h-4 text-primary animate-pulse" />
              <span className="font-mono text-xs text-primary tracking-wider">SYSTEM ONLINE</span>
            </div>
          </motion.div>

          {/* Center - Contact info */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.4 }}
          >
            <a
              href="mailto:iconnectgjust@gmail.com"
              className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-mono group-hover:neon-text-subtle">iconnectgjust@gmail.com</span>
            </a>
            
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-mono">PDUIIC, GJUS&T, Hisar</span>
            </div>
          </motion.div>

          {/* Right side - Social links */}
          <motion.div
            className="flex items-center gap-2 sm:gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.4, duration: 0.4 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded border border-primary/30 bg-primary/5 text-muted-foreground hover:text-primary hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 + index * 0.1, duration: 0.3 }}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom org name */}
        <motion.div
          className="text-center mt-2 sm:mt-3 pt-2 border-t border-primary/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.4 }}
        >
          <p className="text-[10px] sm:text-xs text-muted-foreground/60 font-mono tracking-wide">
            Pandit Deendayal Upadhyaya Innovation & Incubation Centre, GJUS&T, Hisar, Haryana
          </p>
        </motion.div>
      </div>

      {/* Top border glow */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      
      {/* Corner indicators */}
      <div className="absolute top-0 left-4 w-2 h-2 bg-primary rounded-full opacity-60" />
      <div className="absolute top-0 right-4 w-2 h-2 bg-primary rounded-full opacity-60" />
    </motion.footer>
  );
};

export default HUDFooter;
