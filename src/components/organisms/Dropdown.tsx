import { useRef, useState, ComponentProps } from "react";

import Icon, { IconInfo, IconType } from "@/components/atoms/Icon";
import { cn } from "@/utils/cn";
import useClickOutside from "@/hooks/useClickOustside";

type DropdownItemIconType = Extract<
  IconType,
  | "short-text"
  | "long-text"
  | "radio-button"
  | "check-box"
  | "arrow-drop-down-circle"
>;

const dropdownItemsContent: DropdownItemIconType[] = [
  "short-text",
  "long-text",
  "radio-button",
  "check-box",
  "arrow-drop-down-circle",
];

export default function Dropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDropdownIconType, setSelectedDropdownIconType] =
    useState<DropdownItemIconType>("short-text");
  useClickOutside(dropdownRef, () => setIsOpen(false));

  // TODO: 위치기반 dropdown 구현"editor.formatOnType": false,

  return (
    <div className="relative w-fit " ref={dropdownRef}>
      <div className="relative w-fit">
        <DropdownItem
          className="rounded-md border border-neutral-300 bg-card hover:bg-card"
          iconType={selectedDropdownIconType}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <div
          className={cn(
            "absolute right-3 top-1/2 z-10 -translate-y-1/2 transition-all duration-300",
            isOpen && "rotate-180"
          )}
        >
          <Icon type="arrow-drop-down" />
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-md border border-gray-300 bg-card shadow-lg">
          <ul className="flex w-full flex-col">
            {dropdownItemsContent.map((iconType, index) => {
              return (
                <li key={`${iconType}-${index}`}>
                  <DropdownItem
                    isActivated={selectedDropdownIconType === iconType}
                    iconType={iconType}
                    onClick={() => {
                      setSelectedDropdownIconType(iconType);
                      setIsOpen(false);
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

type DropdownItemProps = ComponentProps<"button"> & {
  isActivated?: boolean;
  className?: string;
  iconType: IconType;
};

function DropdownItem({
  className,
  isActivated,
  iconType,
  ...others
}: DropdownItemProps) {
  return (
    <button
      className={cn(
        "flex list-none justify-between gap-3 p-3 cursor-pointer",
        isActivated && "bg-blue-primary/10 hover:bg-blue-primary/5",
        !isActivated && "hover:bg-neutral-100",
        className
      )}
      {...others}
    >
      <Icon type={iconType} />
      <p className="w-[8.5rem] text-start">{IconInfo[iconType].text}</p>
    </button>
  );
}
