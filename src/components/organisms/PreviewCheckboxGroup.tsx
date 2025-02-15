import PreviewCheckboxOption from "@/components/molecules/PreviewCheckboxOption";
import { OptionType } from "@/types/option.type";
import { cn } from "@/utils/cn";
import { ComponentProps, useState } from "react";

type RadioGroupProps = ComponentProps<"div"> & {
  options: Array<OptionType>;
  className?: string;
};

export default function PreviewCheckboxGroup({
  className,
  options,
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
        <PreviewCheckboxOption
          key={optionId}
          isActivated={selectedValue.includes(value)}
          onClickHandler={() => toggleSelectedValue(value)}
          value={value ?? `옵션 ${idx + 1}`}
        />
      ))}
    </div>
  );
}
