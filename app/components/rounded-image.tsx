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
    <div className="rounded-img md:-mx-0 md:bg-neutral-50 md:border-neutral-200 md:dark:bg-neutral-800 md:border-0.5 md:dark:border-neutral-700 md:py-2 md:px-4 md:rounded-md my-10">
      <p className="mt-2 text-[10px] font-medium uppercase !text-neutral-400 !dark:text-neutral-800 hidden md:block">
        {props.alt}
      </p>
      <Image
        alt={props.alt}
        className="drop-shadow-2xl rounded-none md:rounded-xl cursor-zoom-in"
        {...props}
        onClick={handleImageClick}
      />
      <p className="!-mt-3 text-center text-[10px] font-medium uppercase !text-neutral-400 !dark:text-neutral-800 block md:hidden">
        {props.alt}
      </p>

      {isModalOpen && (
        <Modal
          src={props.src}
          alt={props.alt}
          onClose={handleCloseModal}
          isModalOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default RoundedImage;
