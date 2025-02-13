import Checkbox from "@/components/atoms/Checkbox";
import Input from "@/components/atoms/Input";
import ButtonIcon from "@/components/molecules/ButtonIcon";
import { cn } from "@/utils/cn";
import { ComponentProps, MouseEventHandler } from "react";

type CheckboxOptionProps = ComponentProps<"div"> & {
  className?: string;
  defaultValue: string;
  isActivated: boolean;
  onClickDeleteHandler: () => void;
  onClickHandler: MouseEventHandler<HTMLDivElement>;
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
    <div className="flex items-center w-full gap-2">
      <div
        className={cn(
          "flex w-full cursor-pointer items-center gap-2 py-1",
          className
        )}
        onClick={onClickHandler}
        {...others}
      >
        <Checkbox isActivated={isActivated} />
        <Input.SubTitle
          inputStyle="py-3 hover:bg-card text-sm bg-card px-0"
          defaultValue={defaultValue}
        />
        <ButtonIcon
          iconType="close"
          visibleToolTip
          onClick={onClickDeleteHandler}
        />
      </div>
    </div>
  );
}

