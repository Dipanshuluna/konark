import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const targetDate = new Date('2026-02-16T00:00:00');

  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'DAYS' },
    { value: timeLeft.hours, label: 'HOURS' },
    { value: timeLeft.minutes, label: 'MINS' },
    { value: timeLeft.seconds, label: 'SECS' },
  ];

  return (
    <div className="flex gap-2 sm:gap-4 justify-center">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8 + index * 0.1, duration: 0.5, type: "spring" }}
          className="relative"
        >
          <div className="hud-border rounded-lg p-2 sm:p-4 min-w-[55px] sm:min-w-[80px] text-center">
            <motion.span
              key={unit.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block text-xl sm:text-3xl md:text-4xl font-display font-bold text-primary neon-text"
            >
              {String(unit.value).padStart(2, '0')}
            </motion.span>
            <span className="text-[10px] sm:text-xs text-muted-foreground font-mono tracking-wider">
              {unit.label}
            </span>
          </div>
          
          {/* Decorative corner dots */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary rounded-full opacity-60" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-60" />
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;
