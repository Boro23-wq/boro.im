"use client";

import React, { useState, useRef, useEffect } from "react";

interface ClockProps {
  title: string;
  datediff: number;
}

const Clock: React.FC<ClockProps> = ({ title, datediff }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [time, setTime] = useState({ hours: "", minutes: "", seconds: "" });

  useEffect(() => {
    const handleDate = () => {
      const date = new Date();
      const dateTime = new Date();

      date.setHours(date.getHours() + datediff);
      const hours = formatTime(date.getHours()).toString();
      const minutes = formatTime(date.getMinutes()).toString();
      const seconds = formatTime(date.getSeconds()).toString();
      setTime({ hours, minutes, seconds });

      const timezoneAbbreviation = dateTime
        .toLocaleTimeString("en-US", { timeZoneName: "short" })
        .split(" ")[2]; // Get short timezone abbreviation

      setTimeText(`${hours}:${minutes}:${seconds} ${timezoneAbbreviation}`);
    };

    const setTimeText = (timeString: string) => {
      if (timeRef.current) {
        timeRef.current.textContent = timeString;
      }
    };

    const clockInterval = setInterval(handleDate, 1000);
    return () => clearInterval(clockInterval);
  }, [datediff]);

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

  const { hours, minutes, seconds } = time;

  const secondsDeg = `${parseInt(seconds) * 6})`;
  const minutesDeg = `${parseInt(minutes) * 6})`;
  const hoursDeg = `${parseInt(hours) * 30})`;

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="mr-4 clock relative cursor-pointer"
    >
      <div
        className="footer-clock border text-neutral-300 dark:border-neutral-700"
        style={
          {
            "--now-s": seconds,
            "--now-m": minutes,
            "--now-h": hours,
            "--seconds-deg": secondsDeg,
            "--minutes-deg": minutesDeg,
            "--hours-deg": hoursDeg,
          } as React.CSSProperties
        }
      >
        <div className="footer-second bg-neutral-200 dark:bg-neutral-600"></div>
        <div className="footer-minute bg-neutral-300 dark:bg-neutral-700"></div>
        <div className="footer-hour bg-neutral-300 dark:bg-neutral-700"></div>
      </div>

      <div
        ref={tooltipRef}
        className={`flex absolute transform -translate-x-16 sm:-translate-x-8 -translate-y-14 bg-white border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 shadow-lg px-2 py-1.5 rounded-md top-0 mt-4 whitespace-nowrap transition-opacity duration-300 ${
          isTooltipVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <p
          ref={timeRef}
          className="text-xs text-neutral-500 dark:text-neutral-300 inline-block"
        ></p>
      </div>
    </div>
  );
};

export default Clock;
