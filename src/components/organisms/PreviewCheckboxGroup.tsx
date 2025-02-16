import PreviewCheckboxOption from "@/components/molecules/PreviewCheckboxOption";
import { useCustomFormContext } from "@/store/CustomFormProvider";
import { OptionType } from "@/types/option.type";
import { cn } from "@/utils/cn";
import { ComponentProps, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

type RadioGroupProps = ComponentProps<"div"> & {
  options: Array<OptionType>;
  className?: string;
};

export default function PreviewCheckboxGroup({
  className,
  options,
}: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const { setValue, trigger } = useFormContext();
  const formNameContext = useCustomFormContext();

  useEffect(() => {
    if (formNameContext?.formName) {
      setValue(formNameContext.formName, selectedValue);
      trigger(formNameContext.formName);
    }
  }, [selectedValue, setValue, formNameContext?.formName, trigger]);

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
