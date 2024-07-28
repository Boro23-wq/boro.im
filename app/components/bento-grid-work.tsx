import Image from "next/image";

export const BentoGridWork = ({ imgs }) => {
  return (
    <>
      <div className="bento grid auto-rows-[192px] gap-2 grid-cols-2 sm:grid-cols-3">
        {imgs.map((img, i) => (
          <div
            key={i}
            className={`relative ${img} max-h-[192px] overflow-hidden bg-[#e9eaec] dark:bg-neutral-800 ${
              i === 6 ? "col-span-2 sm:col-span-3" : ""
            }`}
          >
            <Image
              src={img}
              alt={img}
              layout="fill"
              objectFit="contain"
              className="rounded-lg px-3 py-4 sm:py-0"
            />
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-neutral-400 dark:text-neutral-500">
        BlackX web analytics components
      </p>
    </>
  );
};
