import ShortText from "@/assets/icons/short-text.svg?react";
import LongText from "@/assets/icons/long-text.svg?react";
import RadionButton from "@/assets/icons/radio-button.svg?react";
import Checkbox from "@/assets/icons/check-box.svg?react";
import ArrowDownDropboxCircle from "@/assets/icons/arrow-drop-down-circle.svg?react";
import Delete from "@/assets/icons/delete.svg?react";
import ContentCopy from "@/assets/icons/content-copy.svg?react";
import ArrowDropUp from "@/assets/icons/arrow-drop-up.svg?react";
import ArrowDropDown from "@/assets/icons/arrow-drop-down.svg?react";
import ArrowDropDownCircle from "@/assets/icons/arrow-drop-down-circle.svg?react";
import AddCircle from "@/assets/icons/add-circle.svg?react";
import Close from "@/assets/icons/close.svg?react";

import { FC, SVGProps } from "react";

export type IconType =
  | "short-text"
  | "long-text"
  | "radio-button"
  | "check-box"
  | "arrow-down-dropbox-circle"
  | "delete"
  | "content-copy"
  | "arrow-drop-up"
  | "arrow-drop-down"
  | "arrow-drop-down-circle"
  | "add-circle"
  | "close";

type IconProps = {
  [key in IconType]: {
    component: FC<SVGProps<SVGSVGElement>>;
    tooltipInfo?: string;
  };
};

export const IconSVG: IconProps = {
  "short-text": {
    component: ShortText,
  },
  "long-text": {
    component: LongText,
  },
  "radio-button": {
    component: RadionButton,
  },
  "check-box": {
    component: Checkbox,
  },
  "arrow-down-dropbox-circle": {
    component: ArrowDownDropboxCircle,
  },
  delete: {
    component: Delete,
    tooltipInfo: "질문 삭제",
  },
  "content-copy": {
    component: ContentCopy,
    tooltipInfo: "질문 복사",
  },
  "arrow-drop-up": {
    component: ArrowDropUp,
  },
  "arrow-drop-down": {
    component: ArrowDropDown,
  },
  "arrow-drop-down-circle": {
    component: ArrowDropDownCircle,
  },
  "add-circle": {
    component: AddCircle,
    tooltipInfo: "질문 추가",
  },
  close: {
    component: Close,
    tooltipInfo: "삭제"
  },
};

export default function Icon({ type }: { type: IconType }) {
  const DynamicIcon = IconSVG[type].component;

  return <DynamicIcon />;
}
