import Input from "@/components/atoms/Input";
import ButtonIcon from "@/components/molecules/ButtonIcon";
import Card from "@/components/molecules/Card";
import SurveyQuestionBlock from "@/components/templates/survey-question-block/SurveyQuestionBlock";
import useClickOutside from "@/hooks/useClickOustside";
import { SurveyIdProvider } from "@/store/SurveyIdProvider";
import { GlobalState } from "@/store/surveys.slice";
import { cn } from "@/utils/cn";
import { useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function SurveyPage() {
  const surveys = useSelector((state: GlobalState) => state.surveysState);
  const [buttonY, setButtonY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardFocused, setIsCardFocused] = useState(false);
  useClickOutside(cardRef, () => setIsCardFocused(false));
  const surveyRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    setButtonY(getButtonYPosition(surveyRefs.current[0]));
  }, []);

  const notFocusedInputStyle =
    "[&_div]:opacity-0 [&_.input-underline-neutral]:hover:opacity-0";
  const focusedInputStyle = "[&_div]:opacity-100";

  const setButtonYPosition = (index: number) => {
    requestAnimationFrame(() => {
      // * 렌더링 후 정확한 top 값 가져오기
      setButtonY(getButtonYPosition(surveyRefs.current[index]));
    });
  };

  const getButtonYPosition = (element: HTMLDivElement) => {
    const { top } = element.getBoundingClientRect();
    return top + window.scrollY;
  };

  return (
    <div className="relative flex flex-col items-center w-full gap-4 pb-10">
      <AddSurveyButtonIcon positionY={buttonY} />
      <Card
        className="relative w-full pb-6"
        ref={cardRef}
        isCardFocused={isCardFocused}
        onClick={() => setIsCardFocused(true)}
        draggable={false}
      >
        <div className="absolute top-0 left-0 z-20 w-full h-3 rounded-t-md bg-purple-primary" />
        <div className="flex flex-col w-full gap-1">
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
      <div className="relative flex flex-col w-full gap-4">
        {surveys.map(({ surveyId }, index) => (
          <SurveyIdProvider surveyIdProp={surveyId}>
            <div
              ref={(element) => {
                surveyRefs.current[index] = element!;
              }}
              onClick={() => setButtonYPosition(index)}
            >
              <SurveyQuestionBlock />
            </div>
          </SurveyIdProvider>
        ))}
      </div>
    </div>
  );
}

function AddSurveyButtonIcon({ positionY }: { positionY: number }) {
  return (
    <div
      className="absolute top-0 right-0 z-50 transition-all duration-300 ease-in"
      style={{
        transform: `translate(150%, ${positionY - 48}px)`, // * 버튼 높이 48px
      }}
    >
      <ButtonIcon iconType="add-circle" className="p-2 rounded-lg bg-card" />
    </div>
  );
}
