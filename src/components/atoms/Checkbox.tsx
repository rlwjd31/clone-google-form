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
        <span
          className={cn(
            "z-10 col-start-1 row-start-1 size-5 border-2 border-neutral-400",
            !disabled
              ? isActivated
                ? "animate-fillFromBorder border-0"
                : "animate-emptyFromCenter border-2"
              : ""
          )}
        />
        {!disabled && (
          <>
            <span
              className={cn(
                "col-start-1 row-start-1 rounded-full size-10 group-hover:bg-purple-primary/15",
                isActivated ? "animate-scaleUp" : "animate-scaleDown"
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
