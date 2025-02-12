import Icon, { IconSVG, IconType } from "@/components/atoms/Icon";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";
import ToolTip from "@/components/atoms/ToolTip";

type ButtonIconProps = ComponentProps<"button"> & {
  className?: string;
  iconType: IconType;
  visibleToolTip?: boolean;
};

export default function ButtonIcon({
  className,
  iconType,
  visibleToolTip = false,
}: ButtonIconProps) {
  const iconInfoText = IconSVG[iconType].text;
  return (
    <div className="group relative">
      <button
        type="button"
        className={cn(
          "flex items-center justify-center size-12 rounded-full hover:bg-neutral-300/30",
          className
        )}
      >
        <Icon type={iconType} />
      </button>
      {visibleToolTip && iconInfoText && (
        <ToolTip text={iconInfoText} position="bottom" />
      )}
    </div>
  );
}
