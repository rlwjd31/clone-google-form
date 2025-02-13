import Icon from "@/components/atoms/Icon";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

type CheckBoxProps = ComponentProps<"div"> & {
  className?: string;
  isActivated?: boolean;
};

export default function Checkbox({
  className,
  isActivated = false,
}: CheckBoxProps) {
  return (
    <>
      <div
        className={cn(
          "grid shrink-0 grid-cols-1 size-10 rounded-full group grid-rows-1 gap-2 place-items-center hover:bg-purple-secondary",
          className
        )}
      >
        <span
          className={cn(
            "z-10 col-start-1 transition-all row-start-1 size-5 border-2 border-neutral-400",
            isActivated
              ? "animate-fillFromBorder border-0"
              : "animate-emptyFromCenter border-2"
          )}
        />
        <span
          className={cn(
            "col-start-1 row-start-1 rounded-full size-10 group-hover:bg-purple-primary/15",
            isActivated ? "animate-scaleUp" : "animate-scaleDown"
          )}
        />
        <div className={cn("z-20 col-start-1 row-start-1")}>
          <Icon type="check" />
        </div>
      </div>
    </>
  );
}
