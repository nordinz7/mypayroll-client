import React, { useEffect, useState } from "react";

type CountDownTimerProps = {
  date: Date | number | string;
};

const CountDownTimer = ({ date }: CountDownTimerProps) => {
  const calculateTimeLeft = () => {
    const difference = new Date(date).getTime() - new Date().getTime();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return null; // Countdown ended
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer
  }, [date]);

  if (!timeLeft) return "ended";

  return (
    <div>
      <span>{timeLeft.days ?? 0} days</span>,{" "}
      <span>{timeLeft.hours ?? 0} hours</span>,{" "}
      <span>{timeLeft.minutes ?? 0} minutes</span>,{" "}
      <span>{timeLeft.seconds ?? 0} seconds</span>
    </div>
  );
};

export default CountDownTimer;
