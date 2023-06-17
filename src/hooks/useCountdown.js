import { useEffect, useState } from "react";

const useCountdown = () => {
  const [targetDate, setTargetDate] = useState("");
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hasPassed, setHasPassed] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const targetTime = new Date(targetDate).getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        clearInterval(interval);
        setRemainingTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        setHasPassed(true);
      } else {
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        setRemainingTime({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return { remainingTime, hasPassed, setTargetDate };
};

export default useCountdown;
