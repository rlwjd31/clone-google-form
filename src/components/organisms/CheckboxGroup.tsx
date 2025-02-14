import CheckboxOption from "@/components/molecules/CheckboxOption";
import { cn } from "@/utils/cn";
import { ComponentProps, useState } from "react";

type RadioGroupProps = ComponentProps<"div"> & {
  options: string[];
  className?: string;
  onClickDeleteHandler?: (value: string) => void;
};

export default function CheckboxGroup({
  className,
  options,
  onClickDeleteHandler,
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
      {options.map((option, idx) => (
        <CheckboxOption
          isActivated={selectedValue.includes(option)}
          onClickHandler={() => toggleSelectedValue(option)}
          value={option ?? `옵션 ${idx + 1}`}
          onClickDeleteHandler={() =>
            onClickDeleteHandler ? onClickDeleteHandler(option) : (() => {})()
          }
        />
      ))}
    </div>
  );
}
