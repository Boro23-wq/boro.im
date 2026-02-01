"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "./modal";

const RoundedImage = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="rounded-img md:bg-neutral-50 md:border-neutral-200 md:dark:bg-neutral-800 md:border md:dark:border-neutral-700 md:p-4 md:rounded-sm my-8">
        <p className="!mt-0 text-xs tracking-wide font-medium uppercase !text-neutral-400 !dark:text-neutral-800 hidden md:block">
          {props.alt}
        </p>
        <Image
          alt={props.alt}
          className="drop-shadow-md rounded-none md:rounded-sm cursor-zoom-in"
          {...props}
          onClick={handleImageClick}
        />

        {isModalOpen && (
          <Modal
            src={props.src}
            alt={props.alt}
            onClose={handleCloseModal}
            isModalOpen={isModalOpen}
          />
        )}
        <p className="!mt-4 text-center text-xs font-medium uppercase !text-neutral-400 !dark:text-neutral-800 block md:hidden">
          {props.alt}
        </p>
      </div>
    </>
  );
};

export default RoundedImage;
