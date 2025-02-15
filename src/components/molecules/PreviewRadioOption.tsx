import Input from "@/components/atoms/Input";
import Radio from "@/components/atoms/Radio";
import { cn } from "@/utils/cn";
import { ComponentProps, MouseEventHandler } from "react";

type RadioOptionProps = ComponentProps<"div"> & {
  className?: string;
  isActivated: boolean;
  value: string;

  onClickHandler: MouseEventHandler<HTMLButtonElement>;
};

export default function PreviewRadioOption({
  className,
  isActivated,
  onClickHandler,
  value,
  ...others
}: RadioOptionProps) {
  return (
    <div className="flex items-center w-full gap-2">
      <div
        className={cn("flex w-full items-center gap-2 py-1", className)}
        {...others}
      >
        <Radio isActivated={isActivated} onClick={onClickHandler} />
        <Input.SubTitle
          inputStyle="py-3 hover:bg-card text-sm bg-card px-0"
          value={value}
          disabled
        />
      </div>
    </div>
  );
}
