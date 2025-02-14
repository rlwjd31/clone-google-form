import Icon from "@/components/atoms/Icon";
import { cn } from "@/utils/cn";
import { ComponentProps, ReactNode } from "react";

type CardProps = ComponentProps<"div"> & {
  className?: string;
  children: ReactNode;
  isCardFocused?: boolean;
};

export default function Card({
  className,
  isCardFocused,
  children,
  draggable,
  ...others
}: CardProps) {
  return (
    <div
      className={cn(
        "flex relative w-full flex-col bg-card px-6 rounded-lg shadow-md [&:hover>div:first-child]:opacity-100 hover:cursor-move",
        className
      )}
      draggable={draggable}
      {...others}
    >
      {/* drag가 가능한 영역을 알려주는 icon section */}
      {draggable && (
        <div
          className={cn(
            "flex items-center justify-center w-full h-8 cursor-move opacity-0",
            isCardFocused && "opacity-100"
          )}
        >
          <div className="rotate-90">
            <Icon type="drag-indicator" />
          </div>
        </div>
      )}
      {children}
      <div
        className={cn(
          "absolute left-0 z-10 h-full w-[6px] rounded-l-full bg-blue-primary opacity-100",
          !isCardFocused && "opacity-0"
        )}
      />
    </div>
  );
}
