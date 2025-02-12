import Hint from "@/components/atoms/ToolTip";
import Icon, { IconSVG, IconType } from "@/components/atoms/Icon";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";
import ToolTip from "@/components/atoms/ToolTip";

type ButtonIconProps = ComponentProps<"button"> & {
  className?: string;
  iconType: IconType;
};

export default function ButtonIcon({ className, iconType }: ButtonIconProps) {
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
      {IconSVG[iconType].tooltipInfo && (
        <ToolTip text={IconSVG[iconType].tooltipInfo} position="bottom" />
      )}
    </div>
  );
}
