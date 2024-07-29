"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export const Carousel = ({ imgs, subtitle }) => {
  const [current, setCurrent] = useState(0);
  const [isFocus, setIsFocus] = useState(false);

  // Calculate the middle image index
  const middleIndex = Math.floor(imgs.length / 2);

  useEffect(() => {
    setCurrent(middleIndex);
  }, [middleIndex]);

  const onPrevClick = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const onNextClick = () => {
    if (current < imgs.length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    <>
      <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
        <div className="relative w-full max-w-[640px] flex items-center">
          {/* Left/right controls */}
          <AnimatePresence>
            {isFocus && (
              <>
                {/* Conditionally render left icon */}
                {current > 0 && (
                  <motion.div
                    className="absolute left-2 flex justify-start z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onHoverStart={() => setIsFocus(true)}
                    onHoverEnd={() => setIsFocus(false)}
                  >
                    <button
                      className="bg-neutral-900/75 text-neutral-50/75 rounded-full p-2"
                      onClick={onPrevClick}
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                  </motion.div>
                )}
                {/* Conditionally render right icon */}
                {current < imgs.length - 1 && (
                  <motion.div
                    className="absolute right-2 flex justify-end z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onHoverStart={() => setIsFocus(true)}
                    onHoverEnd={() => setIsFocus(false)}
                  >
                    <button
                      className="bg-neutral-900/75 text-neutral-50/75 rounded-full p-2"
                      onClick={onNextClick}
                    >
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
          {/* List of images */}
          <motion.div
            className="carousel flex gap-4 flex-nowrap"
            animate={{ x: `calc(-${current * 100}% - ${current}rem)` }}
            onHoverStart={() => setIsFocus(true)}
            onHoverEnd={() => setIsFocus(false)}
          >
            {[...imgs].map((image, idx) => (
              <motion.img
                key={idx}
                src={image}
                alt={`Image ${idx + 1}`}
                // animate={{ opacity: idx === current ? 1 : 0.8 }}
                className="aspect-[16/9] object-cover !my-0"
              />
            ))}
          </motion.div>

          <div className="carousel-b-blur"></div>

          {/* Control pill */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex gap-3 px-3 py-2 bg-neutral-800 rounded-full opacity-90">
              {[...imgs].map((_, idx) => (
                <button key={idx} onClick={() => setCurrent(idx)}>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      idx === current ? "bg-neutral-200" : "bg-neutral-600"
                    }`}
                  ></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </MotionConfig>

      <p className="!mt-4 text-center text-xs text-neutral-400 dark:text-neutral-500">
        {subtitle}
      </p>
    </>
  );
};
