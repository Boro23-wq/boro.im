import { useState, useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({ src, alt, onClose, isModalOpen }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    onClose();
  };

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 p-10 z-50 flex items-center justify-center backdrop-blur-xl image-zoom-in"
      onClick={handleClose}
    >
      <div className="flex">
        <button
          className="cursor-pointer rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white absolute top-0 left-0 m-8 z-10"
          onClick={(e) => {
            e.stopPropagation(); // Prevent closing when clicking the button
            handleClose();
          }}
        >
          <X size={20} />
        </button>
      </div>
      <div className="flex relative">
        <img
          src={src}
          alt={alt}
          className="max-w-screen max-h-screen rounded-lg"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
        />
      </div>
    </div>
  );
};

export default Modal;
