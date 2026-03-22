"use client";

import Image from "next/image";

interface FeatureShowcaseProps {
  tag: string;
  title: string;
  desc: string;
  src: string;
  darkSrc?: string;
  url?: string;
  alt?: string;
}

function Showcase({
  tag,
  title,
  desc,
  src,
  url = "biterecipes.app",
  alt = "",
  dark = false,
}: FeatureShowcaseProps & { dark?: boolean }) {
  return (
    <div
      className={`relative grid grid-cols-[1fr_1.9fr] gap-6 items-center rounded-sm p-5 my-8 overflow-hidden ${
        dark ? "bg-[#0f0f0f]" : "bg-[#f6f5f2]"
      }`}
    >
      {/* Glow orb */}
      <div
        className="absolute w-64 h-64 rounded-full pointer-events-none z-0 -top-20 -right-16"
        style={{
          background: dark
            ? "radial-gradient(circle, rgba(255,107,53,0.22) 0%, transparent 68%)"
            : "radial-gradient(circle, rgba(255,107,53,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Caption */}
      <div className="relative z-10 flex flex-col gap-0">
        <span
          className={`inline-block text-[10px] font-medium tracking-widest uppercase px-2 py-0 rounded-sm w-fit ${
            dark ? "bg-[rgba(255,107,53,0.15)] text-[#FF6B35]" : "bg-[#ffeee6] text-[#b84018]"
          }`}
        >
          {tag}
        </span>
        <p
          className={`text-[15px] font-medium leading-snug !mt-4 ${
            dark ? "!text-white/90" : "!text-[#111]"
          }`}
        >
          {title}
        </p>
        <p className={`text-xs leading-snug !mt-0 ${dark ? "!text-white/30" : "!text-[#999]"}`}>
          {desc}
        </p>
      </div>

      {/* Frame */}
      <div
        className={`relative z-10 rounded-sm overflow-hidden border ${
          dark ? "!border-white/10" : "!border-black/10"
        }`}
      >
        {/* Chrome */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-0.5 ${
            dark
              ? "bg-[#1b1b1b] border-b border-white/[0.07]"
              : "bg-[#e8e8e5] border-b border-black/[0.08]"
          }`}
        >
          <div className="flex gap-1 shrink-0">
            <span className="w-[7px] h-[7px] rounded-full bg-[#ff5f57] block" />
            <span className="w-[7px] h-[7px] rounded-full bg-[#febc2e] block" />
            <span className="w-[7px] h-[7px] rounded-full bg-[#28c840] block" />
          </div>
          <div
            className={`flex-1 mx-1.5 my-1.5 !text-[10px] px-2 !py-0 rounded-sm ${
              dark ? "!bg-white/[0.06] !text-white/25" : "!bg-black/[0.06] !text-black/35"
            }`}
          >
            {url}
          </div>
        </div>

        {/* Screenshot */}
        <div className="block leading-none">
          <Image src={src} alt={alt} width={1200} height={750} className="w-full h-auto block" />
        </div>
      </div>
    </div>
  );
}

export function FeatureShowcase(props: FeatureShowcaseProps) {
  return (
    <>
      {/* Light mode */}
      <div className="dark:hidden">
        <Showcase {...props} dark={false} />
      </div>
      {/* Dark mode */}
      <div className="hidden dark:block">
        <Showcase {...props} src={props.darkSrc ?? props.src} dark={true} />
      </div>
    </>
  );
}
