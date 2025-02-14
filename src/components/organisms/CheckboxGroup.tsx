import CheckboxOption from "@/components/molecules/CheckboxOption";
import { OptionType } from "@/types/option.type";
import { cn } from "@/utils/cn";
import { ChangeEvent,  ComponentProps, FocusEvent, useState } from "react";

type RadioGroupProps = ComponentProps<"div"> & {
  options: Array<OptionType>;
  className?: string;
  onClickDeleteHandler?: (id: number) => void;
  onChangeInputHandler: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  onBlurInputHandler: (e: FocusEvent<HTMLInputElement>, id: number) => void;
};

export default function CheckboxGroup({
  className,
  options,
  onClickDeleteHandler,
  onChangeInputHandler,
  onBlurInputHandler
}: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  const toggleSelectedValue = (option: string) => {
    setSelectedValue((prev) =>
      prev.includes(option)
        ? prev.filter((v) => v !== option)
        : [...prev, option]
    );
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {options.map(({ optionId, value }, idx) => (
        <CheckboxOption
          key={optionId}
          isActivated={selectedValue.includes(value)}
          onClickHandler={() => toggleSelectedValue(value)}
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
