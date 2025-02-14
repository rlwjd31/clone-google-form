import RadioOption from "@/components/molecules/RadioOption";
import { OptionType } from "@/types/option.type";
import { cn } from "@/utils/cn";
import { ChangeEvent, ComponentProps, FocusEvent, useState } from "react";

type RadioGroupProps = ComponentProps<"div"> & {
  options: Array<OptionType>;
  className?: string;
  onClickDeleteHandler?: (id: number) => void;
  onChangeInputHandler: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  onBlurInputHandler: (e: FocusEvent<HTMLInputElement>, id: number) => void;
};

export default function RadioGroup({
  className,
  options,
  onClickDeleteHandler,
  onChangeInputHandler,
  onBlurInputHandler,
}: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {options.map(({ optionId, value }, idx) => (
        <RadioOption
          key={optionId}
          isActivated={value === selectedValue}
          onClickHandler={() =>
            setSelectedValue((prev) => (prev !== value ? value : ""))
          }
          value={value ?? `옵션 ${idx + 1}`}
          onClickDeleteHandler={() =>
            onClickDeleteHandler ? onClickDeleteHandler(optionId) : (() => {})()
          }
          onChangeInputHandler={(e) => onChangeInputHandler(e, optionId)}
          onBlurInputHandler={(e) => onBlurInputHandler(e, optionId)}
        />
      ))}
    </div>
  );
}
