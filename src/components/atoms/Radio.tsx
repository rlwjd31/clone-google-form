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
      type="button"
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
              "col-start-1 row-start-1 transition-all duration-250 rounded-full size-10 group-hover:bg-purple-secondary scale-0",
              isActivated && "scale-100"
            )}
          />
          <div
            className={cn(
              "z-30 col-start-1 transition-all duration-250 row-start-1 size-[11px] rounded-full bg-purple-primary scale-0",
              isActivated && "scale-100"
            )}
          />
        </>
      )}
    </button>
  );
}
