import Input from "@/components/atoms/Input";
import ButtonIcon from "@/components/molecules/ButtonIcon";
import Card from "@/components/molecules/Card";
import SurveyQuestionBlock from "@/components/templates/survey-question-block/SurveyQuestionBlock";
import useClickOutside from "@/hooks/useClickOustside";
import { SurveyIdProvider } from "@/store/SurveyIdProvider";
import {
  GlobalActionType,
  GlobalState,
  setSurveyTitle,
  setDescription,
} from "@/store/surveys.slice";
import { cn } from "@/utils/cn";
import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SurveyPage() {
  const surveys = useSelector((state: GlobalState) => state.surveysState);
  const [buttonY, setButtonY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardFocused, setIsCardFocused] = useState(false);
  useClickOutside(cardRef, () => setIsCardFocused(false));
  const surveyRefs = useRef<HTMLDivElement[]>([]);
  const { surveyTitle, description } = useSelector((state: GlobalState) => ({
    surveyTitle: state.surveyTitle,
    description: state.description,
  }));
  const dispatch = useDispatch<GlobalActionType>();

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
    <div className="relative flex w-full flex-col items-center gap-4 pb-10">
      <AddSurveyButtonIcon positionY={buttonY} />
      <Card
        className="relative w-full pb-6"
        ref={cardRef}
        isCardFocused={isCardFocused}
        onClick={() => setIsCardFocused(true)}
        draggable={false}
      >
        <div className="absolute left-0 top-0 z-20 h-3 w-full rounded-t-md bg-purple-primary" />
        <div className="flex w-full flex-col gap-1">
          <Input.Title
            className={cn(
              "mt-6",
              !isCardFocused ? notFocusedInputStyle : focusedInputStyle
            )}
            placeholder="설문지 제목"
            value={surveyTitle}
            onChange={(e) => dispatch(setSurveyTitle(e.target.value))}
          />
          <Input.Description
            className={cn(
              !isCardFocused ? notFocusedInputStyle : focusedInputStyle
            )}
            placeholder="설문지 설명"
            value={description}
            onChange={(e) => dispatch(setDescription(e.target.value))}
          />
        </div>
      </Card>
      {/* Survey rendering영역 */}
      <div className="relative flex w-full flex-col gap-4">
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
      className="absolute right-0 top-0 z-50 transition-all duration-300 ease-in"
      style={{
        transform: `translate(150%, ${positionY - 48}px)`, // * 버튼 높이 48px
      }}
    >
      <ButtonIcon iconType="add-circle" className="rounded-lg bg-card p-2" />
    </div>
  );
}
