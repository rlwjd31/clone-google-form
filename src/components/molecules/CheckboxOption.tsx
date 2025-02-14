import Checkbox from "@/components/atoms/Checkbox";
import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import ButtonIcon from "@/components/molecules/ButtonIcon";
import { cn } from "@/utils/cn";
import {
  ChangeEventHandler,
  ComponentProps,
  FocusEventHandler,
  MouseEventHandler,
} from "react";

type CheckboxOptionProps = ComponentProps<"div"> & {
  className?: string;
  isActivated: boolean;
  value: string;
  onClickDeleteHandler: () => void;
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
  onChangeInputHandler: ChangeEventHandler<HTMLInputElement>;
  onBlurInputHandler: FocusEventHandler<HTMLInputElement>;
};

export default function CheckboxOption({
  className,
  isActivated,
  onClickHandler,
  onClickDeleteHandler,
  onChangeInputHandler,
  onBlurInputHandler,
  value,
  ...others
}: CheckboxOptionProps) {
  return (
    <div className="relative flex items-center w-full gap-2" draggable>
      <div className="absolute transition-all duration-100 -translate-x-4 opacity-0 cursor-move hover:opacity-100">
        <Icon type="drag-indicator" />
      </div>
      <div
        className={cn("flex w-full items-center gap-2 py-1", className)}
        {...others}
      >
        <Checkbox isActivated={isActivated} onClick={onClickHandler} disabled />
        <Input.SubTitle
          inputStyle="py-3 hover:bg-card text-sm bg-card px-0"
          value={value}
          onChange={onChangeInputHandler}
          onBlur={onBlurInputHandler}
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
