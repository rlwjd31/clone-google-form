import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import ButtonIcon from "@/components/molecules/ButtonIcon";
import { OptionType } from "@/types/option.type";
import { cn } from "@/utils/cn";
import { ChangeEvent, FocusEvent } from "react";

type DropdownGroupProps = {
  options: Array<OptionType>;
  className?: string;
  onClickDeleteHandler?: (id: number) => void;
  onChangeInputHandler: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  onBlurInputHandler: (e: FocusEvent<HTMLInputElement>, id: number) => void;
};

export default function DropdownGroup({
  className,
  options,
  onClickDeleteHandler,
  onChangeInputHandler,
  onBlurInputHandler,
  ...others
}: DropdownGroupProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {options.map(({ optionId, value }, idx) => (
        <div className="relative flex w-full items-center gap-2" draggable>
          <div className="absolute -translate-x-4 cursor-move opacity-0 transition-all duration-100 hover:opacity-100">
            <Icon type="drag-indicator" />
          </div>
          <div
            className={cn("flex w-full items-center gap-2 py-1", className)}
            {...others}
          >
            <span className="w-6 text-sm text-neutral-900">{idx + 1}</span>
            <Input.SubTitle
              inputStyle="py-3 hover:bg-card text-sm bg-card px-0"
              value={value ?? `옵션 ${idx + 1}`}
              onChange={(e) => onChangeInputHandler(e, optionId)}
              onBlur={(e) => onBlurInputHandler(e, optionId)}
            />
            <ButtonIcon
              className="hidden-preview-mode"
              iconType="close"
              visibleToolTip
              onClick={() =>
                onClickDeleteHandler
                  ? onClickDeleteHandler(optionId)
                  : (() => {})()
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
