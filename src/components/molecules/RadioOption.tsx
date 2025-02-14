import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import Radio from "@/components/atoms/Radio";
import ButtonIcon from "@/components/molecules/ButtonIcon";
import { cn } from "@/utils/cn";
import {
  ChangeEventHandler,
  ComponentProps,
  FocusEventHandler,
  MouseEventHandler,
} from "react";

type RadioOptionProps = ComponentProps<"div"> & {
  className?: string;
  isActivated: boolean;
  value: string;
  onClickDeleteHandler: () => void;
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
  onBlurInputHandler: FocusEventHandler<HTMLInputElement>;

  onChangeInputHandler: ChangeEventHandler<HTMLInputElement>;
};

export default function RadioOption({
  className,
  isActivated,
  onClickHandler,
  onClickDeleteHandler,
  onChangeInputHandler,
  onBlurInputHandler,
  value,
  ...others
}: RadioOptionProps) {
  return (
    <div className="relative flex w-full items-center gap-2" draggable>
      <div className="absolute -translate-x-4 cursor-move opacity-0 transition-all duration-100 hover:opacity-100">
        <Icon type="drag-indicator" />
      </div>
      <div
        className={cn("flex w-full items-center gap-2 py-1", className)}
        {...others}
      >
        <Radio isActivated={isActivated} disabled onClick={onClickHandler} />
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
