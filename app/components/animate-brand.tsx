import Image from "next/image";
import React from "react";

export const AnimateBrand = () => {
  return (
    <div className="flex mb-10 max-w-fit drop-shadow-sm">
      <div className="card-wrapper h-[50px] w-[50px]">
        <div className="card-content flex items-center justify-center">
          <div className="max-w-[60%]">
            <Image
              src="/gradient-brand.svg"
              alt="Boro brand"
              height={20}
              width={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
