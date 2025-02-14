import Checkbox from "@/components/atoms/Checkbox";
import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import ButtonIcon from "@/components/molecules/ButtonIcon";
import { cn } from "@/utils/cn";
import { ComponentProps, MouseEventHandler } from "react";

type CheckboxOptionProps = ComponentProps<"div"> & {
  className?: string;
  defaultValue: string;
  isActivated: boolean;
  onClickDeleteHandler: () => void;
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
};

export default function CheckboxOption({
  className,
  isActivated,
  onClickHandler,
  defaultValue,
  onClickDeleteHandler,
  ...others
}: CheckboxOptionProps) {
  return (
    <div className="relative flex w-full items-center gap-2" draggable>
      <div className="absolute -translate-x-4 cursor-move opacity-0 transition-all duration-100 hover:opacity-100">
        <Icon type="drag-indicator" />
      </div>
      <div
        className={cn(
          "flex w-full cursor-pointer items-center gap-2 py-1",
          className
        )}
        {...others}
      >
        <Checkbox isActivated={isActivated} onClick={onClickHandler} disabled />
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
