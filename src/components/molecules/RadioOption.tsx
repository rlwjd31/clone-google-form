import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import Radio from "@/components/atoms/Radio";
import ButtonIcon from "@/components/molecules/ButtonIcon";
import { cn } from "@/utils/cn";
import { ComponentProps, MouseEventHandler } from "react";

type RadioOptionProps = ComponentProps<"div"> & {
  className?: string;
  defaultValue: string;
  isActivated: boolean;
  onClickDeleteHandler: () => void;
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
};

export default function RadioOption({
  className,
  isActivated,
  onClickHandler,
  defaultValue,
  onClickDeleteHandler,
  ...others
}: RadioOptionProps) {
  return (
    <div className="relative flex items-center w-full gap-2" draggable>
      <div className="absolute transition-all duration-100 -translate-x-4 opacity-0 cursor-move hover:opacity-100">
        <Icon type="drag-indicator" />
      </div>
      <div
        className={cn(
          "flex w-full items-center gap-2 py-1",
          className
        )}
        {...others}
      >
        <Radio isActivated={isActivated} disabled onClick={onClickHandler} />
        <Input.SubTitle
          inputStyle="py-3 hover:bg-card text-sm bg-card px-0"
          defaultValue={defaultValue}
        />
        <ButtonIcon
          className="hidden-preview-mode"
          iconType="close"
          visibleToolTip
          onClick={onClickDeleteHandler}
        />
      </div>
    </div>
  );
}
