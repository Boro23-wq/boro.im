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
      <div className="rounded-img md:-mx-0 md:bg-neutral-50 md:border-neutral-200 md:dark:bg-neutral-800 md:border md:dark:border-neutral-700 md:pt-4 md:pb-4 md:px-5 md:rounded-lg my-8">
        <p className="text-xs tracking-wide font-medium uppercase !text-neutral-400 !dark:text-neutral-800 hidden md:block">
          {props.alt}
        </p>
        <Image
          alt={props.alt}
          className="!my-0 drop-shadow-md rounded-none md:rounded-lg cursor-zoom-in"
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
      </div>

      <p className="!-mt-3 text-center text-[10px] font-medium uppercase !text-neutral-400 !dark:text-neutral-800 block md:hidden">
        {props.alt}
      </p>
    </>
  );
};

export default RoundedImage;
