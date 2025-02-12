import Icon from "@/components/atoms/Icon";
import { cn } from "@/utils/cn";
import { ReactNode } from "react";

type CardProps = {
  className?: string;
  children: ReactNode;
};

export default function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "group flex relative w-full flex-col bg-card px-6 max-w-[48rem] rounded-lg overflow-hidden",
        className
      )}
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
      <div className="invisible absolute left-0 z-10 h-full w-[6px] bg-blue-primary group-focus-within:visible" />
    </div>
  );
}
