import React, { useState, useEffect } from "react";

const useCountUpTime = (startTime) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const startingTime = startTime ? new Date(startTime) : new Date();
    const interval = setInterval(() => {
      const currentTime = new Date();
      const elapsedMilliseconds = currentTime - startingTime;
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
      setMinutes(Math.floor(elapsedSeconds / 60));
      setSeconds(elapsedSeconds % 60);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  return { minutes, seconds };
};

const CountUpTimer = ({ startTime }) => {
  const { minutes, seconds } = useCountUpTime(startTime);

  return (
    <div>
      <h2>Count Up Timer</h2>
      <p>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </p>
    </div>
  );
};

export default useCountUpTime;
