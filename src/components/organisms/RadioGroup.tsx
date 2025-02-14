import RadioOption from "@/components/molecules/RadioOption";
import { cn } from "@/utils/cn";
import { ChangeEvent, ComponentProps, FocusEvent, useState } from "react";

type RadioGroupProps = ComponentProps<"div"> & {
  options: Array<{ id: number; value: string }>;
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
      {options.map(({ id, value }, idx) => (
        <RadioOption
          key={id}
          isActivated={value === selectedValue}
          onClickHandler={() =>
            setSelectedValue((prev) => (prev !== value ? value : ""))
          }
          value={value ?? `옵션 ${idx + 1}`}
          onClickDeleteHandler={() =>
            onClickDeleteHandler ? onClickDeleteHandler(id) : (() => {})()
          }
          onChangeInputHandler={(e) => onChangeInputHandler(e, id)}
          onBlurInputHandler={(e) => onBlurInputHandler(e, id)}
        />
      ))}
    </div>
  );
}
