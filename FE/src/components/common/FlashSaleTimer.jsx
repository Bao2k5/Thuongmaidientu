import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FlashSaleTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(endTime).getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / 1000 / 60) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="bg-red-500 text-white rounded px-2 md:px-3 py-1 md:py-2 mb-1 font-bold text-sm md:text-lg min-w-[50px] md:min-w-[60px] text-center">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-xs text-gray-600 uppercase tracking-widest hidden md:inline">{label}</span>
    </div>
  );

  return (
    <motion.div 
      className="flex gap-1 md:gap-2 justify-center items-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <TimeUnit value={timeLeft.days} label="Ngày" />
      <span className="text-xl md:text-2xl text-gray-400 mb-1">:</span>
      <TimeUnit value={timeLeft.hours} label="Giờ" />
      <span className="text-xl md:text-2xl text-gray-400 mb-1">:</span>
      <TimeUnit value={timeLeft.minutes} label="Phút" />
      <span className="text-xl md:text-2xl text-gray-400 mb-1">:</span>
      <TimeUnit value={timeLeft.seconds} label="Giây" />
    </motion.div>
  );
};

export default FlashSaleTimer;
