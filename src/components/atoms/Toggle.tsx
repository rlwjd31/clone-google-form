import { cn } from "@/utils/cn";
import { Dispatch, SetStateAction } from "react";

type ToggleProps = {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
};

export default function Toggle({ enabled, setEnabled }: ToggleProps) {
  const toggleSwitch = () => setEnabled(!enabled);

  return (
    <div
      onClick={toggleSwitch}
      className={`flex h-4 w-10 cursor-pointer items-center rounded-full transition-all duration-300 ${
        enabled ? "bg-purple-primary/20" : "bg-gray-300"
      }`}
    >
      <div
        className={cn(
          "size-5 rounded-full bg-white shadow-md transition-transform duration-300 hover:ring-8",
          enabled
            ? "translate-x-6 bg-purple-primary hover:ring-purple-primary/10"
            : "-translate-x-1 hover:ring-neutral-500/10"
        )}
      ></div>
    </div>
  );
}
