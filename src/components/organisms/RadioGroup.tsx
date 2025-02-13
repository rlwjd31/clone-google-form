import RadioOption from "@/components/molecules/RadioOption";
import { cn } from "@/utils/cn";
import { ComponentProps, useState } from "react";

type RadioGroupProps = ComponentProps<"div"> & {
  options: string[];
  className?: string;
};

export default function RadioGroup({ className, options }: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {options.map((option, idx) => (
        <RadioOption
          isActivated={option === selectedValue}
          onClickHandler={() =>
            setSelectedValue((prev) => (prev !== option ? option : ""))
          }
          defaultValue={option || `옵션 ${idx + 1}`}
          onClickDeleteHandler={() => {}}
        />
      ))}
    </div>
  );
}
