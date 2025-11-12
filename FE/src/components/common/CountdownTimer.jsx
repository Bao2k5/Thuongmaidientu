import { useState, useEffect } from 'react';

const CountdownTimer = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate) - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="flex items-center gap-4 text-luxury-charcoal">
      <div className="text-center">
        <div className="bg-luxury-white w-14 h-14 rounded flex items-center justify-center text-2xl font-semibold mb-1">
          {String(timeLeft.days).padStart(2, '0')}
        </div>
        <div className="text-xs text-luxury-brown">Ngày</div>
      </div>
      <div className="text-center">
        <div className="bg-luxury-white w-14 h-14 rounded flex items-center justify-center text-2xl font-semibold mb-1">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <div className="text-xs text-luxury-brown">Giờ</div>
      </div>
      <div className="text-center">
        <div className="bg-luxury-white w-14 h-14 rounded flex items-center justify-center text-2xl font-semibold mb-1">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <div className="text-xs text-luxury-brown">Phút</div>
      </div>
      <div className="text-center">
        <div className="bg-luxury-white w-14 h-14 rounded flex items-center justify-center text-2xl font-semibold mb-1">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
        <div className="text-xs text-luxury-brown">Giây</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
