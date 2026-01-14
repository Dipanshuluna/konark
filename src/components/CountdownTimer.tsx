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
    <div className="flex gap-3 sm:gap-4 justify-center">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
          className="glass-card p-3 sm:p-4 min-w-[60px] sm:min-w-[80px] text-center hud-border"
        >
          <motion.span
            key={unit.value}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="block text-2xl sm:text-4xl font-display font-bold text-primary neon-text"
          >
            {String(unit.value).padStart(2, '0')}
          </motion.span>
          <span className="text-xs sm:text-sm text-muted-foreground font-display tracking-wider">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;
