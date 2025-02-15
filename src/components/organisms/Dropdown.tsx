import { useRef, useState, ComponentProps } from "react";

import Icon, { IconInfo, IconType } from "@/components/atoms/Icon";
import { cn } from "@/utils/cn";
import useClickOutside from "@/hooks/useClickOustside";
import { QuestionType } from "@/types/question.type";
import { OptionType } from "@/types/option.type";

const dropdownItemsContent: QuestionType[] = [
  "short-text",
  "long-text",
  "radio-button",
  "check-box",
  "arrow-drop-down-circle",
];

type DropdownProps = ComponentProps<"div"> & {
  className?: string;
  questionType?: QuestionType;
  contents?: OptionType[];
  setValue: (value: OptionType | QuestionType) => void;
};

export default function Dropdown({
  contents,
  className,
  questionType,
  setValue,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<
    QuestionType | OptionType
  >(questionType ?? "short-text");
  const DROPDOWN_ITEM_HEIGHT = 48;
  useClickOutside(dropdownRef, () => setIsOpen(false));

  if (!contents)
    return (
      <div className={cn("relative w-fit", className)} ref={dropdownRef}>
        <div className="relative w-fit">
          <DropdownItem
            className="rounded-md border border-neutral-300 bg-card hover:bg-card"
            iconType={selectedDropdownValue as QuestionType}
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
          <div
            className="absolute z-20 rounded-md border border-gray-300 bg-card py-2 shadow-lg"
            style={{
              transform: `translateY(-${
                (dropdownItemsContent.indexOf(
                  selectedDropdownValue as QuestionType
                ) +
                  1) *
                  DROPDOWN_ITEM_HEIGHT +
                10
              }px)`,
            }}
          >
            <ul className="flex w-full flex-col">
              {dropdownItemsContent.map((iconType, index) => {
                return (
                  <li key={`${iconType}-${index}`}>
                    <DropdownItem
                      isActivated={selectedDropdownValue === iconType}
                      iconType={iconType}
                      onClick={() => {
                        setSelectedDropdownValue(iconType);
                        if (setValue) {
                          setValue(iconType);
                        }
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

  return (
    <div className={cn("relative w-fit", className)} ref={dropdownRef}>
      <div className="relative w-fit">
        <DropdownItem
          className="rounded-md border border-neutral-300 bg-card hover:bg-card [&_p]:text-neutral-600"
          onClick={() => setIsOpen((prev) => !prev)}
          text={(selectedDropdownValue as OptionType).value || "선택"}
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
        <div
          className="absolute z-20 rounded-md border border-gray-300 bg-card py-2 shadow-lg"
          style={{
            transform: `translateY(-${
              (contents.findIndex(
                (content) =>
                  content.optionId ===
                  (selectedDropdownValue as OptionType).optionId
              ) +
                1) *
                DROPDOWN_ITEM_HEIGHT +
              10
            }px)`,
          }}
        >
          <ul className="flex w-full flex-col">
            {contents.map((content, index) => {
              return (
                <li key={`${content}-${index}`}>
                  <DropdownItem
                    isActivated={selectedDropdownValue === content}
                    onClick={() => {
                      setSelectedDropdownValue(content);
                      if (setValue) {
                        setValue({ ...content });
                      }
                      setIsOpen(false);
                    }}
                    text={content.value}
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
  iconType?: IconType;
  text?: string;
};

function DropdownItem({
  className,
  isActivated,
  iconType,
  text,
  ...others
}: DropdownItemProps) {
  return (
    <button
      className={cn(
        "flex list-none justify-between gap-3 p-3 cursor-pointer",
        isActivated && "bg-blue-primary/10 hover:bg-blue-primary/5",
        !isActivated && "hover:bg-neutral-100 active:bg-neutral-200",
        className
      )}
      {...others}
    >
      {iconType && <Icon type={iconType} />}
      {iconType && (
        <p className="w-[8.5rem] text-start">{IconInfo[iconType].text}</p>
      )}
      {!iconType && <p className="w-[8.5rem] text-start">{text}</p>}
    </button>
  );
}
