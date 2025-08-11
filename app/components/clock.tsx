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
    let frameId: number;

    const updateClock = () => {
      const date = new Date();
      date.setHours(date.getHours() + datediff);

      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const millis = date.getMilliseconds();

      // Fractions for smooth motion
      const smoothSeconds = seconds + millis / 1000;
      const smoothMinutes = minutes + smoothSeconds / 60;
      const smoothHours = (hours % 12) + smoothMinutes / 60;

      setTime({
        hours: formatTime(hours),
        minutes: formatTime(minutes),
        seconds: formatTime(seconds),
      });

      // Set CSS variables for smooth rotation
      document.documentElement.style.setProperty(
        "--now-s",
        smoothSeconds.toString()
      );
      document.documentElement.style.setProperty(
        "--now-m",
        smoothMinutes.toString()
      );
      document.documentElement.style.setProperty(
        "--now-h",
        smoothHours.toString()
      );

      frameId = requestAnimationFrame(updateClock);
    };

    const formatTime = (t: number) => (t < 10 ? `0${t}` : t.toString());

    updateClock();

    return () => cancelAnimationFrame(frameId);
  }, [datediff]);

  const handleMouseEnter = () => setIsTooltipVisible(true);
  const handleMouseLeave = () => setIsTooltipVisible(false);

  useEffect(() => {
    if (timeRef.current) {
      const timezoneAbbreviation = new Date()
        .toLocaleTimeString("en-US", { timeZoneName: "short" })
        .split(" ")[2];
      timeRef.current.textContent = `${time.hours}:${time.minutes}:${time.seconds} ${timezoneAbbreviation}`;
    }
  }, [time]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="mr-4 clock relative cursor-pointer"
    >
      <div className="footer-clock border text-neutral-300 dark:border-neutral-700">
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
