import Image from "next/image";

export const BentoGrid = ({ imgs }) => {
  return (
    <div className="grid auto-rows-[192px] grid-cols-3 gap-4">
      {imgs.map((img, i) => (
        <div
          key={i}
          className={`relative row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900 overflow-hidden`}
        >
          <Image
            src={img}
            alt={img}
            layout="fill"
            objectFit="cover"
            className="absolute rounded-lg px-3 py-4 sm:py-0"
          />
        </div>
      ))}
    </div>
  );
};
