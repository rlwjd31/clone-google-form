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
import DragIndicator from "@/assets/icons/drag-indicator.svg?react";

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
  | "close"
  | "drag-indicator";

type IconProps = {
  [key in IconType]: {
    component: FC<SVGProps<SVGSVGElement>>;
    text?: string;
  };
};

export const IconSVG: IconProps = {
  "short-text": {
    component: ShortText,
    text: "단답형"
  },
  "long-text": {
    component: LongText,
    text: "장문형"
  },
  "radio-button": {
    component: RadionButton,
    text: "객관식"
  },
  "check-box": {
    component: Checkbox,
    text: "체크박스"
  },
  "arrow-down-dropbox-circle": {
    component: ArrowDownDropboxCircle,
    text: "드롭다운"
  },
  delete: {
    component: Delete,
    text: "질문 삭제",
  },
  "content-copy": {
    component: ContentCopy,
    text: "질문 복사",
  },
  "arrow-drop-up": {
    component: ArrowDropUp,
  },
  "arrow-drop-down": {
    component: ArrowDropDown,
  },
  "arrow-drop-down-circle": {
    component: ArrowDropDownCircle,
    text: "드롭다운"
  },
  "add-circle": {
    component: AddCircle,
    text: "질문 추가",
  },
  close: {
    component: Close,
    text: "삭제",
  },
  "drag-indicator": {
    component: DragIndicator,
  },
};

export default function Icon({ type }: { type: IconType }) {
  const DynamicIcon = IconSVG[type].component;

  return <DynamicIcon />;
}
