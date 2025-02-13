import { IconType } from "@/components/atoms/Icon";

export type QuestionType = Extract<
  IconType,
  | "short-text"
  | "long-text"
  | "radio-button"
  | "check-box"
  | "arrow-drop-down-circle"
>;