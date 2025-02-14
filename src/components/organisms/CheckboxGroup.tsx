import CheckboxOption from "@/components/molecules/CheckboxOption";
import { cn } from "@/utils/cn";
import { ChangeEventHandler, ComponentProps, useState } from "react";

type RadioGroupProps = ComponentProps<"div"> & {
  options: Array<{ id: number; value: string }>;
  className?: string;
  onClickDeleteHandler?: (id: number) => void;
  onChangeInputHandler: ChangeEventHandler<HTMLInputElement>;
};

export default function CheckboxGroup({
  className,
  options,
  onClickDeleteHandler,
  onChangeInputHandler,
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
      {options.map(({ id, value }, idx) => (
        <CheckboxOption
          key={id}
          isActivated={selectedValue.includes(value)}
          onClickHandler={() => toggleSelectedValue(value)}
          value={value ?? `옵션 ${idx + 1}`}
          onClickDeleteHandler={() =>
            onClickDeleteHandler ? onClickDeleteHandler(id) : (() => {})()
          }
          onChangeInputHandler={onChangeInputHandler}
        />
      ))}
    </div>
  );
}
