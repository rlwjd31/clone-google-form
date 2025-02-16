import PreviewRadioOption from "@/components/molecules/PreviewRadioOption";
import {
  useCustomFormContext,
  useCustomFormProvider,
} from "@/store/CustomFormProvider";
import { OptionType } from "@/types/option.type";
import { cn } from "@/utils/cn";
import { ComponentProps, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

type RadioGroupProps = ComponentProps<"div"> & {
  options: Array<OptionType>;
  className?: string;
};

export default function PreviewRadioGroup({
  className,
  options,
}: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );
  const { setValue } = useFormContext();
  const { formName } = useCustomFormContext();

  useEffect(() => {
    setValue(formName, selectedValue);
  }, [selectedValue, setValue, formName]);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {options.map(({ optionId, value }, idx) => (
        <PreviewRadioOption
          key={optionId}
          isActivated={value === selectedValue}
          onClickHandler={() =>
            setSelectedValue((prev) => (prev !== value ? value : ""))
          }
          value={value ?? `옵션 ${idx + 1}`}
        />
      ))}
    </div>
  );
}
