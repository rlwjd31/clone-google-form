import Icon from "@/components/atoms/Icon";
import useClickOutside from "@/hooks/useClickOustside";
import { cn } from "@/utils/cn";
import { ReactNode, useRef, useState } from "react";

type CardProps = {
  className?: string;
  children: ReactNode;
};

export default function Card({ className, children }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardFocused, setIsCardFocused] = useState(false);
  useClickOutside(cardRef, () => setIsCardFocused(false));

  return (
    <div
      className={cn(
        "flex relative w-full flex-col bg-card px-6 max-w-[48rem] rounded-lg overflow-hidden",
        className
      )}
      ref={cardRef}
      onMouseDown={() => setIsCardFocused(true)}
      draggable
    >
      {/* drag가 가능한 영역을 알려주는 icon section */}
      <div className="flex h-6 w-full cursor-move items-center justify-center bg-card">
        <div className="rotate-90">
          <Icon type="drag-indicator" />
        </div>
      </div>
      {children}
      {/* 해당 card의 내부의 요소가 focus중일 때 좌측에 나타나는 파란 선 */}
      {isCardFocused && (
        <div className="absolute left-0 z-10 h-full w-[6px] bg-blue-primary" />
      )}
    </div>
  );
}
