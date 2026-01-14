import { motion } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'HOME', href: '#' },
  { label: 'EVENTS', href: '#dashboard' },
  { label: 'REGISTER', href: 'https://unstop.com/college-fests/konark26-guru-jambheshwar-university-of-science-and-technology-hisar-haryana-430685', external: true },
  { label: 'CONTACT', href: 'mailto:iconnectgjust@gmail.com' },
];

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="backdrop-blur-md bg-background/80 border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2 sm:gap-3 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-colors">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div>
                <span className="font-display font-bold text-lg sm:text-xl text-primary neon-text-subtle tracking-wider">
                  KONARK
                </span>
                <span className="font-display font-bold text-lg sm:text-xl text-golden ml-1">
                  26
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="px-4 py-2 font-display text-sm tracking-wider text-muted-foreground hover:text-primary transition-colors relative group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded border border-primary/30 bg-primary/5 text-primary"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-4 space-y-2 border-t border-primary/10">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="block px-4 py-3 font-display text-sm tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/5 rounded transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom glow */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </motion.nav>
  );
};

export default NavigationBar;
