import {
  useRef,
  useState,
  useEffect,
  FunctionComponent,
  SVGProps,
  ComponentProps,
} from "react";

import Icon, { IconInfo, IconType } from "@/components/atoms/Icon";
import { cn } from "@/utils/cn";

type DropdownItemIconType = Extract<
  IconType,
  | "short-text"
  | "long-text"
  | "radio-button"
  | "check-box"
  | "arrow-drop-down-circle"
>;

type DropdownItemType = {
  [K in DropdownItemIconType]: (typeof IconInfo)[K];
};

export default function Dropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedText, setSelectedText] =
    useState<DropdownItemType[DropdownItemIconType]["text"]>("객관식");

  const dropdownItemsContent: DropdownItemIconType[] = [
    "short-text",
    "long-text",
    "radio-button",
    "check-box",
    "arrow-drop-down-circle",
  ];

  const dropdownItemsInfo = dropdownItemsContent.map((iconType) => ({
    iconType,
    Component: IconInfo[iconType].component,
    text: IconInfo[iconType].text,
  }));
  console.log(dropdownItemsInfo);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative w-fit " ref={dropdownRef}>
      <div className="relative w-fit">
        <DropdownItem
          className="rounded-md border border-neutral-300 bg-card hover:bg-card"
          IconComponent={
            dropdownItemsInfo.filter((item) => item.text === selectedText)[0]
              .Component
          }
          text={selectedText}
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
            {dropdownItemsInfo.map(
              ({ iconType, text, Component: IconComponent }, index) => {
                return (
                  <li key={`${iconType}-${index}`}>
                    <DropdownItem
                      isActivated={selectedText === text}
                      IconComponent={IconComponent}
                      text={text}
                      onClick={() => {
                        setSelectedText(text);
                        setIsOpen(false);
                      }}
                    />
                  </li>
                );
              }
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

type DropdownItemProps = ComponentProps<"button"> & {
  isActivated?: boolean;
  className?: string;
  IconComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
  text: string;
};

function DropdownItem({
  className,
  isActivated,
  IconComponent,
  text,
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
      <IconComponent />
      <p className="w-[8.5rem] text-start">{text}</p>
    </button>
  );
}
