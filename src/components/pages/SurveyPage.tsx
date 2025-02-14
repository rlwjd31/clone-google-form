import Input from "@/components/atoms/Input";
import Card from "@/components/molecules/Card";
import SurveyQuestionBlock from "@/components/templates/survey-question-block/SurveyQuestionBlock";
import useClickOutside from "@/hooks/useClickOustside";
import { SurveyIdProvider } from "@/store/SurveyIdProvider";
import { GlobalState } from "@/store/surveys.slice";
import { cn } from "@/utils/cn";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function SurveyPage() {
  const surveys = useSelector((state: GlobalState) => state.surveysState);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardFocused, setIsCardFocused] = useState(false);
  useClickOutside(cardRef, () => setIsCardFocused(false));

  const notFocusedInputStyle =
    "[&_div]:opacity-0 [&_.input-underline-neutral]:hover:opacity-0";
  const focusedInputStyle = "[&_div]:opacity-100";
  return (
    <div className="flex size-full flex-col items-center gap-8">
      <Card
        className="relative overflow-hidden pb-6"
        ref={cardRef}
        isCardFocused={isCardFocused}
        onClick={() => setIsCardFocused(true)}
      >
        <div className="absolute left-0 top-0 z-20 h-3 w-full bg-purple-primary" />
        <div className="flex w-full flex-col gap-1">
          <Input.Title
            className={cn(
              "mt-6",
              !isCardFocused ? notFocusedInputStyle : focusedInputStyle
            )}
          />
          <Input.Description
            className={cn(
              !isCardFocused ? notFocusedInputStyle : focusedInputStyle
            )}
            placeholder="설문지 설명"
          />
        </div>
      </Card>
      {surveys.map(({ surveyId }) => (
        <SurveyIdProvider surveyIdProp={surveyId}>
          <SurveyQuestionBlock />
        </SurveyIdProvider>
      ))}
    </div>
  );
}
