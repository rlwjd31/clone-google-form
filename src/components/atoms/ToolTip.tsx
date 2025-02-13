// import React from 'react'

import { cn } from "@/utils/cn";

type ToolTipProps = {
  className?: string;
  position?: "right" | "bottom";
  text: string;
};

export default function ToolTip({
  text,
  position = "bottom",
  className,
}: ToolTipProps) {
  const positionStyle = {
    right: "group-hover:translate-x-10",
    bottom: "group-hover:translate-y-[26px]",
  };
  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 scale-0 whitespace-nowrap rounded-sm bg-neutral-500 px-2 py-1 text-[0.625rem] text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100",
        positionStyle[position],
        className
      )}
    >
      <p>{text}</p>
    </div>
  );
}
