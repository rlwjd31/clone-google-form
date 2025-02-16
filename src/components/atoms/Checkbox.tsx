import Icon from "@/components/atoms/Icon";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

type CheckBoxProps = ComponentProps<"button"> & {
  className?: string;
  isActivated?: boolean;
};

export default function Checkbox({
  className,
  isActivated = false,
  onClick,
  disabled,
  ...others
}: CheckBoxProps) {
  return (
    <>
      <button
        className={cn(
          "grid shrink-0 grid-cols-1 size-10 rounded-full group grid-rows-1 gap-2 place-items-center",
          !disabled && "hover:bg-purple-secondary",
          className
        )}
        type="button"
        onClick={disabled ? () => {} : onClick}
        {...others}
      >
        <div
          className={cn(
            "z-10 relative col-start-1 translate-all row-start-1 size-5 border-2 border-neutral-400 overflow-hidden"
          )}
        >
          <div
            className={cn(
              "absolute left-1/2 top-1/2 size-8 transition-all duration-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-primary",
              !disabled ? (isActivated ? "scale-100" : "scale-0") : ""
            )}
          />

        </div>
        {!disabled && (
          <>
            <span
              className={cn(
                "col-start-1 row-start-1 rounded-full size-10 group-hover:bg-purple-primary/15 scale-0",
                isActivated && "scale-100"
              )}
            />
            <div className={cn("z-20 col-start-1 row-start-1")}>
              <Icon type="check" />
            </div>
          </>
        )}
      </button>
    </>
  );
}
