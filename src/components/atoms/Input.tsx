import { cn } from "@/utils/cn";
import { ComponentProps, FC, KeyboardEvent, ReactNode } from "react";

type InputProps = ComponentProps<"input"> & {
  className?: string;
  inputStyle?: string;
};

const defaultInputStyle = "size-full focus:outline-none";
const underlineNeuralStyle =
  "input-underline-neutral absolute bottom-0 w-full h-[1px] bg-neutral-300 opacity-0";
const underlinePurpleStyle =
  "input-underline-purple absolute w-full scale-0 bottom-0 translate-[-50%] h-[2px] transition-all duration-200 bg-purple-primary group-focus-within:scale-100";

const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
};

function InputContainer({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative w-full [&:hover>*:nth-child(2)]:opacity-100",
        className
      )}
    >
      {children}
    </div>
  );
}

function UnderlineNeutral({ className }: { className?: string }) {
  return (
    <div
      className={cn("input-underline-neutral", underlineNeuralStyle, className)}
    />
  );
}

function UnderlinePurple() {
  return <div className={cn("input-underline-purple", underlinePurpleStyle)} />;
}

export default function Input({
  className,
  inputStyle,
  ...others
}: InputProps) {
  return (
    <InputContainer className={className}>
      <input
        onKeyDown={handleKeyDown}
        className={cn(defaultInputStyle, inputStyle)}
        {...others}
      />
    </InputContainer>
  );
}

const Title: FC<InputProps> = ({
  className,
  inputStyle,
  disabled = false,
  ...others
}) => {
  return (
    <InputContainer className={className}>
      <input
        placeholder="제목 없는 설문지"
        className={cn(
          defaultInputStyle,
          "text-4xl py-3 font-normal placeholder:text-neutral-500",
          disabled && "bg-card",
          inputStyle
        )}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        {...others}
      />
      {!disabled && <UnderlineNeutral />}
      {!disabled && <UnderlinePurple />}
    </InputContainer>
  );
};

const SubTitle: FC<InputProps> = ({
  className,
  inputStyle,
  disabled,
  ...others
}) => {
  return (
    <InputContainer className={className}>
      <input
        placeholder="질문"
        className={cn(
          defaultInputStyle,
          "px-4 py-6 bg-neutral-100/70 hover:bg-neutral-100",
          disabled && "bg-card hover:bg-card",
          inputStyle
        )}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        {...others}
      />
      {!disabled && <UnderlineNeutral />}
      {!disabled && <UnderlinePurple />}
    </InputContainer>
  );
};

const Description: FC<InputProps> = ({
  className,
  inputStyle,
  disabled,
  placeholder,
  ...others
}) => {
  return (
    <InputContainer className={className}>
      <input
        placeholder={placeholder}
        className={cn(
          defaultInputStyle,
          "py-2 bg-card text-sm",
          disabled &&
            "bg-card hover:bg-card border-dotted border-b border-neutral-500",
          inputStyle
        )}
        disabled={disabled}
        {...others}
      />
      {!disabled && <UnderlineNeutral />}
      {!disabled && <UnderlinePurple />}
    </InputContainer>
  );
};

Input.SubTitle = SubTitle;
Input.Title = Title;
Input.Description = Description;
