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

import { FC, SVGProps } from "react";

type IconType =
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
  | "add-circle";
type IconProps = { [key in IconType]: FC<SVGProps<SVGSVGElement>> };

const IconSVG: IconProps = {
  "short-text": ShortText,
  "long-text": LongText,
  "radio-button": RadionButton,
  "check-box": Checkbox,
  "arrow-down-dropbox-circle": ArrowDownDropboxCircle,
  delete: Delete,
  "content-copy": ContentCopy,
  "arrow-drop-up": ArrowDropUp,
  "arrow-drop-down": ArrowDropDown,
  "arrow-drop-down-circle": ArrowDropDownCircle,
  "add-circle": AddCircle,
};

export default function Icon({ type }: { type: IconType }) {
  const DynamicIcon = IconSVG[type];

  return <DynamicIcon />;
}
