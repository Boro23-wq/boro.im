"use client";

import React from "react";
import { CustomMDX } from "@/app/components/mdx";

type Props = {
  source: any;
};

export default function MDXRenderer({ source }: Props) {
  return <CustomMDX source={source} />;
}
