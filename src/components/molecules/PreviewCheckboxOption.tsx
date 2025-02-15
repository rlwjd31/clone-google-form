import Checkbox from "@/components/atoms/Checkbox";
import Input from "@/components/atoms/Input";
import { cn } from "@/utils/cn";
import { ComponentProps, MouseEventHandler } from "react";

type CheckboxOptionProps = ComponentProps<"div"> & {
  className?: string;
  isActivated: boolean;
  value: string;
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
};

export default function PreviewCheckboxOption({
  className,
  isActivated,
  onClickHandler,
  value,
  ...others
}: CheckboxOptionProps) {
  return (
    <div className="flex items-center w-full gap-2" draggable>
      <div
        className={cn("flex w-full items-center gap-2 py-1", className)}
        {...others}
      >
        <Checkbox isActivated={isActivated} onClick={onClickHandler} />
        <Input.SubTitle
          inputStyle="py-3 hover:bg-card text-sm bg-card px-0"
          value={value}
        />
      </div>
    </div>
  );
}
