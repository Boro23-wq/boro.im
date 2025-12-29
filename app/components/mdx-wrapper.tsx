"use client";

import { CustomMDX } from "./mdx";

export default function ClientMDXWrapper({ source }) {
  return <CustomMDX source={source} />;
}
