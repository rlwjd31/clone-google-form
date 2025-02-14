import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

type RadioProps = ComponentProps<"button"> & {
  className?: string;
  isActivated?: boolean;
};

export default function Radio({
  className,
  isActivated = false,
  onClick,
  disabled,
  ...others
}: RadioProps) {
  return (
    <button
      className={cn(
        "grid size-10 shrink-0 grid-cols-1 rounded-full group grid-rows-1 gap-2 place-items-center",
        !disabled && "hover:bg-purple-secondary",
        className
      )}
      onClick={disabled ? () => {} : onClick}
      {...others}
    >
      <span className="z-10 col-start-1 row-start-1 size-5 rounded-full border-2 border-neutral-400" />
      {!disabled && (
        <>
          <span
            className={cn(
              "col-start-1 row-start-1 rounded-full size-10 group-hover:bg-purple-secondary",
              isActivated ? "animate-scaleUp" : "animate-scaleDown"
            )}
          />
          <span
            className={cn(
              "z-20 col-start-1 row-start-1 size-[10px] rounded-full bg-purple-primary",
              isActivated ? "animate-scaleUp" : "animate-scaleDown"
            )}
          />
        </>
      )}
    </button>
  );
}
